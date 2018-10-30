(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./frontendmodules-dev/src/app/config/app.config.ts":
/*!**********************************************************!*\
  !*** ./frontendmodules-dev/src/app/config/app.config.ts ***!
  \**********************************************************/
/*! exports provided: APP_CONFIG, UrlBody, AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_CONFIG", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlBody", function() { return UrlBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var APP_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('app.config');
var UrlBody = {
    params: {
        id: 'id'
    }
};
var AppConfig = {
    routes: {
        // factory: 'factory',
        customer: 'test-customer',
        customerApi: 'customer',
        // orders: 'orders',
        // tasks: 'tasks',
        error404: '404',
    },
    endpoints: {
        url: 'http://127.0.0.1:8000/',
    },
    base: 'http://127.0.0.1:8000/',
    urlOptions: {
        customer: 'customer/',
        factory: 'factory/',
        orders: 'orders/',
        ordersSort: "/orders/?ordering=" + UrlBody.params.id,
        task: "task/",
        taskGroup: "task/group/"
    },
};


/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_pipes/datetime.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/_pipes/datetime.pipe.ts ***!
  \*****************************************/
/*! exports provided: DatetimeFormat, DateFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatetimeFormat", function() { return DatetimeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateFormat", function() { return DateFormat; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/constants */ "./src/app/_util/constants.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DatetimeFormat = /** @class */ (function (_super) {
    __extends(DatetimeFormat, _super);
    function DatetimeFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatetimeFormat.prototype.transform = function (value, args) {
        return _super.prototype.transform.call(this, value, _util_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DATE_TIME_FMT);
    };
    DatetimeFormat = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'datetime'
        })
    ], DatetimeFormat);
    return DatetimeFormat;
}(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]));

var DateFormat = /** @class */ (function (_super) {
    __extends(DateFormat, _super);
    function DateFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFormat.prototype.transform = function (value, args) {
        return _super.prototype.transform.call(this, value, _util_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DATE_FMT);
    };
    DateFormat = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'date'
        })
    ], DateFormat);
    return DateFormat;
}(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]));



/***/ }),

/***/ "./src/app/_services/http-client.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_services/http-client.service.ts ***!
  \**************************************************/
/*! exports provided: HttpClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClientService", function() { return HttpClientService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BASE_URL = 'http://127.0.0.1:8000/';
var HttpClientService = /** @class */ (function () {
    function HttpClientService(http) {
        this.http = http;
        this.BASE_URL = 'http://127.0.0.1:8000/';
    }
    HttpClientService.prototype.get = function (url, options) {
        return this.http.get("" + this.BASE_URL + url, options);
    };
    HttpClientService.prototype.post = function (url, body, options) {
        return this.http.post("" + this.BASE_URL + url, body, options);
    };
    HttpClientService.prototype.put = function (url, body, options) {
        return this.http.put("" + this.BASE_URL + url, body, options);
    };
    HttpClientService.prototype.delete = function (url, options) {
        return this.http.delete("" + this.BASE_URL + url, options);
    };
    HttpClientService.prototype.options = function (url, options) {
        return this.http.options("" + this.BASE_URL + url, options);
    };
    HttpClientService.prototype.updateUrl = function (req) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + req;
    };
    HttpClientService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HttpClientService);
    return HttpClientService;
}());



/***/ }),

/***/ "./src/app/_services/message.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/message.service.ts ***!
  \**********************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.url = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    MessageService.prototype.sendMessage = function (message) {
        this.subject.next(message);
    };
    MessageService.prototype.clearMessage = function () {
        this.subject.next();
    };
    MessageService.prototype.getMessage = function () {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    };
    MessageService.prototype.sendUrl = function (message) {
        this.url.next(message);
    };
    MessageService.prototype.clearUrl = function () {
        this.url.next();
    };
    MessageService.prototype.getUrl = function () {
        return this.url.asObservable();
        //return this.customer.asObservable();
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/_services/post.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/post.service.ts ***!
  \*******************************************/
/*! exports provided: PostService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostService", function() { return PostService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pages_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././pages/_services */ "./src/app/pages/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostService = /** @class */ (function () {
    function PostService(httpClient, auth) {
        this.httpClient = httpClient;
        this.auth = auth;
        this.baseurl = 'http://127.0.0.1:8000/';
        this.token = localStorage.getItem('currentUser');
        this.credential = this.auth.updateData(this.token);
    }
    /*   getConfigResponse(): Observable<HttpResponse<Config>> {
       return this.http.get<Config>(
         this.configUrl, { observe: 'response' });
     }*/
    PostService.prototype.post = function (urlendpoint, data) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        headers = headers.append('content-type', 'application/json');
        var token = JSON.parse(this.token);
        headers = headers.append('Authorization', "Bearer " + token);
        console.log(headers);
        // this.httpClient.post(`${this.baseurl}/${urlendpoint}/`, data).subscribe(response => console.log(response));
    };
    PostService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _pages_services__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], PostService);
    return PostService;
}());



/***/ }),

/***/ "./src/app/_util/constants.ts":
/*!************************************!*\
  !*** ./src/app/_util/constants.ts ***!
  \************************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.DATE_FMT = 'yyyy-MM-dd';
    Constants.DATE_TIME_FMT = Constants.DATE_FMT + " hh:mm:ss";
    return Constants;
}());



/***/ }),

/***/ "./src/app/_util/date-picker/date-picker/date-picker.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/_util/date-picker/date-picker/date-picker.component.ts ***!
  \************************************************************************/
/*! exports provided: DatePickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePickerComponent", function() { return DatePickerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
        this._dateValue = null;
        /**
         * Placeholder value for the material control input
         */
        this.placeholder = null;
        /**
         * The date format to use with default format but allowing you to pass a custom date format
         */
        this.format = 'YYYY/MM/DD HH:mm:ss';
        this.propagateChange = function (_) { };
    }
    DatePickerComponent_1 = DatePickerComponent;
    Object.defineProperty(DatePickerComponent.prototype, "dateValue", {
        get: function () {
            return moment__WEBPACK_IMPORTED_MODULE_2__(this._dateValue, this.format);
        },
        set: function (val) {
            this._dateValue = moment__WEBPACK_IMPORTED_MODULE_2__(val).format(this.format);
            this.propagateChange(this._dateValue);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.addEvent = function (type, event) {
        this.dateValue = moment__WEBPACK_IMPORTED_MODULE_2__(event.value, this.format);
    };
    DatePickerComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.dateValue = moment__WEBPACK_IMPORTED_MODULE_2__(value, this.format);
        }
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function () { };
    var DatePickerComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DatePickerComponent.prototype, "_dateValue", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DatePickerComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "format", void 0);
    DatePickerComponent = DatePickerComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-date-picker',
            template: "\n  <mat-form-field>\n  <mat-datepicker-toggle matPrefix [for]=\"picker\"></mat-datepicker-toggle>\n  <input matInput [matDatepicker]=\"picker\" [value]=\"dateValue\" (dateInput)=\"addEvent('input', $event)\" [placeholder]=\"placeholder\">\n  <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n  ",
            providers: [{
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DatePickerComponent_1; }),
                    multi: true
                }]
        })
    ], DatePickerComponent);
    return DatePickerComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _forms_components_jp_forms_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms/components/jp-forms.component */ "./src/app/forms/components/jp-forms.component.ts");
/* harmony import */ var _forms_factory_factory_base_factory_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms/factory/factory-base/factory-base.component */ "./src/app/forms/factory/factory-base/factory-base.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_customer_customer_table_customer_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/customer/customer-table/customer-table.component */ "./src/app/pages/customer/customer-table/customer-table.component.ts");
/* harmony import */ var _pages_factory_factory_table_factory_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/factory/factory-table/factory-table.component */ "./src/app/pages/factory/factory-table/factory-table.component.ts");
/* harmony import */ var _pages_orders_orders_table_orders_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/orders/orders-table/orders-table.component */ "./src/app/pages/orders/orders-table/orders-table.component.ts");
/* harmony import */ var _pages_orders_orders_add_orders_add_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/orders/orders-add/orders-add.component */ "./src/app/pages/orders/orders-add/orders-add.component.ts");
/* harmony import */ var _pages_orders_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/orders/orders-update/orders-update.component */ "./src/app/pages/orders/orders-update/orders-update.component.ts");
/* harmony import */ var _modules_customers_customers_customers_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/customers/customers/customers.component */ "./src/app/modules/customers/customers/customers.component.ts");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_guards__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/_guards */ "./src/app/pages/_guards/index.ts");
/* harmony import */ var _pages_factory_factory_contact_factory_contact_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/factory/factory-contact/factory-contact.component */ "./src/app/pages/factory/factory-contact/factory-contact.component.ts");
/* harmony import */ var _pages_task_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/task/add-task-group/add-task-group.component */ "./src/app/pages/task/add-task-group/add-task-group.component.ts");
/* harmony import */ var _pages_task_task_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/task/task.component */ "./src/app/pages/task/task.component.ts");
/* harmony import */ var _pages_task_create_task_set_task_set_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/task/create-task-set/task-set.component */ "./src/app/pages/task/create-task-set/task-set.component.ts");
/* harmony import */ var _pages_task_create_task_set_task_update_task_update_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/task/create-task-set/task-update/task-update.component */ "./src/app/pages/task/create-task-set/task-update/task-update.component.ts");
/* harmony import */ var _modules_dynamicform_dynamic_dynamic_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/dynamicform/dynamic/dynamic.component */ "./src/app/modules/dynamicform/dynamic/dynamic.component.ts");
/* harmony import */ var _pages_orders_order_task_order_task_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/orders/order-task/order-task.component */ "./src/app/pages/orders/order-task/order-task.component.ts");
/* harmony import */ var _core_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./core/dashboard/dashboard.component */ "./src/app/core/dashboard/dashboard.component.ts");
/* harmony import */ var _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./invoice/invoice.component */ "./src/app/invoice/invoice.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//import {AppConfig} from './config/app.config';

















