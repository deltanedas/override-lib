# How to use

First, require override-lib: `const override = require("override-lib/library");`

Then override something!

```js
// Override a specific block by name
override.block("duo", {
	buildConfiguration(table) {
		table.button(Icon.warning, Core.app.exit);
	}
});
Blocks.duo.configurable = true;

// Override a class of blocks
override.block(Conveyor, {
	draw() {
		// Make conveyors spin instead of animate
		Draw.rect(this.block.region, this.x, this.y, Time.time * this.block.speed);
	}
});
```

# Caveats

- Multiple mods overriding the same function currently isn't handled.
- Units probably don't work

# Real example

(Logic Debugger)[https://github.com/DeltaNedas/ldb]
