const override = require("override-lib/library");

function process(type, fname) {
	const overrides = override[type + "s"];
	const all = Vars.content[type + "s"]();

	if (overrides.classes.length) {
		// Turn Wall into "thorium-wall", "copper-wall", etc.
		all.each(instance => {
			for (var group of overrides.classes) {
				var Class = group[0];
				if (instance instanceof Class) {
					override[type](instance, group[1]);
					if (group[2]) {
						group[2](instance);
					}
				}
			}
		});
	}

	for (var name in overrides.instances) (() => {
		const instance = Vars.content.getByName(ContentType[type], name);
		const merged = {};

		for (var def of overrides.instances[name]) {
			// TODO: Handle function collisions
			Object.assign(merged, def);
		}

		const entity = instance[fname].get().class;
		instance.buildType = () => extend(entity, instance, merged);
	})();

	// Make override.* throw an error after init time
	override[type + "s"] = null;
}

Events.on(ContentInitEvent, () => {
	process("block", "buildType");
	process("unit", "constructor");
});