var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'customer-table', component: _pages_customer_customer_table_customer_table_component__WEBPACK_IMPORTED_MODULE_4__["CustomerTableComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'factory-table', component: _pages_factory_factory_table_factory_table_component__WEBPACK_IMPORTED_MODULE_5__["FactoryTableComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'order-table', component: _pages_orders_orders_table_orders_table_component__WEBPACK_IMPORTED_MODULE_6__["OrdersTableComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'order-add', component: _pages_orders_orders_add_orders_add_component__WEBPACK_IMPORTED_MODULE_7__["OrdersAddComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'order-update', component: _pages_orders_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_8__["OrdersUpdateComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'test-customer', component: _modules_customers_customers_customers_component__WEBPACK_IMPORTED_MODULE_9__["CustomersComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'factory-contact', component: _pages_factory_factory_contact_factory_contact_component__WEBPACK_IMPORTED_MODULE_12__["FactoryContactComponent"], canActivate: [_pages_guards__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]] },
    { path: 'login', component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"] },
    { path: 'add-task-group', component: _pages_task_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_13__["AddTaskGroupComponent"] },
    { path: 'task-form', component: _modules_dynamicform_dynamic_dynamic_component__WEBPACK_IMPORTED_MODULE_17__["DynamicComponent"] },
    { path: 'task', component: _pages_task_task_component__WEBPACK_IMPORTED_MODULE_14__["TaskComponent"] },
    { path: 'task-update', component: _pages_task_create_task_set_task_update_task_update_component__WEBPACK_IMPORTED_MODULE_16__["TaskUpdateComponent"] },
    { path: 'task-test', component: _pages_task_task_component__WEBPACK_IMPORTED_MODULE_14__["TaskComponent"] },
    { path: 'jp-task-forms-component', component: _forms_components_jp_forms_component__WEBPACK_IMPORTED_MODULE_0__["JpFormsComponent"] },
    { path: 'task-component', component: _pages_task_create_task_set_task_set_component__WEBPACK_IMPORTED_MODULE_15__["TaskSetComponent"] },
    { path: 'order-task', component: _pages_orders_order_task_order_task_component__WEBPACK_IMPORTED_MODULE_18__["OrderTaskComponent"] },
    { path: 'home', component: _core_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_19__["DashboardComponent"] },
    { path: 'factory-create', component: _forms_factory_factory_base_factory_base_component__WEBPACK_IMPORTED_MODULE_1__["FactoryBaseComponent"] },
    { path: 'invoice', component: _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_20__["InvoiceComponent"] }
    //{ path: 'task-form', component: DynamicFormComponent },
    //{ path: 'task-form-dynamic', component: DynamicFormTaskComponent },
    // {path: '', component: HomePage},
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // {path: AppConfig.routes.error404, component: Error404Page},
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'enabled' }),
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!--\r\n<div>\r\n    <app-header></app-header>\r\n    <app-top-nav class=\"fixed-topnav\" fxHide.gt-xs></app-top-nav>\r\n    <router-outlet *ngIf=\"isOnline;else isOffline\"></router-outlet>\r\n    <ng-template #isOffline>\r\n        <div>\r\n            <p class=\"offline-error\">{{'offlineMessage'}}&nbsp;&nbsp;&nbsp;<span>:&nbsp;)</span></p>\r\n        </div>\r\n    </ng-template>\r\n</div>-->\r\n<!--The content below is only a placeholder and can be replaced.-->\r\n<app-top-nav class=\"fixed-topnav\" fxHide.gt-xs></app-top-nav>\r\n<mat-sidenav-container>\r\n  <mat-sidenav #appDrawer mode=\"over\" opened=\"false\">\r\n    <mat-nav-list>\r\n      <app-menu-list-item *ngFor=\"let item of navItems\" [item]=\"item\"></app-menu-list-item>\r\n    </mat-nav-list>\r\n  </mat-sidenav>\r\n  <app-top-nav fxHide.xs></app-top-nav>\r\n  <router-outlet></router-outlet>\r\n</mat-sidenav-container>\r\n\r\n<app-time-difference units=\"Year |  Month | Days | Hours | Minutes | Seconds\"  end=\"2018-12-31\"></app-time-difference>\r\n\r\n<mat-card>\r\n  Main Theme:\r\n  <button mat-raised-button color=\"primary\">\r\n    Primary\r\n  </button>\r\n  <button mat-raised-button color=\"accent\">\r\n    Accent\r\n  </button>\r\n  <button mat-raised-button color=\"warn\">\r\n    Warning\r\n  </button>\r\n</mat-card>\r\n\r\n<mat-card class=\"alternate-theme\">\r\n  Alternate Theme:\r\n  <button mat-raised-button color=\"primary\">\r\n    Primary\r\n  </button>\r\n  <button mat-raised-button color=\"accent\">\r\n    Accent\r\n  </button>\r\n  <button mat-raised-button color=\"warn\">\r\n    Warning\r\n  </button>\r\n</mat-card>\r\n\r\n<!--\r\nmaterial snippet\r\nPrefix\tDescription\r\nng-\tAngular Snippets\r\nfx-\tAngular Flex Layout Snippets\r\nngrx-\tAngular NgRx Snippets\r\nngxs-\tAngular Ngxs Snippets\r\nm-\tAngular Material Design Snippets\r\nrx-\tRxJS Snippets for both TypeScript and JavaScript\r\nsw-\tService Workers Snippets\r\nt-\tTest Snippets\r\ne-\tTest Expect Snippets\r\npwa-\tProgressive Web Applications Snippets\r\n-->"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.example-fill-remaining-space {\n  flex: 1 1 auto; }\n.bold-font {\n  font-weight: bolder; }\n.example-fill-remaining-space {\n  flex: 1 1 auto; }\n.bold-font {\n  font-weight: bolder;\n  color: darkslateblue; }\n.mat-table {\n  overflow: auto;\n  max-height: 350px; }\nimg {\n  height: 50px; }\n.Complete {\n  color: #0e970e; }\n.Not-Complete {\n  color: #ad1010; }\nmodal {\n  /* modals are hidden by default */\n  display: none; }\nmodal .modal {\n    /* modal container fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* z-index must be higher than .modal-background */\n    z-index: 1000;\n    /* enables scrolling for tall modals */\n    overflow: auto; }\nmodal .modal .modal-body {\n      padding: 20px;\n      background: #fff;\n      /* margin exposes part of the modal background */\n      margin: 40px; }\nmodal .modal-background {\n    /* modal background fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* semi-transparent black  */\n    background-color: #000;\n    opacity: 0.75;\n    /* z-index must be below .modal and above everything else  */\n    z-index: 900; }\nbody.modal-open {\n  /* body overflow is hidden to hide main scrollbar when modal window is open */\n  overflow: hidden; }\n/* app drawer breakpoint */\n/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.mat-elevation-z0 {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z1 {\n  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z2 {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z3 {\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z4 {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z5 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z6 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z7 {\n  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z8 {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z9 {\n  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z10 {\n  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z11 {\n  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z12 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z13 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z14 {\n  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z15 {\n  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z16 {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z17 {\n  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z18 {\n  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z19 {\n  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z20 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z21 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z22 {\n  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z23 {\n  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z24 {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); }\n.mat-badge-content {\n  font-weight: 600;\n  font-size: 12px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-badge-small .mat-badge-content {\n  font-size: 6px; }\n.mat-badge-large .mat-badge-content {\n  font-size: 24px; }\n.mat-h1, .mat-headline, .mat-typography h1 {\n  font: 400 24px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h2, .mat-title, .mat-typography h2 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h3, .mat-subheading-2, .mat-typography h3 {\n  font: 400 16px/28px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h4, .mat-subheading-1, .mat-typography h4 {\n  font: 400 15px/24px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h5, .mat-typography h5 {\n  font: 400 11.62px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px; }\n.mat-h6, .mat-typography h6 {\n  font: 400 9.38px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px; }\n.mat-body-strong, .mat-body-2 {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-body, .mat-body-1, .mat-typography {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-body p, .mat-body-1 p, .mat-typography p {\n    margin: 0 0 12px; }\n.mat-small, .mat-caption {\n  font: 400 12px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-display-4, .mat-typography .mat-display-4 {\n  font: 300 112px/112px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 56px;\n  letter-spacing: -0.05em; }\n.mat-display-3, .mat-typography .mat-display-3 {\n  font: 400 56px/56px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px;\n  letter-spacing: -0.02em; }\n.mat-display-2, .mat-typography .mat-display-2 {\n  font: 400 45px/48px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px;\n  letter-spacing: -0.005em; }\n.mat-display-1, .mat-typography .mat-display-1 {\n  font: 400 34px/40px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px; }\n.mat-bottom-sheet-container {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  font-weight: 400; }\n.mat-button, .mat-raised-button, .mat-icon-button, .mat-stroked-button,\n.mat-flat-button, .mat-fab, .mat-mini-fab {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-button-toggle {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-card {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-card-title {\n  font-size: 24px;\n  font-weight: 400; }\n.mat-card-subtitle,\n.mat-card-content,\n.mat-card-header .mat-card-title {\n  font-size: 14px; }\n.mat-checkbox {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-checkbox-layout .mat-checkbox-label {\n  line-height: 24px; }\n.mat-chip {\n  font-size: 13px;\n  line-height: 18px; }\n.mat-chip .mat-chip-trailing-icon.mat-icon,\n  .mat-chip .mat-chip-remove.mat-icon {\n    font-size: 18px; }\n.mat-table {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-header-cell {\n  font-size: 12px;\n  font-weight: 500; }\n.mat-cell, .mat-footer-cell {\n  font-size: 14px; }\n.mat-calendar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-calendar-body {\n  font-size: 13px; }\n.mat-calendar-body-label,\n.mat-calendar-period-button {\n  font-size: 14px;\n  font-weight: 500; }\n.mat-calendar-table-header th {\n  font-size: 11px;\n  font-weight: 400; }\n.mat-dialog-title {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-expansion-panel-header {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 15px;\n  font-weight: 400; }\n.mat-expansion-panel-content {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-form-field {\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1.125;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-form-field-wrapper {\n  padding-bottom: 1.34375em; }\n.mat-form-field-prefix .mat-icon,\n.mat-form-field-suffix .mat-icon {\n  font-size: 150%;\n  line-height: 1.125; }\n.mat-form-field-prefix .mat-icon-button,\n.mat-form-field-suffix .mat-icon-button {\n  height: 1.5em;\n  width: 1.5em; }\n.mat-form-field-prefix .mat-icon-button .mat-icon,\n  .mat-form-field-suffix .mat-icon-button .mat-icon {\n    height: 1.125em;\n    line-height: 1.125; }\n.mat-form-field-infix {\n  padding: 0.5em 0;\n  border-top: 0.84375em solid transparent; }\n.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.34375em) scale(0.75);\n          transform: translateY(-1.34375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.34374em) scale(0.75);\n          transform: translateY(-1.34374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-label-wrapper {\n  top: -0.84375em;\n  padding-top: 0.84375em; }\n.mat-form-field-label {\n  top: 1.34375em; }\n.mat-form-field-underline {\n  bottom: 1.34375em; }\n.mat-form-field-subscript-wrapper {\n  font-size: 75%;\n  margin-top: 0.66666667em;\n  top: calc(100% - 1.79166667em); }\n.mat-form-field-appearance-legacy .mat-form-field-wrapper {\n  padding-bottom: 1.25em; }\n.mat-form-field-appearance-legacy .mat-form-field-infix {\n  padding: 0.4375em 0; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n  -ms-transform: translateY(-1.28125em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n  -ms-transform: translateY(-1.28124em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n  -ms-transform: translateY(-1.28123em) scale(0.75);\n  width: 133.33335333%; }\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  top: 1.28125em; }\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  bottom: 1.25em; }\n.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {\n  margin-top: 0.54166667em;\n  top: calc(100% - 1.66666667em); }\n.mat-form-field-appearance-fill .mat-form-field-infix {\n  padding: 0.25em 0 0.75em 0; }\n.mat-form-field-appearance-fill .mat-form-field-label {\n  top: 1.09375em;\n  margin-top: -0.5em; }\n.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-0.59375em) scale(0.75);\n          transform: translateY(-0.59375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-0.59374em) scale(0.75);\n          transform: translateY(-0.59374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-appearance-outline .mat-form-field-infix {\n  padding: 1em 0 1em 0; }\n.mat-form-field-appearance-outline .mat-form-field-label {\n  top: 1.84375em;\n  margin-top: -0.25em; }\n.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.59375em) scale(0.75);\n          transform: translateY(-1.59375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.59374em) scale(0.75);\n          transform: translateY(-1.59374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-grid-tile-header,\n.mat-grid-tile-footer {\n  font-size: 14px; }\n.mat-grid-tile-header .mat-line,\n  .mat-grid-tile-footer .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-grid-tile-header .mat-line:nth-child(n+2),\n    .mat-grid-tile-footer .mat-line:nth-child(n+2) {\n      font-size: 12px; }\ninput.mat-input-element {\n  margin-top: -0.0625em; }\n.mat-menu-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  font-weight: 400; }\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px; }\n.mat-radio-button {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-select {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-select-trigger {\n  height: 1.125em; }\n.mat-slide-toggle-content {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-slider-thumb-label-text {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500; }\n.mat-stepper-vertical, .mat-stepper-horizontal {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-step-label {\n  font-size: 14px;\n  font-weight: 400; }\n.mat-step-label-selected {\n  font-size: 14px;\n  font-weight: 500; }\n.mat-tab-group {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-tab-label, .mat-tab-link {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-toolbar,\n.mat-toolbar h1,\n.mat-toolbar h2,\n.mat-toolbar h3,\n.mat-toolbar h4,\n.mat-toolbar h5,\n.mat-toolbar h6 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0; }\n.mat-tooltip {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 10px;\n  padding-top: 6px;\n  padding-bottom: 6px; }\n.mat-tooltip-handset {\n  font-size: 14px;\n  padding-top: 9px;\n  padding-bottom: 9px; }\n.mat-list-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-list-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-list .mat-list-item, .mat-nav-list .mat-list-item, .mat-selection-list .mat-list-item {\n  font-size: 16px; }\n.mat-list .mat-list-item .mat-line, .mat-nav-list .mat-list-item .mat-line, .mat-selection-list .mat-list-item .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list .mat-list-item .mat-line:nth-child(n+2), .mat-nav-list .mat-list-item .mat-line:nth-child(n+2), .mat-selection-list .mat-list-item .mat-line:nth-child(n+2) {\n      font-size: 14px; }\n.mat-list .mat-list-option, .mat-nav-list .mat-list-option, .mat-selection-list .mat-list-option {\n  font-size: 16px; }\n.mat-list .mat-list-option .mat-line, .mat-nav-list .mat-list-option .mat-line, .mat-selection-list .mat-list-option .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list .mat-list-option .mat-line:nth-child(n+2), .mat-nav-list .mat-list-option .mat-line:nth-child(n+2), .mat-selection-list .mat-list-option .mat-line:nth-child(n+2) {\n      font-size: 14px; }\n.mat-list .mat-subheader, .mat-nav-list .mat-subheader, .mat-selection-list .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-list[dense] .mat-list-item, .mat-nav-list[dense] .mat-list-item, .mat-selection-list[dense] .mat-list-item {\n  font-size: 12px; }\n.mat-list[dense] .mat-list-item .mat-line, .mat-nav-list[dense] .mat-list-item .mat-line, .mat-selection-list[dense] .mat-list-item .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2), .mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2), .mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2) {\n      font-size: 12px; }\n.mat-list[dense] .mat-list-option, .mat-nav-list[dense] .mat-list-option, .mat-selection-list[dense] .mat-list-option {\n  font-size: 12px; }\n.mat-list[dense] .mat-list-option .mat-line, .mat-nav-list[dense] .mat-list-option .mat-line, .mat-selection-list[dense] .mat-list-option .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2), .mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2), .mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2) {\n      font-size: 12px; }\n.mat-list[dense] .mat-subheader, .mat-nav-list[dense] .mat-subheader, .mat-selection-list[dense] .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500; }\n.mat-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px; }\n.mat-optgroup-label {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-simple-snackbar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px; }\n.mat-simple-snackbar-action {\n  line-height: 1;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 500; }\n.mat-tree {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-tree-node {\n  font-weight: 400;\n  font-size: 14px; }\n.mat-ripple {\n  overflow: hidden; }\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible; }\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  -webkit-transform: scale(0);\n          transform: scale(0); }\n@media screen and (-ms-high-contrast: active) {\n    .mat-ripple-element {\n      display: none; } }\n.cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none; }\n.cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%; }\n.cdk-overlay-container {\n  position: fixed;\n  z-index: 1000; }\n.cdk-overlay-container:empty {\n    display: none; }\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n  z-index: 1000; }\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  z-index: 1000;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%; }\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  opacity: 0; }\n.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n    opacity: 1; }\n@media screen and (-ms-high-contrast: active) {\n      .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n        opacity: 0.6; } }\n.cdk-overlay-dark-backdrop {\n  background: rgba(0, 0, 0, 0.288); }\n.cdk-overlay-transparent-backdrop, .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 0; }\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px; }\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll; }\n@-webkit-keyframes cdk-text-field-autofill-start {\n  /*!*/ }\n@keyframes cdk-text-field-autofill-start {\n  /*!*/ }\n@-webkit-keyframes cdk-text-field-autofill-end {\n  /*!*/ }\n@keyframes cdk-text-field-autofill-end {\n  /*!*/ }\n.cdk-text-field-autofill-monitored:-webkit-autofill {\n  -webkit-animation-name: cdk-text-field-autofill-start;\n          animation-name: cdk-text-field-autofill-start; }\n.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {\n  -webkit-animation-name: cdk-text-field-autofill-end;\n          animation-name: cdk-text-field-autofill-end; }\ntextarea.cdk-textarea-autosize {\n  resize: none; }\ntextarea.cdk-textarea-autosize-measuring {\n  height: auto !important;\n  overflow: hidden !important;\n  padding: 2px 0 !important;\n  box-sizing: content-box !important; }\n.mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-option:hover:not(.mat-option-disabled), .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #424242; }\n.mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ffab40; }\n.mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #f44336; }\n.mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.mat-pseudo-checkbox-checked,\n.mat-pseudo-checkbox-indeterminate,\n.mat-accent .mat-pseudo-checkbox-checked,\n.mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ffab40; }\n.mat-primary .mat-pseudo-checkbox-checked,\n.mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #424242; }\n.mat-warn .mat-pseudo-checkbox-checked,\n.mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #f44336; }\n.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.mat-badge-content {\n  color: white;\n  background: #424242; }\n.mat-badge-accent .mat-badge-content {\n  background: #ffab40;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #f44336; }\n.mat-badge {\n  position: relative; }\n.mat-badge-hidden .mat-badge-content {\n  display: none; }\n.mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-button, .mat-icon-button, .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.mat-button.mat-primary, .mat-icon-button.mat-primary, .mat-stroked-button.mat-primary {\n    color: #424242; }\n.mat-button.mat-accent, .mat-icon-button.mat-accent, .mat-stroked-button.mat-accent {\n    color: #ffab40; }\n.mat-button.mat-warn, .mat-icon-button.mat-warn, .mat-stroked-button.mat-warn {\n    color: #f44336; }\n.mat-button.mat-primary[disabled], .mat-button.mat-accent[disabled], .mat-button.mat-warn[disabled], .mat-button[disabled][disabled], .mat-icon-button.mat-primary[disabled], .mat-icon-button.mat-accent[disabled], .mat-icon-button.mat-warn[disabled], .mat-icon-button[disabled][disabled], .mat-stroked-button.mat-primary[disabled], .mat-stroked-button.mat-accent[disabled], .mat-stroked-button.mat-warn[disabled], .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-button.mat-primary .mat-button-focus-overlay, .mat-icon-button.mat-primary .mat-button-focus-overlay, .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(66, 66, 66, 0.12); }\n.mat-button.mat-accent .mat-button-focus-overlay, .mat-icon-button.mat-accent .mat-button-focus-overlay, .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(255, 171, 64, 0.12); }\n.mat-button.mat-warn .mat-button-focus-overlay, .mat-icon-button.mat-warn .mat-button-focus-overlay, .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(244, 67, 54, 0.12); }\n.mat-button[disabled] .mat-button-focus-overlay, .mat-icon-button[disabled] .mat-button-focus-overlay, .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.mat-button.mat-primary .mat-ripple-element, .mat-icon-button.mat-primary .mat-ripple-element, .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(66, 66, 66, 0.1); }\n.mat-button.mat-accent .mat-ripple-element, .mat-icon-button.mat-accent .mat-ripple-element, .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 171, 64, 0.1); }\n.mat-button.mat-warn .mat-ripple-element, .mat-icon-button.mat-warn .mat-ripple-element, .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(244, 67, 54, 0.1); }\n.mat-flat-button, .mat-raised-button, .mat-fab, .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    color: white; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    color: rgba(0, 0, 0, 0.87); }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    color: white; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    background-color: #424242; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    background-color: #ffab40; }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    background-color: #f44336; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-flat-button.mat-primary .mat-ripple-element, .mat-raised-button.mat-primary .mat-ripple-element, .mat-fab.mat-primary .mat-ripple-element, .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-flat-button.mat-accent .mat-ripple-element, .mat-raised-button.mat-accent .mat-ripple-element, .mat-fab.mat-accent .mat-ripple-element, .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.mat-flat-button.mat-warn .mat-ripple-element, .mat-raised-button.mat-warn .mat-ripple-element, .mat-fab.mat-warn .mat-ripple-element, .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(66, 66, 66, 0.2); }\n.mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(255, 171, 64, 0.2); }\n.mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.2); }\n.mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-checkmark {\n  fill: #fafafa; }\n.mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #424242; }\n.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ffab40; }\n.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #f44336; }\n.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-background {\n    background: none; } }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(66, 66, 66, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 171, 64, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #424242;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #f44336;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ffab40;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-table {\n  background: white; }\n.mat-table thead, .mat-table tbody, .mat-table tfoot,\nmat-header-row, mat-row, mat-footer-row,\n[mat-header-row], [mat-row], [mat-footer-row],\n.mat-table-sticky {\n  background: inherit; }\nmat-row, mat-header-row, mat-footer-row,\nth.mat-header-cell, td.mat-cell, td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-cell, .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.mat-datepicker-toggle,\n.mat-datepicker-content .mat-calendar-next-button,\n.mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.mat-calendar-body-selected {\n  background-color: #424242;\n  color: white; }\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(66, 66, 66, 0.4); }\n.mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ffab40;\n    color: rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(255, 171, 64, 0.4); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #f44336;\n    color: white; }\n.mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(244, 67, 54, 0.4); }\n.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-toggle-active {\n  color: #424242; }\n.mat-datepicker-toggle-active.mat-accent {\n    color: #ffab40; }\n.mat-datepicker-toggle-active.mat-warn {\n    color: #f44336; }\n.mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-expansion-panel-header-description,\n.mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-form-field.mat-focused .mat-form-field-label {\n  color: #424242; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ffab40; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #f44336; }\n.mat-focused .mat-form-field-required-marker {\n  color: #ffab40; }\n.mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #424242; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ffab40; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #f44336; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #f44336; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #f44336; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #f44336; }\n.mat-error {\n  color: #f44336; }\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #424242; }\n.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ffab40; }\n.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #f44336; }\n.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #f44336; }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.mat-icon.mat-primary {\n  color: #424242; }\n.mat-icon.mat-accent {\n  color: #ffab40; }\n.mat-icon.mat-warn {\n  color: #f44336; }\n.mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-input-element {\n  caret-color: #424242; }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-accent .mat-input-element {\n  caret-color: #ffab40; }\n.mat-warn .mat-input-element,\n.mat-form-field-invalid .mat-input-element {\n  caret-color: #f44336; }\n.mat-list .mat-list-item, .mat-nav-list .mat-list-item, .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-list-option, .mat-nav-list .mat-list-option, .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-subheader, .mat-nav-list .mat-subheader, .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-list-item-disabled {\n  background-color: #eeeeee; }\n.mat-list-option:hover, .mat-list-option.mat-list-item-focus,\n.mat-nav-list .mat-list-item:hover,\n.mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-menu-panel {\n  background: white; }\n.mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-menu-item[disabled], .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-menu-item .mat-icon:not([color]),\n.mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-menu-item:hover:not([disabled]),\n.mat-menu-item.cdk-program-focused:not([disabled]),\n.mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-paginator {\n  background: white; }\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-paginator-decrement,\n.mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-paginator-first,\n.mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-icon-button[disabled] .mat-paginator-decrement,\n.mat-icon-button[disabled] .mat-paginator-increment,\n.mat-icon-button[disabled] .mat-paginator-first,\n.mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-progress-bar-background {\n  fill: whitesmoke; }\n.mat-progress-bar-buffer {\n  background-color: whitesmoke; }\n.mat-progress-bar-fill::after {\n  background-color: #424242; }\n.mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #ffd180; }\n.mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #ffd180; }\n.mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ffab40; }\n.mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #f44336; }\n.mat-progress-spinner circle, .mat-spinner circle {\n  stroke: #424242; }\n.mat-progress-spinner.mat-accent circle, .mat-spinner.mat-accent circle {\n  stroke: #ffab40; }\n.mat-progress-spinner.mat-warn circle, .mat-spinner.mat-warn circle {\n  stroke: #f44336; }\n.mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #424242; }\n.mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #424242; }\n.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(66, 66, 66, 0.26); }\n.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ffab40; }\n.mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ffab40; }\n.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 171, 64, 0.26); }\n.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #f44336; }\n.mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #f44336; }\n.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-select-content, .mat-select-panel-done-animating {\n  background: white; }\n.mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #424242; }\n.mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ffab40; }\n.mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #f44336; }\n.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #f44336; }\n.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer.mat-drawer-push {\n    background-color: white; }\n.mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ff9800; }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 152, 0, 0.5); }\n.mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 152, 0, 0.12); }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #9e9e9e; }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(158, 158, 158, 0.5); }\n.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(158, 158, 158, 0.12); }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-primary .mat-slider-track-fill,\n.mat-primary .mat-slider-thumb,\n.mat-primary .mat-slider-thumb-label {\n  background-color: #424242; }\n.mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.mat-accent .mat-slider-track-fill,\n.mat-accent .mat-slider-thumb,\n.mat-accent .mat-slider-thumb-label {\n  background-color: #ffab40; }\n.mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-warn .mat-slider-track-fill,\n.mat-warn .mat-slider-thumb,\n.mat-warn .mat-slider-thumb-label {\n  background-color: #f44336; }\n.mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.mat-slider-focus-ring {\n  background-color: rgba(255, 171, 64, 0.2); }\n.mat-slider:hover .mat-slider-track-background,\n.cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-disabled .mat-slider-track-background,\n.mat-slider-disabled .mat-slider-track-fill,\n.mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-step-header.cdk-keyboard-focused, .mat-step-header.cdk-program-focused, .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-step-header .mat-step-label,\n.mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-step-header .mat-step-icon {\n  background-color: #424242;\n  color: white; }\n.mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-stepper-horizontal, .mat-stepper-vertical {\n  background-color: white; }\n.mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-sort-header-arrow {\n  color: #757575; }\n.mat-tab-nav-bar,\n.mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.mat-tab-group-inverted-header .mat-tab-nav-bar,\n.mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.mat-tab-label, .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-tab-label.mat-tab-disabled, .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(245, 245, 245, 0.3); }\n.mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #424242; }\n.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 209, 128, 0.3); }\n.mat-tab-group.mat-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ffab40; }\n.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #f44336; }\n.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(245, 245, 245, 0.3); }\n.mat-tab-group.mat-background-primary .mat-tab-header, .mat-tab-group.mat-background-primary .mat-tab-links, .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #424242; }\n.mat-tab-group.mat-background-primary .mat-tab-label, .mat-tab-group.mat-background-primary .mat-tab-link, .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-ripple-element, .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 209, 128, 0.3); }\n.mat-tab-group.mat-background-accent .mat-tab-header, .mat-tab-group.mat-background-accent .mat-tab-links, .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ffab40; }\n.mat-tab-group.mat-background-accent .mat-tab-label, .mat-tab-group.mat-background-accent .mat-tab-link, .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.mat-tab-group.mat-background-accent .mat-ripple-element, .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-background-warn .mat-tab-header, .mat-tab-group.mat-background-warn .mat-tab-links, .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #f44336; }\n.mat-tab-group.mat-background-warn .mat-tab-label, .mat-tab-group.mat-background-warn .mat-tab-link, .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-ripple-element, .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-toolbar.mat-primary {\n    background: #424242;\n    color: white; }\n.mat-toolbar.mat-accent {\n    background: #ffab40;\n    color: rgba(0, 0, 0, 0.87); }\n.mat-toolbar.mat-warn {\n    background: #f44336;\n    color: white; }\n.mat-toolbar .mat-form-field-underline,\n  .mat-toolbar .mat-form-field-ripple,\n  .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.mat-toolbar .mat-form-field-label,\n  .mat-toolbar .mat-focused .mat-form-field-label,\n  .mat-toolbar .mat-select-value,\n  .mat-toolbar .mat-select-arrow,\n  .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.mat-tree {\n  background: white; }\n.mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.mat-simple-snackbar-action {\n  color: #ffab40; }\n.alternate-theme .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-option:hover:not(.mat-option-disabled), .alternate-theme .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #fffde7; }\n.alternate-theme .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ffee58; }\n.alternate-theme .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #f44336; }\n.alternate-theme .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.alternate-theme .mat-pseudo-checkbox-checked,\n.alternate-theme .mat-pseudo-checkbox-indeterminate,\n.alternate-theme .mat-accent .mat-pseudo-checkbox-checked,\n.alternate-theme .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ffee58; }\n.alternate-theme .mat-primary .mat-pseudo-checkbox-checked,\n.alternate-theme .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #fffde7; }\n.alternate-theme .mat-warn .mat-pseudo-checkbox-checked,\n.alternate-theme .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #f44336; }\n.alternate-theme .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.alternate-theme .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.alternate-theme .mat-app-background, .alternate-theme.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.alternate-theme .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.alternate-theme .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-badge-content {\n  color: rgba(0, 0, 0, 0.87);\n  background: #fffde7; }\n.alternate-theme .mat-badge-accent .mat-badge-content {\n  background: #ffee58;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #f44336; }\n.alternate-theme .mat-badge {\n  position: relative; }\n.alternate-theme .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.alternate-theme .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.alternate-theme .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.alternate-theme .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.alternate-theme .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.alternate-theme .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .alternate-theme .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.alternate-theme .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .alternate-theme .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.alternate-theme .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .alternate-theme .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.alternate-theme .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .alternate-theme .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.alternate-theme .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.alternate-theme .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.alternate-theme .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .alternate-theme .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.alternate-theme .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .alternate-theme .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.alternate-theme .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .alternate-theme .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.alternate-theme .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .alternate-theme .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.alternate-theme .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.alternate-theme .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.alternate-theme .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .alternate-theme .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.alternate-theme .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .alternate-theme .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.alternate-theme .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .alternate-theme .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.alternate-theme .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .alternate-theme .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.alternate-theme .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-button, .alternate-theme .mat-icon-button, .alternate-theme .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.alternate-theme .mat-button.mat-primary, .alternate-theme .mat-icon-button.mat-primary, .alternate-theme .mat-stroked-button.mat-primary {\n    color: #fffde7; }\n.alternate-theme .mat-button.mat-accent, .alternate-theme .mat-icon-button.mat-accent, .alternate-theme .mat-stroked-button.mat-accent {\n    color: #ffee58; }\n.alternate-theme .mat-button.mat-warn, .alternate-theme .mat-icon-button.mat-warn, .alternate-theme .mat-stroked-button.mat-warn {\n    color: #f44336; }\n.alternate-theme .mat-button.mat-primary[disabled], .alternate-theme .mat-button.mat-accent[disabled], .alternate-theme .mat-button.mat-warn[disabled], .alternate-theme .mat-button[disabled][disabled], .alternate-theme .mat-icon-button.mat-primary[disabled], .alternate-theme .mat-icon-button.mat-accent[disabled], .alternate-theme .mat-icon-button.mat-warn[disabled], .alternate-theme .mat-icon-button[disabled][disabled], .alternate-theme .mat-stroked-button.mat-primary[disabled], .alternate-theme .mat-stroked-button.mat-accent[disabled], .alternate-theme .mat-stroked-button.mat-warn[disabled], .alternate-theme .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-button.mat-primary .mat-button-focus-overlay, .alternate-theme .mat-icon-button.mat-primary .mat-button-focus-overlay, .alternate-theme .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(255, 253, 231, 0.12); }\n.alternate-theme .mat-button.mat-accent .mat-button-focus-overlay, .alternate-theme .mat-icon-button.mat-accent .mat-button-focus-overlay, .alternate-theme .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(255, 238, 88, 0.12); }\n.alternate-theme .mat-button.mat-warn .mat-button-focus-overlay, .alternate-theme .mat-icon-button.mat-warn .mat-button-focus-overlay, .alternate-theme .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(244, 67, 54, 0.12); }\n.alternate-theme .mat-button[disabled] .mat-button-focus-overlay, .alternate-theme .mat-icon-button[disabled] .mat-button-focus-overlay, .alternate-theme .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.alternate-theme .mat-button.mat-primary .mat-ripple-element, .alternate-theme .mat-icon-button.mat-primary .mat-ripple-element, .alternate-theme .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 253, 231, 0.1); }\n.alternate-theme .mat-button.mat-accent .mat-ripple-element, .alternate-theme .mat-icon-button.mat-accent .mat-ripple-element, .alternate-theme .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 238, 88, 0.1); }\n.alternate-theme .mat-button.mat-warn .mat-ripple-element, .alternate-theme .mat-icon-button.mat-warn .mat-ripple-element, .alternate-theme .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(244, 67, 54, 0.1); }\n.alternate-theme .mat-flat-button, .alternate-theme .mat-raised-button, .alternate-theme .mat-fab, .alternate-theme .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.alternate-theme .mat-flat-button.mat-primary, .alternate-theme .mat-raised-button.mat-primary, .alternate-theme .mat-fab.mat-primary, .alternate-theme .mat-mini-fab.mat-primary {\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-flat-button.mat-accent, .alternate-theme .mat-raised-button.mat-accent, .alternate-theme .mat-fab.mat-accent, .alternate-theme .mat-mini-fab.mat-accent {\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-flat-button.mat-warn, .alternate-theme .mat-raised-button.mat-warn, .alternate-theme .mat-fab.mat-warn, .alternate-theme .mat-mini-fab.mat-warn {\n    color: white; }\n.alternate-theme .mat-flat-button.mat-primary[disabled], .alternate-theme .mat-flat-button.mat-accent[disabled], .alternate-theme .mat-flat-button.mat-warn[disabled], .alternate-theme .mat-flat-button[disabled][disabled], .alternate-theme .mat-raised-button.mat-primary[disabled], .alternate-theme .mat-raised-button.mat-accent[disabled], .alternate-theme .mat-raised-button.mat-warn[disabled], .alternate-theme .mat-raised-button[disabled][disabled], .alternate-theme .mat-fab.mat-primary[disabled], .alternate-theme .mat-fab.mat-accent[disabled], .alternate-theme .mat-fab.mat-warn[disabled], .alternate-theme .mat-fab[disabled][disabled], .alternate-theme .mat-mini-fab.mat-primary[disabled], .alternate-theme .mat-mini-fab.mat-accent[disabled], .alternate-theme .mat-mini-fab.mat-warn[disabled], .alternate-theme .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-flat-button.mat-primary, .alternate-theme .mat-raised-button.mat-primary, .alternate-theme .mat-fab.mat-primary, .alternate-theme .mat-mini-fab.mat-primary {\n    background-color: #fffde7; }\n.alternate-theme .mat-flat-button.mat-accent, .alternate-theme .mat-raised-button.mat-accent, .alternate-theme .mat-fab.mat-accent, .alternate-theme .mat-mini-fab.mat-accent {\n    background-color: #ffee58; }\n.alternate-theme .mat-flat-button.mat-warn, .alternate-theme .mat-raised-button.mat-warn, .alternate-theme .mat-fab.mat-warn, .alternate-theme .mat-mini-fab.mat-warn {\n    background-color: #f44336; }\n.alternate-theme .mat-flat-button.mat-primary[disabled], .alternate-theme .mat-flat-button.mat-accent[disabled], .alternate-theme .mat-flat-button.mat-warn[disabled], .alternate-theme .mat-flat-button[disabled][disabled], .alternate-theme .mat-raised-button.mat-primary[disabled], .alternate-theme .mat-raised-button.mat-accent[disabled], .alternate-theme .mat-raised-button.mat-warn[disabled], .alternate-theme .mat-raised-button[disabled][disabled], .alternate-theme .mat-fab.mat-primary[disabled], .alternate-theme .mat-fab.mat-accent[disabled], .alternate-theme .mat-fab.mat-warn[disabled], .alternate-theme .mat-fab[disabled][disabled], .alternate-theme .mat-mini-fab.mat-primary[disabled], .alternate-theme .mat-mini-fab.mat-accent[disabled], .alternate-theme .mat-mini-fab.mat-warn[disabled], .alternate-theme .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-flat-button.mat-primary .mat-ripple-element, .alternate-theme .mat-raised-button.mat-primary .mat-ripple-element, .alternate-theme .mat-fab.mat-primary .mat-ripple-element, .alternate-theme .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme .mat-flat-button.mat-accent .mat-ripple-element, .alternate-theme .mat-raised-button.mat-accent .mat-ripple-element, .alternate-theme .mat-fab.mat-accent .mat-ripple-element, .alternate-theme .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme .mat-flat-button.mat-warn .mat-ripple-element, .alternate-theme .mat-raised-button.mat-warn .mat-ripple-element, .alternate-theme .mat-fab.mat-warn .mat-ripple-element, .alternate-theme .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.alternate-theme .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 253, 231, 0.2); }\n.alternate-theme .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.2); }\n.alternate-theme .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.2); }\n.alternate-theme .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.alternate-theme .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.alternate-theme .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .alternate-theme .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.alternate-theme .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.alternate-theme .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .alternate-theme .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #fffde7; }\n.alternate-theme .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .alternate-theme .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ffee58; }\n.alternate-theme .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .alternate-theme .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #f44336; }\n.alternate-theme .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .alternate-theme .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.alternate-theme .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.alternate-theme .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .alternate-theme .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .alternate-theme .mat-checkbox-background {\n    background: none; } }\n.alternate-theme .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 253, 231, 0.26); }\n.alternate-theme .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.26); }\n.alternate-theme .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.alternate-theme .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #fffde7;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #f44336;\n  color: white; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ffee58;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme .mat-table {\n  background: white; }\n.alternate-theme .mat-table thead, .alternate-theme .mat-table tbody, .alternate-theme .mat-table tfoot,\n.alternate-theme mat-header-row, .alternate-theme mat-row, .alternate-theme mat-footer-row,\n.alternate-theme [mat-header-row], .alternate-theme [mat-row], .alternate-theme [mat-footer-row],\n.alternate-theme .mat-table-sticky {\n  background: inherit; }\n.alternate-theme mat-row, .alternate-theme mat-header-row, .alternate-theme mat-footer-row,\n.alternate-theme th.mat-header-cell, .alternate-theme td.mat-cell, .alternate-theme td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-cell, .alternate-theme .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-datepicker-toggle,\n.alternate-theme .mat-datepicker-content .mat-calendar-next-button,\n.alternate-theme .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.alternate-theme .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.alternate-theme .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.alternate-theme .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.alternate-theme .mat-calendar-body-selected {\n  background-color: #fffde7;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(255, 253, 231, 0.4); }\n.alternate-theme .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ffee58;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(255, 238, 88, 0.4); }\n.alternate-theme .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #f44336;\n    color: white; }\n.alternate-theme .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(244, 67, 54, 0.4); }\n.alternate-theme .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.alternate-theme .mat-datepicker-toggle-active {\n  color: #fffde7; }\n.alternate-theme .mat-datepicker-toggle-active.mat-accent {\n    color: #ffee58; }\n.alternate-theme .mat-datepicker-toggle-active.mat-warn {\n    color: #f44336; }\n.alternate-theme .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .alternate-theme .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .alternate-theme .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .alternate-theme .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.alternate-theme .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-expansion-panel-header-description,\n.alternate-theme .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .alternate-theme .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.alternate-theme .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.alternate-theme .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-label {\n  color: #fffde7; }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ffee58; }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #f44336; }\n.alternate-theme .mat-focused .mat-form-field-required-marker {\n  color: #ffee58; }\n.alternate-theme .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #fffde7; }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ffee58; }\n.alternate-theme .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #f44336; }\n.alternate-theme .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #f44336; }\n.alternate-theme .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .alternate-theme .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #f44336; }\n.alternate-theme .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.alternate-theme .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #f44336; }\n.alternate-theme .mat-error {\n  color: #f44336; }\n.alternate-theme .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.alternate-theme .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.alternate-theme .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.alternate-theme .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.alternate-theme .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #fffde7; }\n.alternate-theme .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ffee58; }\n.alternate-theme .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #f44336; }\n.alternate-theme .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #f44336; }\n.alternate-theme .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.alternate-theme .mat-icon.mat-primary {\n  color: #fffde7; }\n.alternate-theme .mat-icon.mat-accent {\n  color: #ffee58; }\n.alternate-theme .mat-icon.mat-warn {\n  color: #f44336; }\n.alternate-theme .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-input-element {\n  caret-color: #fffde7; }\n.alternate-theme .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-accent .mat-input-element {\n  caret-color: #ffee58; }\n.alternate-theme .mat-warn .mat-input-element,\n.alternate-theme .mat-form-field-invalid .mat-input-element {\n  caret-color: #f44336; }\n.alternate-theme .mat-list .mat-list-item, .alternate-theme .mat-nav-list .mat-list-item, .alternate-theme .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-list .mat-list-option, .alternate-theme .mat-nav-list .mat-list-option, .alternate-theme .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-list .mat-subheader, .alternate-theme .mat-nav-list .mat-subheader, .alternate-theme .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.alternate-theme .mat-list-option:hover, .alternate-theme .mat-list-option.mat-list-item-focus,\n.alternate-theme .mat-nav-list .mat-list-item:hover,\n.alternate-theme .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-menu-panel {\n  background: white; }\n.alternate-theme .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-menu-item[disabled], .alternate-theme .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-menu-item .mat-icon:not([color]),\n.alternate-theme .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-menu-item:hover:not([disabled]),\n.alternate-theme .mat-menu-item.cdk-program-focused:not([disabled]),\n.alternate-theme .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.alternate-theme .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-paginator {\n  background: white; }\n.alternate-theme .mat-paginator,\n.alternate-theme .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-paginator-decrement,\n.alternate-theme .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-paginator-first,\n.alternate-theme .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-icon-button[disabled] .mat-paginator-decrement,\n.alternate-theme .mat-icon-button[disabled] .mat-paginator-increment,\n.alternate-theme .mat-icon-button[disabled] .mat-paginator-first,\n.alternate-theme .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-progress-bar-background {\n  fill: #fff9c4; }\n.alternate-theme .mat-progress-bar-buffer {\n  background-color: #fff9c4; }\n.alternate-theme .mat-progress-bar-fill::after {\n  background-color: #fffde7; }\n.alternate-theme .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #fff9c4; }\n.alternate-theme .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #fff9c4; }\n.alternate-theme .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ffee58; }\n.alternate-theme .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.alternate-theme .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.alternate-theme .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #f44336; }\n.alternate-theme .mat-progress-spinner circle, .alternate-theme .mat-spinner circle {\n  stroke: #fffde7; }\n.alternate-theme .mat-progress-spinner.mat-accent circle, .alternate-theme .mat-spinner.mat-accent circle {\n  stroke: #ffee58; }\n.alternate-theme .mat-progress-spinner.mat-warn circle, .alternate-theme .mat-spinner.mat-warn circle {\n  stroke: #f44336; }\n.alternate-theme .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #fffde7; }\n.alternate-theme .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #fffde7; }\n.alternate-theme .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 253, 231, 0.26); }\n.alternate-theme .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ffee58; }\n.alternate-theme .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ffee58; }\n.alternate-theme .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.26); }\n.alternate-theme .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #f44336; }\n.alternate-theme .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #f44336; }\n.alternate-theme .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.alternate-theme .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.alternate-theme .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.alternate-theme .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-select-content, .alternate-theme .mat-select-panel-done-animating {\n  background: white; }\n.alternate-theme .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.alternate-theme .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #fffde7; }\n.alternate-theme .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ffee58; }\n.alternate-theme .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #f44336; }\n.alternate-theme .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #f44336; }\n.alternate-theme .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.alternate-theme .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.alternate-theme .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ffeb3b; }\n.alternate-theme .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 235, 59, 0.5); }\n.alternate-theme .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 235, 59, 0.12); }\n.alternate-theme .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ffeb3b; }\n.alternate-theme .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 235, 59, 0.5); }\n.alternate-theme .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 235, 59, 0.12); }\n.alternate-theme .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.alternate-theme .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.alternate-theme .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.alternate-theme .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.alternate-theme .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.alternate-theme .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-primary .mat-slider-track-fill,\n.alternate-theme .mat-primary .mat-slider-thumb,\n.alternate-theme .mat-primary .mat-slider-thumb-label {\n  background-color: #fffde7; }\n.alternate-theme .mat-primary .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-accent .mat-slider-track-fill,\n.alternate-theme .mat-accent .mat-slider-thumb,\n.alternate-theme .mat-accent .mat-slider-thumb-label {\n  background-color: #ffee58; }\n.alternate-theme .mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-warn .mat-slider-track-fill,\n.alternate-theme .mat-warn .mat-slider-thumb,\n.alternate-theme .mat-warn .mat-slider-thumb-label {\n  background-color: #f44336; }\n.alternate-theme .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.alternate-theme .mat-slider-focus-ring {\n  background-color: rgba(255, 238, 88, 0.2); }\n.alternate-theme .mat-slider:hover .mat-slider-track-background,\n.alternate-theme .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-slider-disabled .mat-slider-track-background,\n.alternate-theme .mat-slider-disabled .mat-slider-track-fill,\n.alternate-theme .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.alternate-theme .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.alternate-theme .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.alternate-theme .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .alternate-theme .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .alternate-theme .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.alternate-theme .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.alternate-theme .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.alternate-theme .mat-step-header.cdk-keyboard-focused, .alternate-theme .mat-step-header.cdk-program-focused, .alternate-theme .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme .mat-step-header .mat-step-label,\n.alternate-theme .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-step-header .mat-step-icon {\n  background-color: #fffde7;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-stepper-horizontal, .alternate-theme .mat-stepper-vertical {\n  background-color: white; }\n.alternate-theme .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-sort-header-arrow {\n  color: #757575; }\n.alternate-theme .mat-tab-nav-bar,\n.alternate-theme .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.alternate-theme .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.alternate-theme .mat-tab-label, .alternate-theme .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.alternate-theme .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.alternate-theme .mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme .mat-tab-group.mat-primary .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #fffde7; }\n.alternate-theme .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme .mat-tab-group.mat-accent .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ffee58; }\n.alternate-theme .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.alternate-theme .mat-tab-group.mat-warn .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #f44336; }\n.alternate-theme .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .alternate-theme .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-header, .alternate-theme .mat-tab-group.mat-background-primary .mat-tab-links, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #fffde7; }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-label, .alternate-theme .mat-tab-group.mat-background-primary .mat-tab-link, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-primary .mat-ripple-element, .alternate-theme .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-header, .alternate-theme .mat-tab-group.mat-background-accent .mat-tab-links, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ffee58; }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-label, .alternate-theme .mat-tab-group.mat-background-accent .mat-tab-link, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-accent .mat-ripple-element, .alternate-theme .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-header, .alternate-theme .mat-tab-group.mat-background-warn .mat-tab-links, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #f44336; }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-label, .alternate-theme .mat-tab-group.mat-background-warn .mat-tab-link, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.alternate-theme .mat-tab-group.mat-background-warn .mat-ripple-element, .alternate-theme .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.alternate-theme .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-toolbar.mat-primary {\n    background: #fffde7;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-toolbar.mat-accent {\n    background: #ffee58;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-toolbar.mat-warn {\n    background: #f44336;\n    color: white; }\n.alternate-theme .mat-toolbar .mat-form-field-underline,\n  .alternate-theme .mat-toolbar .mat-form-field-ripple,\n  .alternate-theme .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.alternate-theme .mat-toolbar .mat-form-field-label,\n  .alternate-theme .mat-toolbar .mat-focused .mat-form-field-label,\n  .alternate-theme .mat-toolbar .mat-select-value,\n  .alternate-theme .mat-toolbar .mat-select-arrow,\n  .alternate-theme .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.alternate-theme .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.alternate-theme .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.alternate-theme .mat-tree {\n  background: white; }\n.alternate-theme .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.alternate-theme .mat-simple-snackbar-action {\n  color: #ffee58; }\n.alternate-theme2 .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme2 .mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-option:hover:not(.mat-option-disabled), .alternate-theme2 .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ffee58; }\n.alternate-theme2 .mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #f44336; }\n.alternate-theme2 .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.alternate-theme2 .mat-pseudo-checkbox-checked,\n.alternate-theme2 .mat-pseudo-checkbox-indeterminate,\n.alternate-theme2 .mat-accent .mat-pseudo-checkbox-checked,\n.alternate-theme2 .mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ffee58; }\n.alternate-theme2 .mat-primary .mat-pseudo-checkbox-checked,\n.alternate-theme2 .mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #bdbdbd; }\n.alternate-theme2 .mat-warn .mat-pseudo-checkbox-checked,\n.alternate-theme2 .mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #f44336; }\n.alternate-theme2 .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.alternate-theme2 .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.alternate-theme2 .mat-app-background, .alternate-theme2.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.alternate-theme2 .mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.alternate-theme2 .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-badge-content {\n  color: rgba(0, 0, 0, 0.87);\n  background: #bdbdbd; }\n.alternate-theme2 .mat-badge-accent .mat-badge-content {\n  background: #ffee58;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #f44336; }\n.alternate-theme2 .mat-badge {\n  position: relative; }\n.alternate-theme2 .mat-badge-hidden .mat-badge-content {\n  display: none; }\n.alternate-theme2 .mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.alternate-theme2 .mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.alternate-theme2 .mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme2 .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme2 .mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.alternate-theme2 .mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.alternate-theme2 .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.alternate-theme2 .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.alternate-theme2 .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.alternate-theme2 .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.alternate-theme2 .mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme2 .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme2 .mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.alternate-theme2 .mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.alternate-theme2 .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.alternate-theme2 .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.alternate-theme2 .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.alternate-theme2 .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.alternate-theme2 .mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .alternate-theme2 .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.alternate-theme2 .mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.alternate-theme2 .mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.alternate-theme2 .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.alternate-theme2 .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.alternate-theme2 .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.alternate-theme2 .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .alternate-theme2 .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.alternate-theme2 .mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-button, .alternate-theme2 .mat-icon-button, .alternate-theme2 .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.alternate-theme2 .mat-button.mat-primary, .alternate-theme2 .mat-icon-button.mat-primary, .alternate-theme2 .mat-stroked-button.mat-primary {\n    color: #bdbdbd; }\n.alternate-theme2 .mat-button.mat-accent, .alternate-theme2 .mat-icon-button.mat-accent, .alternate-theme2 .mat-stroked-button.mat-accent {\n    color: #ffee58; }\n.alternate-theme2 .mat-button.mat-warn, .alternate-theme2 .mat-icon-button.mat-warn, .alternate-theme2 .mat-stroked-button.mat-warn {\n    color: #f44336; }\n.alternate-theme2 .mat-button.mat-primary[disabled], .alternate-theme2 .mat-button.mat-accent[disabled], .alternate-theme2 .mat-button.mat-warn[disabled], .alternate-theme2 .mat-button[disabled][disabled], .alternate-theme2 .mat-icon-button.mat-primary[disabled], .alternate-theme2 .mat-icon-button.mat-accent[disabled], .alternate-theme2 .mat-icon-button.mat-warn[disabled], .alternate-theme2 .mat-icon-button[disabled][disabled], .alternate-theme2 .mat-stroked-button.mat-primary[disabled], .alternate-theme2 .mat-stroked-button.mat-accent[disabled], .alternate-theme2 .mat-stroked-button.mat-warn[disabled], .alternate-theme2 .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-button.mat-primary .mat-button-focus-overlay, .alternate-theme2 .mat-icon-button.mat-primary .mat-button-focus-overlay, .alternate-theme2 .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(189, 189, 189, 0.12); }\n.alternate-theme2 .mat-button.mat-accent .mat-button-focus-overlay, .alternate-theme2 .mat-icon-button.mat-accent .mat-button-focus-overlay, .alternate-theme2 .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(255, 238, 88, 0.12); }\n.alternate-theme2 .mat-button.mat-warn .mat-button-focus-overlay, .alternate-theme2 .mat-icon-button.mat-warn .mat-button-focus-overlay, .alternate-theme2 .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(244, 67, 54, 0.12); }\n.alternate-theme2 .mat-button[disabled] .mat-button-focus-overlay, .alternate-theme2 .mat-icon-button[disabled] .mat-button-focus-overlay, .alternate-theme2 .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.alternate-theme2 .mat-button.mat-primary .mat-ripple-element, .alternate-theme2 .mat-icon-button.mat-primary .mat-ripple-element, .alternate-theme2 .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(189, 189, 189, 0.1); }\n.alternate-theme2 .mat-button.mat-accent .mat-ripple-element, .alternate-theme2 .mat-icon-button.mat-accent .mat-ripple-element, .alternate-theme2 .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(255, 238, 88, 0.1); }\n.alternate-theme2 .mat-button.mat-warn .mat-ripple-element, .alternate-theme2 .mat-icon-button.mat-warn .mat-ripple-element, .alternate-theme2 .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(244, 67, 54, 0.1); }\n.alternate-theme2 .mat-flat-button, .alternate-theme2 .mat-raised-button, .alternate-theme2 .mat-fab, .alternate-theme2 .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.alternate-theme2 .mat-flat-button.mat-primary, .alternate-theme2 .mat-raised-button.mat-primary, .alternate-theme2 .mat-fab.mat-primary, .alternate-theme2 .mat-mini-fab.mat-primary {\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-flat-button.mat-accent, .alternate-theme2 .mat-raised-button.mat-accent, .alternate-theme2 .mat-fab.mat-accent, .alternate-theme2 .mat-mini-fab.mat-accent {\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-flat-button.mat-warn, .alternate-theme2 .mat-raised-button.mat-warn, .alternate-theme2 .mat-fab.mat-warn, .alternate-theme2 .mat-mini-fab.mat-warn {\n    color: white; }\n.alternate-theme2 .mat-flat-button.mat-primary[disabled], .alternate-theme2 .mat-flat-button.mat-accent[disabled], .alternate-theme2 .mat-flat-button.mat-warn[disabled], .alternate-theme2 .mat-flat-button[disabled][disabled], .alternate-theme2 .mat-raised-button.mat-primary[disabled], .alternate-theme2 .mat-raised-button.mat-accent[disabled], .alternate-theme2 .mat-raised-button.mat-warn[disabled], .alternate-theme2 .mat-raised-button[disabled][disabled], .alternate-theme2 .mat-fab.mat-primary[disabled], .alternate-theme2 .mat-fab.mat-accent[disabled], .alternate-theme2 .mat-fab.mat-warn[disabled], .alternate-theme2 .mat-fab[disabled][disabled], .alternate-theme2 .mat-mini-fab.mat-primary[disabled], .alternate-theme2 .mat-mini-fab.mat-accent[disabled], .alternate-theme2 .mat-mini-fab.mat-warn[disabled], .alternate-theme2 .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-flat-button.mat-primary, .alternate-theme2 .mat-raised-button.mat-primary, .alternate-theme2 .mat-fab.mat-primary, .alternate-theme2 .mat-mini-fab.mat-primary {\n    background-color: #bdbdbd; }\n.alternate-theme2 .mat-flat-button.mat-accent, .alternate-theme2 .mat-raised-button.mat-accent, .alternate-theme2 .mat-fab.mat-accent, .alternate-theme2 .mat-mini-fab.mat-accent {\n    background-color: #ffee58; }\n.alternate-theme2 .mat-flat-button.mat-warn, .alternate-theme2 .mat-raised-button.mat-warn, .alternate-theme2 .mat-fab.mat-warn, .alternate-theme2 .mat-mini-fab.mat-warn {\n    background-color: #f44336; }\n.alternate-theme2 .mat-flat-button.mat-primary[disabled], .alternate-theme2 .mat-flat-button.mat-accent[disabled], .alternate-theme2 .mat-flat-button.mat-warn[disabled], .alternate-theme2 .mat-flat-button[disabled][disabled], .alternate-theme2 .mat-raised-button.mat-primary[disabled], .alternate-theme2 .mat-raised-button.mat-accent[disabled], .alternate-theme2 .mat-raised-button.mat-warn[disabled], .alternate-theme2 .mat-raised-button[disabled][disabled], .alternate-theme2 .mat-fab.mat-primary[disabled], .alternate-theme2 .mat-fab.mat-accent[disabled], .alternate-theme2 .mat-fab.mat-warn[disabled], .alternate-theme2 .mat-fab[disabled][disabled], .alternate-theme2 .mat-mini-fab.mat-primary[disabled], .alternate-theme2 .mat-mini-fab.mat-accent[disabled], .alternate-theme2 .mat-mini-fab.mat-warn[disabled], .alternate-theme2 .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-flat-button.mat-primary .mat-ripple-element, .alternate-theme2 .mat-raised-button.mat-primary .mat-ripple-element, .alternate-theme2 .mat-fab.mat-primary .mat-ripple-element, .alternate-theme2 .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme2 .mat-flat-button.mat-accent .mat-ripple-element, .alternate-theme2 .mat-raised-button.mat-accent .mat-ripple-element, .alternate-theme2 .mat-fab.mat-accent .mat-ripple-element, .alternate-theme2 .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme2 .mat-flat-button.mat-warn .mat-ripple-element, .alternate-theme2 .mat-raised-button.mat-warn .mat-ripple-element, .alternate-theme2 .mat-fab.mat-warn .mat-ripple-element, .alternate-theme2 .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.alternate-theme2 .mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(189, 189, 189, 0.2); }\n.alternate-theme2 .mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.2); }\n.alternate-theme2 .mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.2); }\n.alternate-theme2 .mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.alternate-theme2 .mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-checkbox-checkmark {\n  fill: #fafafa; }\n.alternate-theme2 .mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .alternate-theme2 .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.alternate-theme2 .mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.alternate-theme2 .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .alternate-theme2 .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .alternate-theme2 .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .alternate-theme2 .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #f44336; }\n.alternate-theme2 .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .alternate-theme2 .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.alternate-theme2 .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.alternate-theme2 .mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .alternate-theme2 .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .alternate-theme2 .mat-checkbox-background {\n    background: none; } }\n.alternate-theme2 .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(189, 189, 189, 0.26); }\n.alternate-theme2 .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.26); }\n.alternate-theme2 .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.alternate-theme2 .mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme2 .mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #bdbdbd;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #f44336;\n  color: white; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ffee58;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.alternate-theme2 .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.alternate-theme2 .mat-table {\n  background: white; }\n.alternate-theme2 .mat-table thead, .alternate-theme2 .mat-table tbody, .alternate-theme2 .mat-table tfoot,\n.alternate-theme2 mat-header-row, .alternate-theme2 mat-row, .alternate-theme2 mat-footer-row,\n.alternate-theme2 [mat-header-row], .alternate-theme2 [mat-row], .alternate-theme2 [mat-footer-row],\n.alternate-theme2 .mat-table-sticky {\n  background: inherit; }\n.alternate-theme2 mat-row, .alternate-theme2 mat-header-row, .alternate-theme2 mat-footer-row,\n.alternate-theme2 th.mat-header-cell, .alternate-theme2 td.mat-cell, .alternate-theme2 td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-cell, .alternate-theme2 .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-datepicker-toggle,\n.alternate-theme2 .mat-datepicker-content .mat-calendar-next-button,\n.alternate-theme2 .mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.alternate-theme2 .mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.alternate-theme2 .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.alternate-theme2 .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.alternate-theme2 .mat-calendar-body-selected {\n  background-color: #bdbdbd;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(189, 189, 189, 0.4); }\n.alternate-theme2 .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #ffee58;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(255, 238, 88, 0.4); }\n.alternate-theme2 .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #f44336;\n    color: white; }\n.alternate-theme2 .mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(244, 67, 54, 0.4); }\n.alternate-theme2 .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.alternate-theme2 .mat-datepicker-toggle-active {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-datepicker-toggle-active.mat-accent {\n    color: #ffee58; }\n.alternate-theme2 .mat-datepicker-toggle-active.mat-warn {\n    color: #f44336; }\n.alternate-theme2 .mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .alternate-theme2 .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .alternate-theme2 .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n@media (hover: none) {\n  .alternate-theme2 .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true'])\n.mat-expansion-panel-header:hover {\n    background: white; } }\n.alternate-theme2 .mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-expansion-panel-header-description,\n.alternate-theme2 .mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .alternate-theme2 .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.alternate-theme2 .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.alternate-theme2 .mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-label {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #ffee58; }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #f44336; }\n.alternate-theme2 .mat-focused .mat-form-field-required-marker {\n  color: #ffee58; }\n.alternate-theme2 .mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #ffee58; }\n.alternate-theme2 .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #f44336; }\n.alternate-theme2 .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .alternate-theme2 .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #f44336; }\n.alternate-theme2 .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.alternate-theme2 .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #f44336; }\n.alternate-theme2 .mat-error {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.alternate-theme2 .mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.alternate-theme2 .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.alternate-theme2 .mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.alternate-theme2 .mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ffee58; }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.alternate-theme2 .mat-icon.mat-primary {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-icon.mat-accent {\n  color: #ffee58; }\n.alternate-theme2 .mat-icon.mat-warn {\n  color: #f44336; }\n.alternate-theme2 .mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-input-element {\n  caret-color: #bdbdbd; }\n.alternate-theme2 .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-accent .mat-input-element {\n  caret-color: #ffee58; }\n.alternate-theme2 .mat-warn .mat-input-element,\n.alternate-theme2 .mat-form-field-invalid .mat-input-element {\n  caret-color: #f44336; }\n.alternate-theme2 .mat-list .mat-list-item, .alternate-theme2 .mat-nav-list .mat-list-item, .alternate-theme2 .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-list .mat-list-option, .alternate-theme2 .mat-nav-list .mat-list-option, .alternate-theme2 .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-list .mat-subheader, .alternate-theme2 .mat-nav-list .mat-subheader, .alternate-theme2 .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-list-item-disabled {\n  background-color: #eeeeee; }\n.alternate-theme2 .mat-list-option:hover, .alternate-theme2 .mat-list-option.mat-list-item-focus,\n.alternate-theme2 .mat-nav-list .mat-list-item:hover,\n.alternate-theme2 .mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-menu-panel {\n  background: white; }\n.alternate-theme2 .mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-menu-item[disabled], .alternate-theme2 .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-menu-item .mat-icon:not([color]),\n.alternate-theme2 .mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-menu-item:hover:not([disabled]),\n.alternate-theme2 .mat-menu-item.cdk-program-focused:not([disabled]),\n.alternate-theme2 .mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.alternate-theme2 .mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-paginator {\n  background: white; }\n.alternate-theme2 .mat-paginator,\n.alternate-theme2 .mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-paginator-decrement,\n.alternate-theme2 .mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-paginator-first,\n.alternate-theme2 .mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-icon-button[disabled] .mat-paginator-decrement,\n.alternate-theme2 .mat-icon-button[disabled] .mat-paginator-increment,\n.alternate-theme2 .mat-icon-button[disabled] .mat-paginator-first,\n.alternate-theme2 .mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-progress-bar-background {\n  fill: whitesmoke; }\n.alternate-theme2 .mat-progress-bar-buffer {\n  background-color: whitesmoke; }\n.alternate-theme2 .mat-progress-bar-fill::after {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #fff9c4; }\n.alternate-theme2 .mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #fff9c4; }\n.alternate-theme2 .mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.alternate-theme2 .mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.alternate-theme2 .mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #f44336; }\n.alternate-theme2 .mat-progress-spinner circle, .alternate-theme2 .mat-spinner circle {\n  stroke: #bdbdbd; }\n.alternate-theme2 .mat-progress-spinner.mat-accent circle, .alternate-theme2 .mat-spinner.mat-accent circle {\n  stroke: #ffee58; }\n.alternate-theme2 .mat-progress-spinner.mat-warn circle, .alternate-theme2 .mat-spinner.mat-warn circle {\n  stroke: #f44336; }\n.alternate-theme2 .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #bdbdbd; }\n.alternate-theme2 .mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(189, 189, 189, 0.26); }\n.alternate-theme2 .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ffee58; }\n.alternate-theme2 .mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(255, 238, 88, 0.26); }\n.alternate-theme2 .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #f44336; }\n.alternate-theme2 .mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #f44336; }\n.alternate-theme2 .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.26); }\n.alternate-theme2 .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.alternate-theme2 .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.alternate-theme2 .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-select-content, .alternate-theme2 .mat-select-panel-done-animating {\n  background: white; }\n.alternate-theme2 .mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.alternate-theme2 .mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.alternate-theme2 .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #bdbdbd; }\n.alternate-theme2 .mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ffee58; }\n.alternate-theme2 .mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #f44336; }\n.alternate-theme2 .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-drawer.mat-drawer-push {\n    background-color: white; }\n.alternate-theme2 .mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.alternate-theme2 .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ffeb3b; }\n.alternate-theme2 .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 235, 59, 0.5); }\n.alternate-theme2 .mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme2 .mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 235, 59, 0.12); }\n.alternate-theme2 .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #9e9e9e; }\n.alternate-theme2 .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(158, 158, 158, 0.5); }\n.alternate-theme2 .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme2 .mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(158, 158, 158, 0.12); }\n.alternate-theme2 .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.alternate-theme2 .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.alternate-theme2 .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.alternate-theme2 .mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.alternate-theme2 .mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.alternate-theme2 .mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.alternate-theme2 .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-primary .mat-slider-track-fill,\n.alternate-theme2 .mat-primary .mat-slider-thumb,\n.alternate-theme2 .mat-primary .mat-slider-thumb-label {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-primary .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-accent .mat-slider-track-fill,\n.alternate-theme2 .mat-accent .mat-slider-thumb,\n.alternate-theme2 .mat-accent .mat-slider-thumb-label {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-warn .mat-slider-track-fill,\n.alternate-theme2 .mat-warn .mat-slider-thumb,\n.alternate-theme2 .mat-warn .mat-slider-thumb-label {\n  background-color: #f44336; }\n.alternate-theme2 .mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.alternate-theme2 .mat-slider-focus-ring {\n  background-color: rgba(255, 238, 88, 0.2); }\n.alternate-theme2 .mat-slider:hover .mat-slider-track-background,\n.alternate-theme2 .cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-slider-disabled .mat-slider-track-background,\n.alternate-theme2 .mat-slider-disabled .mat-slider-track-fill,\n.alternate-theme2 .mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.alternate-theme2 .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.alternate-theme2 .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.alternate-theme2 .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .alternate-theme2 .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .alternate-theme2 .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.alternate-theme2 .mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.alternate-theme2 .mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.alternate-theme2 .mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.alternate-theme2 .mat-step-header.cdk-keyboard-focused, .alternate-theme2 .mat-step-header.cdk-program-focused, .alternate-theme2 .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.alternate-theme2 .mat-step-header .mat-step-label,\n.alternate-theme2 .mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-step-header .mat-step-icon {\n  background-color: #bdbdbd;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-stepper-horizontal, .alternate-theme2 .mat-stepper-vertical {\n  background-color: white; }\n.alternate-theme2 .mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-sort-header-arrow {\n  color: #757575; }\n.alternate-theme2 .mat-tab-nav-bar,\n.alternate-theme2 .mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-tab-group-inverted-header .mat-tab-nav-bar,\n.alternate-theme2 .mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.alternate-theme2 .mat-tab-label, .alternate-theme2 .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.alternate-theme2 .mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.alternate-theme2 .mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.alternate-theme2 .mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(245, 245, 245, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-primary .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-accent .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-warn .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #f44336; }\n.alternate-theme2 .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .alternate-theme2 .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(245, 245, 245, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-header, .alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-links, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #bdbdbd; }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-label, .alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-link, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-primary .mat-ripple-element, .alternate-theme2 .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 249, 196, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-header, .alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-links, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #ffee58; }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-label, .alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-link, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-accent .mat-ripple-element, .alternate-theme2 .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3); }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-header, .alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-links, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #f44336; }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-label, .alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-link, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.alternate-theme2 .mat-tab-group.mat-background-warn .mat-ripple-element, .alternate-theme2 .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.alternate-theme2 .mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-toolbar.mat-primary {\n    background: #bdbdbd;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-toolbar.mat-accent {\n    background: #ffee58;\n    color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-toolbar.mat-warn {\n    background: #f44336;\n    color: white; }\n.alternate-theme2 .mat-toolbar .mat-form-field-underline,\n  .alternate-theme2 .mat-toolbar .mat-form-field-ripple,\n  .alternate-theme2 .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.alternate-theme2 .mat-toolbar .mat-form-field-label,\n  .alternate-theme2 .mat-toolbar .mat-focused .mat-form-field-label,\n  .alternate-theme2 .mat-toolbar .mat-select-value,\n  .alternate-theme2 .mat-toolbar .mat-select-arrow,\n  .alternate-theme2 .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.alternate-theme2 .mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.alternate-theme2 .mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.alternate-theme2 .mat-tree {\n  background: white; }\n.alternate-theme2 .mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.alternate-theme2 .mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.alternate-theme2 .mat-simple-snackbar-action {\n  color: #ffee58; }\n/*\r\n@mixin angular-material-theme($alternate-theme) {\r\n  @include mat-core-theme($alternate-theme);\r\n  @include mat-autocomplete-theme($alternate-theme);\r\n  @include mat-button-theme($alternate-theme);\r\n  @include mat-button-toggle-theme($alternate-theme);\r\n  @include mat-card-theme($alternate-theme);\r\n  @include mat-checkbox-theme($alternate-theme);\r\n  @include mat-chips-theme($alternate-theme);\r\n  @include mat-datepicker-theme($alternate-theme);\r\n  @include mat-dialog-theme($alternate-theme);\r\n  @include mat-grid-list-theme($alternate-theme);\r\n  @include mat-icon-theme($alternate-theme);\r\n  @include mat-input-theme($alternate-theme);\r\n  @include mat-list-theme($alternate-theme);\r\n  @include mat-menu-theme($alternate-theme);\r\n  @include mat-progress-bar-theme($alternate-theme);\r\n  @include mat-progress-spinner-theme($alternate-theme);\r\n  @include mat-radio-theme($alternate-theme);\r\n  @include mat-select-theme($alternate-theme);\r\n  @include mat-sidenav-theme($alternate-theme);\r\n  @include mat-slide-toggle-theme($alternate-theme);\r\n  @include mat-slider-theme($alternate-theme);\r\n  @include mat-tabs-theme($alternate-theme);\r\n  @include mat-toolbar-theme($alternate-theme);\r\n  @include mat-tooltip-theme($alternate-theme);\r\n}\r\n*/\n/*\r\n\r\n@import '~@angular/material/theming';\r\n@import './app';\r\n@import \"./app/app.component.scss\";\r\n@include mat-core();\r\n\r\n$app-primary: mat-palette($mat-gray, 50);\r\n$app-accent: mat-palette($mat-orange, A200, A100, A400);\r\n$app-warn: mat-palette($mat-red);\r\n$app: mat-light-theme($app-primary, $app-accent, $app-warn);\r\n\r\n\r\n\r\n\r\n\r\nGenerate core styles - These are theme independent styles, including styles for elevation levels, ripple effects, styles for accessibility and overlays\r\nPrimary color palette - Generate color palette for the theme’s primary color\r\nAccent color palette - Generate color palette for the theme’s accent color\r\nWarn color palette - Generate color palette for the theme’s warn color\r\nTheme generation - Given the color palettes we generated, we create a theme, which can be used by Angular Material, or custom components\r\n\r\n\r\n@mixin app($theme) {\r\n  @include ml-file-tree-theme(theme);\r\n}\r\n\r\n@include angular-material-theme($app);\r\n@include app($app);\r\n\r\n/* Palette generated by Material Palette - materialpalette.com/blue-grey/grey */\n/*\r\n@mixin angular-material-theme($app-theme) {\r\n  @include mat-core-theme($app-theme);\r\n  @include mat-autocomplete-theme($app-theme);\r\n  @include mat-button-theme($app-theme);\r\n  @include mat-button-toggle-theme($app-theme);\r\n  @include mat-card-theme($app-theme);\r\n  @include mat-checkbox-theme($app-theme);\r\n  @include mat-chips-theme($app-theme);\r\n  @include mat-datepicker-theme($app-theme);\r\n  @include mat-dialog-theme($app-theme);\r\n  @include mat-grid-list-theme($app-theme);\r\n  @include mat-icon-theme($app-theme);\r\n  @include mat-input-theme($app-theme);\r\n  @include mat-list-theme($app-theme);\r\n  @include mat-menu-theme($app-theme);\r\n  @include mat-progress-bar-theme($app-theme);\r\n  @include mat-progress-spinner-theme($app-theme);\r\n  @include mat-radio-theme($app-theme);\r\n  @include mat-select-theme($app-theme);\r\n  @include mat-sidenav-theme($app-theme);\r\n  @include mat-slide-toggle-theme($app-theme);\r\n  @include mat-slider-theme($app-theme);\r\n  @include mat-tabs-theme($app-theme);\r\n  @include mat-toolbar-theme($app-theme);\r\n  @include mat-tooltip-theme($app-theme);\r\n}*/\n/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px; }\nmat-form-field {\n  width: 100%; }\nmat-form-field.mat-form-field {\n  font-size: 12px; }\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold; }\nlabel input {\n    height: 2em;\n    font-size: 1em;\n    padding-left: .4em; }\nlabel button {\n    font-family: Arial;\n    background-color: #eee;\n    border: none;\n    padding: 5px 10px;\n    border-radius: 4px;\n    cursor: pointer; }\nlabel button:hover {\n    background-color: #cfd8dc; }\nlabel button:disabled {\n    background-color: #eee;\n    color: #ccc;\n    cursor: auto; }\n.login-center {\n  width: 75%;\n  margin: 10px auto; }\n.login-main-div {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n.mat-sidenav {\n  width: 360px;\n  background-color: #212121 !important; }\n.mat-sidenav-container {\n  background-color: #ECEFF1 !important;\n  height: 100vh; }\n.mat-nav-list {\n  padding-top: 500;\n  background-color: \"black\" !important;\n  color: \"black\"; }\n@media (max-width: 600px) {\n  .fixed-topnav {\n    color: #ECEFF1;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 2;\n    width: 100% !important; }\n  .mat-drawer-container {\n    margin-top: 56px;\n    color: black; } }\nmodal {\n  /* modals are hidden by default */\n  display: none; }\nmodal .modal {\n    /* modal container fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* z-index must be higher than .modal-background */\n    z-index: 1000;\n    /* enables scrolling for tall modals */\n    overflow: auto; }\nmodal .modal .modal-body {\n      padding: 20px;\n      background: #fff;\n      /* margin exposes part of the modal background */\n      margin: 40px; }\nmodal .modal-background {\n    /* modal background fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* semi-transparent black  */\n    background-color: #000;\n    opacity: 0.75;\n    /* z-index must be below .modal and above everything else  */\n    z-index: 900; }\nbody.modal-open {\n  /* body overflow is hidden to hide main scrollbar when modal window is open */\n  overflow: hidden; }\n/*\r\n\r\n$my-app-primary: mat-palette($mat-gray, 800);\r\n$my-app-accent: mat-palette($mat-orange, A200, A100, A400);\r\n$my-app-warn: mat-palette($mat-red);\r\n\r\n$my-app-theme: mat-dark-theme($my-app-primary, $my-app-accent, $my-app-warn);\r\n\r\n\r\n@include angular-material-theme($my-app-theme);\r\n\r\n.alternate-theme {\r\n  $alternate-primary: mat-palette($mat-yellow, 50);\r\n  $alternate-accent:  mat-palette($mat-yellow, 400);\r\n  $alternate-theme: mat-light-theme($alternate-primary, $alternate-accent);\r\n  @include angular-material-theme($alternate-theme);\r\n}\r\n*/\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nav.service */ "./src/app/nav.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import {Meta, Title} from '@angular/platform-browser';
//import {NavigationEnd, Router} from '@angular/router';
//import {AppConfig} from './config/app.config';
//import {MatSnackBar} from '@angular/material';


//declare const Modernizr;
var AppComponent = /** @class */ (function () {
    function AppComponent(//private title: Title,
    //private meta: Meta,
    //private snackBar: MatSnackBar,
    //private router: Router,
    navService) {
        this.navService = navService;
        this.version = _angular_material__WEBPACK_IMPORTED_MODULE_1__["VERSION"];
        this.navItems = [
            {
                displayName: 'Home',
                iconName: 'home',
                class: 'primary-accent',
                route: 'home'
            },
            {
                displayName: 'Customers',
                iconName: 'my_customer',
                class: 'primary-accent',
                children: [
                    {
                        displayName: 'Add Customer',
                        iconName: 'add',
                        route: 'customer-add',
                    },
                    {
                        displayName: 'View Customers',
                        iconName: 'view',
                        route: 'customer-table',
                    },
                ]
            },
            {
                displayName: 'Factories',
                iconName: '',
                children: [
                    {
                        displayName: 'Add Factory',
                        iconName: 'add',
                        route: 'factory-create',
                    },
                    {
                        displayName: 'View Factories',
                        iconName: 'view',
                        route: 'factory-table',
                    },
                    {
                        displayName: 'Factory Contact Book',
                        iconName: 'person',
                        route: 'factory-contact',
                    },
                ]
            },
            {
                displayName: 'Orders',
                iconName: 'my_customer',
                children: [
                    {
                        displayName: 'Add Order',
                        iconName: 'add',
                        route: 'order-add',
                    },
                    {
                        displayName: 'View Orders',
                        iconName: 'view',
                        route: 'order-table',
                    },
                    {
                        displayName: 'Upload Image',
                        iconName: 'upload',
                        route: 'order-image-upload',
                    },
                    {
                        displayName: 'Add New Order',
                        iconName: 'add',
                        route: 'order-add',
                    },
                    {
                        displayName: 'Order Task',
                        iconName: 'add',
                        route: 'order-task',
                    },
                ]
            },
            {
                displayName: 'Tasks',
                iconName: '',
                children: [
                    {
                        displayName: 'Add Todos New',
                        iconName: 'add',
                        route: 'task',
                    },
                ]
            },
            {
                displayName: 'Add Task Group',
                iconName: 'add',
                route: 'add-task-group',
            },
            {
                displayName: 'Work Space',
                iconName: 'add',
                route: 'jp-task-forms-component',
            }
        ];
        this.isOnline = navigator.onLine;
    }
    /*
    ngOnInit() {
      this.title.setTitle('Front End On Init');
       this.router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {
           switch (event.urlAfterRedirects) {
             case '/':
               this.meta.updateTag({
                 name: 'description',
                 content: 'Angular Example app with Angular CLI, Angular Material and more'
               });
               break;
             case '/' + AppConfig.routes.customer:
               this.title.setTitle('Customer list');
               this.meta.updateTag({
                 name: 'description',
                 content: 'List of Customers'
               });
               break;
           }
         }
       });
       this.checkBrowserFeatures();
     }
     checkBrowserFeatures() {
        let supported = true;
        for (const feature in Modernizr) {
          if (Modernizr.hasOwnProperty(feature) &&
            typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
            supported = false;
            break;
          }
        }
        if (!supported) {
            this.snackBar.open('updateBrowser', 'OK');
        }
    
        return supported;
      }*/
    AppComponent.prototype.ngAfterViewInit = function () {
        this.navService.appDrawer = this.appDrawer;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('appDrawer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AppComponent.prototype, "appDrawer", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_nav_service__WEBPACK_IMPORTED_MODULE_2__["NavService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _pages_pages_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/pages.module */ "./src/app/pages/pages.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nav.service */ "./src/app/nav.service.ts");
/* harmony import */ var _modules_customers_customers_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/customers/customers.module */ "./src/app/modules/customers/customers.module.ts");
/* harmony import */ var _pages_helpers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/_helpers */ "./src/app/pages/_helpers/index.ts");
/* harmony import */ var _modules_dynamicform_dynamicform_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/dynamicform/dynamicform.module */ "./src/app/modules/dynamicform/dynamicform.module.ts");
/* harmony import */ var _forms_jp_forms_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./forms/jp-forms.module */ "./src/app/forms/jp-forms.module.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_pipes/datetime.pipe */ "./src/app/_pipes/datetime.pipe.ts");
/* harmony import */ var _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./invoice/invoice.component */ "./src/app/invoice/invoice.component.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_services/message.service */ "./src/app/_services/message.service.ts");
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_services/post.service */ "./src/app/_services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
                _pages_pages_module__WEBPACK_IMPORTED_MODULE_9__["PagesModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__["FlexLayoutModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                _modules_customers_customers_module__WEBPACK_IMPORTED_MODULE_13__["CustomersModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _modules_dynamicform_dynamicform_module__WEBPACK_IMPORTED_MODULE_15__["DynamicformModule"],
                _forms_jp_forms_module__WEBPACK_IMPORTED_MODULE_16__["JpFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatButtonModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_18__["LayoutModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_19__["DatetimeFormat"],
                _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_19__["DateFormat"],
                _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_20__["InvoiceComponent"],
            ],
            exports: [],
            providers: [
                { provide: _config_app_config__WEBPACK_IMPORTED_MODULE_4__["APP_CONFIG"], useValue: _config_app_config__WEBPACK_IMPORTED_MODULE_4__["AppConfig"] },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"], useClass: _pages_helpers__WEBPACK_IMPORTED_MODULE_14__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"], useClass: _pages_helpers__WEBPACK_IMPORTED_MODULE_14__["ErrorInterceptor"], multi: true },
                // {
                //      provide: HTTP_INTERCEPTORS,
                //      useClass: HttpClientInterceptorService,
                //      multi: true
                //  },
                _nav_service__WEBPACK_IMPORTED_MODULE_12__["NavService"],
                _services_message_service__WEBPACK_IMPORTED_MODULE_21__["MessageService"],
                _services_post_service__WEBPACK_IMPORTED_MODULE_22__["PostService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/config/api.service.ts":
/*!***************************************!*\
  !*** ./src/app/config/api.service.ts ***!
  \***************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pages_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/_services/authentication.service */ "./src/app/pages/_services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json',
        'Authorization': 'JWT' + localStorage.getItem('currentUser')
    })
};
var ApiService = /** @class */ (function () {
    function ApiService(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.API_URL = 'http://127.0.0.1:8000';
        this.token = localStorage.getItem('currentUser');
        this.cred = this.authService.updateData(this.token);
    }
    ApiService.prototype.setHeaders = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        // headers = headers.append('content-type', 'application/json');
        var token = JSON.parse(this.token);
        headers = headers.set('Authorization', "Bearer " + token);
        //console.log(userDetails);
        console.log(headers);
        return headers;
    };
    ApiService.prototype.getCustomers = function () {
        return this.httpClient.get(this.API_URL + "/customer/");
    };
    ApiService.prototype.createCustomer = function (customer) {
        return this.httpClient.post(this.API_URL + "/customer/", customer);
    };
    ApiService.prototype.getCustomerDetail = function (id) {
        return this.httpClient.get(this.API_URL + "/customer/" + id + "/");
    };
    ApiService.prototype.updateCustomer = function (customer, id) {
        return this.httpClient.put(this.API_URL + "/customer/" + id + "/", customer);
    };
    //factories
    ApiService.prototype.factories = function () {
        return this.httpClient.get(this.API_URL + "/factory/");
    };
    ApiService.prototype.getFactoryDetails = function (id) {
        return this.httpClient.get(this.API_URL + "/factory/" + id + "/");
    };
    ApiService.prototype.createFactory = function (factory) {
        return this.httpClient.post(this.API_URL + "/factory/", factory);
    };
    //factory contacts
    ApiService.prototype.updateFactory = function (factory, id) {
        return this.httpClient.put(this.API_URL + "/factory/" + id + "/", factory);
    };
    ApiService.prototype.getFactoryContacts = function () {
        return this.httpClient.get(this.API_URL + "/factory/contacts/");
    };
    ApiService.prototype.updateFactoryContacts = function (id, contact) {
        return this.httpClient.put(this.API_URL + "/factory/contacts/" + id, contact);
    };
    ApiService.prototype.createFactoryContact = function (contact) {
        return this.httpClient.post(this.API_URL + "/factory/contacts/", contact);
    };
    ApiService.prototype.decodeJwt = function () {
        this.cred = this.authService.updateData(this.token);
    };
    //orders
    ApiService.prototype.getOrders = function (ordering) {
        var headers = this.setHeaders();
        this.setHeaders();
        return this.httpClient.get(this.API_URL + "/orders/?ordering=" + ordering, { headers: headers });
    };
    ApiService.prototype.getMyOrders = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //headers = headers.append('content-type', 'application/json');
        headers = headers.append('Authorization', "Bearer " + currentUser.token);
        console.log(headers);
        return this.httpClient.get(this.API_URL + "/orders/", { headers: headers });
    };
    /*
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }*/
    ApiService.prototype.getOrdersDetails = function (id) {
        return this.httpClient.get(this.API_URL + "/orders/" + id);
    };
    ApiService.prototype.createOrder = function (order) {
        return this.httpClient.post(this.API_URL + "/orders/", order);
    };
    ApiService.prototype.uploadSweaterImg = function (id, uploadData) {
        return this.httpClient.post(this.API_URL + "/orders/imgupload/" + id + "/", uploadData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe(function (event) {
            console.log(event);
            // handle event here
        });
    };
    ApiService.prototype.getOrderDetials = function (id) {
        return this.httpClient.get(this.API_URL + "/orders/" + id + "/");
    };
    ApiService.prototype.updateOrder = function (id, order) {
        return this.httpClient.put(this.API_URL + "/orders/" + id, order);
    };
    //tasks
    ApiService.prototype.getTasks = function () {
        return this.httpClient.get(this.API_URL + "/task/");
    };
    ApiService.prototype.getTaskDetail = function (id) {
        return this.httpClient.get(this.API_URL + "/task/" + id, id);
    };
    ApiService.prototype.updateTask = function (id, task) {
        return this.httpClient.put(this.API_URL + "/task/" + id + "/", task);
    };
    ApiService.prototype.createTask = function (task) {
        return this.httpClient.post(this.API_URL + "/task/", task);
    };
    ApiService.prototype.taskOptions = function () {
        return this.httpClient.options(this.API_URL + "/task/").subscribe(function (response) {
            console.log(response);
        });
    };
    ApiService.prototype.getTaskGroups = function () {
        return this.httpClient.get(this.API_URL + "/task/group/");
    };
    ApiService.prototype.addTaskGroups = function (group) {
        return this.httpClient.post(this.API_URL + "/task/group/", group);
    };
    ApiService.prototype.addTaskToOrder = function (task) {
        return this.httpClient.post(this.API_URL + "/orders/tasks/", task);
    };
    ApiService.prototype.updateOrderTask = function (task, id) {
        return this.httpClient.put(this.API_URL + "/orders/tasks/" + id, task);
    };
    ApiService.prototype.getDashBoardTask = function () {
        this.httpClient.get(this.API_URL + "/dashboard/}");
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _pages_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/config/app.config.ts":
/*!**************************************!*\
  !*** ./src/app/config/app.config.ts ***!
  \**************************************/
/*! exports provided: APP_CONFIG, UrlBody, AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_CONFIG", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlBody", function() { return UrlBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var APP_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('app.config');
var UrlBody = {
    params: {
        id: 'id'
    }
};
var AppConfig = {
    routes: {
        // factory: 'factory',
        customer: 'test-customer',
        customerApi: 'customer',
        // orders: 'orders',
        // tasks: 'tasks',
        error404: '404',
    },
    endpoints: {
        url: 'http://127.0.0.1:8000/',
    },
    base: 'http://127.0.0.1:8000/',
    urlOptions: {
        customer: 'customer/',
        factory: 'factory/',
        orders: 'orders/',
        ordersSort: "/orders/?ordering=" + UrlBody.params.id,
        task: "task/",
        taskGroup: "task/group/"
    },
};


/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _modules_customers_customers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! .././modules/customers/customers.service */ "./src/app/modules/customers/customers.service.ts");
/* harmony import */ var _module_import_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module-import-guard */ "./src/app/core/module-import-guard.ts");
/* harmony import */ var _services_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/core/pages/home/home.component.ts");
/* harmony import */ var _pages_error404_error404_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/error404/error404.component */ "./src/app/core/pages/error404/error404.component.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _nav_menu_list_item_menu_list_item_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nav/menu-list-item/menu-list-item.component */ "./src/app/core/nav/menu-list-item/menu-list-item.component.ts");
/* harmony import */ var _nav_top_nav_top_nav_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nav/top-nav/top-nav.component */ "./src/app/core/nav/top-nav/top-nav.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};















var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        Object(_module_import_guard__WEBPACK_IMPORTED_MODULE_6__["throwIfAlreadyLoaded"])(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatButtonModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_14__["LayoutModule"],
            ],
            declarations: [
                // HomePage,
                // Error404Page,
                _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomePage"],
                _pages_error404_error404_component__WEBPACK_IMPORTED_MODULE_9__["Error404Component"],
                _nav_menu_list_item_menu_list_item_component__WEBPACK_IMPORTED_MODULE_11__["MenuListItemComponent"],
                _nav_top_nav_top_nav_component__WEBPACK_IMPORTED_MODULE_12__["TopNavComponent"],
            ],
            exports: [
                _nav_top_nav_top_nav_component__WEBPACK_IMPORTED_MODULE_12__["TopNavComponent"],
                _nav_menu_list_item_menu_list_item_component__WEBPACK_IMPORTED_MODULE_11__["MenuListItemComponent"],
            ],
            providers: [
                _modules_customers_customers_service__WEBPACK_IMPORTED_MODULE_5__["CustomersService"],
                _services_logger_service__WEBPACK_IMPORTED_MODULE_7__["LoggerService"],
                _config_api_service__WEBPACK_IMPORTED_MODULE_10__["ApiService"],
            ],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()), __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/core/dashboard/dashboard.component.css":
