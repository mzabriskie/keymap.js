keymap.js
=========

JavaScript key mapper

## Examples

Create a Keymap using a single character:

```js
Keymap.create('j', function () { alert('next'); });
Keymap.create('k', function () { alert('prev'); });
```

Create a Keymap using a character sequence:

```js
Keymap.create('foo', function () { alert('bar'); });
```

Create a Keymap using a single char code:

```js
Keymap.create(Keymap.keyCode.ESC, function () { alert('cancel'); });
```

Create a Keymap using a char code sequence:

```js
Keymap.create([
	Keymap.keyCode.UP,
	Keymap.keyCode.UP,
	Keymap.keyCode.DOWN,
	Keymap.keyCode.DOWN,
    Keymap.keyCode.LEFT,
    Keymap.keyCode.RIGHT,
    Keymap.keyCode.LEFT,
    Keymap.keyCode.RIGHT,
    Keymap.keyCode.B,
    Keymap.keyCode.A], function () { alert('konami'); });
```

By default `Keymap.create` auto enables the instance. There may be times when you don't want this behavior.

```js
// Create a Keymap that is disabled
var keymap = Keymap.create(Keymap.keyCode.ESC, {
	callback: function () { alert('cancel'); },
	enabled: false
});

// Enable it at a later point
keymap.enable();
```

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

##### options

* `callback` - The function that will be invoked when the code is met
* `timeout` - How long between key strokes before `reset` is called (defaults to 500)
* `enabled` - Whether or not the `Keymap` should be enabled (defaults to true)


###### Note

Options can be either a function, or an object. If a function is provided it will be used as the callback option, and other options will use default values.


## License

keymap.js is released under the MIT license.