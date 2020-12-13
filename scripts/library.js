var override;

// Internal utilities //

function init() {
	return {
		// an instance name like "router" or "risso"
		instances: {},
		// a class like Wall
		classes: [],
	};
}

const isInstance = (type, h) => typeof(h) == "string" || h instanceof type;

const getName = h => typeof(h) == "string" ? h : h.name;

function getfunc(Class, name) {
	const map = override[name];

	/* override.<name>:
	   Patch the instance's entity provider with the given def object.
	   Class can be either a class itself like Wall or Flyingc, or a name like "router" or "gamma".
	   Func is called with the instance when being loaded, use to set properties for all instances of a class. */
	return (instance, def, func) => {
		const inst = isInstance(Class, instance);
		const overrides = inst ? map.instances[getName(instance)] : map.classes;
		var item = inst ? def : [instance, def, func];
		if (overrides) {
			overrides.push(item);
		} else {
			map.instances[instance] = [item];
		}
	}
}

// Public API //

override = {
	// Maps of classes to definitions
	blocks: init(),
	units: init()
};

// overriding functions: use these and see doc in getfunc's return
override.block = getfunc(Block, "blocks");
override.unit = getfunc(UnitType, "units");

global.override = override;
module.exports = override;