/*!********************************************************!*\
  !*** ./src/app/core/dashboard/dashboard.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".grid-container {\n  margin: 20px;\n}\n\n.dashboard-card {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  right: 15px;\n  bottom: 15px;\n}\n\n.more-button {\n  position: absolute;\n  top: 5px;\n  right: 10px;\n}\n\n.dashboard-card-content {\n  text-align: center;\n}"

/***/ }),

/***/ "./src/app/core/dashboard/dashboard.component.html":
/*!*********************************************************!*\
  !*** ./src/app/core/dashboard/dashboard.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"grid-container\">\n  <h1 class=\"mat-h1\">Dashboard</h1>\n    <mat-grid-list cols=\"2\" rowHeight=\"500px\">\n              <app-orders-table [cards]='cards'></app-orders-table>\n    </mat-grid-list>\n<div>\n    <mat-grid-list cols=\"2\" rowHeight=\"500px\">\n        <mat-grid-tile [colspan]='1' [rowspan]=\"1\">\n        <mat-card class=\"dashboard-card\">\n          <mat-card-header>\n            Card Header\n            <mat-card-title>\n              Card Title\nt            </mat-card-title>\n          </mat-card-header>\n          <mat-card-content class=\"dashboard-card-content\">\n            <div>content</div>\n          </mat-card-content>\n        </mat-card>\n      </mat-grid-tile>\n      <mat-grid-tile [colspan]='1' [rowspan]=\"1\">\n          <mat-card class=\"dashboard-card\">\n            <mat-card-header>\n              Post\n              <mat-card-title>\n                <button (click)=\"postIt()\">Post</button>\n  t            </mat-card-title>\n            </mat-card-header>\n            <mat-card-content class=\"dashboard-card-content\">\n              <div>content</div>\n            </mat-card-content>\n          </mat-card>\n        </mat-grid-tile>\n    </mat-grid-list>\n  </div>\n\n    <mat-grid-list cols=\"2\" rowHeight=\"350px\">\n        <mat-grid-tile [colspan]='1' [rowspan]=\"2\">\n        <mat-card class=\"dashboard-card\">\n          <mat-card-header>\n            Card Header\n            <mat-card-title>\n              Card Title\nt            </mat-card-title>\n          </mat-card-header>\n          <mat-card-content class=\"dashboard-card-content\">\n            <div>content</div>\n          </mat-card-content>\n        </mat-card>\n      </mat-grid-tile>\n    </mat-grid-list>\n    \n\n</div>\n  \n  \n"

/***/ }),

/***/ "./src/app/core/dashboard/dashboard.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/core/dashboard/dashboard.component.ts ***!
  \*******************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _forms_service_options_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../forms/_service/options.service */ "./src/app/forms/_service/options.service.ts");
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/post.service */ "./src/app/_services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




;
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(post, breakpointObserver, optService) {
        this.post = post;
        this.breakpointObserver = breakpointObserver;
        this.optService = optService;
        this.cards = false;
    }
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-core-dash-board-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/core/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/core/dashboard/dashboard.component.css")],
            providers: [_forms_service_options_service__WEBPACK_IMPORTED_MODULE_2__["OptionsService"], _services_post_service__WEBPACK_IMPORTED_MODULE_3__["PostService"]]
        }),
        __metadata("design:paramtypes", [_services_post_service__WEBPACK_IMPORTED_MODULE_3__["PostService"], _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["BreakpointObserver"], _forms_service_options_service__WEBPACK_IMPORTED_MODULE_2__["OptionsService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/core/module-import-guard.ts":
/*!*********************************************!*\
  !*** ./src/app/core/module-import-guard.ts ***!
  \*********************************************/
/*! exports provided: throwIfAlreadyLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwIfAlreadyLoaded", function() { return throwIfAlreadyLoaded; });
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}


/***/ }),

/***/ "./src/app/core/nav/menu-list-item/menu-list-item.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/core/nav/menu-list-item/menu-list-item.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div style=\"border-width: .05px; border-style: solid; border-bottom-color: black; border-top-color:black\">\n  <a mat-list-item color=\"primary\" [ngStyle]=\"{'padding-left': (depth * 12) + 'px'}\" (click)=\"onItemSelected(item)\"\n                [ngClass]=\"{'active': item.route ? router.isActive(item.route, true): false, 'expanded': expanded}\"> \n    <mat-icon  style=\"color:#F5F5F5\" class=\"routeIcon\">{{item.iconName}}</mat-icon> <!--the arrow icon-->\n    \n    \n    <div *ngIf='!expanded' style=\"color:#F5F5F5\">{{item.displayName}}</div>\n    <div *ngIf='expanded' style=\"color:#A7FFEB\">{{item.displayName}}</div>\n\n      <span fxFlex></span>\n      <mat-icon style=\"color:#F5F5F5;\" [@indicatorRotate]=\"expanded ? 'expanded': 'collapsed'\">\n        expand_more\n      </mat-icon>\n  </a>\n  \n  <div *ngIf=\"expanded\"> \n    <div *ngFor=\"let child of item.children\"  style=\"color:#F5F5F5\">\n        <a mat-list-item color=\"primary\" routerLink={{child.route}} \n        [ngClass]=\"{'active': child.route ? router.isActive(child.route, true): false, 'expanded': expanded}\" (click)=\"close()\">\n\n          <span fxFlex  *ngIf=\"item.children && item.children.length\">    \n            <mat-icon  style=\"color:#F5F5F5\">{{child.iconName}}</mat-icon> <!--the arrow icon-->\n            <span  style=\"color:#F5F5F5\">{{child.displayName}}</span>\n          </span>\n        </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/core/nav/menu-list-item/menu-list-item.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/core/nav/menu-list-item/menu-list-item.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-fill-remaining-space {\n  flex: 1 1 auto; }\n\n.bold-font {\n  font-weight: bolder;\n  color: darkslateblue; }\n"

/***/ }),

/***/ "./src/app/core/nav/menu-list-item/menu-list-item.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/core/nav/menu-list-item/menu-list-item.component.ts ***!
  \*********************************************************************/
/*! exports provided: MenuListItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuListItemComponent", function() { return MenuListItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../nav.service */ "./src/app/nav.service.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuListItemComponent = /** @class */ (function () {
    function MenuListItemComponent(navService, router) {
        this.navService = navService;
        this.router = router;
        this.ariaExpanded = this.expanded;
        this.colorChoice = { 'white': '#F5F5F5', 'teal': '#A7FFEB' };
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }
    MenuListItemComponent.prototype.onItemSelected = function (item) {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
            this.navService.closeNav();
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    };
    MenuListItemComponent.prototype.close = function (color) {
        this.color = color;
        this.navService.closeNav();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"])('attr.aria-expanded'),
        __metadata("design:type", Object)
    ], MenuListItemComponent.prototype, "ariaExpanded", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MenuListItemComponent.prototype, "item", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], MenuListItemComponent.prototype, "depth", void 0);
    MenuListItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu-list-item',
            template: __webpack_require__(/*! ./menu-list-item.component.html */ "./src/app/core/nav/menu-list-item/menu-list-item.component.html"),
            styles: [__webpack_require__(/*! ./menu-list-item.component.scss */ "./src/app/core/nav/menu-list-item/menu-list-item.component.scss")],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('indicatorRotate', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'rotate(0deg)' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'rotate(180deg)' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('225ms cubic-bezier(0.4,0.0,0.2,1)')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [_nav_service__WEBPACK_IMPORTED_MODULE_2__["NavService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], MenuListItemComponent);
    return MenuListItemComponent;
}());



/***/ }),

/***/ "./src/app/core/nav/top-nav/top-nav.component.html":
/*!*********************************************************!*\
  !*** ./src/app/core/nav/top-nav/top-nav.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar  color=\"primary\" class=\"mat-elevation-z1\">\n  <button mat-icon-button id=\"menu\" (click)=\"navService.openNav()\">\n    <mat-icon>menu</mat-icon>\n  </button>\n  <span>Jeanne Pierre Order Organizer</span>\n  <span  class=\"example-fill-remaining-space\"></span>\n  <button mat-button  color=\"accent\" (click)='logOut()' class=\"bold-font\">Logout</button>\n\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/core/nav/top-nav/top-nav.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/core/nav/top-nav/top-nav.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-fill-remaining-space {\n  flex: 1 1 auto; }\n\n.bold-font {\n  font-weight: bolder; }\n"

/***/ }),

/***/ "./src/app/core/nav/top-nav/top-nav.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/core/nav/top-nav/top-nav.component.ts ***!
  \*******************************************************/
/*! exports provided: TopNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopNavComponent", function() { return TopNavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../nav.service */ "./src/app/nav.service.ts");
/* harmony import */ var _pages_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../pages/_services */ "./src/app/pages/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TopNavComponent = /** @class */ (function () {
    function TopNavComponent(navService, authService) {
        this.navService = navService;
        this.authService = authService;
    }
    TopNavComponent.prototype.ngOnInit = function () {
    };
    TopNavComponent.prototype.logOut = function () {
        this.authService.logout();
    };
    TopNavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-top-nav',
            template: __webpack_require__(/*! ./top-nav.component.html */ "./src/app/core/nav/top-nav/top-nav.component.html"),
            styles: [__webpack_require__(/*! ./top-nav.component.scss */ "./src/app/core/nav/top-nav/top-nav.component.scss")]
        }),
        __metadata("design:paramtypes", [_nav_service__WEBPACK_IMPORTED_MODULE_1__["NavService"],
            _pages_services__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], TopNavComponent);
    return TopNavComponent;
}());



/***/ }),

/***/ "./src/app/core/pages/error404/error404.component.html":
/*!*************************************************************!*\
  !*** ./src/app/core/pages/error404/error404.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 class=\"header__title\">'error404'</h1>\n<p class=\"explanation\">'mayTheForce'</p>\n"

/***/ }),

/***/ "./src/app/core/pages/error404/error404.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/core/pages/error404/error404.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/core/pages/error404/error404.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/core/pages/error404/error404.component.ts ***!
  \***********************************************************/
/*! exports provided: Error404Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error404Component", function() { return Error404Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error404Component = /** @class */ (function () {
    function Error404Component() {
    }
    Error404Component.prototype.ngOnInit = function () {
    };
    Error404Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-error404',
            template: __webpack_require__(/*! ./error404.component.html */ "./src/app/core/pages/error404/error404.component.html"),
            styles: [__webpack_require__(/*! ./error404.component.scss */ "./src/app/core/pages/error404/error404.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], Error404Component);
    return Error404Component;
}());



/***/ }),

/***/ "./src/app/core/pages/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/core/pages/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  home works!\n</p>\n<div fxLayout=\"row\">\n  <div fxFlex=\"10\" fxFlex.gt-sm=\"20\"></div>\n  <div fxFlex=\"90\" fxFlex.gt-sm=\"80\">\n    <h1 class=\"header__title\">'home' </h1>\n    <div id=\"customers\" *ngIf=\"customers\">\n      <ng-container *ngFor=\"let customer of customers\">\n        <mat-card class=\"customer-card\">\n          <mat-card-header>\n            <div (click)=\"seeCustomerDetails(customer)\"></div>\n            <mat-card-title (click)=\"seeCustomerDetails(hero)\">{{customer.name}}</mat-card-title>\n            <mat-card-subtitle (click)=\"seeHeroDetails(hero)\">{{customer.address1}}</mat-card-subtitle>\n            <div class=\"flex-spacer\"></div>\n          </mat-card-header>\n        </mat-card>\n      </ng-container>\n    </div>\n  </div>\n  <div fxFlex=\"10\" fxFlex.gt-sm=\"20\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/core/pages/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/core/pages/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _modules_customers_customers_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/customers/customers.service */ "./src/app/modules/customers/customers.service.ts");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/app.config */ "./src/app/config/app.config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(customerService, router) {
        this.customerService = customerService;
        this.router = router;
        this.customers = null;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
        });
    };
    HomePage.prototype.seeCustomerDetails = function (customer) {
        if (customer.default) {
            this.router.navigate([_config_app_config__WEBPACK_IMPORTED_MODULE_3__["AppConfig"].routes.customer + '/' + customer.id]);
        }
    };
    HomePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/core/pages/home/home.component.html"),
        }),
        __metadata("design:paramtypes", [_modules_customers_customers_service__WEBPACK_IMPORTED_MODULE_2__["CustomersService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomePage);
    return HomePage;
}());



/***/ }),

/***/ "./src/app/core/services/logger.service.ts":
/*!*************************************************!*\
  !*** ./src/app/core/services/logger.service.ts ***!
  \*************************************************/
/*! exports provided: LoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggerService", function() { return LoggerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.log = function (msg) {
        console.log(msg);
    };
    LoggerService.error = function (msg, obj) {
        if (obj === void 0) { obj = {}; }
        console.error(msg, obj);
    };
    LoggerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], LoggerService);
    return LoggerService;
}());



/***/ }),

/***/ "./src/app/forms/_models/factory-models/factory-model.ts":
/*!***************************************************************!*\
  !*** ./src/app/forms/_models/factory-models/factory-model.ts ***!
  \***************************************************************/
/*! exports provided: NewFactory, Contactname, Choice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewFactory", function() { return NewFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contactname", function() { return Contactname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Choice", function() { return Choice; });
var NewFactory = /** @class */ (function () {
    function NewFactory() {
    }
    return NewFactory;
}());

var Contactname = /** @class */ (function () {
    function Contactname() {
    }
    return Contactname;
}());

var Choice = /** @class */ (function () {
    function Choice() {
    }
    return Choice;
}());



/***/ }),

/***/ "./src/app/forms/_models/form-base.ts":
/*!********************************************!*\
  !*** ./src/app/forms/_models/form-base.ts ***!
  \********************************************/
/*! exports provided: FormBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormBase", function() { return FormBase; });
var FormBase = /** @class */ (function () {
    function FormBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    return FormBase;
}());



/***/ }),

/***/ "./src/app/forms/_models/form-dropdown.ts":
/*!************************************************!*\
  !*** ./src/app/forms/_models/form-dropdown.ts ***!
  \************************************************/
/*! exports provided: FormDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormDropdown", function() { return FormDropdown; });
/* harmony import */ var _form_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-base */ "./src/app/forms/_models/form-base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var FormDropdown = /** @class */ (function (_super) {
    __extends(FormDropdown, _super);
    function FormDropdown(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'dropdown';
        _this.options = [];
        _this.options = options['options'] || [];
        return _this;
    }
    return FormDropdown;
}(_form_base__WEBPACK_IMPORTED_MODULE_0__["FormBase"]));



/***/ }),

/***/ "./src/app/forms/_models/form-textbox.ts":
/*!***********************************************!*\
  !*** ./src/app/forms/_models/form-textbox.ts ***!
  \***********************************************/
/*! exports provided: FormTextbox, FormCheckBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormTextbox", function() { return FormTextbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCheckBox", function() { return FormCheckBox; });
/* harmony import */ var _form_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-base */ "./src/app/forms/_models/form-base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var FormTextbox = /** @class */ (function (_super) {
    __extends(FormTextbox, _super);
    function FormTextbox(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.type = options['type'] || '';
        return _this;
    }
    return FormTextbox;
}(_form_base__WEBPACK_IMPORTED_MODULE_0__["FormBase"]));

