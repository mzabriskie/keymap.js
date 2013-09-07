keymap.js
=========

JavaScript key mapper

## Examples

Create a Keymap using a single character:

```javascript
Keymap.create('j', function () { alert('next'); });
Keymap.create('k', function () { alert('prev'); });
```

Create a Keymap using a character sequence:

```javascript
Keymap.create('foo', function () { alert('bar'); });
```

Create a Keymap using a single char code:

```javascript
Keymap.create(Keymap.keyCode.ESC, function () { alert('cancel'); });
```

Create a Keymap using a char code sequence:

```javascript
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
* `timeout` - How long between key strokes before <code>reset</code> is called


###### Note

Options can be either a function, or an object. If a function is provided it will be used as the callback option, and timeout will be the default.


## License

keymap.js is released under the MIT license.