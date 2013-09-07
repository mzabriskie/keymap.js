keymap.js
=========

JavaScript key mapper

## API

### Instance methods

#### enable()
Enable the Keymap

#### disable()
Disable the Keymap

#### reset()
Reset the Keymap

### Static methods

#### create(code, options)
Create a new Keymap

Options:

* callback - The function that will be invoked when the code is met
* timeout - How long between key strokes before <code>reset</code> is called


__NOTE:__ options can be either a function, or an object. If a function is provided it will be used as the callback option, and timeout will be the default.


## License

keymap.js is released under the MIT license.