var FormCheckBox = /** @class */ (function (_super) {
    __extends(FormCheckBox, _super);
    function FormCheckBox(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'checkbox';
        _this.type = options['type'] || '';
        return _this;
    }
    return FormCheckBox;
}(_form_base__WEBPACK_IMPORTED_MODULE_0__["FormBase"]));



/***/ }),

/***/ "./src/app/forms/_service/factory-form.service.ts":
/*!********************************************************!*\
  !*** ./src/app/forms/_service/factory-form.service.ts ***!
  \********************************************************/
/*! exports provided: FactoryFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryFormService", function() { return FactoryFormService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models/form-textbox */ "./src/app/forms/_models/form-textbox.ts");
/* harmony import */ var _models_factory_models_factory_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_models/factory-models/factory-model */ "./src/app/forms/_models/factory-models/factory-model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FactoryFormService = /** @class */ (function () {
    function FactoryFormService() {
        this.factory = new _models_factory_models_factory_model__WEBPACK_IMPORTED_MODULE_2__["NewFactory"]();
    }
    // TODO: make asynchronous
    FactoryFormService.prototype.getForms = function () {
        var factory = [
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'name',
                label: 'Factory Name',
                type: 'text',
                order: 1
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'address1',
                label: 'Address 1',
                type: 'text',
                order: 2
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'address2',
                label: 'Address 2',
                type: 'text',
                order: 3
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'address3',
                label: 'Address 3',
                type: 'text',
                order: 4
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'country',
                label: 'Country',
                type: 'text',
                order: 5
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'state',
                label: 'State',
                type: 'text',
                order: 6
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'zip',
                label: 'Zip',
                type: 'text',
                order: 7
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'email',
                label: 'Factory Base Email',
                type: 'email',
                order: 8
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'phone',
                label: 'Phone Number',
                type: 'tel',
                order: 9
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'website',
                label: 'Webiste',
                type: 'text',
                order: 10
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'description',
                label: 'Description - notes',
                type: 'textbox',
                order: 11
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'description',
                label: 'Description - notes',
                type: 'textbox',
                order: 12
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'description',
                label: 'Description - notes',
                type: 'textbox',
                order: 13
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'description',
                label: 'Description - notes',
                type: 'textbox',
                order: 14
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_1__["FormTextbox"]({
                key: 'description',
                label: 'Description - notes',
                type: 'textbox',
                order: 15
            }),
        ];
        console.log(factory);
        return factory.sort(function (a, b) { return a.order - b.order; });
    };
    FactoryFormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FactoryFormService);
    return FactoryFormService;
}());



/***/ }),

/***/ "./src/app/forms/_service/form-control.service.ts":
/*!********************************************************!*\
  !*** ./src/app/forms/_service/form-control.service.ts ***!
  \********************************************************/
/*! exports provided: FormControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormControlService", function() { return FormControlService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// model = tasks 
// item = task
var FormControlService = /** @class */ (function () {
    function FormControlService() {
    }
    FormControlService.prototype.toFormGroup = function (models) {
        var group = {};
        models.forEach(function (item) {
            group[item.key] = item.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](item.value || '', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
                : new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](item.value || '');
        });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group);
    };
    FormControlService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FormControlService);
    return FormControlService;
}());



/***/ }),

/***/ "./src/app/forms/_service/index.ts":
/*!*****************************************!*\
  !*** ./src/app/forms/_service/index.ts ***!
  \*****************************************/
/*! exports provided: FactoryFormService, TaskFormService, OptionsService, RootOptions, Actions, PostOptions, Options, OptionsFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory_form_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory-form.service */ "./src/app/forms/_service/factory-form.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FactoryFormService", function() { return _factory_form_service__WEBPACK_IMPORTED_MODULE_0__["FactoryFormService"]; });

/* harmony import */ var _task_form_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-form.service */ "./src/app/forms/_service/task-form.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskFormService", function() { return _task_form_service__WEBPACK_IMPORTED_MODULE_1__["TaskFormService"]; });

/* harmony import */ var _options_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options.service */ "./src/app/forms/_service/options.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionsService", function() { return _options_service__WEBPACK_IMPORTED_MODULE_2__["OptionsService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RootOptions", function() { return _options_service__WEBPACK_IMPORTED_MODULE_2__["RootOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return _options_service__WEBPACK_IMPORTED_MODULE_2__["Actions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostOptions", function() { return _options_service__WEBPACK_IMPORTED_MODULE_2__["PostOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return _options_service__WEBPACK_IMPORTED_MODULE_2__["Options"]; });

/* harmony import */ var _option_form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./option-form.service */ "./src/app/forms/_service/option-form.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionsFormService", function() { return _option_form_service__WEBPACK_IMPORTED_MODULE_3__["OptionsFormService"]; });







/***/ }),

/***/ "./src/app/forms/_service/option-form.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/forms/_service/option-form.service.ts ***!
  \*******************************************************/
/*! exports provided: OptionsFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsFormService", function() { return OptionsFormService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var _core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _models_form_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/form-dropdown */ "./src/app/forms/_models/form-dropdown.ts");
/* harmony import */ var _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_models/form-textbox */ "./src/app/forms/_models/form-textbox.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _services_http_client_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_services/http-client.service */ "./src/app/_services/http-client.service.ts");
/* harmony import */ var _form_control_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./form-control.service */ "./src/app/forms/_service/form-control.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var OptionsFormService = /** @class */ (function () {
    function OptionsFormService(http, fb, api, fcs) {
        this.http = http;
        this.fb = fb;
        this.api = api;
        this.fcs = fcs;
        this.BASE_URL = _config_app_config__WEBPACK_IMPORTED_MODULE_2__["AppConfig"].base;
        this.test = [];
        this.newForm = [];
        this.apiUrl = _config_app_config__WEBPACK_IMPORTED_MODULE_2__["AppConfig"].endpoints['url'];
    }
    OptionsFormService.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"].log(operation + " failed: " + error.message);
            if (error.status >= 500) {
                throw error;
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(result);
        };
    };
    OptionsFormService.prototype.formRequest = function (url) {
        var _this = this;
        var newForm = [];
        var headers = this.api.setHeaders();
        return this.http.options("" + url, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) {
            response = response['actions']['POST'];
            for (var item in response) {
                if (response[item]['read_only'] === false && response[item]['type'] === 'option') {
                    var optionJson = response[item]['choices'];
                    response[item] = response[item];
                    var form = new _models_form_dropdown__WEBPACK_IMPORTED_MODULE_6__["FormDropdown"]({
                        key: item,
                        label: response[item]['label'],
                        controlType: 'dropdown',
                        required: response[item]['required'],
                        text: 'text',
                        options: optionJson,
                    });
                    newForm.push(form);
                }
                else if (response[item]['read_only'] === false && response[item]['type'] === 'boolean') {
                    var optionJson = response[item];
                    var form = new _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__["FormCheckBox"]({
                        value: true,
                        key: item,
                        controlType: 'checkbox',
                        required: optionJson['required'],
                        label: optionJson['label'],
                    });
                    newForm.push(form);
                }
                else if (response[item]['read_only'] === false && response[item]['type'] !== 'option') {
                    var optionJson = response[item];
                    response[item] = response[item];
                    var form = new _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__["FormTextbox"]({
                        key: item,
                        label: optionJson['label'],
                        controlType: 'textbox',
                        required: false,
                        text: 'text',
                    });
                    newForm.push(form);
                }
            }
            _this.newForm = newForm;
            return newForm;
        }));
    };
    OptionsFormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_http_client_service__WEBPACK_IMPORTED_MODULE_9__["HttpClientService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _config_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"], _form_control_service__WEBPACK_IMPORTED_MODULE_10__["FormControlService"]])
    ], OptionsFormService);
    return OptionsFormService;
}());



/***/ }),

/***/ "./src/app/forms/_service/options.service.ts":
/*!***************************************************!*\
  !*** ./src/app/forms/_service/options.service.ts ***!
  \***************************************************/
/*! exports provided: OptionsService, RootOptions, Actions, PostOptions, Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsService", function() { return OptionsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootOptions", function() { return RootOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return Actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostOptions", function() { return PostOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var _core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_form_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/form-dropdown */ "./src/app/forms/_models/form-dropdown.ts");
/* harmony import */ var _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_models/form-textbox */ "./src/app/forms/_models/form-textbox.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _services_http_client_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_services/http-client.service */ "./src/app/_services/http-client.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var OptionsService = /** @class */ (function () {
    function OptionsService(http, fb, api) {
        this.http = http;
        this.fb = fb;
        this.api = api;
        this.BASE_URL = "http://127.0.0.1:8000/";
        this.test = [];
        this.newForm = [];
        this.apiUrl = _config_app_config__WEBPACK_IMPORTED_MODULE_2__["AppConfig"].endpoints['url'];
        this.optionsRequest(), console.log(this.newForm);
    }
    OptionsService_1 = OptionsService;
    OptionsService.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"].log(operation + " failed: " + error.message);
            if (error.status >= 500) {
                throw error;
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(result);
        };
    };
    OptionsService.prototype.setUrl = function (url) {
        this.BASE_URL = url;
        this.optionsRequest();
    };
    OptionsService.prototype.optionsRequest = function () {
        var _this = this;
        // if (url) { this.BASE_URL = AppConfig.urlOptions[url];}
        var headers = this.api.setHeaders();
        console.log(this.BASE_URL);
        return this.http.options(this.BASE_URL, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () { return _core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"].log("fetched options"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(OptionsService_1.handleError('getOptions', [])))
            .subscribe(function (response) {
            response = response['actions']['POST'];
            for (var item in response) {
                if (response[item]['read_only'] === false && response[item]['type'] === 'option') {
                    var optionJson = response[item]['choices'];
                    response[item] = response[item];
                    var form = new _models_form_dropdown__WEBPACK_IMPORTED_MODULE_6__["FormDropdown"]({
                        key: item,
                        label: response[item]['label'],
                        controlType: 'dropdown',
                        required: response[item]['required'],
                        text: 'text',
                        options: optionJson,
                    });
                    _this.newForm.push(form);
                }
                else if (response[item]['read_only'] === false && response[item]['type'] === 'boolean') {
                    var optionJson = response[item];
                    var form = new _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__["FormCheckBox"]({
                        value: true,
                        key: item,
                        controlType: 'checkbox',
                        required: optionJson['required'],
                        label: optionJson['label'],
                    });
                    console.log('checkbox item', item, optionJson);
                    _this.newForm.push(form);
                }
                else if (response[item]['read_only'] === false && response[item]['type'] !== 'option') {
                    var optionJson = response[item];
                    response[item] = response[item];
                    var form = new _models_form_textbox__WEBPACK_IMPORTED_MODULE_7__["FormTextbox"]({
                        key: item,
                        label: optionJson['label'],
                        controlType: 'textbox',
                        required: false,
                        text: 'text',
                    });
                    _this.newForm.push(form);
                }
            }
            return _this.newForm;
        });
    };
    OptionsService.prototype.returnOptions = function () {
        return this.optionsRequest();
    };
    var OptionsService_1;
    OptionsService = OptionsService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_http_client_service__WEBPACK_IMPORTED_MODULE_9__["HttpClientService"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _config_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"]])
    ], OptionsService);
    return OptionsService;
}());

/*
 options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],

getTaskGroups() {
  const options = [];
  this.api.getTasks().subscribe((taskSet: TaskSet) => {
    const keys = Object.keys(taskSet[0]);
    const value = Object.values(taskSet);
    for (const set in taskSet) {
      let optiond = {}
      optiond['key'] = taskSet[set].id;
      optiond['value'] = taskSet[set].set_name;
      options.push(optiond);
    }
  });
  this.dropdownOption = options;
  return this.dropdownOption;
}
getForms2() {
  let tasks: FormBase<any>[] = [

    new FormDropdown({
      key: 'set_name',
      label: 'Task Set name',
      options: this.dropdownOption,
      order: 4
    })
  ];

  return tasks;
}*/
var RootOptions = /** @class */ (function () {
    function RootOptions() {
    }
    return RootOptions;
}());

var Actions = /** @class */ (function () {
    function Actions() {
    }
    return Actions;
}());

var PostOptions = /** @class */ (function () {
    function PostOptions() {
    }
    return PostOptions;
}());

var Options = /** @class */ (function () {
    function Options() {
    }
    return Options;
}());



/***/ }),

/***/ "./src/app/forms/_service/task-form.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/forms/_service/task-form.service.ts ***!
  \*****************************************************/
/*! exports provided: TaskFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskFormService", function() { return TaskFormService; });
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_form_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_models/form-dropdown */ "./src/app/forms/_models/form-dropdown.ts");
/* harmony import */ var _models_form_textbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/form-textbox */ "./src/app/forms/_models/form-textbox.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskFormService = /** @class */ (function () {
    function TaskFormService(api) {
        this.api = api;
        this.dropdownOption = this.getTaskGroups();
        console.log("your options are ", this.dropdownOption);
    }
    TaskFormService.prototype.getTaskGroups = function () {
        var options = [];
        this.api.getTasks().subscribe(function (taskSet) {
            var keys = Object.keys(taskSet[0]);
            var value = Object.values(taskSet);
            for (var set in taskSet) {
                var optiond = {};
                optiond['key'] = taskSet[set].id;
                optiond['value'] = taskSet[set].set_name;
                options.push(optiond);
            }
        });
        this.dropdownOption = options;
        return this.dropdownOption;
    };
    TaskFormService.prototype.getForms2 = function () {
        var tasks = [
            new _models_form_dropdown__WEBPACK_IMPORTED_MODULE_2__["FormDropdown"]({
                key: 'set_name',
                label: 'Task Set name',
                options: this.dropdownOption,
                order: 4
            })
        ];
        return tasks;
    };
    TaskFormService.prototype.printOptions = function () {
        console.log(this.dropdownOption);
    };
    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    TaskFormService.prototype.getForms = function () {
        var tasks = [
            new _models_form_dropdown__WEBPACK_IMPORTED_MODULE_2__["FormDropdown"]({
                key: 'brave',
                label: 'Bravery Rating',
                options: [
                    { key: 'solid', value: 'Solid' },
                    { key: 'great', value: 'Great' },
                    { key: 'good', value: 'Good' },
                    { key: 'unproven', value: 'Unproven' }
                ],
                order: 3
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_3__["FormTextbox"]({
                key: 'firstName',
                label: 'First name',
                value: 'Bombasto',
                required: true,
                order: 1
            }),
            new _models_form_textbox__WEBPACK_IMPORTED_MODULE_3__["FormTextbox"]({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            })
        ];
        return tasks.sort(function (a, b) { return a.order - b.order; });
    };
    TaskFormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_0__["ApiService"]])
    ], TaskFormService);
    return TaskFormService;
}());



/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\">\r\n\r\n <!-- <label [attr.for]=\"item.key\">{{item.label}}</label>-->\r\n \r\n  <span [ngSwitch]=\"item.controlType\">\r\n    \r\n\r\n    <mat-form-field *ngSwitchCase=\"'textbox'\" >\r\n        <input matInput   [type]=\"item.type\" [formControlName]=\"item.key\" [placeholder]=\"item.label\" [value]=\"item.value\" >\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-form-field *ngSwitchCase=\"'dropdown'\" class=\"form-element\" [formControlName]=\"item.key\">\r\n        <mat-select [placeholder]=\"item.label\" [formControlName]=\"item.key\">\r\n         <mat-option *ngFor=\"let opt of item.options\" [value]=\"opt.key\">\r\n             {{opt.value}}\r\n         </mat-option>\r\n       </mat-select>\r\n    </mat-form-field>\r\n\r\n    <mat-checkbox  *ngSwitchCase=\"'checkbox'\"  [formControlName]=\"item.key\" [value]=true >{{item.label}}</mat-checkbox>\r\n\r\n   \r\n\r\n \r\n  </span> \r\n \r\n  <div class=\"errorMessage\" *ngIf=\"!isValid\">{{item.label}} is required</div>\r\n</div>"

/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: JpDynamicFormTaskSetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JpDynamicFormTaskSetComponent", function() { return JpDynamicFormTaskSetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_models/form-base */ "./src/app/forms/_models/form-base.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JpDynamicFormTaskSetComponent = /** @class */ (function () {
    function JpDynamicFormTaskSetComponent() {
    }
    Object.defineProperty(JpDynamicFormTaskSetComponent.prototype, "isValid", {
        get: function () { return this.form.controls[this.item.key].valid; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_form_base__WEBPACK_IMPORTED_MODULE_2__["FormBase"])
    ], JpDynamicFormTaskSetComponent.prototype, "item", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], JpDynamicFormTaskSetComponent.prototype, "form", void 0);
    JpDynamicFormTaskSetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jp-dynamic-form-task-set',
            template: __webpack_require__(/*! ./jp-dynamic-form-task-set.component.html */ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.html"),
            styles: [__webpack_require__(/*! ./jp-dynamic-form-task-set.component.scss */ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.scss")]
        })
    ], JpDynamicFormTaskSetComponent);
    return JpDynamicFormTaskSetComponent;
}());



/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  jp-dynamic-form works!\r\n</p>\r\n<div >\r\n  <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\r\n \r\n    <div *ngFor=\"let item of models\" class=\"form-row\">\r\n      <app-jp-dynamic-form-task-set [item]=\"item\" [form]=\"form\"></app-jp-dynamic-form-task-set>\r\n    </div>\r\n \r\n    <div class=\"form-row\">\r\n      <button type=\"submit\" [disabled]=\"!form.valid\">Save</button>\r\n    </div>\r\n  </form>\r\n \r\n  <div *ngIf=\"payLoad\" class=\"form-row\">\r\n    <strong>Saved the following values</strong><br>{{payLoad}}\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.ts ***!
  \*******************************************************************************/
/*! exports provided: JpDynamicFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JpDynamicFormComponent", function() { return JpDynamicFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_form_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_service/form-control.service */ "./src/app/forms/_service/form-control.service.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JpDynamicFormComponent = /** @class */ (function () {
    function JpDynamicFormComponent(fcs, submitService) {
        this.fcs = fcs;
        this.submitService = submitService;
        this.models = [];
        this.payLoad = '';
    }
    JpDynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.fcs.toFormGroup(this.models);
    };
    JpDynamicFormComponent.prototype.onSubmit = function () {
        this.payLoad = JSON.stringify(this.form.value);
        /*this.submitService.createFactory(this.form.value).subscribe(response => {
          response = this.form.value;
          console.log(response);
        });*/
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], JpDynamicFormComponent.prototype, "models", void 0);
    JpDynamicFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jp-dynamic-form',
            template: __webpack_require__(/*! ./jp-dynamic-form.component.html */ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.html"),
            styles: [__webpack_require__(/*! ./jp-dynamic-form.component.scss */ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.scss")],
            providers: [_service_form_control_service__WEBPACK_IMPORTED_MODULE_1__["FormControlService"]]
        }),
        __metadata("design:paramtypes", [_service_form_control_service__WEBPACK_IMPORTED_MODULE_1__["FormControlService"], _config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], JpDynamicFormComponent);
    return JpDynamicFormComponent;
}());



/***/ }),

/***/ "./src/app/forms/components/jp-forms.component.ts":
/*!********************************************************!*\
  !*** ./src/app/forms/components/jp-forms.component.ts ***!
  \********************************************************/
/*! exports provided: JpFormsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JpFormsComponent", function() { return JpFormsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_service/ */ "./src/app/forms/_service/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JpFormsComponent = /** @class */ (function () {
    function JpFormsComponent(service, 
    // private taskService: TaskFormService,
    factoryFormService) {
        this.factoryFormService = factoryFormService;
        // this.tasks = service.getTaskGroups();
        this.models = factoryFormService.getForms();
    }
    JpFormsComponent.prototype.ngOnInit = function () {
    };
    JpFormsComponent.prototype.getTaskGroups = function () {
        return this.factoryFormService.getForms();
    };
    JpFormsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jp-forms',
            template: "\n    <div>\n      <h2>Task Form</h2>\n      <app-jp-dynamic-form [models]=\"models\"></app-jp-dynamic-form>\n    </div>\n  ",
            providers: [_service___WEBPACK_IMPORTED_MODULE_1__["TaskFormService"], _service___WEBPACK_IMPORTED_MODULE_1__["FactoryFormService"]]
        }),
        __metadata("design:paramtypes", [_service___WEBPACK_IMPORTED_MODULE_1__["TaskFormService"],
            _service___WEBPACK_IMPORTED_MODULE_1__["FactoryFormService"]])
    ], JpFormsComponent);
    return JpFormsComponent;
}());



/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-form-request/customer.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-form-request/customer.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<mat-dialog-content>\r\n  <mat-card>\r\n    {{data.url}}\r\n    {{data.formData | json}}\r\n    <button (click)=updateModels()>form group</button>\r\n    <div *ngIf=\"loading; else loaded\">\r\n        <mat-spinner color='accent' style=\"margin:0 auto;\" mode=\"indeterminate\"></mat-spinner>\r\n    </div>\r\n\r\n\r\n      <ng-template #loaded>\r\n        <app-factory-form  [submitUrl]=\"seturl\" [update]=\"update\"  [models]=\"models\" [form]=\"form\"></app-factory-form>\r\n    <!--<app-jp-dynamic-form [models]=\"models\"></app-jp-dynamic-form>-->\r\n      </ng-template>\r\n  </mat-card>\r\n</mat-dialog-content>\r\n\r\n"

/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: DynamicFormRequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormRequestComponent", function() { return DynamicFormRequestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_service/ */ "./src/app/forms/_service/index.ts");
/* harmony import */ var src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/pages/task/_models/forms/form-control.service */ "./src/app/pages/task/_models/forms/form-control.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/message.service */ "./src/app/_services/message.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var DynamicFormRequestComponent = /** @class */ (function () {
    // loading: boolean = true;
    function DynamicFormRequestComponent(
    // private factoryFormService: FactoryFormService,
    urlServ, formService, ffs, fcs, dialogRef, data) {
        this.urlServ = urlServ;
        this.formService = formService;
        this.ffs = ffs;
        this.fcs = fcs;
        this.dialogRef = dialogRef;
        this.data = data;
        this.update = this.data.update;
    }
    DynamicFormRequestComponent.prototype.ngOnInit = function () {
        this.getForm();
    };
    DynamicFormRequestComponent.prototype.ngDoCheck = function () {
    };
    DynamicFormRequestComponent.prototype.ngAfterViewChecked = function () {
    };
    DynamicFormRequestComponent.prototype.ngOnDestroy = function () {
    };
    DynamicFormRequestComponent.prototype.getForm = function () {
        var _this = this;
        this.update = this.data.update;
        if (this.data.update) {
            this.seturl = "" + this.data.url + this.data.formData.id + "/";
            console.log(this.seturl);
            this.formService.formRequest(this.data.url).subscribe(function (response) {
                var models = response;
                _this.models = _this.updateModels(models);
                _this.form = _this.fcs.toFormGroup(_this.models);
            });
        }
        else {
            this.seturl = "" + this.data.url;
            console.log(this.seturl);
            this.formService.formRequest(this.data.url).subscribe(function (response) {
                var models = response;
                _this.models = _this.updateModels(models);
                _this.form = _this.fcs.toFormGroup(_this.models);
            });
        }
    };
    DynamicFormRequestComponent.prototype.getFormGroup = function () {
        var data = this.data.formData;
        for (var obj in data) {
            if (this.form.get(obj) != null) {
                var value = data[obj];
                var key = obj;
                this.form.get(key).setValue(value);
            }
        }
        this.id = this.data.formData.id;
    };
    DynamicFormRequestComponent.prototype.updateModels = function (_models) {
        var formd = {};
        for (var _i = 0, _models_1 = _models; _i < _models_1.length; _i++) {
            var formdata = _models_1[_i];
            formd[formdata.key] = formdata;
        }
        for (var item in this.data.formData) {
            if (formd.hasOwnProperty(item)) {
                formd[item].value = this.data.formData[item];
            }
        }
        var newmodel = Object.values(formd);
        return newmodel;
    };
    DynamicFormRequestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dynamic-form-request',
            template: __webpack_require__(/*! ./dynamic-form-request.component.html */ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.html"),
            styles: [__webpack_require__(/*! ./customer.component.scss */ "./src/app/forms/dynamic-form/dynamic-form-request/customer.component.scss")],
            providers: [_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"], src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_2__["FormControlService"]]
        }),
        __param(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"],
            _service___WEBPACK_IMPORTED_MODULE_1__["OptionsFormService"],
            _service___WEBPACK_IMPORTED_MODULE_1__["FactoryFormService"],
            src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_2__["FormControlService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"], Object])
    ], DynamicFormRequestComponent);
    return DynamicFormRequestComponent;
}());



/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-forms.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-forms.component.ts ***!
  \***************************************************************/
/*! exports provided: DynamicFormsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormsComponent", function() { return DynamicFormsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_models/form-base */ "./src/app/forms/_models/form-base.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicFormsComponent = /** @class */ (function () {
    function DynamicFormsComponent() {
    }
    Object.defineProperty(DynamicFormsComponent.prototype, "isValid", {
        get: function () { return this.form.controls[this.item.key].valid; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_form_base__WEBPACK_IMPORTED_MODULE_2__["FormBase"])
    ], DynamicFormsComponent.prototype, "item", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], DynamicFormsComponent.prototype, "form", void 0);
    DynamicFormsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dynamic-forms',
            template: __webpack_require__(/*! ./dynamic-forms.html */ "./src/app/forms/dynamic-form/dynamic-forms.html"),
            styles: [__webpack_require__(/*! ./dynamic-forms.scss */ "./src/app/forms/dynamic-form/dynamic-forms.scss")]
        })
    ], DynamicFormsComponent);
    return DynamicFormsComponent;
}());



/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-forms.html":
/*!*******************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-forms.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\">\r\n\r\n <!-- <label [attr.for]=\"item.key\">{{item.label}}</label>-->\r\n \r\n  <span [ngSwitch]=\"item.controlType\">\r\n    \r\n\r\n    <mat-form-field *ngSwitchCase=\"'textbox'\" >\r\n        <input matInput   [type]=\"item.type\" [formControlName]=\"item.key\" [placeholder]=\"item.label\" >\r\n    </mat-form-field>\r\n\r\n\r\n    <mat-form-field *ngSwitchCase=\"'dropdown'\" class=\"form-element\" [formControlName]=\"item.key\">\r\n        <mat-select [placeholder]=\"item.label\" [formControlName]=\"item.key\">\r\n         <mat-option *ngFor=\"let opt of item.options\" [value]=\"opt.key\">\r\n             {{opt.value}}\r\n         </mat-option>\r\n       </mat-select>\r\n    </mat-form-field>\r\n\r\n    <mat-checkbox  *ngSwitchCase=\"'checkbox'\"  [formControlName]=\"item.key\" [value]=true >{{item.label}}</mat-checkbox>\r\n\r\n   \r\n\r\n \r\n  </span> \r\n \r\n  <div class=\"errorMessage\" *ngIf=\"!isValid\">{{item.label}} is required</div>\r\n</div>"

/***/ }),

/***/ "./src/app/forms/dynamic-form/dynamic-forms.scss":
/*!*******************************************************!*\
  !*** ./src/app/forms/dynamic-form/dynamic-forms.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/factory/factory-base/factory-base.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/forms/factory/factory-base/factory-base.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/factory/factory-base/factory-base.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/forms/factory/factory-base/factory-base.component.ts ***!
  \**********************************************************************/
/*! exports provided: FactoryBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryBaseComponent", function() { return FactoryBaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var _service___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_service/ */ "./src/app/forms/_service/index.ts");
/* harmony import */ var src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pages/task/_models/forms/form-control.service */ "./src/app/pages/task/_models/forms/form-control.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FactoryBaseComponent = /** @class */ (function () {
    // loading: boolean = true;
    function FactoryBaseComponent(
    // private factoryFormService: FactoryFormService,
    formService, ffs, fcs) {
        this.formService = formService;
        this.ffs = ffs;
        this.fcs = fcs;
        this.hidden = true;
    }
    FactoryBaseComponent.prototype.ngOnInit = function () {
        //this.subscription = this.optionService.getMessage().subscribe(models => this.models = models);
        this.getForm();
    };
    FactoryBaseComponent.prototype.getForm = function () {
        var _this = this;
        this.seturl = _config_app_config__WEBPACK_IMPORTED_MODULE_1__["AppConfig"].urlOptions.factory;
        this.formService.formRequest(_config_app_config__WEBPACK_IMPORTED_MODULE_1__["AppConfig"].urlOptions.factory).subscribe(function (response) {
            _this.models = response;
            _this.form = _this.fcs.toFormGroup(_this.models);
        });
        // this.models.push(models);
        // this.form = this.fcs.toFormGroup(this.models)
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FactoryBaseComponent.prototype, "formurl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FactoryBaseComponent.prototype, "hidden", void 0);
    FactoryBaseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-factory-base-form',
            template: "\n  <mat-dialog-content>\n    <mat-card>\n      <div *ngIf=\"loading; else loaded\">\n          <mat-spinner color='accent' style=\"margin:0 auto;\" mode=\"indeterminate\"></mat-spinner>\n      </div>\n\n      <ng-template #loaded>\n      <app-factory-form [submitUrl]=seturl [models]=\"models\" [form]=\"form\"></app-factory-form>\n      </ng-template>\n\n    </mat-card>\n  </mat-dialog-content>\n",
            styles: [__webpack_require__(/*! ./factory-base.component.scss */ "./src/app/forms/factory/factory-base/factory-base.component.scss")],
            providers: [src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_3__["FormControlService"]]
        }),
        __metadata("design:paramtypes", [_service___WEBPACK_IMPORTED_MODULE_2__["OptionsFormService"],
            _service___WEBPACK_IMPORTED_MODULE_2__["FactoryFormService"],
            src_app_pages_task_models_forms_form_control_service__WEBPACK_IMPORTED_MODULE_3__["FormControlService"]])
    ], FactoryBaseComponent);
    return FactoryBaseComponent;
}());



/***/ }),

/***/ "./src/app/forms/factory/factory-form/factory-form.component.html":
/*!************************************************************************!*\
  !*** ./src/app/forms/factory/factory-form/factory-form.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  <div>\r\n    <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\r\n   \r\n      <div *ngFor=\"let item of models\" class=\"form-row\">\r\n         <app-dynamic-forms [item]=\"item\" [form]=\"form\"></app-dynamic-forms>\r\n      </div>\r\n   \r\n      <div class=\"form-row\">\r\n        <button type=\"submit\" [disabled]=\"!form.valid\">Save</button>\r\n      </div>\r\n    </form>\r\n   \r\n    <div *ngIf=\"payLoad\" class=\"form-row\">\r\n      <strong>Saved the following values</strong><br>{{payLoad}}\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "./src/app/forms/factory/factory-form/factory-form.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/forms/factory/factory-form/factory-form.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forms/factory/factory-form/factory-form.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/forms/factory/factory-form/factory-form.component.ts ***!
  \**********************************************************************/
/*! exports provided: FactoryFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryFormComponent", function() { return FactoryFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_http_client_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/http-client.service */ "./src/app/_services/http-client.service.ts");
/* harmony import */ var _service_form_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_service/form-control.service */ "./src/app/forms/_service/form-control.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FactoryFormComponent = /** @class */ (function () {
    function FactoryFormComponent(fcs, submitService) {
        this.fcs = fcs;
        this.submitService = submitService;
        // form: FormGroup;
        this.payLoad = '';
    }
    FactoryFormComponent.prototype.ngAfterContentChecked = function () {
    };
    FactoryFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.update === false) {
            console.log(this.payLoad);
            var form = this.form.value;
            this.payLoad = JSON.stringify(form);
            this.submitService.post(this.submitUrl, form).subscribe(function (response) {
                response = _this.form.value;
                console.log(response);
                _this.form.reset();
            });
        }
        else {
            this.submitService.put(this.submitUrl, this.form.value).subscribe(function (response) {
                response = _this.form.value;
                console.log(response);
                _this.form.reset();
            });
        }
    };
    FactoryFormComponent.prototype.toFormGroup = function (models) {
        return this.form = this.fcs.toFormGroup(models);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FactoryFormComponent.prototype, "models", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], FactoryFormComponent.prototype, "form", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FactoryFormComponent.prototype, "submitUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FactoryFormComponent.prototype, "update", void 0);
    FactoryFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-factory-form',
            template: __webpack_require__(/*! ./factory-form.component.html */ "./src/app/forms/factory/factory-form/factory-form.component.html"),
            styles: [__webpack_require__(/*! ./factory-form.component.scss */ "./src/app/forms/factory/factory-form/factory-form.component.scss")],
            providers: [_service_form_control_service__WEBPACK_IMPORTED_MODULE_3__["FormControlService"]],
        }),
        __metadata("design:paramtypes", [_service_form_control_service__WEBPACK_IMPORTED_MODULE_3__["FormControlService"], _services_http_client_service__WEBPACK_IMPORTED_MODULE_2__["HttpClientService"]])
    ], FactoryFormComponent);
    return FactoryFormComponent;
}());



/***/ }),

/***/ "./src/app/forms/jp-forms.module.ts":
/*!******************************************!*\
  !*** ./src/app/forms/jp-forms.module.ts ***!
  \******************************************/
/*! exports provided: JpFormsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JpFormsModule", function() { return JpFormsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_jp_forms_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/jp-forms.component */ "./src/app/forms/components/jp-forms.component.ts");
/* harmony import */ var _components_jp_dynamic_form_jp_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/jp-dynamic-form/jp-dynamic-form.component */ "./src/app/forms/components/jp-dynamic-form/jp-dynamic-form.component.ts");
/* harmony import */ var _components_jp_dynamic_form_task_set_jp_dynamic_form_task_set_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component */ "./src/app/forms/components/jp-dynamic-form-task-set/jp-dynamic-form-task-set.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _factory_factory_form_factory_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory/factory-form/factory-form.component */ "./src/app/forms/factory/factory-form/factory-form.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _factory_factory_base_factory_base_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./factory/factory-base/factory-base.component */ "./src/app/forms/factory/factory-base/factory-base.component.ts");
/* harmony import */ var _dynamic_form_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dynamic-form/dynamic-forms.component */ "./src/app/forms/dynamic-form/dynamic-forms.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var JpFormsModule = /** @class */ (function () {
    function JpFormsModule() {
    }
    JpFormsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ],
            declarations: [
                _components_jp_forms_component__WEBPACK_IMPORTED_MODULE_2__["JpFormsComponent"],
                _components_jp_dynamic_form_jp_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__["JpDynamicFormComponent"],
                _dynamic_form_dynamic_forms_component__WEBPACK_IMPORTED_MODULE_9__["DynamicFormsComponent"],
                _components_jp_dynamic_form_task_set_jp_dynamic_form_task_set_component__WEBPACK_IMPORTED_MODULE_4__["JpDynamicFormTaskSetComponent"],
                _factory_factory_form_factory_form_component__WEBPACK_IMPORTED_MODULE_6__["FactoryFormComponent"],
                _factory_factory_base_factory_base_component__WEBPACK_IMPORTED_MODULE_8__["FactoryBaseComponent"],
            ],
            exports: [_factory_factory_base_factory_base_component__WEBPACK_IMPORTED_MODULE_8__["FactoryBaseComponent"], _components_jp_forms_component__WEBPACK_IMPORTED_MODULE_2__["JpFormsComponent"], _components_jp_dynamic_form_jp_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__["JpDynamicFormComponent"], _components_jp_dynamic_form_task_set_jp_dynamic_form_task_set_component__WEBPACK_IMPORTED_MODULE_4__["JpDynamicFormTaskSetComponent"], _factory_factory_form_factory_form_component__WEBPACK_IMPORTED_MODULE_6__["FactoryFormComponent"]]
        })
    ], JpFormsModule);
    return JpFormsModule;
}());



/***/ }),

