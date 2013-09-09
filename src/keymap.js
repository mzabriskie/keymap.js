/*

 Copyright (c) 2013 by Matt Zabriskie

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */
(function (window) {
    'use strict';

    var REGEXP_INPUT = /(input|select|textarea)/i,
        DEFAULT_TIMEOUT = 500;

    // Facade for adding DOM events
    function addEvent(el, event, handler) {
        if (el.attachEvent) {
            el.attachEvent('on' + event, handler);
        } else if (el.addEventListener) {
            el.addEventListener(event, handler, true);
        } else {
            el['on' + event] = handler;
        }
    }

    // Facade for removing DOM events
    function removeEvent(el, event, handler) {
        if (el.detachEvent) {
            el.detachEvent('on' + event, handler);
        } else if (el.removeEventListener) {
            el.removeEventListener(event, handler, true);
        } else {
            el['on' + event] = null;
        }
    }

    // Provide function binding for browsers that lack support (IE<9)
    if (typeof Function.prototype.bind !== 'function') {
        Function.prototype.bind = function (instance) {
            var method = this;
            return function () { method.apply(instance, arguments); };
        };
    }

    /**
     * Create a Keymap instance
     * @param {Number|String|Array} code
     * @param {Object} options
     */
    function Keymap(code, options) {
        options = options || {};

        this.code = [];
        this.callback = options.callback;
        this.timeout = options.timeout || DEFAULT_TIMEOUT;
        this.timer = null;
        this.index = 0;

        // bind functions that handle events
        this.reset = this.reset.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // number, assume value is the char code for a single character
        if (typeof code === 'number') {
            this.code = [code];
        }
        // string, use char code for each character
        else if (typeof code === 'string') {
            code = code.toUpperCase();
            for (var i=0, l=code.length; i<l; i++) {
                this.code[i] = code.charCodeAt(i);
            }
        }
        // array, each item in array is a char code
        else if (typeof code === 'object' && code.constructor === Array) {
            this.code = code;
        }
    }

    /**
     * Enable Keymap
     */
    Keymap.prototype.enable = function () {
        this.reset();
        addEvent(document, 'keydown', this.handleKeyDown);
        return this;
    };

    /**
     * Disable Keymap
     */
    Keymap.prototype.disable = function () {
        this.reset();
        removeEvent(document, 'keydown', this.handleKeyDown);
        return this;
    };

    /**
     * Reset Keymap
     */
    Keymap.prototype.reset = function () {
        clearTimeout(this.timer);
        this.timer = null;
        this.index = 0;
        return this;
    };

    /**
     * Handle key down
     * @param {Event} e The event being handled
     */
    Keymap.prototype.handleKeyDown = function (e) {
        var target = e.target || e.srcElement;
        if (!REGEXP_INPUT.test(target.tagName) && e.keyCode === this.code[this.index]) {
            if (++this.index === this.code.length) {
                this.callback();
                this.reset();
            } else {
                clearTimeout(this.timer);
                this.timer = setTimeout(this.reset, this.timeout);
            }
        } else {
            this.reset();
        }
    };

    /**
     * Create a Keymap and auto enable it, unless explicitly specified not to
     * @param {Number|String|Array} code
     * @param {Object|Function} options
     * @returns {Keymap}
     */
    Keymap.create = function (code, options) {
        if (typeof options === 'function') {
            options = {callback: options};
        }

        var km = new Keymap(code, options);
        if (options.enabled !== false) {
            km.enable();
        }

        return km;
    };

    Keymap.version = '1.0.1';

    // Constants for key codes
    Keymap.keyCode = {
        BACKSPACE:	8,
        TAB:		9,
        ENTER:		13, RETURN:		13,
        SHIFT:		16,
        CONTROL:	17, CTRL:       17,
        ALT:		18, OPTION:		18,
        CAPSLOCK:	20, CAPS:       20,
        ESCAPE:		27, ESC:		27,
        SPACEBAR:	32, SPACE:      32,

        PAGEUP:33, PAGEDOWN:34,

        END:35, HOME:36,

        LEFT:37, UP:38, RIGHT:39, DOWN:40,

        INSERT:45, DELETE:46,

        ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52,
        FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57,

        A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73,
        J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82,
        S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90,

        START:		91, COMMAND:	91,

        F1:112, F2:113, F3:114, F4:115, F5:116, F6:117,
        F7:118, F8:119, F9:120, F10:121, F11:122, F12:123,

        NUMLOCK:	144,
        SCROLLLOCK:	145,

        SEMICOLON:  186, COLON:     186,
        EQUALS:     187, PLUS:      187,
        COMMA:      188, LT:        188, // <
        MINUS:      189, UNDERSCORE:189,
        PERIOD:     190, GT:        190, // >
        SLASH:      191, QUESTION:  191,
        LBRACK:     219, LBRACE:    219,
        BACKSLASH:  220, VERTBAR:   220, // |
        RBRACK:     221, RBRACE:    221,
        APOSTROPHE: 222, QUOTE:     222
    };

    // Expose Keymap
    if (typeof define === 'function' && define.amd) {
        define('Keymap', [], function() { return Keymap; });
    } else {
        window.Keymap = Keymap;
    }

})(window);