/***/ "./src/app/invoice/invoice.component.html":
/*!************************************************!*\
  !*** ./src/app/invoice/invoice.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset='utf-8'>\n  <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css\">\n  <script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js\"></script>\n  <script type=\"text/javascript\" src=\"src/assets/invoice.js\"></script>\n</head>\n<body ng-app=\"invoicing\" ng-controller=\"InvoiceCtrl\" >\n  <div class=\"container\" width=\"1000px\" id=\"invoice\" >\n    <div class=\"row\">\n      <div class=\"col-xs-12 heading\">\n        INVOICE\n      </div>\n    </div>\n    <div class=\"row branding\">\n      <div class=\"col-xs-6\">\n        <div class=\"invoice-number-container\">\n          <br /><input type=\"text\" ng-model=\"invoice.company_info.name\"/>\n          <br /><input type=\"text\" ng-model=\"invoice.company_info.web_link\"/>\n          <br /><input type=\"text\" ng-model=\"invoice.company_info.address1\"/>\n          <br /><input type=\"text\" ng-model=\"invoice.company_info.address2\"/>\n          <br /><input type=\"text\" ng-model=\"invoice.company_info.postal\"/>\n        </div>\n      </div>\n      <div class=\"col-xs-6 logo-container\">\n        <div>\n          <div class=\"noPrint\" ng-hide=\"printMode\">\n            <a ng-click=\"editLogo()\" href >Edit Logo</a>\n            <a ng-click=\"toggleLogo()\" id=\"remove_logo\" href >{{ logoRemoved ? 'Show' : 'Hide' }} logo</a>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row infos\">\n      <div class=\"col-xs-6\">\n        <br /><input type=\"text\" ng-model=\"invoice.customer_info.name\"/>\n        <br /><input type=\"text\" ng-model=\"invoice.customer_info.web_link\"/>\n        <br /><input type=\"text\" ng-model=\"invoice.customer_info.address1\"/>\n        <br /><input type=\"text\" ng-model=\"invoice.customer_info.address2\"/>\n        <br /><input type=\"text\" ng-model=\"invoice.customer_info.postal\"/>\n        <div class=\"input-container\" data-ng-hide='printMode'>\n          <select ng-model='currencySymbol' ng-options='currency.symbol as currency.name for currency in availableCurrencies'></select>\n        </div>\n      </div>\n      <div class=\"col-xs-6 left\">\n          <label for=\"invoice-number\">Invoice #:</label><input type=\"text\" id=\"invoice-number\" ng-model=\"invoice.invoice_number\" >\n         <br/> <label for=\"invoice-number\">Date:</label><input type=\"text\" id=\"invoice-number\" ng-model=\"invoice.invoice_date\" >\n         <br />    <label for=\"invoice-number\">Due Date:</label><input type=\"text\" ng-model=\"invoice.invoice_due_date\" >\n      </div>\n    </div>\n    <div class=\"items-table\">\n      <div class=\"row header\">\n        <div class=\"col-xs-1\">&nbsp;</div>\n        <div class=\"col-xs-5\">Document Name</div>\n        <div class=\"col-xs-2\">Pages</div>\n        <div class=\"col-xs-2\">Cost {{currencySymbol}}</div>\n        <div class=\"col-xs-2 text-right\">Total</div>\n      </div>\n      <div class=\"row invoice-item\" ng-repeat=\"item in invoice.items\" ng-animate=\"'slide-down'\">\n        <div class=\"col-xs-1 remove-item-container\">\n          <a href ng-hide=\"printMode\" ng-click=\"removeItem(item)\" class=\"btn btn-danger\">[X]</a>\n        </div>\n        <div class=\"col-xs-5 input-container\">\n          <input ng-model=\"item.description\" placeholder=\"Description\" />\n        </div>\n        <div class=\"col-xs-2 input-container\">\n          <input ng-model=\"item.qty\" value=\"1\" size=\"4\" ng-required ng-validate=\"integer\" placeholder=\"Quantity\" />\n        </div>\n        <div class=\"col-xs-2 input-container\">\n          <input ng-model=\"item.cost\" value=\"0.00\" ng-required ng-validate=\"number\" size=\"6\" placeholder=\"Cost\" />\n        </div>\n        <div class=\"col-xs-2 text-right input-container\">\n          {{item.cost * item.qty | currency: currencySymbol}}\n        </div>\n      </div>\n      <div class=\"row invoice-item\">\n        <div class=\"col-xs-12 add-item-container\" ng-hide=\"printMode\">\n          <a class=\"btn btn-primary\" href ng-click=\"addItem()\" >[+]</a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-10 text-right\">Sub Total</div>\n        <div class=\"col-xs-2 text-right\">{{invoiceSubTotal() | currency: currencySymbol}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-10 text-right\">Tax(%): <input ng-model=\"invoice.tax\" ng-validate=\"number\" style=\"width:43px\"></div>\n        <div class=\"col-xs-2 text-right\">{{calculateTax() | currency: currencySymbol}}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-10 text-right\">Grand Total:</div>\n        <div class=\"col-xs-2 text-right\">{{calculateGrandTotal() | currency: currencySymbol}}</div>\n      </div>\n    </div>\n    <div class=\"row noPrint actions\">\n      <a href=\"#\" class=\"btn btn-primary\" ng-show=\"printMode\" ng-click=\"printInfo()\">Print</a>\n      <a href=\"#\" class=\"btn btn-primary\" ng-click=\"clearLocalStorage()\">Reset</a>\n      <a href=\"#\" class=\"btn btn-primary\" ng-hide=\"printMode\" ng-click=\"printMode = true;\">Turn On Print Mode</a>\n      <a href=\"#\" class=\"btn btn-primary\" ng-show=\"printMode\" ng-click=\"printMode = false;\">Turn Off Print Mode</a>\n    </div>\n  </div>\n\n  <div ng-hide=\"printMode\" class=\"copy noPrint\">\n    <a href=\"https://jasdeep.ca/?utm_source=angular_invoicing\">Jasdeep Singh</a> &amp;\n    <a href=\"https://github.com/manpreetrules\">Manpreet Singh</a>\n    Made with\n    <span class=\"love\">&#9829;</span> in Toronto by\n    <a href=\"https://metawarelabs.com/?utm_source=angular_invoicing\">Metaware Labs Inc.</a>\n  </div>\n  <script type=\"text/javascript\" src=\"src/assets/invoice.js\"></script>\n\n</body>\n</html>\n"

/***/ }),

/***/ "./src/app/invoice/invoice.component.scss":
/*!************************************************!*\
  !*** ./src/app/invoice/invoice.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".slide-down-enter,\n.slide-down-leave {\n  transition: 200ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;\n  display: block;\n  overflow: hidden;\n  position: relative; }\n\n.items-table .row {\n  border-bottom: 1px solid #ddd;\n  line-height: 3em; }\n\n.items-table .row:last-child {\n  border-bottom: none;\n  line-height: 3em; }\n\n.slide-down-enter.slide-down-enter-active,\n.slide-down-leave {\n  opacity: 1;\n  height: 46px; }\n\n.slide-down-leave.slide-down-leave-active,\n.slide-down-enter {\n  opacity: 0;\n  height: 0px; }\n\n.invoice-number-container {\n  font-weight: bold; }\n\n.items-table .row:nth-child(even) {\n  background: #f9f9f9; }\n\n.items-table input {\n  line-height: 1.5em; }\n\n.actions {\n  padding-top: 1em; }\n\ninput:focus {\n  outline: 0; }\n\n.heading {\n  background-color: black;\n  color: #FFF;\n  margin-bottom: 1em;\n  text-align: center;\n  line-height: 2.5em; }\n\n.branding {\n  padding-bottom: .5em;\n  border-bottom: 1px solid #ddd; }\n\n.logo-container {\n  text-align: right; }\n\n.infos .right {\n  text-align: right; }\n\n.infos .right input {\n  text-align: right; }\n\n.infos .input-container {\n  padding: 3px 0; }\n\n.header.row {\n  font-weight: bold;\n  border-bottom: 1px solid #ddd;\n  border-top: 1px solid #ddd; }\n\ninput, textarea {\n  border: 1px solid #FFF; }\n\n.container input:hover, .container textarea:hover,\n.table-striped > tbody > tr:nth-child(2n+1) > td input:hover,\n.container input:focus, .container textarea:focus,\n.table-striped > tbody > tr:nth-child(2n+1) > td input:focus {\n  border: 1px solid #CCC; }\n\n.table-striped > tbody > tr:nth-child(2n+1) > td input {\n  background-color: #F9F9F9;\n  border: 1px solid #F9F9F9; }\n\n@media print {\n  .noPrint {\n    display: none; } }\n\nbody {\n  padding: 20px; }\n\n.infos input {\n  width: 300px; }\n\n.align-right input {\n  text-align: right;\n  width: 300px; }\n\ndiv.container {\n  width: 800px; }\n\n#imgInp {\n  display: none; }\n\n.copy {\n  font-family: \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\", Geneva, Verdana, sans-serif;\n  width: 100%;\n  margin: 40px 0 20px 0;\n  font-size: 10px;\n  color: rgba(0, 0, 0, 0.5);\n  text-align: center;\n  color: #404040;\n  cursor: default;\n  line-height: 1.4em; }\n\n.copy .love {\n  display: inline-block;\n  position: relative;\n  color: #ce0c15; }\n"

/***/ }),

/***/ "./src/app/invoice/invoice.component.ts":
/*!**********************************************!*\
  !*** ./src/app/invoice/invoice.component.ts ***!
  \**********************************************/
/*! exports provided: InvoiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceComponent", function() { return InvoiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent() {
    }
    InvoiceComponent.prototype.ngOnInit = function () {
    };
    InvoiceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invoice',
            template: __webpack_require__(/*! ./invoice.component.html */ "./src/app/invoice/invoice.component.html"),
            styles: [__webpack_require__(/*! ./invoice.component.scss */ "./src/app/invoice/invoice.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], InvoiceComponent);
    return InvoiceComponent;
}());



/***/ }),

/***/ "./src/app/modules/customers/customers.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/customers/customers.module.ts ***!
  \*******************************************************/
/*! exports provided: CustomersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersModule", function() { return CustomersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customers/customers.component */ "./src/app/modules/customers/customers/customers.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CustomersModule = /** @class */ (function () {
    function CustomersModule() {
    }
    CustomersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            ],
            declarations: [
                _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__["CustomersComponent"]
            ],
            exports: [],
            providers: []
        })
    ], CustomersModule);
    return CustomersModule;
}());



/***/ }),

/***/ "./src/app/modules/customers/customers.service.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/customers/customers.service.ts ***!
  \********************************************************/
/*! exports provided: CustomersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersService", function() { return CustomersService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var _core_services_logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
/*const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};*/
var CustomersService = /** @class */ (function () {
    function CustomersService(http) {
        this.http = http;
        this.message = 'Customer Created';
        this.apiUrl = _config_app_config__WEBPACK_IMPORTED_MODULE_3__["AppConfig"].endpoints['url'];
    }
    CustomersService_1 = CustomersService;
    CustomersService.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _core_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["LoggerService"].log(operation + " failed: " + error.message);
            if (error.status >= 500) {
                throw error;
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(result);
        };
    };
    CustomersService.prototype.getCustomers = function () {
        this.urlOption = _config_app_config__WEBPACK_IMPORTED_MODULE_3__["AppConfig"].urlOptions['customer'];
        return this.http.get(this.apiUrl + this.urlOption)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function () { return _core_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["LoggerService"].log("fetched customers"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(CustomersService_1.handleError('getCustomers', [])));
    };
    CustomersService.prototype.getCustomersById = function (id) {
        this.urlOption = _config_app_config__WEBPACK_IMPORTED_MODULE_3__["AppConfig"].urlOptions['customer'];
        var url = this.apiUrl + "/" + this.urlOption + "/" + id;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function () { return _core_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["LoggerService"].log("fetched customer id=" + id); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(CustomersService_1.handleError("getCustomer id=" + id)));
    };
    var CustomersService_1;
    CustomersService = CustomersService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CustomersService);
    return CustomersService;
}());



/***/ }),

/***/ "./src/app/modules/customers/customers/customers.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/modules/customers/customers/customers.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  customers works!\r\n</p>\r\n{{customers | json}}\r\n"

/***/ }),

/***/ "./src/app/modules/customers/customers/customers.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/modules/customers/customers/customers.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/customers/customers/customers.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/modules/customers/customers/customers.component.ts ***!
  \********************************************************************/
/*! exports provided: CustomersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersComponent", function() { return CustomersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _customers_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../customers.service */ "./src/app/modules/customers/customers.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import {MatDialog} from '@angular/material';
//import {Router} from '@angular/router';
//import {LoggerService} from '../../../core/services/logger.service';
//import {AppConfig} from '../../../config/app.config';
//RouterModule.forChild(routes)
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(customersService) {
        var _this = this;
        this.customersService = customersService;
        this.customersService.getCustomers().subscribe(function (customerlist) {
            _this.customers = customerlist;
            console.log(customerlist);
        });
    }
    CustomersComponent.prototype.ngOnInit = function () {
        //this.getCustomerList()
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", Object)
    ], CustomersComponent.prototype, "myNgForm", void 0);
    CustomersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customers',
            template: __webpack_require__(/*! ./customers.component.html */ "./src/app/modules/customers/customers/customers.component.html"),
            styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/modules/customers/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [_customers_service__WEBPACK_IMPORTED_MODULE_1__["CustomersService"]])
    ], CustomersComponent);
    return CustomersComponent;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\">\n  <label [attr.for]=\"task.key\">{{task.label}}</label>\n\n  <div [ngSwitch]=\"task.controlType\">\n\n    <input *ngSwitchCase=\"'textbox'\" [formControlName]=\"task.key\"\n            [id]=\"task.key\" [type]=\"task.type\">\n\n\n    <select [id]=\"task.key\" *ngSwitchCase=\"'dropdown'\" [formControlName]=\"task.key\">\n      <option *ngFor=\"let opt of task.options\" [value]=\"opt.key\">{{opt.value}}</option>\n    </select>\n\n  </div>\n\n  <div class=\"errorMessage\" *ngIf=\"!isValid\">{{task.label}} is required</div>\n</div>\n"

/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.ts ***!
  \**************************************************************************************/
/*! exports provided: DynamicFormTaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormTaskComponent", function() { return DynamicFormTaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_task_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/task-base */ "./src/app/modules/dynamicform/models/task-base.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicFormTaskComponent = /** @class */ (function () {
    function DynamicFormTaskComponent() {
    }
    Object.defineProperty(DynamicFormTaskComponent.prototype, "isValid", {
        get: function () { return this.form.controls[this.task.key].valid; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_task_base__WEBPACK_IMPORTED_MODULE_2__["TaskBase"])
    ], DynamicFormTaskComponent.prototype, "task", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], DynamicFormTaskComponent.prototype, "form", void 0);
    DynamicFormTaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task',
            template: __webpack_require__(/*! ./dynamic-form-task.component.html */ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-form-task.component.scss */ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.scss")]
        })
    ], DynamicFormTaskComponent);
    return DynamicFormTaskComponent;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n\n    <div *ngFor=\"let task of tasks\" class=\"form-row\">\n      <app-task [task]=\"task\" [form]=\"form\"></app-task>\n    </div>\n\n    <div class=\"form-row\">\n      <button type=\"submit\" [disabled]=\"!form.valid\">Save</button>\n    </div>\n  </form>\n\n  <div *ngIf=\"payLoad\" class=\"form-row\">\n    <strong>Saved the following values</strong><br>{{payLoad}}\n  </div>\n"

/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.ts ***!
  \****************************************************************************/
/*! exports provided: DynamicFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormComponent", function() { return DynamicFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _task_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../task-control.service */ "./src/app/modules/dynamicform/task-control.service.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(tcs, http) {
        this.tcs = tcs;
        this.http = http;
        this.tasks = [];
        this.payLoad = '';
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.tcs.toFormGroup(this.tasks);
    };
    DynamicFormComponent.prototype.onSubmit = function () {
        this.payLoad = JSON.stringify(this.form.value);
    };
    DynamicFormComponent.prototype.getTasks = function () {
        this.http.getTaskDetail('14').subscribe(function (tasks) {
            console.log(tasks);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DynamicFormComponent.prototype, "tasks", void 0);
    DynamicFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dynamic-form',
            template: __webpack_require__(/*! ./dynamic-form.component.html */ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-form.component.scss */ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.scss")],
            providers: [_task_control_service__WEBPACK_IMPORTED_MODULE_1__["TaskControlService"]]
        }),
        __metadata("design:paramtypes", [_task_control_service__WEBPACK_IMPORTED_MODULE_1__["TaskControlService"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/dynamic/dynamic.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamic/dynamic.component.ts ***!
  \******************************************************************/
/*! exports provided: DynamicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponent", function() { return DynamicComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _task_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../task.service */ "./src/app/modules/dynamicform/task.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicComponent = /** @class */ (function () {
    function DynamicComponent(service) {
        this.service = service;
        //this.tasks = this.service.getTasks();
        // this.tasks = this.service.getTaskDetail();
    }
    DynamicComponent.prototype.ngOnInit = function () { };
    DynamicComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dynamic',
            template: "\n    <div>\n      <h2>Job Application for Heroes</h2>\n      <app-dynamic-form [tasks]=\"tasks\"></app-dynamic-form>\n    </div>\n  ",
            providers: [_task_service__WEBPACK_IMPORTED_MODULE_1__["TaskService"]]
        }),
        __metadata("design:paramtypes", [_task_service__WEBPACK_IMPORTED_MODULE_1__["TaskService"]])
    ], DynamicComponent);
    return DynamicComponent;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/dynamicform.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/modules/dynamicform/dynamicform.module.ts ***!
  \***********************************************************/
/*! exports provided: DynamicformModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicformModule", function() { return DynamicformModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dynamic-form/dynamic-form.component */ "./src/app/modules/dynamicform/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var _dynamic_form_task_dynamic_form_task_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dynamic-form-task/dynamic-form-task.component */ "./src/app/modules/dynamicform/dynamic-form-task/dynamic-form-task.component.ts");
/* harmony import */ var _dynamic_dynamic_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dynamic/dynamic.component */ "./src/app/modules/dynamicform/dynamic/dynamic.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DynamicformModule = /** @class */ (function () {
    function DynamicformModule() {
    }
    DynamicformModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ],
            declarations: [
                _dynamic_form_dynamic_form_component__WEBPACK_IMPORTED_MODULE_3__["DynamicFormComponent"],
                _dynamic_form_task_dynamic_form_task_component__WEBPACK_IMPORTED_MODULE_4__["DynamicFormTaskComponent"],
                _dynamic_dynamic_component__WEBPACK_IMPORTED_MODULE_5__["DynamicComponent"]
            ],
            providers: [],
        })
    ], DynamicformModule);
    return DynamicformModule;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/models/task-base.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/dynamicform/models/task-base.ts ***!
  \*********************************************************/
/*! exports provided: TaskBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskBase", function() { return TaskBase; });
var TaskBase = /** @class */ (function () {
    function TaskBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    return TaskBase;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/task-control.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/dynamicform/task-control.service.ts ***!
  \*************************************************************/
/*! exports provided: TaskControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskControlService", function() { return TaskControlService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskControlService = /** @class */ (function () {
    function TaskControlService() {
    }
    TaskControlService.prototype.toFormGroup = function (tasks) {
        var group = {};
        tasks.forEach(function (task) {
            group[task.key] = task.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](task.value || '', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
                : new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](task.value || '');
        });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group);
    };
    TaskControlService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TaskControlService);
    return TaskControlService;
}());



/***/ }),

/***/ "./src/app/modules/dynamicform/task-textbox.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/dynamicform/task-textbox.ts ***!
  \*****************************************************/
/*! exports provided: TaskTextbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskTextbox", function() { return TaskTextbox; });
/* harmony import */ var _models_task_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/task-base */ "./src/app/modules/dynamicform/models/task-base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TaskTextbox = /** @class */ (function (_super) {
    __extends(TaskTextbox, _super);
    function TaskTextbox(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.type = options['type'] || '';
        return _this;
    }
    return TaskTextbox;
}(_models_task_base__WEBPACK_IMPORTED_MODULE_0__["TaskBase"]));



/***/ }),

/***/ "./src/app/modules/dynamicform/task.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/dynamicform/task.service.ts ***!
  \*****************************************************/
/*! exports provided: TaskService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskService", function() { return TaskService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _task_textbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-textbox */ "./src/app/modules/dynamicform/task-textbox.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Observable, Subject } from 'rxjs';
var TaskService = /** @class */ (function () {
    function TaskService(
    // private httpClient: HttpClient,
    api) {
        this.api = api;
        this.API_URL = 'http://127.0.0.1:8000';
    }
    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    TaskService.prototype.getTasks = function () {
        var task = [
            new _task_textbox__WEBPACK_IMPORTED_MODULE_1__["TaskTextbox"]({
                key: 'name',
                label: 'name',
                value: 'frankie',
                required: true,
                id: 1
            }),
            new _task_textbox__WEBPACK_IMPORTED_MODULE_1__["TaskTextbox"]({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                id: 2
            }),
            new _task_textbox__WEBPACK_IMPORTED_MODULE_1__["TaskTextbox"]({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                id: 3
            })
        ];
        return task.sort(function (a, b) { return a.order - b.order; });
    };
    TaskService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], TaskService);
    return TaskService;
}());

/////////////////////////
//       work on     ///
///////////////////////
/*
  getTaskDetail() {
    const id = '14'
    return this.api.getTaskDetail(id).subscribe(tasks => {
      for (var v[0] in tasks)
      {
        var val= JSON.stringify(v);
        var key = JSON.stringify(tasks[v]);
        console.log(val,key)
      }
    });
  }
  */


/***/ }),

/***/ "./src/app/nav.service.ts":
/*!********************************!*\
  !*** ./src/app/nav.service.ts ***!
  \********************************/
/*! exports provided: NavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavService", function() { return NavService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavService = /** @class */ (function () {
    function NavService() {
    }
    NavService.prototype.closeNav = function () {
        this.appDrawer.close();
    };
    NavService.prototype.openNav = function () {
        this.appDrawer.open();
    };
    NavService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], NavService);
    return NavService;
}());



/***/ }),

/***/ "./src/app/pages/_directives/modal/modal.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/_directives/modal/modal.component.ts ***!
  \************************************************************/
/*! exports provided: ModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/modal.service */ "./src/app/pages/_services/modal.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ModalComponent = /** @class */ (function () {
    function ModalComponent(modalService, el) {
        this.modalService = modalService;
        this.el = el;
        this.element = el.nativeElement;
    }
    ModalComponent.prototype.ngOnInit = function () {
        var modal = this;
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);
        // close modal on background click
        this.element.addEventListener('click', function (e) {
            if (e.target.className === 'modal') {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    };
    // remove self from modal service when directive is destroyed
    ModalComponent.prototype.ngOnDestroy = function () {
        this.modalService.remove(this.id);
        this.element.remove();
    };
    // open modal
    ModalComponent.prototype.open = function () {
        this.element.style.display = 'block';
        document.body.classList.add('modal-open');
    };
    // close modal
    ModalComponent.prototype.close = function () {
        this.element.style.display = 'none';
        document.body.classList.remove('modal-open');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "id", void 0);
    ModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'modal',
            template: '<ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ModalComponent);
    return ModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/pages/_directives/time-diff/time-difference/time-difference.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"countdown\">\r\n  <span *ngFor=\"let time of display; let i = index\" class=\"measurements {{time}}\">\r\n    <span class=\"measurements-number\">\r\n      {{ (showZero && displayNumbers[i] < 10) ? '0' + displayNumbers[i].trim() : displayNumbers[i]}}\r\n    </span>\r\n   <!-- <span *ngIf=\"display[i+1]\" class=\"divider\"> {{divider}} </span> -->\r\n   <span class=\"measurements-text\">\r\n      {{time}}\r\n   </span>\r\n  </span>\r\n</span>\r\n<ng-content></ng-content>"

/***/ }),

/***/ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/pages/_directives/time-diff/time-difference/time-difference.component.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".countdown {\n  display: absolute;\n  align-items: center;\n  justify-content: center;\n  align-content: center;\n  font-size: 10px;\n  text-align: center; }\n  .countdown .divider {\n    float: right; }\n  .grid-container {\n  margin: 20px; }\n  .dashboard-card {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  right: 15px;\n  bottom: 15px; }\n  .more-button {\n  position: absolute;\n  top: 5px;\n  right: 10px; }\n  .dashboard-card-content {\n  text-align: center; }\n"

/***/ }),

/***/ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/pages/_directives/time-diff/time-difference/time-difference.component.ts ***!
  \******************************************************************************************/
/*! exports provided: TimeDifferenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeDifferenceComponent", function() { return TimeDifferenceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimeDifferenceComponent = /** @class */ (function () {
    function TimeDifferenceComponent() {
        var _this = this;
        this.displayString = '';
        this.showZero = false;
        this.reached = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.display = [];
        this.displayNumbers = [];
        this.wasReached = false;
        setInterval(function () { return _this._displayString(); }, 100);
    }
    TimeDifferenceComponent.prototype._displayString = function () {
        if (this.wasReached) {
            return;
        }
        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }
        var givenDate = new Date(this.end);
        var now = new Date();
        var dateDifference = givenDate - now;
        if ((dateDifference < 100 && dateDifference > 0) || dateDifference < 0 && !this.wasReached) {
            this.wasReached = true;
            this.reached.next(now);
        }
        var lastUnit = this.units[this.units.length - 1], unitConstantForMillisecs = {
            year: (((1000 * 60 * 60 * 24 * 7) * 4) * 12),
            month: ((1000 * 60 * 60 * 24 * 7) * 4),
            weeks: (1000 * 60 * 60 * 24 * 7),
            days: (1000 * 60 * 60 * 24),
            hours: (1000 * 60 * 60),
            minutes: (1000 * 60),
            seconds: 1000
        }, unitsLeft = {}, returnText = '', returnNumbers = '', totalMillisecsLeft = dateDifference, i, unit;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {
                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);
                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit +
                        ' is not supported. Please use following units: year, month, weeks, days, hours, minutes, seconds, milliseconds');
                }
                // If it was reached, everything is zero
                unitsLeft[unit] = (this.wasReached) ? 0 : totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];
                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                }
                else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;
                // If it's less than 0, round to 0
                unitsLeft[unit] = (unitsLeft[unit] > 0) ? unitsLeft[unit] : 0;
                returnNumbers += ' ' + unitsLeft[unit] + ' | ';
                returnText += ' ' + unit;
            }
        }
        if (this.text === null || !this.text) {
            this.text = {
                Year: 'Yr',
                Month: 'Mo.',
                Weeks: 'Wk.',
                Days: 'Days',
                Hours: 'Hrs.',
                Minutes: 'Min.',
                Seconds: 'Seconds',
                MilliSeconds: 'Milliseconds'
            };
        }
        this.displayString = returnText
            .replace('Year', this.text.Year + ' | ')
            .replace('Month', this.text.Month + ' | ')
            .replace('Weeks', this.text.Weeks + ' | ')
            .replace('Days', this.text.Days + ' | ')
            .replace('Hours', this.text.Hours + ' | ')
            .replace('Minutes', this.text.Minutes + ' | ')
            .replace('Seconds', this.text.Seconds);
        this.displayNumbers = returnNumbers.split('|');
        this.display = this.displayString.split('|');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TimeDifferenceComponent.prototype, "units", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TimeDifferenceComponent.prototype, "end", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TimeDifferenceComponent.prototype, "displayString", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TimeDifferenceComponent.prototype, "text", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TimeDifferenceComponent.prototype, "divider", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TimeDifferenceComponent.prototype, "showZero", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TimeDifferenceComponent.prototype, "reached", void 0);
    TimeDifferenceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-time-difference',
            template: __webpack_require__(/*! ./time-difference.component.html */ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.html"),
            styles: [__webpack_require__(/*! ./time-difference.component.scss */ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TimeDifferenceComponent);
    return TimeDifferenceComponent;
}());



/***/ }),

/***/ "./src/app/pages/_guards/auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/_guards/auth.guard.ts ***!
  \*********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/pages/_guards/index.ts":
/*!****************************************!*\
  !*** ./src/app/pages/_guards/index.ts ***!
  \****************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ "./src/app/pages/_guards/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });




/***/ }),

/***/ "./src/app/pages/_helpers/error.interceptor.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/_helpers/error.interceptor.ts ***!
  \*****************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services */ "./src/app/pages/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                _this.authenticationService.logout();
                location.reload(true);
            }
            var error = err.error.message || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/pages/_helpers/index.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/_helpers/index.ts ***!
  \*****************************************/
/*! exports provided: ErrorInterceptor, JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.interceptor */ "./src/app/pages/_helpers/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _error_interceptor__WEBPACK_IMPORTED_MODULE_0__["ErrorInterceptor"]; });

/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt.interceptor */ "./src/app/pages/_helpers/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__["JwtInterceptor"]; });





/***/ }),

/***/ "./src/app/pages/_helpers/jwt.interceptor.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/_helpers/jwt.interceptor.ts ***!
  \***************************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/pages/_services/authentication.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/_services/authentication.service.ts ***!
  \***********************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.errors = [];
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' })
        };
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post("http://127.0.0.1:8000/api-token-auth/", { username: username, password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.token));
            }
            console.log(user.token);
            console.log(user);
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.updateData = function (token) {
        this.token = localStorage.getItem('currentUser');
        this.errors = [];
        var token_parts = this.token.split(/\./);
        var token_decoded = JSON.parse(window.atob(token_parts[1]));
        console.log(token_decoded);
        this.token_expires = new Date(token_decoded.exp * 1000);
        this.username = token_decoded.username;
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/pages/_services/index.ts":
/*!******************************************!*\
  !*** ./src/app/pages/_services/index.ts ***!
  \******************************************/
/*! exports provided: AuthenticationService, UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.service */ "./src/app/pages/_services/authentication.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ "./src/app/pages/_services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]; });





/***/ }),

/***/ "./src/app/pages/_services/modal.service.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/_services/modal.service.ts ***!
  \**************************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
var ModalService = /** @class */ (function () {
    function ModalService() {
        this.modals = [];
    }
    ModalService.prototype.add = function (modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    };
    ModalService.prototype.remove = function (id) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(function (x) { return x.id !== id; });
    };
    ModalService.prototype.open = function (id) {
        // open modal specified by id
        var modal = this.modals.filter(function (x) { return x.id === id; })[0];
        modal.open();
    };
    ModalService.prototype.close = function (id) {
        // close modal specified by id
        var modal = this.modals.filter(function (x) { return x.id === id; })[0];
        modal.close();
    };
    return ModalService;
}());



/***/ }),

/***/ "./src/app/pages/_services/user.service.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/_services/user.service.ts ***!
  \*************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get("/users");
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/pages/customer/customer-table/customer-table.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/customer/customer-table/customer-table.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<div *ngIf=\"recieve\">\r\n  updating: {{recieve | json}}\r\n  <span *ngFor=\"let c of recieve\">{{recieve.id}}</span>\r\n</div>\r\n\r\n\r\n<div>\r\n<button mat-raised-button (click)=\"openAddDialog()\">\r\n  Add New Customer<i class=\"material-icons\" style=\"font-size:40px; color: forestgreen\">add_box</i>\r\n</button>\r\n</div>\r\n  <table mat-table [dataSource]=\"customers\" matSort class=\"mat-elevation-z8\" >\r\n\r\n  <!-- Name Column -->\r\n    <ng-container matColumnDef=\"ID\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.id}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Weight Column -->\r\n    <ng-container matColumnDef=\"NAME\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.name}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Symbol Column -->\r\n    <ng-container matColumnDef=\"ADDRESS1\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 1 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.address1}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ADDRESS2\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 2 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.address2}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ADDRESS3\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 3 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.address3}} </mat-cell>\r\n    </ng-container>\r\n  <ng-container matColumnDef=\"COUNTRY\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Country </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.country}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"STATE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> State </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.state}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ZIP\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Zip </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.zip}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"EMAIL\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> E-mail </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.email}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"PHONE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Phone # </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.phone}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"WEBSITE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Website </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.website}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"DESCRIPTION\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Description </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let customers\"> {{customers.description}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"UPDATE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Update </mat-header-cell>\r\n      <mat-cell  *matCellDef=\"let customers\"> <button mat-raised-button (click)=\"openUpdateDialog()\">Update</button></mat-cell>\r\n    </ng-container>\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\" (click)=\"onRowClicked(row)\"></mat-row>\r\n  </table>\r\n\r\n  <mat-card>\r\n    Main Theme:\r\n    <button mat-raised-button color=\"primary\">\r\n      Primary\r\n    </button>\r\n    <button mat-raised-button color=\"accent\">\r\n      Accent\r\n    </button>\r\n    <button mat-raised-button color=\"warn\">\r\n      Warning\r\n    </button>\r\n  </mat-card>\r\n  \r\n  <mat-card class=\"alternate-theme\">\r\n    Alternate Theme:\r\n    <button mat-raised-button color=\"primary\">\r\n      Primary\r\n    </button>\r\n    <button mat-raised-button color=\"accent\">\r\n      Accent\r\n    </button>\r\n    <button mat-raised-button color=\"warn\">\r\n      Warning\r\n    </button>\r\n  </mat-card>"

/***/ }),

/***/ "./src/app/pages/customer/customer-table/customer-table.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/customer/customer-table/customer-table.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/pages/customer/customer-table/customer-table.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/customer/customer-table/customer-table.component.ts ***!
  \***************************************************************************/
/*! exports provided: CustomerTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerTableComponent", function() { return CustomerTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared.service */ "./src/app/pages/customer/shared.service.ts");
/* harmony import */ var _forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component */ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_services/message.service */ "./src/app/_services/message.service.ts");
/* harmony import */ var src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/config/app.config */ "./src/app/config/app.config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CustomerTableComponent = /** @class */ (function () {
    function CustomerTableComponent(apiService, dialog, service, msgServ) {
        this.apiService = apiService;
        this.dialog = dialog;
        this.service = service;
        this.msgServ = msgServ;
        this.displayedColumns = [
            'ID', 'NAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3',
            'COUNTRY', 'STATE', 'ZIP', 'EMAIL', 'PHONE',
            'WEBSITE', 'DESCRIPTION', 'UPDATE',
        ];
        this.customerUrl = 'customer/';
        this.msgServ.sendUrl(src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.customer);
    }
    CustomerTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCustomers();
        this.subscription = this.service.getMessage().subscribe(function (message) { return _this.recieve = message; });
        this.sendUrl(this.customerUrl);
    };
    CustomerTableComponent.prototype.sendMessage = function (message) {
        // send message to subscribers via observable subject
        this.service.sendMessage(message);
    };
    CustomerTableComponent.prototype.clearMessage = function () {
        // clear message
        this.service.clearMessage();
    };
    CustomerTableComponent.prototype.setUrl = function () {
        var url = src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.customer;
        console.log(url);
        return this.msgServ.sendUrl(url);
    };
    CustomerTableComponent.prototype.sendUrl = function (message) {
        // send message to subscribers via observable subject
        this.msgServ.sendUrl(message);
    };
    CustomerTableComponent.prototype.getCustomers = function () {
        var _this = this;
        this.apiService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
        });
    };
    CustomerTableComponent.prototype.onRowClicked = function (row) {
        this.selectedrow = row;
        console.log(this.selectedrow);
    };
    CustomerTableComponent.prototype.openAddDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_4__["DynamicFormRequestComponent"], {
            width: '700px',
            data: { url: src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.customer, update: false }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.apiService.getCustomers().subscribe(function (customers) {
                _this.customers = customers;
                result = _this.customers;
                console.log(result);
            });
        });
    };
    CustomerTableComponent.prototype.openUpdateDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_4__["DynamicFormRequestComponent"], {
            width: '700px',
            data: { url: src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.customer, formData: this.selectedrow, update: true }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.apiService.getCustomers().subscribe(function (customers) {
                _this.customers = customers;
                result = _this.customers;
                console.log(result);
            });
        });
    };
    CustomerTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customer-table',
            template: __webpack_require__(/*! ./customer-table.component.html */ "./src/app/pages/customer/customer-table/customer-table.component.html"),
            styles: [__webpack_require__(/*! ./customer-table.component.scss */ "./src/app/pages/customer/customer-table/customer-table.component.scss")]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            _shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"]])
    ], CustomerTableComponent);
    return CustomerTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/customer/shared.service.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/customer/shared.service.ts ***!
  \**************************************************/
/*! exports provided: SharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedService", function() { return SharedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//import {Customer} from '../../modules/models/customer.model';
var SharedService = /** @class */ (function () {
    function SharedService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    SharedService.prototype.sendMessage = function (customer) {
        this.subject.next(customer);
    };
    SharedService.prototype.clearMessage = function () {
        this.subject.next();
    };
    SharedService.prototype.getMessage = function () {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    };
    SharedService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
    ], SharedService);
    return SharedService;
}());



/***/ }),

/***/ "./src/app/pages/factory/factory-contact/factory-contact.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/pages/factory/factory-contact/factory-contact.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  factory-contact works!\n</p>\n\n\n\n<mat-card class=\"alternate-theme\">\n    <mat-card-header>\n        <mat-card-title>Add Contact</mat-card-title>\n    </mat-card-header>\n    <mat-card-content>\n\n\n      <form [formGroup]=\"contactForm\" class=\"alternate-theme\">      \n          &nbsp;\n           <mat-form-field class=\"form-element\">\n           <input matInput placeholder=\"First Name\" formControlName='first_name'>\n           </mat-form-field>\n          &nbsp;\n           <mat-form-field class=\"form-element\">\n           <input matInput placeholder=\"Last Name\" formControlName=\"contact_last_name\">\n           </mat-form-field>\n          &nbsp;\n           <mat-form-field class=\"form-element\">\n           <input matInput placeholder=\"Phone #\" formControlName=\"contact_phone_number\">\n           </mat-form-field>\n\n          &nbsp;\n          <mat-form-field class=\"form-element\">\n          <input matInput placeholder=\"Email\" formControlName=\"contact_email\">\n          </mat-form-field>\n\n          &nbsp;\n          <button mat-raised-button  color=\"primary\" class='mat-elevation-z8' (click)=\"addContact(contactForm)\">Submit</button>\n\n       </form>\n    </mat-card-content>\n</mat-card>\n\n\n<div *ngIf=\"!post; else forminfo\" novalidate>\n<div class=\"mat-elevation-z8\">\n\n\n    <mat-table #table [dataSource]=\"contacts\" fromGroupName='contactForm'>\n\n      <!--- Note that these columns can be defined in any order.\n      <mat-table #table [dataSource]=\"dataSource\" formArrayName=\"contact\">\n            The actual rendered columns are set as a property on the row definition\" -->\n\n      <!-- Position Column -->\n      <ng-container matColumnDef=\"id\">\n        <mat-header-cell *matHeaderCellDef> Id. </mat-header-cell>\n        <mat-cell *matCellDef=\"let contacts\"> {{contacts.id}} </mat-cell>\n      </ng-container>\n\n      <!-- Name Column -->\n      <ng-container matColumnDef=\"first_name\">\n        <mat-header-cell *matHeaderCellDef> First Name </mat-header-cell>\n        <mat-cell *matCellDef=\"let contacts\"> {{contacts.first_name}} </mat-cell>\n      </ng-container>\n\n      <!-- Weight Column -->\n      <ng-container matColumnDef=\"contact_last_name\">\n        <mat-header-cell *matHeaderCellDef> Last Name </mat-header-cell>\n        <mat-cell *matCellDef=\"let contacts\"> {{contacts.last_name}} </mat-cell>\n      </ng-container>\n\n      <!-- Symbol Column -->\n      <ng-container matColumnDef=\"contact_phone_number\">\n        <mat-header-cell *matHeaderCellDef> Phone # </mat-header-cell>\n        <mat-cell *matCellDef=\"let contacts\"> {{contacts.contact_phone_number}} </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"contact_email\">\n        <mat-header-cell *matHeaderCellDef> Phone # </mat-header-cell>\n        <mat-cell *matCellDef=\"let contacts\"> {{contacts.contact_email}} </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\" ></mat-row>\n    </mat-table>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/factory/factory-contact/factory-contact.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/pages/factory/factory-contact/factory-contact.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.table {\n  width: 75%;\n  margin-left: 12.5%;\n  margin-right: 12.5%; }\n\ntable {\n  width: 100%;\n  overflow: auto; }\n\ntd {\n  width: 3%; }\n\nimg {\n  width: 50px;\n  height: auto; }\n"

/***/ }),

/***/ "./src/app/pages/factory/factory-contact/factory-contact.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/pages/factory/factory-contact/factory-contact.component.ts ***!
  \****************************************************************************/
/*! exports provided: FactoryContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryContactComponent", function() { return FactoryContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FactoryContactComponent = /** @class */ (function () {
    function FactoryContactComponent(apiService, fb) {
        this.apiService = apiService;
        this.fb = fb;
        this.displayedColumns = ['id', 'first_name', 'contact_last_name',
            'contact_phone_number', 'contact_email'];
        this.dataSource = this.contacts;
        this.contactForm = this.fb.group({
            first_name: [''],
            contact_last_name: [''],
            contact_phone_number: [''],
            contact_email: [''],
        });
        this.getfactories();
        this.contactForm = this.fb.group({
            'first_name': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            'contact_last_name': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            'contact_phone_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            'contact_email': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
    }
    FactoryContactComponent.prototype.ngAfterViewInit = function () {
    };
    FactoryContactComponent.prototype.getfactories = function () {
        var _this = this;
        this.apiService.getFactoryContacts().subscribe(function (contact) {
            _this.contacts = contact;
        });
    };
    FactoryContactComponent.prototype.addContact = function (form) {
        var _this = this;
        var newform = form.value;
        return this.apiService.createFactoryContact(newform).subscribe(function (rsp) {
            console.log(rsp);
            _this.getfactories();
        });
    };
    FactoryContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-factory-contact',
            template: __webpack_require__(/*! ./factory-contact.component.html */ "./src/app/pages/factory/factory-contact/factory-contact.component.html"),
            styles: [__webpack_require__(/*! ./factory-contact.component.scss */ "./src/app/pages/factory/factory-contact/factory-contact.component.scss")]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], FactoryContactComponent);
    return FactoryContactComponent;
}());



/***/ }),

/***/ "./src/app/pages/factory/factory-shared.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/factory/factory-shared.service.ts ***!
  \*********************************************************/
/*! exports provided: FactorySharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactorySharedService", function() { return FactorySharedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//import {Customer} from '../../modules/models/customer.model';
var FactorySharedService = /** @class */ (function () {
    function FactorySharedService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    FactorySharedService.prototype.sendMessage = function (factory) {
        this.subject.next(factory);
    };
    FactorySharedService.prototype.clearMessage = function () {
        this.subject.next();
    };
    FactorySharedService.prototype.getMessage = function () {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    };
    FactorySharedService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
    ], FactorySharedService);
    return FactorySharedService;
}());



/***/ }),

/***/ "./src/app/pages/factory/factory-table/factory-table.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/pages/factory/factory-table/factory-table.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n<button mat-raised-button (click)=\"openAddDialog()\">Add Mat Modal</button>\r\n</div>\r\n  <mat-table class=\"alternate-theme\" [dataSource]=\"factories\" matSort class=\"mat-elevation-z8\" >\r\n\r\n  <!-- Name Column -->\r\n    <ng-container matColumnDef=\"ID\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.id}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Weight Column -->\r\n    <ng-container matColumnDef=\"NAME\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.name}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Symbol Column -->\r\n    <ng-container matColumnDef=\"ADDRESS1\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 1 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.address1}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ADDRESS2\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 2 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.address2}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ADDRESS3\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Address 3 </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.address3}} </mat-cell>\r\n    </ng-container>\r\n  <ng-container matColumnDef=\"COUNTRY\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Country </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.country}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"STATE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> State </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.state}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"ZIP\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Zip </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.zip}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"EMAIL\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> E-mail </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.email}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"PHONE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Phone # </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.phone}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"WEBSITE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Website </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.website}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"DESCRIPTION\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Description </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let factories\"> {{factories.description}} </mat-cell>\r\n    </ng-container>\r\n    <ng-container matColumnDef=\"UPDATE\">\r\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Update </mat-header-cell>\r\n      <mat-cell  *matCellDef=\"let factories\"> <button color=\"primary\" mat-raised-button (click)=\"openUpdateDialog(factories.id)\">Update</button></mat-cell>\r\n    </ng-container>\r\n    <mat-header-row  *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row  (click)=\"onRowClicked(row)\" color=\"warm\" *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n  \r\n"

/***/ }),

/***/ "./src/app/pages/factory/factory-table/factory-table.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/pages/factory/factory-table/factory-table.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\nth {\n  color: \"primary\"; }\n"

/***/ }),

/***/ "./src/app/pages/factory/factory-table/factory-table.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/pages/factory/factory-table/factory-table.component.ts ***!
  \************************************************************************/
/*! exports provided: FactoryTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryTableComponent", function() { return FactoryTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _factory_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factory-shared.service */ "./src/app/pages/factory/factory-shared.service.ts");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/modal.service */ "./src/app/pages/_services/modal.service.ts");
/* harmony import */ var _forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component */ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.ts");
/* harmony import */ var frontendmodules_dev_src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! frontendmodules-dev/src/app/config/app.config */ "./frontendmodules-dev/src/app/config/app.config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FactoryTableComponent = /** @class */ (function () {
    function FactoryTableComponent(apiService, dialog, service, modalService) {
        this.apiService = apiService;
        this.dialog = dialog;
        this.service = service;
        this.modalService = modalService;
        this.displayedColumns = [
            'ID', 'NAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3',
            'COUNTRY', 'STATE', 'ZIP', 'EMAIL', 'PHONE',
            'WEBSITE', 'DESCRIPTION', 'UPDATE',
        ];
    }
    FactoryTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getfactories();
        this.subscription = this.service.getMessage().subscribe(function (message) { return _this.recieve = message; });
    };
    FactoryTableComponent.prototype.sendMessage = function (message) {
        // send message to subscribers via observable subject
        this.service.sendMessage(message);
    };
    FactoryTableComponent.prototype.clearMessage = function () {
        // clear message
        this.service.clearMessage();
    };
    FactoryTableComponent.prototype.getfactories = function () {
        var _this = this;
        this.apiService.factories().subscribe(function (factories) {
            _this.factories = factories;
        });
    };
    FactoryTableComponent.prototype.onRowClicked = function (row) {
        this.selectedrow = row;
        console.log(this.selectedrow);
    };
    FactoryTableComponent.prototype.openUpdateDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_5__["DynamicFormRequestComponent"], {
            width: '700px',
            data: { url: frontendmodules_dev_src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.factory, update: false, formData: this.selectedrow }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.apiService.factories().subscribe(function (factories) {
                _this.factories = factories;
                result = _this.factories;
                console.log(result);
            });
        });
    };
    FactoryTableComponent.prototype.openAddDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_5__["DynamicFormRequestComponent"], {
            width: '700px',
            data: { url: frontendmodules_dev_src_app_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.factory, update: false }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.apiService.factories().subscribe(function (factories) {
                _this.factories = factories;
                result = _this.factories;
                console.log(result);
            });
        });
    };
    FactoryTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-factory-table',
            template: __webpack_require__(/*! ./factory-table.component.html */ "./src/app/pages/factory/factory-table/factory-table.component.html"),
            styles: [__webpack_require__(/*! ./factory-table.component.scss */ "./src/app/pages/factory/factory-table/factory-table.component.scss")]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            _factory_shared_service__WEBPACK_IMPORTED_MODULE_3__["FactorySharedService"],
            _services_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"]])
    ], FactoryTableComponent);
    return FactoryTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/factory/factory.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/factory/factory.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/factory/factory.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/factory/factory.component.ts ***!
  \****************************************************/
/*! exports provided: FactoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryComponent", function() { return FactoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FactoryComponent = /** @class */ (function () {
    function FactoryComponent() {
    }
    FactoryComponent.prototype.ngOnInit = function () {
    };
    FactoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-factory',
            template: "factory.component.html",
            styles: [__webpack_require__(/*! ./factory.component.scss */ "./src/app/pages/factory/factory.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FactoryComponent);
    return FactoryComponent;
}());



/***/ }),

/***/ "./src/app/pages/login/login.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"login-main-div\">\n<mat-card class=\"example-card\" class=\"z-depth center\" flex=\"50\" >\n\n    <mat-card-content>\n\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n                    \n                <div class=\"form-group\">\n                        <label for=\"username\">Username</label>\n                        <input type=\"text\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\n                    <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input type=\"password\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\n                    <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                    </div>\n                </div>\n\n            <div class=\"form-group\">\n                <button mat-button [disabled]=\"loading\" color=\"primary\">Login</button>\n                <div *ngIf=\"loading\" >\n                        <mat-spinner></mat-spinner>\n                </div>\n            </div>\n            \n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n    </mat-card-content>\n</mat-card>\n</div>\n<!--\n    <div class=\"form-group\">\n        <label for=\"username\">Username</label>\n        <input type=\"text\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\n        <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n            <div *ngIf=\"f.username.errors.required\">Username is required</div>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input type=\"password\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\n        <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n            <div *ngIf=\"f.password.errors.required\">Password is required</div>\n        </div>\n    </div>-->\n\n\n"

/***/ }),

/***/ "./src/app/pages/login/login.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-center {\n  width: 75%;\n  margin: 10px auto; }\n\n.login-main-div {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n"

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services */ "./src/app/pages/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent.prototype.getJwt = function () {
        var token = localStorage.getItem('currentUser');
        console.log(token);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-detail/order-detail.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/pages/orders/order-detail/order-detail.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  order-detail works!\n</p>\n"

/***/ }),

/***/ "./src/app/pages/orders/order-detail/order-detail.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/orders/order-detail/order-detail.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/orders/order-detail/order-detail.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/orders/order-detail/order-detail.component.ts ***!
  \*********************************************************************/
/*! exports provided: OrderDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailComponent", function() { return OrderDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderDetailComponent = /** @class */ (function () {
    function OrderDetailComponent() {
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
    };
    OrderDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-order-detail',
            template: __webpack_require__(/*! ./order-detail.component.html */ "./src/app/pages/orders/order-detail/order-detail.component.html"),
            styles: [__webpack_require__(/*! ./order-detail.component.scss */ "./src/app/pages/orders/order-detail/order-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/index.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/index.ts ***!
  \**********************************************************/
/*! exports provided: OrderTask, OrderTaskForm, OrderTaskTodo, OrderTaskTodosForm, OrderTaskGroups, SetNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-task */ "./src/app/pages/orders/order-task/_models/order-task.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTask", function() { return _order_task__WEBPACK_IMPORTED_MODULE_0__["OrderTask"]; });

/* harmony import */ var _order_task_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order-task-form */ "./src/app/pages/orders/order-task/_models/order-task-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTaskForm", function() { return _order_task_form__WEBPACK_IMPORTED_MODULE_1__["OrderTaskForm"]; });

/* harmony import */ var _order_task_todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-task-todo */ "./src/app/pages/orders/order-task/_models/order-task-todo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTaskTodo", function() { return _order_task_todo__WEBPACK_IMPORTED_MODULE_2__["OrderTaskTodo"]; });

/* harmony import */ var _order_task_todo_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order-task-todo-form */ "./src/app/pages/orders/order-task/_models/order-task-todo-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTaskTodosForm", function() { return _order_task_todo_form__WEBPACK_IMPORTED_MODULE_3__["OrderTaskTodosForm"]; });

/* harmony import */ var _order_task_groups__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order-task-groups */ "./src/app/pages/orders/order-task/_models/order-task-groups.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTaskGroups", function() { return _order_task_groups__WEBPACK_IMPORTED_MODULE_4__["OrderTaskGroups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetNames", function() { return _order_task_groups__WEBPACK_IMPORTED_MODULE_4__["SetNames"]; });








/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/order-task-form.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/order-task-form.ts ***!
  \********************************************************************/
/*! exports provided: OrderTaskForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskForm", function() { return OrderTaskForm; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");

var OrderTaskForm = /** @class */ (function () {
    function OrderTaskForm(task) {
        this.order = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.todos_group = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.set_name = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.active = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.set_status = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.todos = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormArray"]([]);
        if (task.order) {
            this.order.setValue(task.order);
        }
        if (task.todos_group) {
            this.todos_group.setValue(task.todos_group);
        }
        if (task.set_name) {
            this.set_name.setValue(task.set_name);
        }
        if (task.active) {
            this.active.setValue(task.active);
        }
        if (task.set_status) {
            this.set_status.setValue(task.set_status);
        }
        if (task.todos) {
            this.todos.setValue([task.todos]);
        }
    }
    return OrderTaskForm;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/order-task-groups.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/order-task-groups.ts ***!
  \**********************************************************************/
/*! exports provided: OrderTaskGroups, SetNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskGroups", function() { return OrderTaskGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetNames", function() { return SetNames; });
var OrderTaskGroups = /** @class */ (function () {
    function OrderTaskGroups() {
    }
    return OrderTaskGroups;
}());

var SetNames = /** @class */ (function () {
    function SetNames() {
    }
    return SetNames;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/order-task-todo-form.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/order-task-todo-form.ts ***!
  \*************************************************************************/
/*! exports provided: OrderTaskTodosForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskTodosForm", function() { return OrderTaskTodosForm; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");

var OrderTaskTodosForm = /** @class */ (function () {
    function OrderTaskTodosForm(todo) {
        this.todo = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.duedate = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.comment = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.status = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.todo.setValue(todo.todo);
        this.todo.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]);
        this.comment.setValue(todo.comment);
        this.duedate.setValue(todo.duedate);
        this.status.setValue(todo.status);
    }
    return OrderTaskTodosForm;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/order-task-todo.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/order-task-todo.ts ***!
  \********************************************************************/
/*! exports provided: OrderTaskTodo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskTodo", function() { return OrderTaskTodo; });
var OrderTaskTodo = /** @class */ (function () {
    function OrderTaskTodo(todo, comment, duedate, status) {
        this.todo = todo || "";
        this.comment = comment || "";
        this.duedate = duedate || "";
        this.status = status || "";
    }
    return OrderTaskTodo;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_models/order-task.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_models/order-task.ts ***!
  \***************************************************************/
/*! exports provided: OrderTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTask", function() { return OrderTask; });
var OrderTask = /** @class */ (function () {
    function OrderTask(todos_group, todos, set_status, active) {
        this.todos_group = todos_group;
        this.set_status = set_status;
        this.active = active || true;
        this.todos = todos;
    }
    return OrderTask;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/_service/order-task-form.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/orders/order-task/_service/order-task-form.service.ts ***!
  \*****************************************************************************/
/*! exports provided: OrderTaskFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskFormService", function() { return OrderTaskFormService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_order_task_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/order-task-form */ "./src/app/pages/orders/order-task/_models/order-task-form.ts");
/* harmony import */ var _models_order_task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/order-task */ "./src/app/pages/orders/order-task/_models/order-task.ts");
/* harmony import */ var _models_order_task_todo_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_models/order-task-todo-form */ "./src/app/pages/orders/order-task/_models/order-task-todo-form.ts");
/* harmony import */ var _models_order_task_todo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/order-task-todo */ "./src/app/pages/orders/order-task/_models/order-task-todo.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OrderTaskFormService = /** @class */ (function () {
    function OrderTaskFormService(fb, apiService) {
        this.fb = fb;
        this.apiService = apiService;
        this.ordertaskGroups$ = this.ordertaskGroups;
        // public taskGroup$: Observable<Task[]> = this.taskGroups.asObservable();
        this.ordertaskForm = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.fb.group(new _models_order_task_form__WEBPACK_IMPORTED_MODULE_3__["OrderTaskForm"](new _models_order_task__WEBPACK_IMPORTED_MODULE_4__["OrderTask"](''))));
        this.ordertaskForm$ = this.ordertaskForm.asObservable();
        // this.getTaskGroups(); use for old
        // console.log(this.ordertaskGroups); use for old
        this.ordertaskGroups = this.getTaskGroups();
        console.log('your options are :', this.ordertaskGroups);
    }
    OrderTaskFormService.prototype.addTodos = function () {
        var currentOrderTask = this.ordertaskForm.getValue();
        var currentOrderTaskTodos = currentOrderTask.get('todos');
        currentOrderTaskTodos.push(this.fb.group(new _models_order_task_todo_form__WEBPACK_IMPORTED_MODULE_5__["OrderTaskTodosForm"](new _models_order_task_todo__WEBPACK_IMPORTED_MODULE_6__["OrderTaskTodo"]())));
        this.ordertaskForm.next(currentOrderTask);
    };
    OrderTaskFormService.prototype.deleteTodos = function (i) {
        var currentOrderTask = this.ordertaskForm.getValue();
        var currentOrderTaskTodos = currentOrderTask.get('todos');
        currentOrderTaskTodos.removeAt(i);
        this.ordertaskForm.next(currentOrderTask);
    };
    /*
    getTaskGroups() {
      return this.apiService.getTaskGroups()
      .subscribe(taskGroup => this.ordertaskGroups = taskGroup);
    }*/
    OrderTaskFormService.prototype.consoleTaskGroups = function () {
        var currentOrderTask = this.ordertaskForm.getValue();
        var currentGroupName = currentOrderTask.get('todos_group').value;
        this.ordertaskForm.getValue().get('todos_group').setValue(this.ordertaskGroups[0].id);
        console.log(this.ordertaskGroups[0].id, currentGroupName);
    };
    OrderTaskFormService.prototype.clearForm = function () {
        var currentOrderTask = this.ordertaskForm.getValue();
        var currentOrderTaskTodos = currentOrderTask.get('todos');
        while (currentOrderTaskTodos.length !== 0) {
            currentOrderTaskTodos.removeAt(0);
            console.log('current task is: ', currentOrderTask);
        }
    };
    OrderTaskFormService.prototype.clearTodos = function () {
        var currentOrderTask = this.ordertaskForm.getValue();
        var currentOrderTaskTodos = currentOrderTask.get('todos');
        while (currentOrderTaskTodos.length !== 0) {
            console.log(currentOrderTaskTodos.value);
            currentOrderTaskTodos.removeAt(0);
            console.log('length is ', currentOrderTaskTodos.length);
        }
    };
    OrderTaskFormService.prototype.getTaskGroups = function () {
        var options = [];
        this.apiService.getTaskGroups().subscribe(function (taskSet) {
            var keys = Object.keys(taskSet[0]);
            var value = Object.values(taskSet);
            for (var set in taskSet) {
                var optiond = {};
                optiond['group_name'] = taskSet[set].group_name;
                optiond['id'] = taskSet[set].id;
                optiond['set_names'] = taskSet[set].set_names;
                options.push(optiond);
            }
        });
        return this.ordertaskGroups = options;
    };
    OrderTaskFormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"]])
    ], OrderTaskFormService);
    return OrderTaskFormService;
}());



/***/ }),

/***/ "./src/app/pages/orders/order-task/order-task.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-task.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <h1 *ngIf='order'>Create Task For {{order.buyer_style_number}}</h1>\n  <h4 *ngIf='update != false && order'>Update Tasks For {{order.buyer_style_number}}</h4>\n\n\n  <form *ngIf=\"update==false\" [formGroup]=\"ordertaskForm\" >\n  <div *ngIf='ordertaskGroups'>\n\n      <mat-form-field class=\"form-element\">\n        <mat-select matInput  placeholder=\"Choose Group Set\" formControlName='todos_group' >\n          <mat-option *ngFor=\"let grp of ordertaskGroups\" value={{grp.group_name}}  (click)=\"setmasterGroupMessage(grp)\">\n          <span class=\"mat-option-text\">{{grp.group_name}}</span>\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    \n  &nbsp;\n      <mat-form-field  *ngIf='masterGroupMessage' class=\"form-element\">\n        <mat-select matInput  placeholder=\"Select Task Set\" formControlName='set_name'>\n          <mat-option *ngFor=\"let set of masterGroupMessage; let i=index\" value={{set.set_name}} (click)=\"getBlanketTask(set.id)\">\n            <span class=\"mat-option-text\">{{set.set_name}}</span>\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <br />\n\n      <mat-form-field  class=\"form-element\">\n        <mat-select matInput  placeholder=\"Master Set Status\" formControlName='set_status'>\n          <mat-option *ngFor=\"let option of statusOption ;let i=index\" value={{option}}>\n            <span class=\"mat-option-text\">{{option}}</span>\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      &nbsp;\n      <mat-checkbox formControlName=\"active\">Active</mat-checkbox>\n  </div>\n\n    <h3><button mat-mini-fab (click)=\"addOrderTodos()\" style=\"background-color:whitesmoke\"><mat-icon>add</mat-icon></button>\n      Add Tasks To Set\n    </h3>\n    <ul>\n      <li *ngFor=\"let todo of orderTodos?.controls; let i = index\">\n        <app-order-todos [index]=\"i\" [orderTaskTodoForm]=\"todo\" [selectedId]=\"selectedId\" (deleteTodos)=\"deleteTodos($event)\"></app-order-todos>\n      </li>\n    </ul>\n\n\n\n    <button mat-raised-button (click)=createOrderTask()>Add Task To Order</button>\n    </form>\n    createOrderTask\n    <pre>Parent Form Status: <span class=\"status\">{{ordertaskForm.status}} <br />{{ordertaskForm.value | json}}</span></pre>\n    {{updateId}}\n\n    <div *ngIf=\"update != false && order\"> \n      <form  [formGroup]=\"ordertaskForm\">\n       \n        <mat-form-field class=\"form-element\">\n          <mat-select matInput  placeholder=\"Choose Task Set\" formControlName='set_name'>\n            <mat-option *ngFor=\"let task of order.tasks\" value={{task.set_name}} (click)=\"updateBlanketTask(task.todos)\" (click)=\"setOrderAndGroup(task)\">\n              <span class=\"mat-option-text\">{{task.set_name}}</span>\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <div *ngIf='selectedOrderTask'>\n          <mat-form-field  class=\"form-element\">\n            <mat-select matInput  placeholder=\"Master Set Status\" formControlName='set_status' value={{selectedOrderTask.set_status}}>\n              <mat-option *ngFor=\"let option of statusOption ;let i=index\" value={{option}}> \n                <span class=\"mat-option-text\">{{option}}</span>\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n          &nbsp;\n          <mat-checkbox formControlName=\"active\">Active</mat-checkbox>\n        </div>\n      \n        <h3>Add Tasks To Set</h3>\n        <button mat-button-raised color=\"primary\" (click)=\"addOrderTodos()\">Add Todos</button>\n        <ul>\n          <li *ngFor=\"let todo of orderTodos?.controls; let i = index\">\n            <app-order-todos [index]=\"i\" [orderTaskTodoForm]=\"todo\" [selectedId]=\"selectedId\" (deleteTodos)=\"deleteTodos($event)\"></app-order-todos>\n          </li>\n        </ul>\n          <button mat-raised-button (click)=updateOrderTask()>Add Task To Order</button>\n      </form>\n    </div>      \n"

/***/ }),

/***/ "./src/app/pages/orders/order-task/order-task.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-task.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ul {\n  list-style-type: none; }\n\n.status {\n  color: green;\n  font-weight: 800; }\n\n.ng-invalid .status {\n  color: red; }\n"

/***/ }),

/***/ "./src/app/pages/orders/order-task/order-task.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-task.component.ts ***!
  \*****************************************************************/
/*! exports provided: OrderTaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTaskComponent", function() { return OrderTaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _service_order_task_form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_service/order-task-form.service */ "./src/app/pages/orders/order-task/_service/order-task-form.service.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_models */ "./src/app/pages/orders/order-task/_models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrderTaskComponent = /** @class */ (function () {
    function OrderTaskComponent(orderTFS, apiService, fb) {
        this.orderTFS = orderTFS;
        this.apiService = apiService;
        this.fb = fb;
        this.statusOption = ['NA', 'Started', 'Complete'];
        this.update = false;
    }
    OrderTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ordertaskFormSub = this.orderTFS.ordertaskForm$
            .subscribe(function (task) {
            _this.ordertaskForm = task;
            _this.orderTodos = _this.ordertaskForm.get('todos');
            _this.setName = _this.ordertaskForm.get('set_name');
        });
        this.ordertaskGroups = this.orderTFS.ordertaskGroups;
        console.log('you got these task groups form service: ', this.ordertaskGroups);
    };
    ///// ADD and Delete todos parent--> child/////
    OrderTaskComponent.prototype.addOrderTodos = function () {
        this.orderTFS.addTodos();
    };
    OrderTaskComponent.prototype.deleteTodos = function (index) {
        this.orderTFS.deleteTodos(index);
    };
    ///used in the dropdown
    OrderTaskComponent.prototype.setmasterGroupMessage = function (event) {
        this.ordertaskForm.get('order').setValue(this.order.id);
        var set_names = event.set_names;
        this.masterGroupMessage = set_names;
        console.log(this.masterGroupMessage);
    };
    OrderTaskComponent.prototype.getBlanketTask = function (id) {
        var _this = this;
        this.apiService.getTaskDetail(id).subscribe(function (res) {
            _this.orderTFS.clearForm();
            if (_this.ordertaskForm.get('todos').value.length == 0) {
                var todos = res['todos'];
                for (var todo in todos) {
                    if (todos.hasOwnProperty(todo)) {
                        var todoslist = todos[todo];
                        // const currentTask = this.taskForm.getValue();
                        var currentTodos = _this.ordertaskForm.get('todos');
                        currentTodos.push(_this.fb.group(new _models__WEBPACK_IMPORTED_MODULE_4__["OrderTaskTodosForm"](new _models__WEBPACK_IMPORTED_MODULE_4__["OrderTaskTodo"](todoslist['todo']))));
                    }
                    else {
                        console.log('field');
                    }
                }
            }
            else {
                console.log('error');
            }
        });
    };
    OrderTaskComponent.prototype.updateBlanketTask = function (selectedtodos) {
        var todos = selectedtodos;
        this.selectedOrderTask = selectedtodos;
        this.updateId = selectedtodos['id'];
        this.orderTFS.clearForm();
        if (this.ordertaskForm.get('todos').value.length === 0) {
            for (var todo in todos) {
                if (todos.hasOwnProperty(todo)) {
                    var todoslist = todos[todo];
                    // const currentTask = this.taskForm.getValue();
                    var currentTodos = this.ordertaskForm.get('todos');
                    currentTodos.push(this.fb.group(new _models__WEBPACK_IMPORTED_MODULE_4__["OrderTaskTodosForm"](new _models__WEBPACK_IMPORTED_MODULE_4__["OrderTaskTodo"](todoslist['todo'], todoslist['comment'], todoslist['duedate'], todoslist['status']))));
                }
                else {
                    console.log('field');
                }
            }
        }
    };
    OrderTaskComponent.prototype.setOrderAndGroup = function (event) {
        this.updateId = event.id;
        this.ordertaskForm.get('order').setValue(event.order);
        this.ordertaskForm.get('todos_group').setValue(event.todos_group);
        this.ordertaskForm.get('set_status').setValue(event.set_status);
        this.ordertaskForm.get('active').setValue(event.active);
    };
    //  TODO: ADD ORDER TASK CREATE TO API
    OrderTaskComponent.prototype.createOrderTask = function () {
        this.apiService.addTaskToOrder(this.ordertaskForm.value).subscribe(function (response) {
            console.log(response);
        });
        this.orderTFS.clearForm();
    };
    OrderTaskComponent.prototype.updateOrderTask = function () {
        var _this = this;
        this.apiService.updateOrderTask(this.ordertaskForm.value, this.updateId).subscribe(function (response) {
            _this.orderTFS.clearForm();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OrderTaskComponent.prototype, "order", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], OrderTaskComponent.prototype, "update", void 0);
    OrderTaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-order-task',
            template: __webpack_require__(/*! ./order-task.component.html */ "./src/app/pages/orders/order-task/order-task.component.html"),
            styles: [__webpack_require__(/*! ./order-task.component.scss */ "./src/app/pages/orders/order-task/order-task.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_order_task_form_service__WEBPACK_IMPORTED_MODULE_3__["OrderTaskFormService"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], OrderTaskComponent);
    return OrderTaskComponent;
}());

/*
addOrdertASK(id) {
  const task = this.ordertaskForm.value;
  this.apiService.addTaskToOrder(task).subscribe(response => {
    console.log(response);
    });
}
/* TODO :: UPDATE ORDER TAK function
updateOrderTask() {
  this.apiService.updateTask(this.selectedId, this.taskForm.value).subscribe(response => {
    console.log(response);
  });
  this.clearTodosForm();
  this.router.navigate(['task-component']);
}*/


/***/ }),

/***/ "./src/app/pages/orders/order-task/order-todos/order-todos.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-todos/order-todos.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"orderTaskTodoForm\">\n  \n        <mat-form-field>\n          <input matInput formControlName=\"todo\" placeholder=\"Task Name\">\n        </mat-form-field>\n      \n      \n        <mat-form-field>\n          <textarea matInput formControlName=\"comment\" placeholder=\"Comment\"></textarea>\n        </mat-form-field>\n      \n      \n        <mat-form-field class=\"example-full-width\">\n          <input matInput [matDatepicker]=\"picker\" placeholder=\"Due Date\"formControlName=\"duedate\">\n          <mat-datepicker-toggle matSuffix [for]=\"picker\">\n            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n          </mat-datepicker-toggle>\n          <mat-datepicker #picker></mat-datepicker>\n        </mat-form-field>\n      \n      \n      <mat-form-field class=\"form-element\">\n      <mat-select matInput  placeholder=\"Status\" formControlName='status'>\n        <mat-option *ngFor=\"let status of status; let i=index\" value={{status}}>\n          <span class=\"mat-option-text\">{{status}}</span>\n        </mat-option>\n      </mat-select>\n      </mat-form-field>\n      \n      \n        <!-- emit delete event up w/ index of todos -->\n        <button mat-mini-fab (click)=\"delete()\" style=\"background-color:firebrick; color:white\"><mat-icon>remove</mat-icon></button>\n      \n\n  <!--<span class=\"status\">{{orderTaskTodoForm.status}}</span> -->\n</form>\n<div *ngIf='todos'>\n{{todos}}\n</div>\n{{todos | json}}\n"

/***/ }),

/***/ "./src/app/pages/orders/order-task/order-todos/order-todos.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-todos/order-todos.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field {\n  margin: 0 3rem;\n  padding: 10px 0 0; }\n\n.status {\n  color: green;\n  font-weight: 800; }\n\n.ng-invalid .status {\n  color: red; }\n"

/***/ }),

/***/ "./src/app/pages/orders/order-task/order-todos/order-todos.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/pages/orders/order-task/order-todos/order-todos.component.ts ***!
  \******************************************************************************/
/*! exports provided: OrderTodosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTodosComponent", function() { return OrderTodosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderTodosComponent = /** @class */ (function () {
    function OrderTodosComponent(api, fb) {
        this.api = api;
        this.fb = fb;
        this.status = ['na', 'started', 'complete'];
        this.deleteTodos = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    OrderTodosComponent.prototype.ngOnInit = function () {
    };
    /*ngOnChanges() {
      this.todos;
    }*/
    OrderTodosComponent.prototype.delete = function () {
        this.deleteTodos.emit(this.index);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], OrderTodosComponent.prototype, "orderTaskTodoForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OrderTodosComponent.prototype, "index", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], OrderTodosComponent.prototype, "selectedId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], OrderTodosComponent.prototype, "deleteTodos", void 0);
    OrderTodosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-order-todos',
            template: __webpack_require__(/*! ./order-todos.component.html */ "./src/app/pages/orders/order-task/order-todos/order-todos.component.html"),
            styles: [__webpack_require__(/*! ./order-todos.component.scss */ "./src/app/pages/orders/order-task/order-todos/order-todos.component.scss")]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], OrderTodosComponent);
    return OrderTodosComponent;
}());



/***/ }),

/***/ "./src/app/pages/orders/orders-add/orders-add.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/pages/orders/orders-add/orders-add.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  orders-add works!\r\n</p>\r\n<div class=\"container\" *ngIf=\"!post; else forminfo\" novalidate>\r\n   <form [formGroup]=\"orderForm\" class=\"form\" (ngSubmit)=\"onSubmit()\">\r\n\r\n     <mat-form-field class=\"form-element\">\r\n      <mat-select placeholder=\"customer\" formControlName='buyer'>\r\n       <mat-option *ngFor=\"let customer of customers\" [value]=\"customer.id\" >\r\n       {{ customer.name }}\r\n       </mat-option>\r\n      </mat-select>\r\n     </mat-form-field>\r\n    <br />\r\n    <mat-form-field class=\"form-element\">\r\n     <mat-select placeholder=\"Factory\" formControlName='factory'>\r\n      <mat-option *ngFor=\"let f of factories\" [value]=\"f.id\" >\r\n      {{ f.name }}\r\n      </mat-option>\r\n     </mat-select>\r\n    </mat-form-field>\r\n    <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Customer Order #\" formControlName=\"customer_order_number\">\r\n     </mat-form-field>\r\n    <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Buyer Style #\" formControlName=\"customer_order_number\">\r\n     </mat-form-field>\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Jp Style #\" formControlName=\"jp_style_number\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n        <input matInput [matDatepicker]=\"picker1\" placeholder=\"Target Date\" formControlName=\"due_date\" >\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker1\" ></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n        </mat-form-field>\r\n        &nbsp;\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput [matDatepicker]=\"picker\" placeholder=\"Factory Ship Date\" formControlName=\"factory_ship_date\" >\r\n     <mat-datepicker-toggle matSuffix [for]=\"picker\" ></mat-datepicker-toggle>\r\n     <mat-datepicker #picker></mat-datepicker>\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Cost From Factory\" formControlName=\"cost_from_factory\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Buyer's Price\" formControlName=\"buyers_price\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n       <mat-select placeholder=\"Shipment Type\" formControlName='order_type'>\r\n        <mat-option *ngFor=\"let order_type of types\" [value]='order_type'>\r\n          {{order_type}}\r\n        </mat-option>\r\n       </mat-select>\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Quantity\" formControlName=\"qty\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n       <mat-select placeholder=\"brand\" formControlName='brand'>\r\n        <mat-option *ngFor=\"let brand of brands\" [value]=\"brand\" >\r\n        {{brand}}\r\n        </mat-option>\r\n       </mat-select>\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"color\" formControlName=\"color\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <input (change)=\"uploadImage($event)\" type=\"file\" accept=\".png, .pdf, .jpg, .jpeg\"> <br>\r\n\r\n     <br />\r\n     <button type=\"submit\" class=\"btn btn-success\" >Submit</button>\r\n\r\n     <button type=\"close\" [mat-dialog-close]=\"true\">Exit</button>\r\n\r\n   </form>\r\n\r\n\r\n     <p>Form Value: {{ orderForm.value| json }}</p>\r\n"

/***/ }),

/***/ "./src/app/pages/orders/orders-add/orders-add.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/orders/orders-add/orders-add.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/orders/orders-add/orders-add.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/orders/orders-add/orders-add.component.ts ***!
  \*****************************************************************/
/*! exports provided: DD_MM_YYYY_Format, OrdersAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DD_MM_YYYY_Format", function() { return DD_MM_YYYY_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersAddComponent", function() { return OrdersAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _services_http_client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/http-client.service */ "./src/app/_services/http-client.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var _config_app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../config/app.config */ "./src/app/config/app.config.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var moment = moment__WEBPACK_IMPORTED_MODULE_7___default.a || moment__WEBPACK_IMPORTED_MODULE_7__;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
var DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var OrdersAddComponent = /** @class */ (function () {
    function OrdersAddComponent(fb, apiService, http) {
        this.fb = fb;
        this.apiService = apiService;
        this.http = http;
        this.version = _angular_material__WEBPACK_IMPORTED_MODULE_4__["VERSION"];
        this.brands = ['888', 'JP', 'AVE', 'OTHER'];
        //types = ["Delivary Duty Paid", "Freight On Board"];
        this.types = ['DDP', 'FOB', 'NA'];
        this.orderForm = this.fb.group({
            buyer: [''],
            factory: [''],
            customer_order_number: [''],
            buyer_style_number: [''],
            jp_style_number: [''],
            factory_ship_date: [''],
            cost_from_factory: [''],
            buyers_price: [''],
            qty: [''],
            order_type: [''],
            brand: [''],
            fiber_content: [''],
            jp_care_instructions: [''],
            color: [''],
            sweater_image: [null],
            due_date: ['']
        });
        this.orderForm = this.fb.group({
            'buyer': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'factory': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'customer_order_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'buyer_style_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'jp_style_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'factory_ship_date': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](moment().format('YYYY-MM-DD')),
            'cost_from_factory': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'buyers_price': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'qty': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'order_type': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'brand': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'fiber_content': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'jp_care_instructions': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'color': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'sweater_image': [null],
            'due_date': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](moment().format('YYYY-MM-DD'))
        });
    }
    OrdersAddComponent.prototype.ngOnInit = function () {
        this.getFactoryCustomer();
    };
    OrdersAddComponent.prototype.onFileChanged = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.orderForm.patchValue({
                    sweater_image: reader.result
                });
            };
        }
    };
    OrdersAddComponent.prototype.uploadImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function () {
                _this.orderForm.get('sweater_image').setValue(event.target.files[0]);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    OrdersAddComponent.prototype.getFactoryCustomer = function () {
        var _this = this;
        this.apiService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
            console.log(_this.customers);
        });
        this.apiService.factories().subscribe(function (factories) {
            _this.factories = factories;
            console.log(_this.factories);
        });
    }; /*
    createOrder() {
      this.orderForm.controls['factory_ship_date'].setValue(this.orderForm.controls['factory_ship_date'].value.format('YYYY-MM-DD'));
      const order = this.orderForm.value;
      console.log(order)
      this.apiService.createOrder(order).subscribe((response) => {
        console.log(response);
        this.orderForm.reset();
      });
    }*/
    OrdersAddComponent.prototype.onSubmit = function () {
        var _this = this;
        var uploadData = new FormData();
        if (this.orderForm.get('sweater_image').value != null) {
            var due_date = this.orderForm.get('due_date').value;
            due_date = moment(due_date).format('YYYY-MM-DD hh:mm');
            var factoryShipDate = this.orderForm.get('factory_ship_date').value;
            factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');
            console.log('date was formatted too : ', this.orderForm.value);
            uploadData.append('buyer', this.orderForm.get('buyer').value);
            uploadData.append('factory', this.orderForm.get('factory').value);
            uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
            uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
            uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
            uploadData.append('due_date', due_date);
            uploadData.append('factory_ship_date', factoryShipDate);
            uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
            uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
            uploadData.append('order_type', this.orderForm.get('order_type').value);
            uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
            uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
            uploadData.append('color', this.orderForm.get('color').value);
            uploadData.append('sweater_image', this.orderForm.get('sweater_image').value);
            /*this.apiService.createOrder(uploadData).subscribe(response => {
              console.log(response);
              this.orderForm.reset();*/
            this.http.post(_config_app_config__WEBPACK_IMPORTED_MODULE_6__["AppConfig"].urlOptions.orders, uploadData).subscribe(function (response) {
                console.log(response);
                _this.orderForm.reset();
            });
        }
        else {
            var due_date = this.orderForm.get('due_date').value;
            due_date = moment(due_date).format('YYYY-MM-DD hh:mm');
            var factoryShipDate = this.orderForm.get('factory_ship_date').value;
            factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');
            uploadData.append('buyer', this.orderForm.get('buyer').value);
            uploadData.append('factory', this.orderForm.get('factory').value);
            uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
            uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
            uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
            uploadData.append('due_date', due_date);
            uploadData.append('factory_ship_date', factoryShipDate);
            uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
            uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
            uploadData.append('order_type', this.orderForm.get('order_type').value);
            uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
            uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
            uploadData.append('color', this.orderForm.get('color').value);
            this.apiService.createOrder(uploadData).subscribe(function (response) {
                console.log(response);
                _this.orderForm.reset();
            });
        }
    };
    OrdersAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-orders-add',
            template: __webpack_require__(/*! ./orders-add.component.html */ "./src/app/pages/orders/orders-add/orders-add.component.html"),
            styles: [__webpack_require__(/*! ./orders-add.component.scss */ "./src/app/pages/orders/orders-add/orders-add.component.scss")],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_4__["DateAdapter"], useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_5__["MomentDateAdapter"], deps: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DATE_LOCALE"]] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DATE_FORMATS"], useValue: DD_MM_YYYY_Format },
            ]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _services_http_client_service__WEBPACK_IMPORTED_MODULE_3__["HttpClientService"]])
    ], OrdersAddComponent);
    return OrdersAddComponent;
}());



/***/ }),

/***/ "./src/app/pages/orders/orders-shared.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/orders/orders-shared.service.ts ***!
  \*******************************************************/
/*! exports provided: OrdersSharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersSharedService", function() { return OrdersSharedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrdersSharedService = /** @class */ (function () {
    function OrdersSharedService(httpClient) {
        this.httpClient = httpClient;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.factory = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.buyer = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.API_URL = 'http://127.0.0.1:8000';
    }
    OrdersSharedService.prototype.sendMessage = function (order) {
        this.subject.next(order);
    };
    OrdersSharedService.prototype.clearMessage = function () {
        this.subject.next();
    };
    OrdersSharedService.prototype.getMessage = function () {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    };
    OrdersSharedService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], OrdersSharedService);
    return OrdersSharedService;
}());



/***/ }),

/***/ "./src/app/pages/orders/orders-table/_service/order.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/orders/orders-table/_service/order.service.ts ***!
  \*********************************************************************/
/*! exports provided: OrderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return OrderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderService = /** @class */ (function () {
    function OrderService(http) {
        this.http = http;
    }
    OrderService.prototype.findOrders = function (buyer, dueDateBefore, dueDateAfter, ordering, buyerStyle, jpStyle) {
        return this.http.get('http://127.0.0.1:8000/orders/?', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('buyer', buyer.toString())
                .set('due_date_after', dueDateBefore.toString())
                .set('due_date_before', dueDateAfter.toString())
                .set('ordering', ordering.toString())
                .set('buyer_style_number', buyerStyle.toString())
                .set('jp_style_number', jpStyle.toString())
        });
    };
    OrderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], OrderService);
    return OrderService;
}());



/***/ }),

/***/ "./src/app/pages/orders/orders-table/orders-table.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/pages/orders/orders-table/orders-table.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n  <button (click)=\"decodeJwt()\">JWT</button>\r\n  <div *ngIf=\"cred\">{{cred}}</div>\r\n</div>\r\n<mat-accordion>\r\n  <mat-expansion-panel (opened)=\"panelOpenState = true\"\r\n                       (closed)=\"panelOpenState = false\">\r\n    <mat-expansion-panel-header>\r\n      <mat-panel-title>\r\n        Filters\r\n      </mat-panel-title>\r\n      <mat-panel-description>\r\n      </mat-panel-description>\r\n    </mat-expansion-panel-header>\r\n    \r\n    <table>\r\n      <tr>\r\n        <td><input matInput #buyerStyle maxlength=\"35\" placeholder=\"Enter some input\" style=\"border-bottom: .1px solid rgb(70, 66, 66)\"></td>\r\n          \r\n        <td><input matInput #jpStyle maxlength=\"35\" placeholder=\"Enter some input\" style=\"border-bottom: .1px solid rgb(70, 66, 66)\"></td>\r\n        <td><mat-form-field >\r\n          <mat-select [(value)]=\"selected\" placeholder=\"Select A Customer\">\r\n            <mat-option value=''>None</mat-option>\r\n            <mat-option *ngFor=\"let customer of uniqueCustomerFilter\" value={{customer}}>{{customer}}</mat-option>\r\n          </mat-select>\r\n          </mat-form-field></td>\r\n        <td><app-date-picker placeholder=\"Select Start Date\" [(ngModel)]=\"firstDate\" format=\"YYYY-MM-DD\"></app-date-picker></td>\r\n        <td><app-date-picker placeholder=\"Select End Date\" [(ngModel)]=\"secondDate\" format=\"YYYY-MM-DD\"></app-date-picker>  </td> \r\n        <td><button  mat-icon-button (click)=\"testOrderService(selected, firstDate, secondDate, '-id', buyerStyle.value ,jpStyle.value)\">\r\n          <mat-icon>refresh</mat-icon></button>\r\n        </td>     \r\n  </tr>\r\n</table>  \r\n  </mat-expansion-panel>\r\n</mat-accordion>\r\n\r\n\r\n  <mat-table [dataSource]=\"orders\" matSort class=\"mat-elevation-z8\">\r\n\r\n\r\n          \r\n        <ng-container matColumnDef=\"ID\">\r\n          <mat-header-cell *matHeaderCellDef mat-sort-header (click)=\"getSortOrders('id')\" fxFlex=\"45px\"> ID </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\" fxFlex=\"45px\"> {{order.id}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef fxFlex=\"45px\"></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"DUE DATE\">\r\n          <mat-header-cell *matHeaderCellDef mat-sort-header (click)=\"getSortOrders('due_date')\">Due Date</mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\" style=\"font-size:smaller \">\r\n            {{order.due_date | date:'MM/dd/yyyy'}}\r\n       <!-- <app-time-difference (reached)=\"callback($event)\" units=\"Month | Days | Hours | Minutes\"  end={{order.due_date}}></app-time-difference> -->\r\n            </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"BUYER\" >\r\n          <mat-header-cell *matHeaderCellDef  mat-sort-header (click)=\"getSortOrders('buyer__name')\" > BUYER </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.buyer_name}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"FACTORY\" class=\"overflow\">\r\n          <mat-header-cell *matHeaderCellDef > FACTORY </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.factory_name}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"ORDER NUMBER\">\r\n          <mat-header-cell *matHeaderCellDef > CUSTOMER ORDER ID </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.customer_order_number}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"BUYER STYLE #\">\r\n          <mat-header-cell *matHeaderCellDef > BUYER STYLE # </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.buyer_style_number}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"JP STYLE #\">\r\n          <mat-header-cell *matHeaderCellDef > JP STYLE # </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.jp_style_number}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef [ngClass]=\"{'aligne-right': true}\">JP Cost:</mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"FACTORY SHIP DT\">\r\n          <mat-header-cell *matHeaderCellDef > Factory Ship Date </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.factory_ship_date | date:'MM/dd/yyyy' }} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef style=\"font-size:xx-small \"> {{totalCost.jpCost | currency}}</mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"COST FROM FACTORY\">\r\n          <mat-header-cell *matHeaderCellDef > Cost From Factory </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.cost_from_factory}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef style=\"font-size:smaller \">Customers Paid: </mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"BUYER PRICE\">\r\n          <mat-header-cell *matHeaderCellDef > Price Buyer Paid </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.buyers_price}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef>  <span style=\"font-size:xx-small\">{{totalCost.buyerCost | currency}}</span> </mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"ORDER TYPE\">\r\n          <mat-header-cell *matHeaderCellDef > Order Type </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.order_type}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef>P&L</mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"QTY\">\r\n          <mat-header-cell *matHeaderCellDef > Quantity </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.qty}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef style=\"font-style: xx-small \">{{totalCost.simpleProfit | currency}}</mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"SWEATER IMG\">\r\n          <mat-header-cell *matHeaderCellDef > Image </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"><img src='{{order.sweater_image}}' /> </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"BRAND\">\r\n          <mat-header-cell *matHeaderCellDef > Brand </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"  *matCellDef=\"let order\"> {{order.brand}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"SWEATER DESCRIPTION\" class=\"overflow\">\r\n          <mat-header-cell *matHeaderCellDef > DESCRIPTION </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: xx-small\"  *matCellDef=\"let order\"> {{order.sweater_description}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"FIBER CONTENT\" class=\"overflow\">\r\n          <mat-header-cell *matHeaderCellDef > Fiber Content </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size:x-small\"  *matCellDef=\"let order\"> {{order.fiber_content}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"COLOR\">\r\n          <mat-header-cell *matHeaderCellDef > Color </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: xx-small\"  *matCellDef=\"let order\"> {{order.color}} </mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"UPDATE\">\r\n          <mat-header-cell *matHeaderCellDef > Update </mat-header-cell>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"   *matCellDef=\"let order\"> <button mat-raised-button (click)=\"openUpdateDialog(order.id)\">Update</button></mat-cell>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"TASKS\">\r\n          <mat-header-cell *matHeaderCellDef >Add Update Tasks </mat-header-cell>\r\n          <div>\r\n          <mat-cell mat-cell style=\"font-size: smaller\"   *matCellDef=\"let order\">\r\n                  <button mat-icon-button (click)=\"openModal('task-modal', order)\"><mat-icon>add</mat-icon></button>\r\n                  <button mat-icon-button (click)=\"openModal('update-task-modal',order)\" >\r\n                    <mat-icon matBadge='{{order.tasks.length}}' matBadgeSize=\"small\"  matBadgeColor=\"warn\" >\r\n                      update\r\n                    </mat-icon>\r\n                  </button>\r\n          </mat-cell>\r\n          </div>\r\n          <mat-footer-cell *matFooterCellDef></mat-footer-cell>\r\n        </ng-container>\r\n    <mat-header-row *matHeaderRowDef=\"displayColumns\" ></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayColumns;\" (click)=\"onRowClicked(row)\"></mat-row>\r\n    <mat-footer-row *matFooterRowDef=\"displayColumns\"></mat-footer-row>\r\n\r\n\r\n  </mat-table>\r\n\r\n<mat-card *ngIf=\"cred\">\r\n  {{cred | json}}\r\n</mat-card>\r\n\r\n<ng-container *ngIf='cards'>\r\n  <div *ngIf='order && order.tasks.length > 0'>\r\n    <div class='outer' fxLayout=\"row\" fxLayoutGap=\"20px\" >\r\n      <mat-card class=\"example-card\" fxFlex=\"25%\" *ngFor=\"let task of order.tasks\" fxLayoutGap=\"20px\">\r\n          <mat-card-header>\r\n              <mat-card-title>{{task.todos_group}} </mat-card-title>\r\n              <mat-card-subtitle>{{task.set_name}}</mat-card-subtitle>\r\n              <mat-card-subtitle\r\n               [ngClass]=\"{'Complete' : task.set_status === 'Complete',\r\n                'Not-Complete' : task.set_status === 'Started', 'NA': task.status === 'NA'}\">Status: {{task.set_status}}</mat-card-subtitle>\r\n            <div mat-card-avatar class=\"example-header-image\"><img src='{{order.sweater_image}}'></div>\r\n          </mat-card-header>\r\n          <mat-card-content *ngFor=\"let todo of task.todos\">\r\n            <div class=\"inner\">\r\n              <ol>\r\n            <li >Task Type {{todo.todo}} -- Status: {{todo.status}}</li >\r\n            <li #time ><app-time-difference (reached)=\"callback($event)\" units=\"Month | Days | Hours | Minutes\"  end={{todo.duedate}}></app-time-difference><li>\r\n            <li >Comment: {{todo.comment}}</li >\r\n              </ol>\r\n           </div>\r\n          </mat-card-content>\r\n      </mat-card>\r\n    </div>\r\n  </div>\r\n</ng-container>>\r\n\r\n\r\n<modal id=\"task-modal\">\r\n  <div class=\"modal\">\r\n    <div class=\"modal-body\">\r\n      <app-order-task [order]=\"order\"></app-order-task>\r\n      <button (click)=\"closeModal('task-modal');\">Close</button>\r\n    </div>\r\n  </div>\r\n<div class=\"modal-background\"></div>\r\n</modal>\r\n\r\n<modal id=\"update-task-modal\">\r\n    <div class=\"modal\">\r\n      <div class=\"modal-body\">\r\n        <app-order-task [order]=\"order\" [update]=\"true\"></app-order-task>\r\n        <button (click)=\"closeModal('custom-modal-1');\">Close</button>\r\n      </div>\r\n    </div>\r\n  <div class=\"modal-background\"></div>\r\n  </modal>\r\n"

/***/ }),

/***/ "./src/app/pages/orders/orders-table/orders-table.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/orders/orders-table/orders-table.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-table {\n  overflow: auto;\n  max-height: 350px; }\n\nimg {\n  height: 50px; }\n\n.Complete {\n  color: #0e970e; }\n\n.Not-Complete {\n  color: #ad1010; }\n\nmodal {\n  /* modals are hidden by default */\n  display: none; }\n\nmodal .modal {\n    /* modal container fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* z-index must be higher than .modal-background */\n    z-index: 1000;\n    /* enables scrolling for tall modals */\n    overflow: auto; }\n\nmodal .modal .modal-body {\n      padding: 20px;\n      background: #fff;\n      /* margin exposes part of the modal background */\n      margin: 40px; }\n\nmodal .modal-background {\n    /* modal background fixed across whole screen */\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    /* semi-transparent black  */\n    background-color: #000;\n    opacity: 0.75;\n    /* z-index must be below .modal and above everything else  */\n    z-index: 900; }\n\nbody.modal-open {\n  /* body overflow is hidden to hide main scrollbar when modal window is open */\n  overflow: hidden; }\n"

/***/ }),

/***/ "./src/app/pages/orders/orders-table/orders-table.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/orders/orders-table/orders-table.component.ts ***!
  \*********************************************************************/
/*! exports provided: DD_MM_YYYY_Format, OrdersTableComponent, OrdersDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DD_MM_YYYY_Format", function() { return DD_MM_YYYY_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersTableComponent", function() { return OrdersTableComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersDataSource", function() { return OrdersDataSource; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _orders_shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../orders-shared.service */ "./src/app/pages/orders/orders-shared.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../orders-update/orders-update.component */ "./src/app/pages/orders/orders-update/orders-update.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_services */ "./src/app/pages/_services/index.ts");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_services/modal.service */ "./src/app/pages/_services/modal.service.ts");
/* harmony import */ var _task_service_task_group_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../task/_service/task-group.service */ "./src/app/pages/task/_service/task-group.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_order_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_service/order.service */ "./src/app/pages/orders/orders-table/_service/order.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {OrdersAddComponent} from '../orders-add/orders-add.component';
// import {OrdersUpdateComponent} from '../orders-update/orders-update.component';
















var moment = moment__WEBPACK_IMPORTED_MODULE_14___default.a || moment__WEBPACK_IMPORTED_MODULE_14__;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
var DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var OrdersTableComponent = /** @class */ (function () {
    function OrdersTableComponent(apiService, shared, dialog, auth, modalService, tgs, route, router, ordersService) {
        this.apiService = apiService;
        this.shared = shared;
        this.dialog = dialog;
        this.auth = auth;
        this.modalService = modalService;
        this.tgs = tgs;
        this.route = route;
        this.router = router;
        this.ordersService = ordersService;
        //dataSource = new MatTableDataSource();
        this.displayColumns = [
            'ID', 'DUE DATE', 'BUYER', 'FACTORY', 'ORDER NUMBER', 'BUYER STYLE #', 'JP STYLE #',
            'FACTORY SHIP DT', 'COST FROM FACTORY', 'BUYER PRICE',
            'ORDER TYPE', 'QTY', 'SWEATER IMG', 'BRAND', 'SWEATER DESCRIPTION',
            'FIBER CONTENT', 'COLOR', 'UPDATE', 'TASKS'
        ];
        this.tododisplayColumns = ['todo', 'comment', 'duedate', 'status'];
        this.orderTask = false;
        this.serializedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormControl"](moment().format('YYYY-MM-DD'));
        this.serializedDate2 = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormControl"]((new Date()).toISOString());
        this.totalCost = {};
        this.f = [];
        this.token = localStorage.getItem('currentUser');
        this.myorders = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.myorders);
        this.cards = true;
        this.firstDate = moment();
        this.secondDate = moment();
    }
    OrdersTableComponent.prototype.ngOnInit = function () {
        this.getOrders('id');
        this.tgs.getTaskGroups();
    };
    OrdersTableComponent.prototype.ngAfterViewInit = function () {
        this.getOrders('id');
    };
    OrdersTableComponent.prototype.onRowClicked = function (row) {
        this.order = row;
        this.selectedTask = row.tasks;
        console.log('Row clicked: ', row);
    };
    OrdersTableComponent.prototype.sendMessage = function (message) {
        // send message to subscribers via observable subject
        this.shared.sendMessage(message);
    };
    OrdersTableComponent.prototype.clearMessage = function () {
        this.shared.clearMessage();
    };
    OrdersTableComponent.prototype.decodeJwt = function () {
        this.cred = this.auth.updateData(this.token);
    };
    OrdersTableComponent.prototype.getTaskGroup = function () {
        var _this = this;
        this.tgs.getMessage().subscribe(function (rsp) {
            _this.sentGroups = rsp;
        });
    };
    //   good but testing orderservice
    OrdersTableComponent.prototype.getOrders = function (id) {
        var _this = this;
        this.apiService.getOrders(id).subscribe(function (orders) {
            console.log(_this.apiService.getOrders);
            _this.orders = orders;
            _this.getTotalCost(orders);
            // this.dataSource = new MatTableDataSource(orders);
            _this.uniqueCustomerFilter = orders;
            _this.getUniqueCustomers(orders);
            return _this.orderSort = '-', _this.orders;
        });
    };
    OrdersTableComponent.prototype.getSortOrders = function (val) {
        var _this = this;
        this.sortVal = val;
        if (this.orderSort === '-') {
            this.apiService.getOrders(this.orderSort + val).subscribe(function (orders) {
                _this.orders = orders;
                // console.log(Object.keys(orders));
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](orders);
                _this.orderSort = '';
                // console.log(orders)
            });
        }
        else {
            this.apiService.getOrders(val).subscribe(function (orders) {
                _this.orders = orders;
                console.log(orders);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](orders);
                _this.orderSort = '-';
            });
        }
    };
    OrdersTableComponent.prototype.getTotalCost = function (order) {
        this.totalCost['jpCost'] = order.map(function (t) { return t.qty * t.cost_from_factory; }).reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCost['buyerCost'] = order.map(function (t) { return t.qty * t.buyers_price; }).reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCost['simpleProfit'] = this.totalCost.buyerCost - this.totalCost.jpCost;
        console.log(this.totalCost);
        return this.totalCost;
    };
    ////////////////////////////////////////////////////////////////
    ///         MODAL                                           ///
    //////////////////////////////////////////////////////////////
    OrdersTableComponent.prototype.openUpdateDialog = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_5__["OrdersUpdateComponent"], {
            width: '700px',
        });
        this.apiService.getOrdersDetails(id).subscribe(function (message) {
            _this.sendMessage(message);
        });
        dialogRef.afterOpen().subscribe(function (result) {
            console.log("Dailog result: " + result);
            _this.shared.getMessage().subscribe(function (response) {
                _this.message = response;
            });
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.apiService.getOrders().subscribe(function (orders) {
                _this.orders = orders;
                return dialogRef.close();
                //console.log(customers);
            });
        });
    };
    OrdersTableComponent.prototype.openModal = function (id, order, tasks) {
        //this.orderTask = false;
        //this.databaseId = databaseId;
        this.order = order;
        this.modalService.open(id);
    };
    OrdersTableComponent.prototype.closeModal = function (id) {
        this.modalService.close(id);
    };
    /////////////////////////////////////////////////////////////////
    //            FILTERS                                         //
    ///////////////////////////////////////////////////////////////
    OrdersTableComponent.prototype.getUniqueCustomers = function (orders) {
        var order = orders;
        var customers = [];
        for (var order_1 in orders) {
            if (orders[order_1].hasOwnProperty('buyer_name')) {
                customers.push(orders[order_1]['buyer_name']);
            }
            else {
                console.log('ooops');
            }
        }
        var uniqueCustomers = Array.from(new Set(customers));
        return this.uniqueCustomerFilter = uniqueCustomers;
    };
    OrdersTableComponent.prototype.testOrderService = function (buyer, dueDateBefore, dueDateAfter, ordering, buyerStyle, jpStyle) {
        var _this = this;
        this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, ordering, buyerStyle, jpStyle).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]); }))
            .subscribe(function (orders) {
            console.log(orders);
            _this.orders = orders;
            _this.getTotalCost(orders);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], OrdersTableComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], OrdersTableComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], OrdersTableComponent.prototype, "cards", void 0);
    OrdersTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-orders-table',
            template: __webpack_require__(/*! ./orders-table.component.html */ "./src/app/pages/orders/orders-table/orders-table.component.html"),
            styles: [__webpack_require__(/*! ./orders-table.component.scss */ "./src/app/pages/orders/orders-table/orders-table.component.scss")],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["DateAdapter"], useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__["MomentDateAdapter"], deps: [_angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DATE_LOCALE"]] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DATE_FORMATS"], useValue: DD_MM_YYYY_Format },
            ]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _orders_shared_service__WEBPACK_IMPORTED_MODULE_2__["OrdersSharedService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"],
            _services__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"],
            _services_modal_service__WEBPACK_IMPORTED_MODULE_8__["ModalService"],
            _task_service_task_group_service__WEBPACK_IMPORTED_MODULE_9__["TaskGroupService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            _service_order_service__WEBPACK_IMPORTED_MODULE_11__["OrderService"]])
    ], OrdersTableComponent);
    return OrdersTableComponent;
}());

var OrdersDataSource = /** @class */ (function () {
    function OrdersDataSource(ordersService) {
        this.ordersService = ordersService;
        this.ordersSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    OrdersDataSource.prototype.connect = function (collectionViewer) {
        return this.ordersSubject.asObservable();
    };
    OrdersDataSource.prototype.disconnect = function (collectionViewer) {
        this.ordersSubject.complete();
        this.loadingSubject.complete();
    };
    OrdersDataSource.prototype.loadOrders = function (buyer, dueDateBefore, dueDateAfter, ordering) {
        var _this = this;
        this.loadingSubject.next(true);
        this.ordersService.findOrders(buyer, dueDateBefore, dueDateAfter, ordering).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () { return _this.loadingSubject.next(false); }));
        // .subscribe(orders => this.ordersSubject.next(orders));
        // console.log("orders subject", this.ordersSubject);
    };
    return OrdersDataSource;
}());

/*
{
  params: new HttpParams()
      .set('ordering', ordering.toString())
      .set('page', page.toString())
      .set('page_size', page_size.toString())
}).pipe(
  map(res =>  res['results'])
);
}
*/
function mapOrder(array, order, key) {
    array.sort(function (a, b) {
        var A = a[key], B = b[key];
        if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
        }
        else {
            return -1;
        }
    });
    return array;
}
;


/***/ }),

/***/ "./src/app/pages/orders/orders-update/orders-update.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/pages/orders/orders-update/orders-update.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  orders-update works!\r\n</p>\r\n<div class=\"mdc-layout-grid\">\r\n  <div class=\"mdc-layout-grid__inner\">\r\n    <div class=\"mdc-layout-grid__cell\"></div>\r\n    <div class=\"mdc-layout-grid__cell\"></div>\r\n    <div class=\"mdc-layout-grid__cell\"></div>\r\n  </div>\r\n</div>\r\n<div class=\"container\" *ngIf=\"!post; else forminfo\" novalidate>\r\n  <mat-dialog-content>\r\n   <form [formGroup]=\"orderForm\" class=\"form\">\r\n\r\n      {{selectedOrder.buyer_name}}\r\n      <br />\r\n     <mat-form-field class=\"form-element\">\r\n      <mat-select placeholder=\"Change Customer\" formControlName='buyer'>\r\n       <mat-option *ngFor=\"let customer of customers\" value={{customer.id}}>\r\n        {{customer.name}}\r\n       </mat-option>\r\n     </mat-select>\r\n     </mat-form-field>\r\n    <br />\r\n    {{selectedOrder.factory_name}}\r\n    <br />\r\n    <mat-form-field class=\"form-element\">\r\n      <mat-select placeholder=\"Factory\" formControlName='factory'>\r\n       <mat-option *ngFor=\"let f of factory\" value={{f.id}}>\r\n         {{f.name}}\r\n       </mat-option>\r\n     </mat-select>\r\n    </mat-form-field>\r\n\r\n    <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Customer Order #\" formControlName=\"customer_order_number\">\r\n     </mat-form-field>\r\n\r\n    <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Buyer Style #\" formControlName=\"buyer_style_number\">\r\n     </mat-form-field>\r\n    <br />\r\n\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Jp Style #\" formControlName=\"jp_style_number\">\r\n     </mat-form-field>\r\n     <br />\r\n\r\n     <mat-form-field class=\"form-element\">\r\n        <input  matInput [matDatepicker]=\"picker2\" placeholder=\"Order Due Date\" formControlName=\"due_date\" >\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker2\" ></mat-datepicker-toggle>\r\n        <mat-datepicker #picker2></mat-datepicker>\r\n      </mat-form-field>\r\n\r\n      &nbsp;\r\n      &nbsp;\r\n      &nbsp;\r\n      &nbsp;\r\n      &nbsp;\r\n      &nbsp;\r\n     <mat-form-field class=\"form-element\">\r\n     <input  matInput [matDatepicker]=\"picker\" placeholder=\"Factory Ship Date\" formControlName=\"factory_ship_date\" >\r\n     <mat-datepicker-toggle matSuffix [for]=\"picker\" ></mat-datepicker-toggle>\r\n     <mat-datepicker #picker></mat-datepicker>\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Cost From Factory\" formControlName=\"cost_from_factory\">\r\n     </mat-form-field>\r\n\r\n     &nbsp;\r\n     &nbsp;\r\n     &nbsp;\r\n\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Buyer's Price\" formControlName=\"buyers_price\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <mat-select placeholder=\"type\" formControlName='order_type'>\r\n      <mat-option *ngFor=\"let type of types\" value='{{type}}'>\r\n        {{type}}\r\n      </mat-option>\r\n    </mat-select>\r\n    </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"Quantity\" formControlName=\"qty\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n       <input matInput placeholder=\"Brand\" formControlName=\"brand\">\r\n    </mat-form-field>\r\n\r\n     <br />\r\n     <mat-form-field class=\"form-element\">\r\n     <input matInput placeholder=\"color\" formControlName=\"color\">\r\n     </mat-form-field>\r\n\r\n     <br />\r\n     <input (change)=\"uploadImage($event)\" type=\"file\" accept=\".png, .pdf, .jpg, .jpeg\"> <br>\r\n\r\n\r\n\r\n     <br />\r\n\r\n     <button type=\"submit\" [disabled]=\"!orderForm.valid\" (click)=\"onSubmit()\" type=\"submit\" value=\"Send file\">Update</button>\r\n     <button type=\"close\" [mat-dialog-close]=\"true\">Exit</button>\r\n\r\n   </form>\r\n\r\n     <p>Form Value: {{ orderForm.value| json }}</p>\r\n</mat-dialog-content>\r\n     <!--\r\n     <mat-select placeholder=\"brand\" formControlName='brand'>\r\n      <mat-option *ngFor=\"let brand of brands\" [value]=\"brand\" >\r\n      </mat-option>\r\n    </mat-select>-->\r\n"

/***/ }),

/***/ "./src/app/pages/orders/orders-update/orders-update.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/orders/orders-update/orders-update.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/orders/orders-update/orders-update.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/orders/orders-update/orders-update.component.ts ***!
  \***********************************************************************/
/*! exports provided: DD_MM_YYYY_Format, OrdersUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DD_MM_YYYY_Format", function() { return DD_MM_YYYY_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersUpdateComponent", function() { return OrdersUpdateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _orders_shared_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../orders-shared.service */ "./src/app/pages/orders/orders-shared.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var moment = moment__WEBPACK_IMPORTED_MODULE_6___default.a || moment__WEBPACK_IMPORTED_MODULE_6__;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
var DD_MM_YYYY_Format = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var OrdersUpdateComponent = /** @class */ (function () {
    function OrdersUpdateComponent(sharedService, apiService, fb) {
        this.sharedService = sharedService;
        this.apiService = apiService;
        this.fb = fb;
        this.version = _angular_material__WEBPACK_IMPORTED_MODULE_3__["VERSION"];
        this.brands = ['888', 'JP', 'AVE', 'OTHER'];
        //types = ["Delivary Duty Paid", "Freight On Board"];
        this.types = ['DDP', 'FOB', 'NA'];
        this.orderForm = this.fb.group({
            buyer: [''],
            factory: [''],
            customer_order_number: [''],
            buyer_style_number: [''],
            jp_style_number: [''],
            factory_ship_date: [''],
            cost_from_factory: [''],
            buyers_price: [''],
            qty: [''],
            order_type: [''],
            brand: [''],
            fiber_content: [''],
            jp_care_instructions: [''],
            color: [''],
            sweater_image: [null],
            due_date: ['']
        });
        this.orderForm = this.fb.group({
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'buyer': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'factory': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'customer_order_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'buyer_style_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'jp_style_number': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'factory_ship_date': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](moment().format('YYYY-MM-DD')),
            'cost_from_factory': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'buyers_price': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'qty': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'order_type': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'brand': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'fiber_content': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'jp_care_instructions': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'color': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            'sweater_image': [null],
            'due_date': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](moment().format('YYYY-MM-DD'))
        });
    }
    OrdersUpdateComponent.prototype.ngOnInit = function () {
        this.getFactoryCustomer();
    };
    OrdersUpdateComponent.prototype.sendMessage = function (message) {
        this.sharedService.sendMessage(message);
    };
    OrdersUpdateComponent.prototype.clearMessage = function () {
        this.sharedService.clearMessage();
    };
    OrdersUpdateComponent.prototype.onFileChanged = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.orderForm.patchValue({
                    sweater_image: reader.result
                });
            };
        }
    };
    OrdersUpdateComponent.prototype.uploadImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function () {
                _this.orderForm.get('sweater_image').setValue(event.target.files[0]);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    OrdersUpdateComponent.prototype.onSubmit = function () {
        var uploadData = new FormData();
        var id = this.orderForm.get('id').value;
        if (this.orderForm.get('sweater_image').value != null) {
            var formateDate = this.orderForm.get('due_date').value;
            formateDate = moment(formateDate).format('YYYY-MM-DD hh:mm');
            var factoryShipDate = this.orderForm.get('factory_ship_date').value;
            factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');
            console.log('date was formatted too : ', this.orderForm.value);
            uploadData.append('id', this.orderForm.get('id').value);
            uploadData.append('buyer', this.orderForm.get('buyer').value);
            uploadData.append('factory', this.orderForm.get('factory').value);
            uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
            uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
            uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
            uploadData.append('due_date', formateDate);
            uploadData.append('factory_ship_date', factoryShipDate);
            uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
            uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
            uploadData.append('order_type', this.orderForm.get('order_type').value);
            uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
            uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
            uploadData.append('color', this.orderForm.get('color').value);
            uploadData.append('sweater_image', this.orderForm.get('sweater_image').value);
            this.apiService.updateOrder(id, uploadData).subscribe(function (response) {
                console.log(response);
            });
        }
        else {
            var formateDate = this.orderForm.get('due_date').value;
            formateDate = moment(formateDate).format('YYYY-MM-DD hh:mm');
            var factoryShipDate = this.orderForm.get('factory_ship_date').value;
            factoryShipDate = moment(factoryShipDate).format('YYYY-MM-DD hh:mm');
            console.log('date was formatted too : ', formateDate);
            uploadData.append('id', this.orderForm.get('id').value);
            uploadData.append('buyer', this.orderForm.get('buyer').value);
            uploadData.append('factory', this.orderForm.get('factory').value);
            uploadData.append('customer_order_number', this.orderForm.get('customer_order_number').value);
            uploadData.append('buyer_style_number', this.orderForm.get('buyer_style_number').value);
            uploadData.append('jp_style_number', this.orderForm.get('jp_style_number').value);
            uploadData.append('due_date', formateDate);
            uploadData.append('factory_ship_date', factoryShipDate);
            uploadData.append('cost_from_factory', this.orderForm.get('cost_from_factory').value);
            uploadData.append('buyers_price', this.orderForm.get('buyers_price').value);
            uploadData.append('order_type', this.orderForm.get('order_type').value);
            uploadData.append('fiber_content', this.orderForm.get('fiber_content').value);
            uploadData.append('jp_care_instructions', this.orderForm.get('jp_care_instructions').value);
            uploadData.append('color', this.orderForm.get('color').value);
            this.apiService.updateOrder(id, uploadData).subscribe(function (response) {
                console.log(response);
            });
        }
    };
    OrdersUpdateComponent.prototype.getFactoryCustomer = function () {
        var _this = this;
        this.apiService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
            //console.log(this.customers);
        });
        this.apiService.factories().subscribe(function (factories) {
            _this.factory = factories;
            //console.log(this.factory);
        });
        this.subscription = this.sharedService.getMessage().subscribe(function (message) {
            console.log(message);
            var myOrder = message;
            _this.selectedOrder = message;
            _this.orderForm.get('id').setValue(myOrder['id']);
            _this.orderForm.get('buyer').setValue(myOrder['buyer']);
            _this.orderForm.get('factory').setValue(myOrder['factory']);
            _this.orderForm.get('customer_order_number').setValue(myOrder['customer_order_number']);
            _this.orderForm.get('buyer_style_number').setValue(myOrder['buyer_style_number']);
            _this.orderForm.get('jp_style_number').setValue(myOrder['jp_style_number']);
            _this.orderForm.get('factory_ship_date').setValue(myOrder['factory_ship_date']);
            _this.orderForm.get('cost_from_factory').setValue(myOrder['cost_from_factory']);
            _this.orderForm.get('buyers_price').setValue(myOrder['buyers_price']);
            _this.orderForm.get('qty').setValue(myOrder['qty']);
            _this.orderForm.get('order_type').setValue(myOrder['order_type']);
            _this.orderForm.get('brand').setValue(myOrder['brand']);
            _this.orderForm.get('fiber_content').setValue(myOrder['fiber_content']);
            _this.orderForm.get('jp_care_instructions').setValue(myOrder['jp_care_instructions']);
            _this.orderForm.get('color').setValue(myOrder['color']);
            _this.orderForm.get('due_date').setValue(myOrder['due_date']);
        });
    };
    OrdersUpdateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-orders-update',
            template: __webpack_require__(/*! ./orders-update.component.html */ "./src/app/pages/orders/orders-update/orders-update.component.html"),
            styles: [__webpack_require__(/*! ./orders-update.component.scss */ "./src/app/pages/orders/orders-update/orders-update.component.scss")],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"], useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_4__["MomentDateAdapter"], deps: [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DATE_LOCALE"]] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DATE_FORMATS"], useValue: DD_MM_YYYY_Format },
            ]
        }),
        __metadata("design:paramtypes", [_orders_shared_service__WEBPACK_IMPORTED_MODULE_2__["OrdersSharedService"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]])
    ], OrdersUpdateComponent);
    return OrdersUpdateComponent;
}());



/***/ }),

/***/ "./src/app/pages/pages.module.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _customer_customer_table_customer_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customer/customer-table/customer-table.component */ "./src/app/pages/customer/customer-table/customer-table.component.ts");
/* harmony import */ var _orders_orders_table_orders_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./orders/orders-table/orders-table.component */ "./src/app/pages/orders/orders-table/orders-table.component.ts");
/* harmony import */ var _orders_orders_add_orders_add_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./orders/orders-add/orders-add.component */ "./src/app/pages/orders/orders-add/orders-add.component.ts");
/* harmony import */ var _orders_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./orders/orders-update/orders-update.component */ "./src/app/pages/orders/orders-update/orders-update.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_helpers */ "./src/app/pages/_helpers/index.ts");
/* harmony import */ var _factory_factory_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./factory/factory.component */ "./src/app/pages/factory/factory.component.ts");
/* harmony import */ var _factory_factory_table_factory_table_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./factory/factory-table/factory-table.component */ "./src/app/pages/factory/factory-table/factory-table.component.ts");
/* harmony import */ var _factory_factory_contact_factory_contact_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./factory/factory-contact/factory-contact.component */ "./src/app/pages/factory/factory-contact/factory-contact.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _task_create_task_set_task_set_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./task/create-task-set/task-set.component */ "./src/app/pages/task/create-task-set/task-set.component.ts");
/* harmony import */ var _task_create_task_set_todos_todos_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./task/create-task-set/todos/todos.component */ "./src/app/pages/task/create-task-set/todos/todos.component.ts");
/* harmony import */ var _task_service_task_form_service_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./task/_service/task-form-service.service */ "./src/app/pages/task/_service/task-form-service.service.ts");
/* harmony import */ var _task_create_task_set_task_update_task_update_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./task/create-task-set/task-update/task-update.component */ "./src/app/pages/task/create-task-set/task-update/task-update.component.ts");
/* harmony import */ var _task_service_task_group_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./task/_service/task-group.service */ "./src/app/pages/task/_service/task-group.service.ts");
/* harmony import */ var _task_task_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./task/task.component */ "./src/app/pages/task/task.component.ts");
/* harmony import */ var _task_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./task/add-task-group/add-task-group.component */ "./src/app/pages/task/add-task-group/add-task-group.component.ts");
/* harmony import */ var _task_create_task_set_task_set_dropdown_task_set_dropdown_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./task/create-task-set/task-set-dropdown/task-set-dropdown.component */ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.ts");
/* harmony import */ var _services_modal_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_services/modal.service */ "./src/app/pages/_services/modal.service.ts");
/* harmony import */ var _directives_modal_modal_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./_directives/modal/modal.component */ "./src/app/pages/_directives/modal/modal.component.ts");
/* harmony import */ var _orders_order_task_order_task_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./orders/order-task/order-task.component */ "./src/app/pages/orders/order-task/order-task.component.ts");
/* harmony import */ var _orders_order_task_service_order_task_form_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./orders/order-task/_service/order-task-form.service */ "./src/app/pages/orders/order-task/_service/order-task-form.service.ts");
/* harmony import */ var _orders_order_task_order_todos_order_todos_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./orders/order-task/order-todos/order-todos.component */ "./src/app/pages/orders/order-task/order-todos/order-todos.component.ts");
/* harmony import */ var _util_date_picker_date_picker_date_picker_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../_util/date-picker/date-picker/date-picker.component */ "./src/app/_util/date-picker/date-picker/date-picker.component.ts");
/* harmony import */ var _orders_order_detail_order_detail_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./orders/order-detail/order-detail.component */ "./src/app/pages/orders/order-detail/order-detail.component.ts");
/* harmony import */ var _directives_time_diff_time_difference_time_difference_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./_directives/time-diff/time-difference/time-difference.component */ "./src/app/pages/_directives/time-diff/time-difference/time-difference.component.ts");
/* harmony import */ var _forms_jp_forms_module__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../forms/jp-forms.module */ "./src/app/forms/jp-forms.module.ts");
/* harmony import */ var _core_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../core/dashboard/dashboard.component */ "./src/app/core/dashboard/dashboard.component.ts");
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../_services/post.service */ "./src/app/_services/post.service.ts");
/* harmony import */ var _forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../forms/dynamic-form/dynamic-form-request/dynamic-form-request.component */ "./src/app/forms/dynamic-form/dynamic-form-request/dynamic-form-request.component.ts");
/* harmony import */ var _forms_service__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../forms/_service */ "./src/app/forms/_service/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//import { ApiService} from '../config/api.service';


































var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
                _forms_jp_forms_module__WEBPACK_IMPORTED_MODULE_31__["JpFormsModule"],
            ],
            declarations: [
                _customer_customer_table_customer_table_component__WEBPACK_IMPORTED_MODULE_4__["CustomerTableComponent"],
                _orders_orders_table_orders_table_component__WEBPACK_IMPORTED_MODULE_5__["OrdersTableComponent"],
                _orders_orders_add_orders_add_component__WEBPACK_IMPORTED_MODULE_6__["OrdersAddComponent"],
                _orders_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_7__["OrdersUpdateComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _factory_factory_component__WEBPACK_IMPORTED_MODULE_11__["FactoryComponent"],
                _factory_factory_table_factory_table_component__WEBPACK_IMPORTED_MODULE_12__["FactoryTableComponent"],
                _factory_factory_contact_factory_contact_component__WEBPACK_IMPORTED_MODULE_13__["FactoryContactComponent"],
                _task_create_task_set_task_set_component__WEBPACK_IMPORTED_MODULE_15__["TaskSetComponent"],
                _task_create_task_set_todos_todos_component__WEBPACK_IMPORTED_MODULE_16__["TodosComponent"],
                _task_create_task_set_task_update_task_update_component__WEBPACK_IMPORTED_MODULE_18__["TaskUpdateComponent"],
                _task_task_component__WEBPACK_IMPORTED_MODULE_20__["TaskComponent"],
                _task_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_21__["AddTaskGroupComponent"],
                _task_create_task_set_task_set_dropdown_task_set_dropdown_component__WEBPACK_IMPORTED_MODULE_22__["TaskSetDropdownComponent"],
                _directives_modal_modal_component__WEBPACK_IMPORTED_MODULE_24__["ModalComponent"],
                _orders_order_task_order_task_component__WEBPACK_IMPORTED_MODULE_25__["OrderTaskComponent"],
                _orders_order_task_order_todos_order_todos_component__WEBPACK_IMPORTED_MODULE_27__["OrderTodosComponent"],
                _util_date_picker_date_picker_date_picker_component__WEBPACK_IMPORTED_MODULE_28__["DatePickerComponent"],
                _orders_order_detail_order_detail_component__WEBPACK_IMPORTED_MODULE_29__["OrderDetailComponent"],
                _directives_time_diff_time_difference_time_difference_component__WEBPACK_IMPORTED_MODULE_30__["TimeDifferenceComponent"],
                _core_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_32__["DashboardComponent"],
                _forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_34__["DynamicFormRequestComponent"],
            ],
            entryComponents: [
                _forms_dynamic_form_dynamic_form_request_dynamic_form_request_component__WEBPACK_IMPORTED_MODULE_34__["DynamicFormRequestComponent"],
            ],
            exports: [
                _customer_customer_table_customer_table_component__WEBPACK_IMPORTED_MODULE_4__["CustomerTableComponent"],
                _orders_orders_table_orders_table_component__WEBPACK_IMPORTED_MODULE_5__["OrdersTableComponent"],
                _orders_orders_add_orders_add_component__WEBPACK_IMPORTED_MODULE_6__["OrdersAddComponent"],
                _orders_orders_update_orders_update_component__WEBPACK_IMPORTED_MODULE_7__["OrdersUpdateComponent"],
                _factory_factory_table_factory_table_component__WEBPACK_IMPORTED_MODULE_12__["FactoryTableComponent"],
                _directives_time_diff_time_difference_time_difference_component__WEBPACK_IMPORTED_MODULE_30__["TimeDifferenceComponent"],
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_10__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HTTP_INTERCEPTORS"], useClass: _helpers__WEBPACK_IMPORTED_MODULE_10__["ErrorInterceptor"], multi: true },
                _task_service_task_form_service_service__WEBPACK_IMPORTED_MODULE_17__["TaskFormService"],
                _task_service_task_group_service__WEBPACK_IMPORTED_MODULE_19__["TaskGroupService"],
                _services_modal_service__WEBPACK_IMPORTED_MODULE_23__["ModalService"],
                _orders_order_task_service_order_task_form_service__WEBPACK_IMPORTED_MODULE_26__["OrderTaskFormService"],
                _services_post_service__WEBPACK_IMPORTED_MODULE_33__["PostService"],
                _forms_service__WEBPACK_IMPORTED_MODULE_35__["OptionsFormService"]
            ],
        })
    ], PagesModule);
    return PagesModule;
}());



/***/ }),

/***/ "./src/app/pages/task/_models/forms/form-control.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/task/_models/forms/form-control.service.ts ***!
  \******************************************************************/
/*! exports provided: FormControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormControlService", function() { return FormControlService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormControlService = /** @class */ (function () {
    function FormControlService() {
    }
    FormControlService.prototype.toFormGroup = function (options) {
        var group = {};
        options.forEach(function (option) {
            group[option.key] = option.required ? new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](option.value || '', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
                : new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](option.value || '');
        });
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group);
    };
    FormControlService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FormControlService);
    return FormControlService;
}());



/***/ }),

/***/ "./src/app/pages/task/_models/index.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/task/_models/index.ts ***!
  \*********************************************/
/*! exports provided: TaskForm, Task, TodosForm, Todo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-form */ "./src/app/pages/task/_models/task-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskForm", function() { return _task_form__WEBPACK_IMPORTED_MODULE_0__["TaskForm"]; });

/* harmony import */ var _task_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.model */ "./src/app/pages/task/_models/task.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return _task_model__WEBPACK_IMPORTED_MODULE_1__["Task"]; });

/* harmony import */ var _todos_form_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos-form.model */ "./src/app/pages/task/_models/todos-form.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TodosForm", function() { return _todos_form_model__WEBPACK_IMPORTED_MODULE_2__["TodosForm"]; });

/* harmony import */ var _todos_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todos.model */ "./src/app/pages/task/_models/todos.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Todo", function() { return _todos_model__WEBPACK_IMPORTED_MODULE_3__["Todo"]; });







/***/ }),

/***/ "./src/app/pages/task/_models/task-form.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/task/_models/task-form.ts ***!
  \*************************************************/
/*! exports provided: TaskForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskForm", function() { return TaskForm; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");

var TaskForm = /** @class */ (function () {
    function TaskForm(task) {
        this.todos_group = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.set_name = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.todos = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormArray"]([]);
        if (task.todos_group) {
            this.todos_group.setValue(task.todos_group);
        }
        if (task.set_name) {
            this.set_name.setValue(task.set_name);
        }
        if (task.todos) {
            this.todos.setValue([task.todos]);
        }
    }
    return TaskForm;
}());



/***/ }),

/***/ "./src/app/pages/task/_models/task.model.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/task/_models/task.model.ts ***!
  \**************************************************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return Task; });
var Task = /** @class */ (function () {
    function Task(todos_group, todos) {
        this.todos_group = todos_group;
        this.todos = todos;
    }
    return Task;
}());



/***/ }),

/***/ "./src/app/pages/task/_models/todos-form.model.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/task/_models/todos-form.model.ts ***!
  \********************************************************/
/*! exports provided: TodosForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodosForm", function() { return TodosForm; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");

var TodosForm = /** @class */ (function () {
    function TodosForm(todo) {
        this.todo = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.duedate = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.comment = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.status = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        this.todo.setValue(todo.todo);
        this.todo.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]);
        this.comment.setValue(todo.comment);
        this.duedate.setValue(todo.duedate);
        this.duedate.setValue(todo.duedate);
        this.status.setValue(todo.duedate);
    }
    return TodosForm;
}());



/***/ }),

/***/ "./src/app/pages/task/_models/todos.model.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/task/_models/todos.model.ts ***!
  \***************************************************/
/*! exports provided: Todo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Todo", function() { return Todo; });
var Todo = /** @class */ (function () {
    function Todo(todo, comment, duedate, status) {
        this.todo = todo || "";
        this.comment = comment || "";
        this.duedate = duedate || "";
        this.status = status || "";
    }
    return Todo;
}());



/***/ }),

/***/ "./src/app/pages/task/_service/task-form-service.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/task/_service/task-form-service.service.ts ***!
  \******************************************************************/
/*! exports provided: TaskFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskFormService", function() { return TaskFormService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _models_task_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/task-form */ "./src/app/pages/task/_models/task-form.ts");
/* harmony import */ var _models_task_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/task.model */ "./src/app/pages/task/_models/task.model.ts");
/* harmony import */ var _models_todos_form_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_models/todos-form.model */ "./src/app/pages/task/_models/todos-form.model.ts");
/* harmony import */ var _models_todos_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/todos.model */ "./src/app/pages/task/_models/todos.model.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TaskFormService = /** @class */ (function () {
    function TaskFormService(fb, apiService) {
        this.fb = fb;
        this.apiService = apiService;
        // public taskGroup$: Observable<Task[]> = this.taskGroups.asObservable();
        this.taskForm = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.fb.group(new _models_task_form__WEBPACK_IMPORTED_MODULE_3__["TaskForm"](new _models_task_model__WEBPACK_IMPORTED_MODULE_4__["Task"](''))));
        this.taskForm$ = this.taskForm.asObservable();
        this.getTaskGroups();
        console.log(this.taskGroups);
    }
    TaskFormService.prototype.addTodos = function () {
        var currentTask = this.taskForm.getValue();
        var currentTodos = currentTask.get('todos');
        currentTodos.push(this.fb.group(new _models_todos_form_model__WEBPACK_IMPORTED_MODULE_5__["TodosForm"](new _models_todos_model__WEBPACK_IMPORTED_MODULE_6__["Todo"]())));
        this.taskForm.next(currentTask);
    };
    TaskFormService.prototype.deleteTodos = function (i) {
        var currentTask = this.taskForm.getValue();
        var currentTodos = currentTask.get('todos');
        currentTodos.removeAt(i);
        this.taskForm.next(currentTask);
    };
    TaskFormService.prototype.getTaskGroups = function () {
        var _this = this;
        return this.apiService.getTaskGroups().subscribe(function (taskGroup) { return _this.taskGroups = taskGroup; });
    };
    TaskFormService.prototype.consoleTaskGroups = function () {
        var currentTask = this.taskForm.getValue();
        var currentGroupName = currentTask.get('todos_group').value;
        this.taskForm.getValue().get('todos_group').setValue(this.taskGroups[0].id);
        console.log(this.taskGroups[0].id, currentGroupName);
    };
    TaskFormService.prototype.clearForm = function () {
        var currentTask = this.taskForm.getValue();
        var currentTodos = currentTask.get('todos');
        while (currentTodos.length !== 0) {
            currentTodos.removeAt(0);
            console.log('current task is: ', currentTask);
        }
    };
    TaskFormService.prototype.clearTodos = function () {
        var currentTask = this.taskForm.getValue();
        var currentTodos = currentTask.get('todos');
        while (currentTodos.length !== 0) {
            console.log(currentTodos.value);
            currentTodos.removeAt(0);
            console.log('length is ', currentTodos.length);
        }
    };
    TaskFormService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"]])
    ], TaskFormService);
    return TaskFormService;
}());



/***/ }),

/***/ "./src/app/pages/task/_service/task-group.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/task/_service/task-group.service.ts ***!
  \***********************************************************/
/*! exports provided: TaskGroupService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskGroupService", function() { return TaskGroupService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskGroupService = /** @class */ (function () {
    function TaskGroupService(apiService) {
        this.apiService = apiService;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.groups = this.subject;
        this.setname = [];
        this.setnamedict = {};
        this.getTaskGroups();
        this.getMessage();
        console.log(this.groups);
        this.getTaskGroupTaskSet();
    }
    TaskGroupService.prototype.sendMessage = function (groups) {
        this.subject.next(groups);
    };
    TaskGroupService.prototype.clearMessage = function () {
        this.subject.next();
    };
    TaskGroupService.prototype.getMessage = function () {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    };
    TaskGroupService.prototype.getTaskGroups = function () {
        var _this = this;
        this.apiService.getTaskGroups().subscribe(function (resp) {
            _this.sendMessage(resp);
        });
        // console.log(this.group);
    };
    TaskGroupService.prototype.getTaskGroupTaskSet = function () {
        var _this = this;
        this.apiService.getTasks().subscribe(function (resp) {
            var array = [];
            var setnameEnum = {};
            for (var item in resp) {
                var key = resp[item];
                if (key['set_name'] == null) {
                    console.log(key['id']);
                }
                else {
                    setnameEnum[key['id']] = key['set_name'];
                    array.push(resp[item]);
                    _this.setname.push(resp[item]['set_name']);
                }
            }
            _this.setnamedict = setnameEnum;
            return _this.setname, _this.setnamedict;
        });
    };
    TaskGroupService.prototype.getDetailTgs = function () {
        console.log("Get Detail TGS: ", this.groups);
    };
    TaskGroupService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])( /*{
          // providedIn: 'root'
        }*/),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], TaskGroupService);
    return TaskGroupService;
}());

/*
getCustomersById(id: string): Observable<Customer> {
  this.urlOption = AppConfig.urlOptions['customer']

  const url = `${this.apiUrl}/${this.urlOption}/${id}`;
  return this.http.get<Customer>(url).pipe(
    tap(() => LoggerService.log(`fetched customer id=${id}`)),
    catchError(CustomersService.handleError<Customer>(`getCustomer id=${id}`))
  );
}
*/


/***/ }),

/***/ "./src/app/pages/task/add-task-group/add-task-group.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/task/add-task-group/add-task-group.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/task/add-task-group/add-task-group.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/task/add-task-group/add-task-group.component.ts ***!
  \***********************************************************************/
/*! exports provided: AddTaskGroupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTaskGroupComponent", function() { return AddTaskGroupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddTaskGroupComponent = /** @class */ (function () {
    function AddTaskGroupComponent(api, fb, snackBar) {
        this.api = api;
        this.fb = fb;
        this.snackBar = snackBar;
        this.titleAlert = 'This field is required';
        this.error = '';
        this.success = '';
        this.taskGroupForm = this.fb.group({
            group_name: [''],
        });
        /////////////
        // snabar  //
        ////////////
        // message: string = 'Snack Bar opened.';
        this.actionButtonLabel = 'Retry';
        this.action = true;
        this.setAutoHide = true;
        this.autoHide = 2000;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'bottom';
        this.taskGroupForm = this.fb.group({
            'group_name': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
        });
    }
    AddTaskGroupComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.setChangeValidate();
    };
    AddTaskGroupComponent.prototype.openSnackBar = function (message) {
        var config = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarConfig"]();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
    };
    AddTaskGroupComponent.prototype.addTaskGroup = function () {
        var _this = this;
        var task = this.formGroup.value;
        console.log(task);
        this.api.addTaskGroups(task)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (error) {
            _this.error = error;
            console.log('Error ! : ', _this.error);
        }, function (rsp) {
            // console.log(rsp);
            _this.error = 'Group with this name already exists';
            console.log('yoyo', _this.error);
            _this.openSnackBar(rsp);
            _this.formGroup.reset();
        });
        this.openSnackBar('Group Created');
    };
    AddTaskGroupComponent.prototype.createForm = function () {
        this.formGroup = this.fb.group({
            'group_name': [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]],
        });
    };
    AddTaskGroupComponent.prototype.setChangeValidate = function () {
        this.formGroup.get('group_name').setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(1)]);
        this.titleAlert = "You need to specify at least 1 characters";
    };
    Object.defineProperty(AddTaskGroupComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('group_name');
        },
        enumerable: true,
        configurable: true
    });
    AddTaskGroupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'add-task-group',
            template: "\n<div class=\"container\" *ngIf=\"!post; else forminfo\" novalidate>\n  <form [formGroup]=\"formGroup\" (ngSubmit)=\"onSubmit(formGroup.value)\" class=\"form\">\n\n  <mat-form-field class=\"form-element\">\n    <input matInput placeholder=\"Group Name\" formControlName=\"group_name\">\n    <mat-error *ngIf=\"!name.valid && name.touched\">\n      {{ titleAlert }}\n    </mat-error>\n  </mat-form-field>\n  </form>\n  <button  type=\"submit\" mat-button-raised color=\"accent\"  (click)=\"addTaskGroup()\">Create Task Group </button>\n\n</div>\n{{this.formGroup.value | json}}\n\n",
            styles: [__webpack_require__(/*! ./add-task-group.component.scss */ "./src/app/pages/task/add-task-group/add-task-group.component.scss")]
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"]])
    ], AddTaskGroupComponent);
    return AddTaskGroupComponent;
}());



/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  task-set-dropdown works!\n</p>\n<p>\n <!-- Group Id {{masterGroupMessage}} -->\n</p>\n  <mat-form-field class=\"form-element\">\n    <mat-select matInput  placeholder=\"Choose Boiler Plate Task\" formControlName='set_name'>\n      <mat-option *ngFor=\"let set of masterGroupMessage\" value={{set.set_name}}>\n        <span class=\"mat-option-text\">{{set.set_name}}</span>\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n\n\n"

/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: TaskSetDropdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskSetDropdownComponent", function() { return TaskSetDropdownComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskSetDropdownComponent = /** @class */ (function () {
    function TaskSetDropdownComponent() {
        this.formReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.list = [];
        this.taskForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            set_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]()
        });
    }
    TaskSetDropdownComponent.prototype.ngOnInit = function () {
        this.parseMessage();
    };
    TaskSetDropdownComponent.prototype.parseMessage = function () {
        // let list: string[] = [];
        for (var option in this.masterGroupMessage) {
            return this.list.push(this.masterGroupMessage[option]);
        }
        // return this.list.push(list);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TaskSetDropdownComponent.prototype, "masterGroupMessage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TaskSetDropdownComponent.prototype, "formReady", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TaskSetDropdownComponent.prototype, "selectedid", void 0);
    TaskSetDropdownComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-set-dropdown',
            template: __webpack_require__(/*! ./task-set-dropdown.component.html */ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.html"),
            styles: [__webpack_require__(/*! ./task-set-dropdown.component.scss */ "./src/app/pages/task/create-task-set/task-set-dropdown/task-set-dropdown.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TaskSetDropdownComponent);
    return TaskSetDropdownComponent;
}());



/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-set.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-set.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ul {\n  list-style-type: none; }\n\n.status {\n  color: green;\n  font-weight: 800; }\n\n.ng-invalid .status {\n  color: red; }\n"

/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-set.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-set.component.ts ***!
  \******************************************************************/
/*! exports provided: TaskSetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskSetComponent", function() { return TaskSetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _service_task_form_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_service/task-form-service.service */ "./src/app/pages/task/_service/task-form-service.service.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _service_task_group_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_service/task-group.service */ "./src/app/pages/task/_service/task-group.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../add-task-group/add-task-group.component */ "./src/app/pages/task/add-task-group/add-task-group.component.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_models */ "./src/app/pages/task/_models/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TaskSetComponent = /** @class */ (function () {
    function TaskSetComponent(taskFormService, apiService, tgs, dialog, fb, router) {
        this.taskFormService = taskFormService;
        this.apiService = apiService;
        this.tgs = tgs;
        this.dialog = dialog;
        this.fb = fb;
        this.router = router;
        this.OrderTask = true;
        this.orderTask = {};
        this.updateName = false;
        this.getTaskGroup();
    }
    TaskSetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taskFormSub = this.taskFormService.taskForm$
            .subscribe(function (task) {
            _this.taskForm = task;
            _this.todos = _this.taskForm.get('todos');
            _this.set_name = _this.taskForm.get('set_name');
        });
        this.getTaskGroup();
    };
    TaskSetComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.taskFormSub = this.taskFormService.taskForm$
            .subscribe(function (task) {
            _this.taskForm = task;
            _this.todos = _this.taskForm.get('todos');
            _this.set_name = _this.taskForm.get('set_name');
        });
        this.getTaskGroup();
    };
    TaskSetComponent.prototype.ngOnDestroy = function () {
        // this.taskFormSub.unsubscribe();
        this.getTaskGroup();
    };
    TaskSetComponent.prototype.addTodos = function () {
        this.taskFormService.addTodos();
    };
    TaskSetComponent.prototype.deleteTodos = function (index) {
        this.taskFormService.deleteTodos(index);
    };
    TaskSetComponent.prototype.setmasterGroupMessage = function (event) {
        var set_names = event.set_names;
        this.masterGroupMessage = set_names;
        //console.log(message);
    };
    /**
 * After a form is initialized, we link it to our main form
 */
    TaskSetComponent.prototype.saveTodos = function () {
        console.log('Todo saved!');
        console.log(this.taskForm.value);
        this.apiService.createTask(this.taskForm.value).subscribe(function (response) {
            console.log(response);
        });
        this.clearTodosForm();
        this.getTaskGroup();
    };
    TaskSetComponent.prototype.getTodos = function () {
        var _this = this;
        this.apiService.getTaskDetail(this.selectedId).subscribe(function (todos) {
            console.log(todos['todos']);
            return _this.todos = todos['todos'];
        });
    };
    TaskSetComponent.prototype.addToOrder = function () {
        console.log('Todo saved!');
        var tasks = this.orderTask;
        var items = this.taskForm.value;
        tasks['order'] = '3';
        tasks['todos'] = items['todos'];
        tasks['set_name'] = items['set_name'];
        console.log(JSON.stringify(tasks));
        //console.log(this.taskForm.value);
        this.apiService.addTaskToOrder(tasks).subscribe(function (response) {
            console.log(response);
        });
    };
    TaskSetComponent.prototype.clearTodosForm = function () {
        // this.taskFormService.clearForm();
        this.taskFormService.clearTodos();
    };
    TaskSetComponent.prototype.getTaskGroup = function () {
        var _this = this;
        this.tgs.getMessage().subscribe(function (rsp) {
            _this.sentGroups = rsp;
        });
    };
    TaskSetComponent.prototype.openAddDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_6__["AddTaskGroupComponent"], {
            width: '300px',
            height: '150px',
        });
        dialogRef.afterClosed().subscribe(function (rsp) {
            _this.tgs.getTaskGroups();
            rsp = _this.tgs.getMessage();
        });
    };
    TaskSetComponent.prototype.getBlanketTask = function (id) {
        var _this = this;
        this.apiService.getTaskDetail(id).subscribe(function (res) {
            _this.clearTodosForm();
            if (_this.taskForm.get('todos').value.length == 0) {
                var todos = res['todos'];
                for (var todo in todos) {
                    if (todos.hasOwnProperty(todo)) {
                        var todoslist = todos[todo];
                        // const currentTask = this.taskForm.getValue();
                        var currentTodos = _this.taskForm.get('todos');
                        currentTodos.push(_this.fb.group(new _models__WEBPACK_IMPORTED_MODULE_7__["TodosForm"](new _models__WEBPACK_IMPORTED_MODULE_7__["Todo"](todoslist['todo']))));
                    }
                    else {
                        console.log('field');
                    }
                }
            }
            else {
                console.log('error');
            }
        });
    };
    TaskSetComponent.prototype.updateTodoSet = function () {
        this.apiService.updateTask(this.selectedId, this.taskForm.value).subscribe(function (response) {
            console.log(response);
        });
        this.clearTodosForm();
        this.router.navigate(['task-component']);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TaskSetComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TaskSetComponent.prototype, "sentGroups", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TaskSetComponent.prototype, "case", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TaskSetComponent.prototype, "order", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TaskSetComponent.prototype, "OrderTask", void 0);
    TaskSetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-set',
            template: "\n    <h1>{{title}} order id {{order}}</h1>\n<!--  Task Group id: {{taskForm.controls.todos_group.value}} -->\n  <br />\n  <form [formGroup]=\"taskForm\" >\n\n  <mat-form-field class=\"form-element\">\n    <mat-select matInput  placeholder=\"Choose Group Set\" formControlName='todos_group'>\n      <mat-option *ngFor=\"let group of sentGroups; let i=index\" value={{group.id}}\n       (click)=\"setmasterGroupMessage(group)\">\n        <span class=\"mat-option-text\">{{group.group_name}}</span>\n      </mat-option>\n    </mat-select>\n    </mat-form-field>\n\n    <div *ngIf=\"masterGroupMessage\">\n      <mat-form-field class=\"form-element\">\n        <mat-select matInput  placeholder=\"Choose Boiler Plate Task\" formControlName='set_name' >\n          <mat-option *ngFor=\"let set of masterGroupMessage\" value={{set.set_name}} (click)=\"getBlanketTask(set.id)\">\n          <span class=\"mat-option-text\">{{set.set_name}}</span>\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n\n  <div *ngIf=\"title == 'Create New Task Set'\">\n    <mat-form-field>\n      <input matInput formControlName=\"set_name\" placeholder=\"New Set Name\">\n    </mat-form-field>\n  </div>\n  \n    \n   <h3>Add Tasks To Set</h3>\n    <button mat-button-raised color=\"primary\"(click)=\"addTodos()\">Add Todos</button>\n    <ul>\n      <li *ngFor=\"let todo of todos?.controls; let i = index\">\n        <app-todos [index]=\"i\" [todosForm]=\"todo\" [selectedId]=\"selectedId\" (deleteTodos)=\"deleteTodos($event)\"></app-todos>\n      </li>\n    </ul>\n\n    {{case}}\n    <div [ngSwitch]=\"case\">\n      <div *ngSwitchCase=\"'1'\">\n      <button  type=\"submit\" mat-button-raised color=\"accent\" (click)=\"updateTodoSet()\"\n      [disabled]=\"taskForm.invalid\">Update</button>\n      </div>\n      <div *ngSwitchCase=\"'2'\">\n      <button  type=\"submit\" mat-button-raised color=\"accent\" (click)=\"saveTodos()\"\n      [disabled]=\"taskForm.invalid\">Save New Task Set</button>\n      </div>\n    </div>\n    \n  \n    <button  type=\"submit\" mat-button-raised color=\"accent\" (click)=\"clearTodosForm()\" style=\"indent:50px\">Clear Form</button>\n    &nbsp;\n    <button  type=\"submit\" mat-button-raised color=\"accent\" (click)=\"addToOrder()\" [disabled]=\"taskForm.invalid\">Add To Order Test</button>\n    &nbsp;\n    <pre>Parent Form Status: <span class=\"status\">{{taskForm.status}} <br />{{taskForm.value | json}}</span></pre>\n  </form>\n  ",
            styles: [__webpack_require__(/*! ./task-set.component.scss */ "./src/app/pages/task/create-task-set/task-set.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_task_form_service_service__WEBPACK_IMPORTED_MODULE_2__["TaskFormService"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"],
            _service_task_group_service__WEBPACK_IMPORTED_MODULE_4__["TaskGroupService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]])
    ], TaskSetComponent);
    return TaskSetComponent;
}());

/*
getBlanketTask(id) {
      this.taskFormService.getBlanketTask(id);
    }
*/ 


/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-update/task-update.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-update/task-update.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  task-update works!\r\n</p>\r\n<form [formGroup]=\"taskForm\" >\r\n  Task Group Name: {{taskForm.controls.group_name.value}}\r\n\r\n  <p>Todos:</p>\r\n  <button mat-button-raised color=\"primary\"(click)=\"addTodos()\">Add Todos</button>\r\n  <ul>\r\n    <li *ngFor=\"let todo of todos?.controls; let i = index\">\r\n      <app-todos [index]=\"i\" [todosForm]=\"todo\" (deletePlayer)=\"deleteTodos($event)\"></app-todos>\r\n    </li>\r\n  </ul>\r\n\r\n  <button  type=\"submit\" mat-button-raised color=\"accent\" (click)=\"saveTodos()\" [disabled]=\"taskForm.invalid\">Submit</button>\r\n  <pre>Parent Form Status: <span class=\"status\">{{taskForm.status}} <br />{{taskForm.value | json}}</span></pre>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-update/task-update.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-update/task-update.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/task/create-task-set/task-update/task-update.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/task-update/task-update.component.ts ***!
  \*********************************************************************************/
/*! exports provided: TaskUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskUpdateComponent", function() { return TaskUpdateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_task_form_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_service/task-form-service.service */ "./src/app/pages/task/_service/task-form-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskUpdateComponent = /** @class */ (function () {
    function TaskUpdateComponent(taskFormService) {
        this.taskFormService = taskFormService;
        this.formInvalid = false;
    }
    TaskUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taskFormSub = this.taskFormService.taskForm$
            .subscribe(function (task) {
            _this.taskForm = task;
            _this.todos = _this.taskForm.get('todos');
        });
    };
    TaskUpdateComponent.prototype.ngOnDestroy = function () {
        this.taskFormSub.unsubscribe();
    };
    TaskUpdateComponent.prototype.addTodos = function () {
        this.taskFormService.addTodos();
    };
    TaskUpdateComponent.prototype.deleteTodos = function (index) {
        this.taskFormService.deleteTodos(index);
    };
    TaskUpdateComponent.prototype.saveTodos = function () {
        console.log('team saved!');
        console.log(this.taskForm.value);
    };
    TaskUpdateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task-update',
            template: __webpack_require__(/*! ./task-update.component.html */ "./src/app/pages/task/create-task-set/task-update/task-update.component.html"),
            styles: [__webpack_require__(/*! ./task-update.component.scss */ "./src/app/pages/task/create-task-set/task-update/task-update.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_task_form_service_service__WEBPACK_IMPORTED_MODULE_1__["TaskFormService"]])
    ], TaskUpdateComponent);
    return TaskUpdateComponent;
}());



/***/ }),

/***/ "./src/app/pages/task/create-task-set/todos/todos.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/todos/todos.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field {\n  margin: 0 3rem;\n  padding: 10px 0 0; }\n\n.status {\n  color: green;\n  font-weight: 800; }\n\n.ng-invalid .status {\n  color: red; }\n"

/***/ }),

/***/ "./src/app/pages/task/create-task-set/todos/todos.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/task/create-task-set/todos/todos.component.ts ***!
  \*********************************************************************/
/*! exports provided: TodosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodosComponent", function() { return TodosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config/api.service */ "./src/app/config/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TodosComponent = /** @class */ (function () {
    function TodosComponent(api, fb) {
        this.api = api;
        this.fb = fb;
        this.status = ['na', 'started', 'complete'];
        this.deleteTodos = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    TodosComponent.prototype.ngOnInit = function () {
    };
    /*ngOnChanges() {
      this.todos;
    }*/
    TodosComponent.prototype.delete = function () {
        this.deleteTodos.emit(this.index);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], TodosComponent.prototype, "todosForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], TodosComponent.prototype, "index", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TodosComponent.prototype, "selectedId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], TodosComponent.prototype, "deleteTodos", void 0);
    TodosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-todos',
            template: "\n    <form [formGroup]=\"todosForm\">\n      <table>\n        <tr>\n          <td>\n            <mat-form-field>\n              <input matInput formControlName=\"todo\" placeholder=\"Task Name\">\n            </mat-form-field>\n          </td>\n          <td>\n            <mat-form-field>\n              <textarea matInput formControlName=\"comment\" placeholder=\"Comment\"></textarea>\n            </mat-form-field>\n          </td>\n          <td>\n          <!--\n            <mat-form-field>\n              <input matInput formControlName=\"duedate\" placeholder=\"Due Date\">\n            </mat-form-field>\n          -->\n            <mat-form-field class=\"example-full-width\">\n              <input matInput [matDatepicker]=\"picker\" placeholder=\"Due Date\" formControlName=\"duedate\">\n              <mat-datepicker-toggle matSuffix [for]=\"picker\">\n                <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n              </mat-datepicker-toggle>\n              <mat-datepicker #picker></mat-datepicker>\n            </mat-form-field>\n          </td>\n          <td>\n          <mat-form-field class=\"form-element\">\n          <mat-select matInput  placeholder=\"Status\" formControlName='status'>\n            <mat-option *ngFor=\"let status of status; let i=index\" value={{status}}>\n              <span class=\"mat-option-text\">{{status}}</span>\n            </mat-option>\n          </mat-select>\n          </mat-form-field>\n          </td>\n          <td>\n            <!-- emit delete event up w/ index of todos -->\n            <button (click)=\"delete()\">Delete</button>\n          </td>\n        </tr>\n      </table>\n      <pre>Todos Form Status: <span class=\"status\">{{todosForm.status}}</span></pre>\n    </form>\n    <div *ngIf='todos'>\n    {{todos}}\n    </div>\n    {{todos | json}}\n    <mat-divider></mat-divider>\n    ",
            styles: [__webpack_require__(/*! ./todos.component.scss */ "./src/app/pages/task/create-task-set/todos/todos.component.scss")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], TodosComponent);
    return TodosComponent;
}());



/***/ }),

/***/ "./src/app/pages/task/task.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/task/task.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/task/task.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/task/task.component.ts ***!
  \**********************************************/
/*! exports provided: TaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskComponent", function() { return TaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_task_form_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_service/task-form-service.service */ "./src/app/pages/task/_service/task-form-service.service.ts");
/* harmony import */ var _config_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/api.service */ "./src/app/config/api.service.ts");
/* harmony import */ var _service_task_group_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_service/task-group.service */ "./src/app/pages/task/_service/task-group.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-task-group/add-task-group.component */ "./src/app/pages/task/add-task-group/add-task-group.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TaskComponent = /** @class */ (function () {
    function TaskComponent(taskFormService, apiService, tgs, dialog) {
        this.taskFormService = taskFormService;
        this.apiService = apiService;
        this.tgs = tgs;
        this.dialog = dialog;
        this.ordertask = true;
        this.defaultOrdertask = false;
        this.orderTask = {};
        this.updateName = false;
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.default();
        this.taskFormSub = this.taskFormService.taskForm$
            .subscribe(function (task) {
            _this.taskForm = task;
            _this.todos = _this.taskForm.get('todos');
            _this.set_name = _this.taskForm.get('set_name');
        });
        this.getTaskGroups();
    };
    TaskComponent.prototype.getTaskGroup = function () {
        var _this = this;
        this.tgs.getMessage().subscribe(function (rsp) {
            _this.groups = rsp;
        });
    };
    TaskComponent.prototype.default = function () {
        this.num = '0';
    };
    TaskComponent.prototype.selectedUpdate = function () {
        this.num = '1';
        this.getTaskGroup();
        return this.title = 'Update Existing Task Set';
        console.log('Update Selected');
    };
    TaskComponent.prototype.selectedUpdateOrder = function () {
        this.getTaskGroups();
        this.num = '3';
        return this.orderTitle = 'Add Task Set To Group';
        console.log('Update Selected');
    };
    TaskComponent.prototype.selectedCreate = function () {
        this.getTaskGroup();
        this.num = '2';
        return this.createTitle = 'Create New Task Set';
        console.log('Update Selected');
    };
    TaskComponent.prototype.openAddDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_add_task_group_add_task_group_component__WEBPACK_IMPORTED_MODULE_5__["AddTaskGroupComponent"], {
            width: '300px',
            height: '150px',
        });
        dialogRef.afterClosed().subscribe(function (rsp) {
            _this.tgs.getTaskGroups();
            rsp = _this.tgs.getMessage();
        });
    };
    TaskComponent.prototype.getTaskGroups = function () {
        var _this = this;
        this.apiService.getTaskGroups().subscribe(function (resp) {
            return _this.groups = resp;
            console.log(_this.groups);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", void 0)
    ], TaskComponent.prototype, "databaseId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TaskComponent.prototype, "ordertask", void 0);
    TaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-task',
            template: "\n  <div> \n    <h2> Choose an Option:</h2>\n    {{databaseId}}\n    &nbsp;\n    <div *ngIf=\"ordertask == true\">\n      <button mat-raised-button  (click)=\"openAddDialog()\"> Create A Task Group </button>\n      &nbsp;\n      <button mat-raised-button (click)=\"selectedUpdate()\"> Update A Task Set </button>\n      &nbsp;\n      <button mat-raised-button (click)=\"selectedCreate()\"> Create A Task Set </button>\n      &nbsp;\n    </div>\n\n    <div *ngIf=\"ordertask == false\">\n       <button mat-raised-button (click)=\"selectedUpdateOrder()\"> Add Tasks To Order </button>\n    </div>\n\n  </div>\n\n\n    <div [ngSwitch]=\"num\">\n      <div *ngSwitchCase=\"'1'\">\n        <app-task-set [title]=\"title\" [(sentGroups)]=\"groups\" [case]=\"num\" [order]=\"databaseId\"></app-task-set>\n      </div>\n      \n      <div *ngSwitchCase=\"'2'\">\n        <app-task-set [title]=\"createTitle\" [(sentGroups)]=\"groups\" [case]=\"num\"  [order]=\"databaseId\"></app-task-set>\n      </div>\n      \n      <div *ngSwitchCase=\"'3'\">\n        <app-task-set [title]=\"createTitle\" [(OrderTask)]=\"ordertask\"  [(sentGroups)]=\"groups\"\n         [case]=\"num\"  [order]=\"databaseId\"></app-task-set>\n      </div>\n      <div *ngSwitchDefault></div>\n    </div>\n  \n  <ng-template #order>\n    order\n  </ng-template>\n\n  ",
            styles: [__webpack_require__(/*! ./task.component.scss */ "./src/app/pages/task/task.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_task_form_service_service__WEBPACK_IMPORTED_MODULE_1__["TaskFormService"],
            _config_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _service_task_group_service__WEBPACK_IMPORTED_MODULE_3__["TaskGroupService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], TaskComponent);
    return TaskComponent;
}());



/***/ }),

/***/ "./src/app/shared/modules/material.module.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/modules/material.module.ts ***!
  \***************************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/esm5/stepper.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_12__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatBadgeModule"]
            ],
            exports: [
                _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yModule"],
                _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["BidiModule"],
                _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_5__["ObserversModule"],
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["OverlayModule"],
                _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"],
                _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["PortalModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ScrollDispatchModule"],
                _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_10__["CdkStepperModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_11__["CdkTableModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatBadgeModule"]
            ],
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _modules_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/material.module */ "./src/app/shared/modules/material.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _modules_material_module__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"]
            ],
            declarations: [],
            exports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _modules_material_module__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:8000/'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\XBBNQVM\Desktop\jpsiteapiv2\frontendmodules\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map