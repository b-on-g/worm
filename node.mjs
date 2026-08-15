#!/usr/bin/env node
"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const mod = require /****/('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const path = require /****/('path');
    const mod = require /****/('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-inline-start': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\ttext-wrap-style: pretty;\n\tunicode-bidi: plaintext\n}\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_theme_auto) = class $mol_theme_auto extends ($.$mol_plugin) {
		dark(){
			return "$mol_theme_dark";
		}
		theme(){
			return (this.dark());
		}
		light(){
			return "$mol_theme_light";
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `foo=bar xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            const prefix = this.prefix;
            const dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        /** create if it doesn't already exist */
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        /** truncate to zero size if it already exists */
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        /** throw exception if it already exists */
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        /** data will be appended to the end */
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            // Если папки/файла нет, watch упадет с ошибкой
            // exists обратится к parent.version и parent.watcher
            // Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
            // exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                // Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                // Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
                // Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                // Если в процессе работы вотчер сам закрылся, надо его переоткрыть
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    /**
     * Switcher between light/dark themes (usually for `mol_theme_auto` plugin).
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
     */
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The [plugin](../../plugin/readme.md) which defines theme based on [mol_lights](../../lights/readme.md).
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_lights_demo
         */
        class $mol_theme_auto extends $.$mol_theme_auto {
            theme() {
                return this.$.$mol_lights() ? this.light() : this.dark();
            }
        }
        $$.$mol_theme_auto = $mol_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Mixin view logic to DOM node of another component.
         */
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Marker on top of another component with tracking of its position.
         */
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		align(){
			return "bottom_center";
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * `Bubble` that can be shown anchored to `Anchor` element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
         */
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            bubble_offset() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: calc( 100vw - var(--mol_gap_page) );\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which can navigate in list of items
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
         */
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static direction() {
            return new Intl.Locale(this.lang()).getTextInfo().direction ?? 'ltr';
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "direction", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering single line text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
         */
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";


;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
         * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
         */
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            _view_window_last = [0, 0];
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? this._view_window_last;
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                // change nothing when already covers all limits
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                // jumps when fully over limits
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                // force recalc min when overlapse top limit
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                // force recalc max when overlapse bottom limit
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                // extend min to cover top limit
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                // extend max to cover bottom limit
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this._view_window_last = this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\t/* will-change: contents; */\n}\n\n[mol_list]:where([mol_view_error]) {\n\tmin-height: 1.5rem;\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Output text with dimmed mismatched substrings.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
         */
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Search input with suggest and clear button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
         */
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: start;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: start;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Checkbox UI component. See Variants for more concrete implementations.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
         */
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this.trigger_enabled()));
			(obj.checked) = (next) => ((this.showed(next)));
			(obj.clicks) = (next) => ((this.clicks(next)));
			(obj.sub) = () => ((this.trigger_content()));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		Anchor(){
			return (this.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Pop-up display and hide by mouse click, also hide by unfocus.
         * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
         */
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_dots_vertical) = class $mol_icon_dots_vertical extends ($.$mol_icon) {
		path(){
			return "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
		}
	};


;
"use strict";


;
	($.$mol_select) = class $mol_select extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		option_label(id){
			return "";
		}
		filter_pattern(next){
			if(next !== undefined) return next;
			return "";
		}
		Option_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_label(id)));
			(obj.needle) = () => ((this.filter_pattern()));
			return obj;
		}
		option_content(id){
			return [(this.Option_label(id))];
		}
		no_options_message(){
			return (this.$.$mol_locale.text("$mol_select_no_options_message"));
		}
		nav_components(){
			return [];
		}
		option_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_cycle(next){
			if(next !== undefined) return next;
			return true;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.option_focused(next)));
			(obj.cycle) = (next) => ((this.nav_cycle(next)));
			return obj;
		}
		menu_content(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_content()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		filter_hint(){
			return (this.$.$mol_locale.text("$mol_select_filter_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		dictionary(next){
			if(next !== undefined) return next;
			return {};
		}
		options(){
			return [];
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		option_label_default(){
			return "";
		}
		Option_row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.event_click) = (next) => ((this.event_select(id, next)));
			(obj.sub) = () => ((this.option_content(id)));
			return obj;
		}
		No_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.no_options_message())]);
			return obj;
		}
		plugins(){
			return [...(super.plugins()), (this.Nav())];
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_select_hint"));
		}
		bubble_content(){
			return [(this.Filter()), (this.Bubble_pane())];
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter_pattern(next)));
			(obj.hint) = () => ((this.filter_hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Trigger_icon(){
			const obj = new this.$.$mol_icon_dots_vertical();
			return obj;
		}
		trigger_enabled(){
			return (this.enabled());
		}
	};
	($mol_mem_key(($.$mol_select.prototype), "event_select"));
	($mol_mem(($.$mol_select.prototype), "filter_pattern"));
	($mol_mem_key(($.$mol_select.prototype), "Option_label"));
	($mol_mem(($.$mol_select.prototype), "option_focused"));
	($mol_mem(($.$mol_select.prototype), "nav_cycle"));
	($mol_mem(($.$mol_select.prototype), "Nav"));
	($mol_mem(($.$mol_select.prototype), "Menu"));
	($mol_mem(($.$mol_select.prototype), "Bubble_pane"));
	($mol_mem(($.$mol_select.prototype), "submit"));
	($mol_mem(($.$mol_select.prototype), "dictionary"));
	($mol_mem(($.$mol_select.prototype), "value"));
	($mol_mem_key(($.$mol_select.prototype), "Option_row"));
	($mol_mem(($.$mol_select.prototype), "No_options"));
	($mol_mem(($.$mol_select.prototype), "Filter"));
	($mol_mem(($.$mol_select.prototype), "Trigger_icon"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Allow user to select value from various options and displays current value.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
         */
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    ...this.trigger_enabled() ? [this.Trigger_icon()] : [],
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: start;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-inline-end: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-inline-end: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_check_list) = class $mol_check_list extends ($.$mol_view) {
		option_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		option_title(id){
			return "";
		}
		option_label(id){
			return [(this.option_title(id))];
		}
		enabled(){
			return true;
		}
		option_enabled(id){
			return (this.enabled());
		}
		option_hint(id){
			return "";
		}
		items(){
			return [];
		}
		dictionary(){
			return {};
		}
		Option(id){
			const obj = new this.$.$mol_check();
			(obj.checked) = (next) => ((this.option_checked(id, next)));
			(obj.label) = () => ((this.option_label(id)));
			(obj.enabled) = () => ((this.option_enabled(id)));
			(obj.hint) = () => ((this.option_hint(id)));
			(obj.minimal_height) = () => (24);
			return obj;
		}
		options(){
			return {};
		}
		keys(){
			return [];
		}
		sub(){
			return (this.items());
		}
	};
	($mol_mem_key(($.$mol_check_list.prototype), "option_checked"));
	($mol_mem_key(($.$mol_check_list.prototype), "Option"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * List of checkboxes
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
         */
        class $mol_check_list extends $.$mol_check_list {
            options() {
                return {};
            }
            dictionary(next) {
                return next ?? {};
            }
            option_checked(id, next) {
                const prev = this.dictionary();
                if (next === undefined)
                    return prev[id] ?? null;
                const next_rec = { ...prev, [id]: next };
                if (next === null)
                    delete next_rec[id];
                return this.dictionary(next_rec)[id] ?? null;
            }
            keys() {
                return Object.keys(this.options());
            }
            items() {
                return this.keys().map(key => this.Option(key));
            }
            option_title(key) {
                return this.options()[key] || key;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "keys", null);
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "items", null);
        $$.$mol_check_list = $mol_check_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/list/list.view.css", "[mol_check_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_gap_round);\n\tgap: 1px;\n}\n\n[mol_check_list_option] {\n\tflex: 0 1 auto;\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"]) {\n\ttext-shadow: 0 0;\n\tcolor: var(--mol_theme_current);\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"][disabled]) {\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
	($.$bog_worm_slider) = class $bog_worm_slider extends ($.$mol_view) {
		least(){
			return 1;
		}
		most(){
			return 100;
		}
		step(){
			return 1;
		}
		hint(){
			return "";
		}
		value_text(){
			return "";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "input";
		}
		value(next){
			if(next !== undefined) return next;
			return 1;
		}
		minimal_height(){
			return 24;
		}
		attr(){
			return {
				...(super.attr()), 
				"type": "range", 
				"min": (this.least()), 
				"max": (this.most()), 
				"step": (this.step()), 
				"aria-label": (this.hint())
			};
		}
		field(){
			return {...(super.field()), "value": (this.value_text())};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
	};
	($mol_mem(($.$bog_worm_slider.prototype), "event_change"));
	($mol_mem(($.$bog_worm_slider.prototype), "value"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** A native range input, because $mol has no slider of its own. */
        class $bog_worm_slider extends $.$bog_worm_slider {
            value_text() {
                return String(this.value());
            }
            event_change(event) {
                if (!event)
                    return null;
                this.value(Number(event.target.value));
                return null;
            }
        }
        __decorate([
            $mol_action
        ], $bog_worm_slider.prototype, "event_change", null);
        $$.$bog_worm_slider = $bog_worm_slider;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_worm_slider, {
            display: 'block',
            width: '100%',
            margin: { top: '.25rem', bottom: '.25rem', left: 0, right: 0 },
            accentColor: $mol_theme.current,
            cursor: 'pointer',
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_worm_panel) = class $bog_worm_panel extends ($.$mol_view) {
		cells_title(){
			return "Cell types";
		}
		Cells_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.cells_title())]);
			return obj;
		}
		type_on(id, next){
			if(next !== undefined) return next;
			return true;
		}
		Types(){
			const obj = new this.$.$mol_check_list();
			(obj.options) = () => ({
				"sensory": "Sensory", 
				"poly": "Polymodal", 
				"inter": "Interneuron", 
				"motor": "Motor", 
				"muscle": "Muscle", 
				"other": "Other"
			});
			(obj.option_checked) = (id, next) => ((this.type_on(id, next)));
			return obj;
		}
		Cells(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Cells_title()), (this.Types())]);
			return obj;
		}
		links_title(){
			return "Connections";
		}
		Links_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.links_title())]);
			return obj;
		}
		kind_on(id, next){
			if(next !== undefined) return next;
			return true;
		}
		Kinds(){
			const obj = new this.$.$mol_check_list();
			(obj.options) = () => ({"chemical": "Chemical synapses", "gap": "Gap junctions"});
			(obj.option_checked) = (id, next) => ((this.kind_on(id, next)));
			return obj;
		}
		Links(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Links_title()), (this.Kinds())]);
			return obj;
		}
		weight_title(){
			return "";
		}
		Weight_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.weight_title())]);
			return obj;
		}
		weight_most(){
			return 30;
		}
		weight_min(next){
			if(next !== undefined) return next;
			return 1;
		}
		Weight_slider(){
			const obj = new this.$.$bog_worm_slider();
			(obj.hint) = () => ("Minimal connection weight");
			(obj.least) = () => (1);
			(obj.most) = () => ((this.weight_most()));
			(obj.value) = (next) => ((this.weight_min(next)));
			return obj;
		}
		Weight(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Weight_title()), (this.Weight_slider())]);
			return obj;
		}
		path_title(){
			return "Signal path";
		}
		Path_title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.path_title())]);
			return obj;
		}
		path_from(next){
			if(next !== undefined) return next;
			return "";
		}
		path_from_suggests(){
			return [];
		}
		Path_from(){
			const obj = new this.$.$mol_search();
			(obj.hint) = () => ("From, e.g. ASH");
			(obj.query) = (next) => ((this.path_from(next)));
			(obj.suggests) = () => ((this.path_from_suggests()));
			return obj;
		}
		path_to(next){
			if(next !== undefined) return next;
			return "";
		}
		path_to_suggests(){
			return [];
		}
		Path_to(){
			const obj = new this.$.$mol_search();
			(obj.hint) = () => ("To, e.g. AVA");
			(obj.query) = (next) => ((this.path_to(next)));
			(obj.suggests) = () => ((this.path_to_suggests()));
			return obj;
		}
		path_note(){
			return "Up to three shortest chains of chemical synapses, five hops at most.";
		}
		Path_note(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.path_note())]);
			return obj;
		}
		Path(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Path_title()), 
				(this.Path_from()), 
				(this.Path_to()), 
				(this.Path_note())
			]);
			return obj;
		}
		legend(){
			return [];
		}
		Legend(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.legend()));
			return obj;
		}
		legend_type(id){
			return "";
		}
		Legend_dot(id){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({...(this.$.$mol_view.prototype.attr.call(obj)), "worm_type": (this.legend_type(id))});
			return obj;
		}
		legend_label(id){
			return "";
		}
		sub(){
			return [
				(this.Cells()), 
				(this.Links()), 
				(this.Weight()), 
				(this.Path()), 
				(this.Legend())
			];
		}
		Legend_row(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Legend_dot(id)), (this.legend_label(id))]);
			return obj;
		}
	};
	($mol_mem(($.$bog_worm_panel.prototype), "Cells_title"));
	($mol_mem_key(($.$bog_worm_panel.prototype), "type_on"));
	($mol_mem(($.$bog_worm_panel.prototype), "Types"));
	($mol_mem(($.$bog_worm_panel.prototype), "Cells"));
	($mol_mem(($.$bog_worm_panel.prototype), "Links_title"));
	($mol_mem_key(($.$bog_worm_panel.prototype), "kind_on"));
	($mol_mem(($.$bog_worm_panel.prototype), "Kinds"));
	($mol_mem(($.$bog_worm_panel.prototype), "Links"));
	($mol_mem(($.$bog_worm_panel.prototype), "Weight_title"));
	($mol_mem(($.$bog_worm_panel.prototype), "weight_min"));
	($mol_mem(($.$bog_worm_panel.prototype), "Weight_slider"));
	($mol_mem(($.$bog_worm_panel.prototype), "Weight"));
	($mol_mem(($.$bog_worm_panel.prototype), "Path_title"));
	($mol_mem(($.$bog_worm_panel.prototype), "path_from"));
	($mol_mem(($.$bog_worm_panel.prototype), "Path_from"));
	($mol_mem(($.$bog_worm_panel.prototype), "path_to"));
	($mol_mem(($.$bog_worm_panel.prototype), "Path_to"));
	($mol_mem(($.$bog_worm_panel.prototype), "Path_note"));
	($mol_mem(($.$bog_worm_panel.prototype), "Path"));
	($mol_mem(($.$bog_worm_panel.prototype), "Legend"));
	($mol_mem_key(($.$bog_worm_panel.prototype), "Legend_dot"));
	($mol_mem_key(($.$bog_worm_panel.prototype), "Legend_row"));


;
"use strict";
var $;
(function ($) {
    /**
     * One palette for the canvas and the legend, mid-toned so that every colour
     * stays readable on both the light and the dark theme.
     */
    $.$bog_worm_hue = {
        sensory: '#ef8b2c',
        poly: '#a366e0',
        inter: '#4d8cf5',
        motor: '#22ab6e',
        muscle: '#a1887f',
        other: '#8fa3ae',
        unknown: '#8fa3ae',
    };
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const legend_labels = {
            sensory: 'Sensory',
            poly: 'Polymodal',
            inter: 'Interneuron',
            motor: 'Motor',
            muscle: 'Muscle',
            other: 'Other cells',
        };
        /** Filters, the signal path picker and the colour legend. */
        class $bog_worm_panel extends $.$bog_worm_panel {
            weight_title() {
                const least = this.weight_min();
                return least > 1 ? `Minimal weight — ${least}` : 'Minimal weight — any';
            }
            path_from_suggests() {
                return $bog_worm_graph.suggest(this.path_from());
            }
            path_to_suggests() {
                return $bog_worm_graph.suggest(this.path_to());
            }
            legend() {
                return Object.keys(legend_labels).map(type => this.Legend_row(type));
            }
            legend_type(type) {
                return type;
            }
            legend_label(type) {
                return legend_labels[type];
            }
        }
        __decorate([
            $mol_mem
        ], $bog_worm_panel.prototype, "legend", null);
        $$.$bog_worm_panel = $bog_worm_panel;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const dot = (color) => ({
            background: { color },
        });
        const section = {
            flex: { direction: 'column' },
            gap: '.25rem',
        };
        const title = {
            font: { size: '.75rem', weight: 'bold' },
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: $mol_theme.shade,
        };
        $mol_style_define($bog_worm_panel, {
            flex: { direction: 'column', shrink: 0 },
            gap: $mol_gap.block,
            width: '15.5rem',
            padding: $mol_gap.block,
            overflow: { x: 'hidden', y: 'auto' },
            background: { color: $mol_theme.card },
            border: { right: { width: '1px', style: 'solid', color: $mol_theme.line } },
            Cells: section,
            Links: section,
            Weight: section,
            Path: section,
            Cells_title: title,
            Links_title: title,
            Weight_title: title,
            Path_title: title,
            Types: {
                flex: { direction: 'column' },
            },
            Kinds: {
                flex: { direction: 'column' },
            },
            Path_note: {
                font: { size: '.75rem' },
                color: $mol_theme.shade,
                padding: { top: '.25rem', bottom: 0, left: 0, right: 0 },
            },
            Legend: {
                flex: { direction: 'column' },
                gap: '.15rem',
                padding: { top: '.6rem', bottom: 0, left: 0, right: 0 },
                border: { top: { width: '1px', style: 'solid', color: $mol_theme.line } },
            },
            Legend_row: {
                flex: { direction: 'row' },
                align: { items: 'center' },
                gap: '.5rem',
                font: { size: '.8rem' },
                color: $mol_theme.shade,
            },
            Legend_dot: {
                width: '.7rem',
                height: '.7rem',
                flex: { shrink: 0 },
                borderRadius: '50%',
                '@': {
                    worm_type: {
                        sensory: dot($bog_worm_hue.sensory),
                        poly: dot($bog_worm_hue.poly),
                        inter: dot($bog_worm_hue.inter),
                        motor: dot($bog_worm_hue.motor),
                        muscle: dot($bog_worm_hue.muscle),
                        other: dot($bog_worm_hue.other),
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_canvas) = class $mol_canvas extends ($.$mol_view) {
		width(){
			return 0;
		}
		height(){
			return 0;
		}
		dom_name(){
			return "canvas";
		}
		context(){
			const obj = new this.$.CanvasRenderingContext2D();
			return obj;
		}
		field(){
			return {
				...(super.field()), 
				"width": (this.width()), 
				"height": (this.height())
			};
		}
		paint(){
			return null;
		}
	};
	($mol_mem(($.$mol_canvas.prototype), "context"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_canvas extends $.$mol_canvas {
            context() {
                return this.dom_node().getContext('2d');
            }
            width() {
                return Math.ceil((this.view_rect()?.width ?? 0) * this.$.$mol_dom_context.devicePixelRatio);
            }
            height() {
                return Math.ceil((this.view_rect()?.height ?? 0) * this.$.$mol_dom_context.devicePixelRatio);
            }
            render() {
                super.render();
                this.paint();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_canvas.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $mol_canvas.prototype, "width", null);
        __decorate([
            $mol_mem
        ], $mol_canvas.prototype, "height", null);
        $$.$mol_canvas = $mol_canvas;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_canvas, {
            alignSelf: 'stretch',
            justifySelf: 'stretch',
            flex: {
                grow: 1,
                shrink: 1,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_worm_plot) = class $bog_worm_plot extends ($.$mol_canvas) {
		grabbing(){
			return false;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_move(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_off(next){
			if(next !== undefined) return next;
			return null;
		}
		event_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		event_wheel(next){
			if(next !== undefined) return next;
			return null;
		}
		layout_name(){
			return "layered";
		}
		types(){
			return {};
		}
		kinds(){
			return {};
		}
		weight_min(){
			return 1;
		}
		focus(next){
			if(next !== undefined) return next;
			return "";
		}
		path_from(){
			return "";
		}
		path_to(){
			return "";
		}
		hover(next){
			if(next !== undefined) return next;
			return "";
		}
		picked(next){
			if(next !== undefined) return next;
			return -1;
		}
		tip(){
			return "";
		}
		tip_x(next){
			if(next !== undefined) return next;
			return 0;
		}
		tip_y(next){
			if(next !== undefined) return next;
			return 0;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"worm_grabbing": (this.grabbing())
			};
		}
		event(){
			return {
				...(super.event()), 
				"pointerdown": (next) => (this.event_down(next)), 
				"pointermove": (next) => (this.event_move(next)), 
				"pointerup": (next) => (this.event_up(next)), 
				"pointercancel": (next) => (this.event_off(next)), 
				"pointerleave": (next) => (this.event_leave(next)), 
				"wheel": (next) => (this.event_wheel(next))
			};
		}
	};
	($mol_mem(($.$bog_worm_plot.prototype), "event_down"));
	($mol_mem(($.$bog_worm_plot.prototype), "event_move"));
	($mol_mem(($.$bog_worm_plot.prototype), "event_up"));
	($mol_mem(($.$bog_worm_plot.prototype), "event_off"));
	($mol_mem(($.$bog_worm_plot.prototype), "event_leave"));
	($mol_mem(($.$bog_worm_plot.prototype), "event_wheel"));
	($mol_mem(($.$bog_worm_plot.prototype), "focus"));
	($mol_mem(($.$bog_worm_plot.prototype), "hover"));
	($mol_mem(($.$bog_worm_plot.prototype), "picked"));
	($mol_mem(($.$bog_worm_plot.prototype), "tip_x"));
	($mol_mem(($.$bog_worm_plot.prototype), "tip_y"));
	($mol_mem(($.$bog_worm_plot.prototype), "reset"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Cell colours are shared with the legend, only the neutrals follow the theme. */
        const palettes = {
            light: {
                chemical: '#8494a3',
                arrow: '#55636f',
                gap: '#c98a2e',
                dim: '#d3dae0',
                label: '#25303a',
                halo: '#ffffffcc',
            },
            dark: {
                chemical: '#61707d',
                arrow: '#9fb0bc',
                gap: '#c08a3e',
                dim: '#39434c',
                label: '#dbe4ec',
                halo: '#0e1116cc',
            },
        };
        /** Five line widths — every edge falls into one of them, so the canvas strokes five paths, not seven thousand. */
        const buckets = 5;
        /**
         * The connectome itself: edges and cells on one canvas, with panning, zooming,
         * hit testing and highlighting done by hand — no graph library involved.
         */
        class $bog_worm_plot extends $.$bog_worm_plot {
            // ------------------------------------------------------------ viewport
            zoom(next) {
                return next ?? 1;
            }
            center(next) {
                return next ?? [.5, .5];
            }
            reset() {
                this.zoom(1);
                this.center([.5, .5]);
                this.picked(-1);
            }
            /** The layered picture is a diagram and fills the viewport, the force one is a map and keeps its shape. */
            scale() {
                const base = this.zoom() * .92;
                if (this.layout_name() === 'force') {
                    const side = Math.min(this.width(), this.height());
                    return [side * base, side * base];
                }
                return [this.width() * base, this.height() * base];
            }
            offset() {
                const [sx, sy] = this.scale();
                const [cx, cy] = this.center();
                return [this.width() / 2 - cx * sx, this.height() / 2 - cy * sy];
            }
            /** Canvas point in device pixels for a client point of a pointer event. */
            device(client_x, client_y) {
                const rect = this.dom_node().getBoundingClientRect();
                const ratio = this.$.$mol_dom_context.devicePixelRatio;
                return [(client_x - rect.left) * ratio, (client_y - rect.top) * ratio];
            }
            world(client_x, client_y) {
                const [x, y] = this.device(client_x, client_y);
                const [sx, sy] = this.scale();
                const [ox, oy] = this.offset();
                return [(x - ox) / sx, (y - oy) / sy];
            }
            // ------------------------------------------------------------ filtering
            layout() {
                return this.layout_name() === 'force' ? $bog_worm_graph.forced() : $bog_worm_graph.layered();
            }
            visible() {
                const types = this.types();
                const cells = $bog_worm_graph.cells();
                const flags = new Uint8Array(cells.length);
                for (const cell of cells)
                    flags[cell.index] = types[cell.type] === false ? 0 : 1;
                return flags;
            }
            drawn() {
                const kinds = this.kinds();
                const least = this.weight_min();
                const seen = this.visible();
                return $bog_worm_graph.edges().filter(edge => kinds[edge.kind] !== false
                    && edge.weight >= least
                    && seen[edge.from] === 1
                    && seen[edge.to] === 1);
            }
            // ------------------------------------------------------------ selection
            /** A focus key is either a cell name or a class name, so "ASH" lights up both ASHL and ASHR. */
            focus_cells() {
                const key = this.focus();
                if (!key)
                    return [];
                return $bog_worm_graph.cells()
                    .filter(cell => cell.id === key || cell.cls === key)
                    .map(cell => cell.index);
            }
            path_chains() {
                const from = this.path_ends(this.path_from());
                const to = this.path_ends(this.path_to());
                if (!from.length || !to.length)
                    return [];
                const found = [];
                for (const start of from) {
                    for (const finish of to) {
                        found.push(...$bog_worm_graph.paths(start, finish));
                    }
                }
                const weight = (path) => {
                    const cells = $bog_worm_graph.cells();
                    let least = Infinity;
                    for (let step = 1; step < path.length; ++step) {
                        const edge = cells[path[step - 1]].out.find(edge => edge.to === path[step]);
                        if (edge)
                            least = Math.min(least, edge.weight);
                    }
                    return least;
                };
                return found
                    .sort((left, right) => left.length - right.length || weight(right) - weight(left))
                    .slice(0, 3);
            }
            path_ends(key) {
                if (!key)
                    return [];
                return $bog_worm_graph.cells()
                    .filter(cell => cell.id === key || cell.cls === key)
                    .map(cell => cell.index)
                    .slice(0, 8);
            }
            /** Cells and edges kept bright while everything else fades out. Null when nothing is selected. */
            lit() {
                const focus = this.focus_cells();
                const chains = this.path_chains();
                if (!focus.length && !chains.length)
                    return null;
                const cells = $bog_worm_graph.cells();
                const bright = new Uint8Array(cells.length);
                const edges = new Set();
                // only connections that survive the filters count as neighbourhood,
                // otherwise the picture would name neighbours whose edges are not on screen
                const shown = new Set(this.drawn().map(edge => edge.index));
                for (const index of focus) {
                    bright[index] = 2;
                    for (const edge of [...cells[index].out, ...cells[index].inp, ...cells[index].gap]) {
                        if (!shown.has(edge.index))
                            continue;
                        bright[edge.from] ||= 1;
                        bright[edge.to] ||= 1;
                        edges.add(edge.index);
                    }
                }
                for (const chain of chains) {
                    for (let step = 0; step < chain.length; ++step) {
                        bright[chain[step]] = 2;
                        if (!step)
                            continue;
                        const edge = cells[chain[step - 1]].out.find(edge => edge.to === chain[step]);
                        if (edge)
                            edges.add(edge.index);
                    }
                }
                return { cells: bright, edges };
            }
            // ------------------------------------------------------------ draw plan
            /**
             * Edges grouped by layer, kind and line width, recomputed only when the filters change.
             * Panning and zooming then just replay the groups.
             */
            edge_plan() {
                const lit = this.lit();
                const span = Math.log($bog_worm_graph.weight_max() + 1);
                const plan = [];
                const slot = new Map();
                const list = (layer, kind, bucket) => {
                    const key = `${layer}/${kind}/${bucket}`;
                    let found = slot.get(key);
                    if (!found) {
                        found = [];
                        slot.set(key, found);
                        plan.push({ layer, kind, bucket, list: found });
                    }
                    return found;
                };
                for (const edge of this.drawn()) {
                    const bucket = Math.min(buckets - 1, Math.floor(Math.log(edge.weight + 1) / span * buckets));
                    const layer = !lit ? 'plain' : lit.edges.has(edge.index) ? 'lit' : 'dim';
                    list(layer, edge.kind, bucket).push(edge.index);
                }
                const order = { dim: 0, plain: 1, lit: 2 };
                return plan.sort((left, right) => order[left.layer] - order[right.layer] || left.bucket - right.bucket);
            }
            cell_plan() {
                const lit = this.lit();
                const seen = this.visible();
                const plan = new Map();
                for (const cell of $bog_worm_graph.cells()) {
                    if (!seen[cell.index])
                        continue;
                    const layer = !lit ? 'plain' : lit.cells[cell.index] ? 'lit' : 'dim';
                    const key = `${layer}/${cell.type}`;
                    const found = plan.get(key) ?? plan.set(key, []).get(key);
                    found.push(cell.index);
                }
                const order = { dim: 0, plain: 1, lit: 2 };
                return [...plan]
                    .map(([key, list]) => {
                    const [layer, type] = key.split('/');
                    return { layer: layer, type, list };
                })
                    .sort((left, right) => order[left.layer] - order[right.layer]);
            }
            // ------------------------------------------------------------ painting
            paint() {
                const context = this.context();
                const width = this.width();
                const height = this.height();
                context.clearRect(0, 0, width, height);
                if (!width || !height)
                    return;
                const paint = palettes[this.$.$mol_lights() ? 'light' : 'dark'];
                const ratio = this.$.$mol_dom_context.devicePixelRatio;
                const layout = this.layout();
                const edges = $bog_worm_graph.edges();
                const [sx, sy] = this.scale();
                const [ox, oy] = this.offset();
                const at_x = (index) => layout.xs[index] * sx + ox;
                const at_y = (index) => layout.ys[index] * sy + oy;
                const zoom = this.zoom();
                const radius = 3.1 * ratio * Math.min(Math.max(zoom, .7), 2.6);
                const widths = [.5, .9, 1.5, 2.3, 3.4].map(value => value * ratio * Math.min(Math.max(zoom, .8), 2));
                const alpha = { dim: .12, plain: .3, lit: .95 };
                const plan = this.edge_plan();
                const arrows = plan.reduce((sum, group) => sum + (group.layer === 'dim' ? 0 : group.list.length), 0);
                const with_arrows = arrows <= 3000 || zoom >= 2;
                for (const group of plan) {
                    context.globalAlpha = alpha[group.layer];
                    context.lineWidth = widths[group.bucket];
                    context.strokeStyle = group.layer === 'dim'
                        ? paint.dim
                        : group.kind === 'gap' ? paint.gap : paint.chemical;
                    context.setLineDash(group.kind === 'gap' ? [4 * ratio, 3 * ratio] : []);
                    context.beginPath();
                    for (const index of group.list) {
                        const edge = edges[index];
                        context.moveTo(at_x(edge.from), at_y(edge.from));
                        context.lineTo(at_x(edge.to), at_y(edge.to));
                    }
                    context.stroke();
                    if (group.kind !== 'chemical')
                        continue;
                    if (group.layer === 'dim')
                        continue;
                    if (!with_arrows && group.layer !== 'lit')
                        continue;
                    const size = Math.max(5.5 * ratio, widths[group.bucket] * 3);
                    // keep the head clear of the target dot, highlighted dots are drawn larger
                    const clearance = radius * 1.8;
                    context.globalAlpha = Math.min(1, alpha[group.layer] * 2.2);
                    context.fillStyle = paint.arrow;
                    context.beginPath();
                    for (const index of group.list) {
                        const edge = edges[index];
                        const x1 = at_x(edge.from), y1 = at_y(edge.from);
                        const x2 = at_x(edge.to), y2 = at_y(edge.to);
                        const dx = x2 - x1, dy = y2 - y1;
                        const len = Math.sqrt(dx * dx + dy * dy);
                        if (len < clearance + size)
                            continue;
                        const ux = dx / len, uy = dy / len;
                        const tip_x = x2 - ux * clearance, tip_y = y2 - uy * clearance;
                        context.moveTo(tip_x, tip_y);
                        context.lineTo(tip_x - ux * size + uy * size * .5, tip_y - uy * size - ux * size * .5);
                        context.lineTo(tip_x - ux * size - uy * size * .5, tip_y - uy * size + ux * size * .5);
                    }
                    context.fill();
                }
                context.setLineDash([]);
                for (const group of this.cell_plan()) {
                    context.globalAlpha = group.layer === 'dim' ? .22 : 1;
                    context.fillStyle = group.layer === 'dim'
                        ? paint.dim
                        : $bog_worm_hue[group.type];
                    context.beginPath();
                    for (const index of group.list) {
                        const size = group.layer === 'lit' ? radius * 1.35 : radius;
                        context.moveTo(at_x(index) + size, at_y(index));
                        context.arc(at_x(index), at_y(index), size, 0, Math.PI * 2);
                    }
                    context.fill();
                }
                context.globalAlpha = 1;
                this.paint_labels(context, paint, ratio, at_x, at_y);
            }
            paint_labels(context, paint, ratio, at_x, at_y) {
                const cells = $bog_worm_graph.cells();
                const lit = this.lit();
                const seen = this.visible();
                const hover = this.hover();
                const named = new Set();
                if (lit) {
                    for (let index = 0; index < lit.cells.length; ++index) {
                        if (lit.cells[index] === 2)
                            named.add(index);
                    }
                    if (named.size < 90) {
                        for (let index = 0; index < lit.cells.length; ++index) {
                            if (lit.cells[index] === 1 && named.size < 90)
                                named.add(index);
                        }
                    }
                }
                else if (this.zoom() >= 2.2) {
                    for (const cell of cells) {
                        if (named.size >= 200)
                            break;
                        if (!seen[cell.index])
                            continue;
                        const x = at_x(cell.index), y = at_y(cell.index);
                        if (x < 0 || y < 0 || x > this.width() || y > this.height())
                            continue;
                        named.add(cell.index);
                    }
                }
                const hovered = hover ? $bog_worm_graph.cell(hover) : null;
                if (hovered)
                    named.add(hovered.index);
                if (!named.size)
                    return;
                context.font = `${Math.round(11 * ratio)}px ui-sans-serif, system-ui, sans-serif`;
                context.textBaseline = 'middle';
                context.lineWidth = 3 * ratio;
                context.strokeStyle = paint.halo;
                context.fillStyle = paint.label;
                const shift = 5.5 * ratio;
                for (const index of named) {
                    const x = at_x(index) + shift;
                    const y = at_y(index);
                    context.strokeText(cells[index].id, x, y);
                    context.fillText(cells[index].id, x, y);
                }
            }
            // ------------------------------------------------------------ hit testing
            /** Uniform grid over the layout, so hover does not scan four hundred cells on every mouse move. */
            grid() {
                const layout = this.layout();
                const side = 48;
                const buckets = Array.from({ length: side * side }, () => []);
                for (let index = 0; index < layout.xs.length; ++index) {
                    const col = Math.min(side - 1, Math.max(0, Math.floor(layout.xs[index] * side)));
                    const row = Math.min(side - 1, Math.max(0, Math.floor(layout.ys[index] * side)));
                    buckets[row * side + col].push(index);
                }
                return { side, buckets };
            }
            cell_at(wx, wy) {
                const { side, buckets } = this.grid();
                const layout = this.layout();
                const seen = this.visible();
                const [sx, sy] = this.scale();
                const reach = 8 * this.$.$mol_dom_context.devicePixelRatio;
                const rx = reach / sx;
                const ry = reach / sy;
                const col = Math.floor(wx * side);
                const row = Math.floor(wy * side);
                const span_x = Math.ceil(rx * side) + 1;
                const span_y = Math.ceil(ry * side) + 1;
                let best = -1;
                let best_dist = Infinity;
                for (let r = row - span_y; r <= row + span_y; ++r) {
                    if (r < 0 || r >= side)
                        continue;
                    for (let c = col - span_x; c <= col + span_x; ++c) {
                        if (c < 0 || c >= side)
                            continue;
                        for (const index of buckets[r * side + c]) {
                            if (!seen[index])
                                continue;
                            const dx = (layout.xs[index] - wx) * sx;
                            const dy = (layout.ys[index] - wy) * sy;
                            const dist = dx * dx + dy * dy;
                            if (dist > reach * reach || dist >= best_dist)
                                continue;
                            best_dist = dist;
                            best = index;
                        }
                    }
                }
                return best;
            }
            edge_at(wx, wy) {
                const layout = this.layout();
                const [sx, sy] = this.scale();
                const reach = 5 * this.$.$mol_dom_context.devicePixelRatio;
                let best = -1;
                let best_dist = reach * reach;
                for (const edge of this.drawn()) {
                    const x1 = layout.xs[edge.from] * sx, y1 = layout.ys[edge.from] * sy;
                    const x2 = layout.xs[edge.to] * sx, y2 = layout.ys[edge.to] * sy;
                    const px = wx * sx, py = wy * sy;
                    const dx = x2 - x1, dy = y2 - y1;
                    const len2 = dx * dx + dy * dy || 1;
                    const t = Math.min(1, Math.max(0, ((px - x1) * dx + (py - y1) * dy) / len2));
                    const ox = px - (x1 + t * dx), oy = py - (y1 + t * dy);
                    const dist = ox * ox + oy * oy;
                    if (dist >= best_dist)
                        continue;
                    best_dist = dist;
                    best = edge.index;
                }
                return best;
            }
            // ------------------------------------------------------------ pointer
            pointers = new Map();
            grabbing(next) {
                return next ?? false;
            }
            event_down(event) {
                if (!event)
                    return null;
                this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, at: event.timeStamp, moved: 0 });
                this.grabbing(true);
                return null;
            }
            event_move(event) {
                if (!event)
                    return null;
                const held = this.pointers.get(event.pointerId);
                if (!held) {
                    this.hover_at(event.clientX, event.clientY);
                    return null;
                }
                const dx = event.clientX - held.x;
                const dy = event.clientY - held.y;
                held.moved += Math.abs(dx) + Math.abs(dy);
                held.x = event.clientX;
                held.y = event.clientY;
                if (this.pointers.size >= 2) {
                    this.pinch();
                    return null;
                }
                const ratio = this.$.$mol_dom_context.devicePixelRatio;
                const [sx, sy] = this.scale();
                const [cx, cy] = this.center();
                this.center([cx - dx * ratio / sx, cy - dy * ratio / sy]);
                return null;
            }
            pinch_span = 0;
            pinch() {
                const [first, second] = [...this.pointers.values()];
                const span = Math.hypot(first.x - second.x, first.y - second.y);
                const middle_x = (first.x + second.x) / 2;
                const middle_y = (first.y + second.y) / 2;
                if (this.pinch_span)
                    this.zoom_at(middle_x, middle_y, span / this.pinch_span);
                this.pinch_span = span;
            }
            event_up(event) {
                if (!event)
                    return null;
                const held = this.pointers.get(event.pointerId);
                this.pointers.delete(event.pointerId);
                if (this.pointers.size < 2)
                    this.pinch_span = 0;
                if (!this.pointers.size)
                    this.grabbing(false);
                if (held && held.moved < 6 && event.timeStamp - held.at < 700)
                    this.tap(event.clientX, event.clientY);
                return null;
            }
            event_off(event) {
                if (!event)
                    return null;
                this.pointers.delete(event.pointerId);
                this.pinch_span = 0;
                if (!this.pointers.size)
                    this.grabbing(false);
                return null;
            }
            event_leave(event) {
                this.hover('');
                return null;
            }
            event_wheel(event) {
                if (!event)
                    return null;
                event.preventDefault();
                const step = event.deltaMode ? event.deltaY * 16 : event.deltaY;
                this.zoom_at(event.clientX, event.clientY, Math.exp(-step * .0015));
                return null;
            }
            zoom_at(client_x, client_y, factor) {
                const [bx, by] = this.world(client_x, client_y);
                this.zoom(Math.min(60, Math.max(.4, this.zoom() * factor)));
                const [ax, ay] = this.world(client_x, client_y);
                const [cx, cy] = this.center();
                this.center([cx + bx - ax, cy + by - ay]);
            }
            hover_at(client_x, client_y) {
                const [wx, wy] = this.world(client_x, client_y);
                const index = this.cell_at(wx, wy);
                const rect = this.dom_node().getBoundingClientRect();
                this.tip_x(Math.round(client_x - rect.left));
                this.tip_y(Math.round(client_y - rect.top));
                this.hover(index < 0 ? '' : $bog_worm_graph.cells()[index].id);
            }
            tap(client_x, client_y) {
                const [wx, wy] = this.world(client_x, client_y);
                const rect = this.dom_node().getBoundingClientRect();
                this.tip_x(Math.round(client_x - rect.left));
                this.tip_y(Math.round(client_y - rect.top));
                const index = this.cell_at(wx, wy);
                if (index >= 0) {
                    const cell = $bog_worm_graph.cells()[index];
                    this.picked(-1);
                    this.focus(this.focus() === cell.id ? '' : cell.id);
                    return;
                }
                const edge = this.edge_at(wx, wy);
                this.picked(edge);
                if (edge < 0)
                    this.focus('');
            }
            // ------------------------------------------------------------ tooltip
            tip() {
                const picked = this.picked();
                if (picked >= 0) {
                    const edge = $bog_worm_graph.edges()[picked];
                    const cells = $bog_worm_graph.cells();
                    const arrow = edge.kind === 'chemical' ? '→' : '↔';
                    const kind = edge.kind === 'chemical' ? 'chemical synapse' : 'gap junction';
                    return `${cells[edge.from].id} ${arrow} ${cells[edge.to].id}\n${kind} · weight ${edge.weight}`;
                }
                const cell = this.hover() ? $bog_worm_graph.cell(this.hover()) : null;
                if (!cell)
                    return '';
                const head = cell.title ? `${cell.id} — ${cell.title}` : cell.id;
                const kind = [cell.type, $bog_worm_graph.ganglia()[cell.ganglion], ...cell.nt].join(' · ');
                const links = [
                    `${cell.inp.length} in`,
                    `${cell.out.length} out`,
                    `${cell.gap.length} gap`,
                ].join(' · ');
                return `${head}\n${kind}\n${links}`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "zoom", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "center", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "reset", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "layout", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "visible", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "drawn", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "focus_cells", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "path_chains", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "lit", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "edge_plan", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "cell_plan", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "paint", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "grid", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "grabbing", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_down", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_move", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_up", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_off", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_leave", null);
        __decorate([
            $mol_action
        ], $bog_worm_plot.prototype, "event_wheel", null);
        __decorate([
            $mol_mem
        ], $bog_worm_plot.prototype, "tip", null);
        $$.$bog_worm_plot = $bog_worm_plot;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_worm_plot, {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            touchAction: 'none',
            outline: 'none',
            cursor: 'grab',
            background: { color: $mol_theme.back },
            '@': {
                worm_grabbing: {
                    true: {
                        cursor: 'grabbing',
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_worm_detail) = class $bog_worm_detail extends ($.$mol_view) {
		name(){
			return "";
		}
		Name(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.name())]);
			return obj;
		}
		facts(){
			return "";
		}
		Facts(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.facts())]);
			return obj;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		close_label(){
			return "Clear";
		}
		Close(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("Clear selection");
			(obj.click) = (next) => ((this.close(next)));
			(obj.sub) = () => ([(this.close_label())]);
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Name()), 
				(this.Facts()), 
				(this.Close())
			]);
			return obj;
		}
		rows(){
			return [];
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		section_title(id){
			return "";
		}
		row_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		row_peer(id){
			return "";
		}
		Row_peer(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.row_peer(id))]);
			return obj;
		}
		row_note(id){
			return "";
		}
		Row_note(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.row_note(id))]);
			return obj;
		}
		row_weight(id){
			return "";
		}
		Row_weight(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.row_weight(id))]);
			return obj;
		}
		focus(next){
			if(next !== undefined) return next;
			return "";
		}
		sub(){
			return [(this.Head()), (this.List())];
		}
		Section(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.section_title(id))]);
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.row_click(id, next)));
			(obj.sub) = () => ([
				(this.Row_peer(id)), 
				(this.Row_note(id)), 
				(this.Row_weight(id))
			]);
			return obj;
		}
	};
	($mol_mem(($.$bog_worm_detail.prototype), "Name"));
	($mol_mem(($.$bog_worm_detail.prototype), "Facts"));
	($mol_mem(($.$bog_worm_detail.prototype), "close"));
	($mol_mem(($.$bog_worm_detail.prototype), "Close"));
	($mol_mem(($.$bog_worm_detail.prototype), "Head"));
	($mol_mem(($.$bog_worm_detail.prototype), "List"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "row_click"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "Row_peer"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "Row_note"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "Row_weight"));
	($mol_mem(($.$bog_worm_detail.prototype), "focus"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "Section"));
	($mol_mem_key(($.$bog_worm_detail.prototype), "Row"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Every connection of the selected cell, heaviest first. Clicking a row moves the selection there. */
        class $bog_worm_detail extends $.$bog_worm_detail {
            cells() {
                const key = this.focus();
                if (!key)
                    return [];
                return $bog_worm_graph.cells().filter(cell => cell.id === key || cell.cls === key);
            }
            name() {
                const cells = this.cells();
                if (!cells.length)
                    return '';
                if (cells.length === 1)
                    return cells[0].id;
                return `${this.focus()} — ${cells.map(cell => cell.id).join(', ')}`;
            }
            facts() {
                const cells = this.cells();
                if (!cells.length)
                    return '';
                const head = cells[0];
                const facts = [head.type, $bog_worm_graph.ganglia()[head.ganglion]];
                if (head.nt.length)
                    facts.push(head.nt.join(', '));
                if (cells.length === 1 && head.title)
                    facts.unshift(head.title);
                return facts.join(' · ');
            }
            sections() {
                const cells = this.cells();
                const many = cells.length > 1;
                const names = $bog_worm_graph.cells();
                const collect = (tag, pick, side) => {
                    const links = [];
                    for (const cell of cells) {
                        for (const edge of pick(cell)) {
                            const peer = side(edge, cell.index);
                            if (peer === cell.index && edge.from === edge.to)
                                continue;
                            links.push({
                                key: `${tag}:${edge.index}:${cell.index}`,
                                peer: names[peer].id,
                                note: many ? cell.id : '',
                                weight: edge.weight,
                            });
                        }
                    }
                    return links.sort((left, right) => right.weight - left.weight);
                };
                return [
                    { key: 'out', title: 'Outgoing chemical', links: collect('out', cell => cell.out, edge => edge.to) },
                    { key: 'inp', title: 'Incoming chemical', links: collect('inp', cell => cell.inp, edge => edge.from) },
                    { key: 'gap', title: 'Gap junctions', links: collect('gap', cell => cell.gap, (edge, own) => edge.from === own ? edge.to : edge.from) },
                ].filter(section => section.links.length);
            }
            link_index() {
                const index = new Map();
                for (const section of this.sections()) {
                    for (const link of section.links)
                        index.set(link.key, link);
                }
                return index;
            }
            rows() {
                const rows = [];
                for (const section of this.sections()) {
                    rows.push(this.Section(section.key));
                    for (const link of section.links)
                        rows.push(this.Row(link.key));
                }
                return rows;
            }
            section_title(key) {
                const section = this.sections().find(section => section.key === key);
                return `${section.title} — ${section.links.length}`;
            }
            row_peer(key) {
                return this.link_index().get(key).peer;
            }
            row_note(key) {
                return this.link_index().get(key).note;
            }
            row_weight(key) {
                return String(this.link_index().get(key).weight);
            }
            row_click(key, next) {
                this.focus(this.link_index().get(key).peer);
                return null;
            }
            close(next) {
                this.focus('');
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_worm_detail.prototype, "cells", null);
        __decorate([
            $mol_mem
        ], $bog_worm_detail.prototype, "sections", null);
        __decorate([
            $mol_mem
        ], $bog_worm_detail.prototype, "link_index", null);
        __decorate([
            $mol_mem
        ], $bog_worm_detail.prototype, "rows", null);
        __decorate([
            $mol_action
        ], $bog_worm_detail.prototype, "row_click", null);
        __decorate([
            $mol_action
        ], $bog_worm_detail.prototype, "close", null);
        $$.$bog_worm_detail = $bog_worm_detail;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_worm_detail, {
            flex: { direction: 'column', shrink: 0 },
            width: '19rem',
            background: { color: $mol_theme.card },
            border: { left: { width: '1px', style: 'solid', color: $mol_theme.line } },
            Head: {
                flex: { direction: 'column' },
                gap: '.15rem',
                padding: $mol_gap.block,
                border: { bottom: { width: '1px', style: 'solid', color: $mol_theme.line } },
            },
            Name: {
                font: { size: '1.1rem', weight: 'bold' },
            },
            Facts: {
                font: { size: '.8rem' },
                color: $mol_theme.shade,
            },
            Close: {
                align: { self: 'flex-start' },
                margin: { top: '.35rem', bottom: 0, left: 0, right: 0 },
            },
            List: {
                flex: { grow: 1, direction: 'column' },
                overflow: { x: 'hidden', y: 'auto' },
            },
            Section: {
                padding: { top: '.6rem', bottom: '.2rem', left: $mol_gap.block, right: $mol_gap.block },
                font: { size: '.72rem', weight: 'bold' },
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: $mol_theme.shade,
            },
            Row: {
                flex: { direction: 'row' },
                align: { items: 'baseline' },
                gap: '.5rem',
                padding: { top: '.2rem', bottom: '.2rem', left: $mol_gap.block, right: $mol_gap.block },
                minHeight: 'auto',
                justify: { content: 'flex-start' },
            },
            Row_peer: {
                font: { family: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
                flex: { shrink: 0 },
            },
            Row_note: {
                font: { size: '.72rem' },
                color: $mol_theme.shade,
                flex: { grow: 1 },
            },
            Row_weight: {
                font: { size: '.8rem' },
                color: $mol_theme.shade,
                margin: { left: 'auto', top: 0, bottom: 0, right: 0 },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$bog_worm) = class $bog_worm extends ($.$mol_view) {
		panel_state(){
			return "on";
		}
		layout_kind(){
			return "wide";
		}
		Theme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		keyboard(){
			return null;
		}
		brand(){
			return "C. elegans connectome";
		}
		count(){
			return "";
		}
		Count(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.count())]);
			return obj;
		}
		Brand(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.brand()), (this.Count())]);
			return obj;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		suggests(){
			return [];
		}
		Search(){
			const obj = new this.$.$mol_search();
			(obj.hint) = () => ("Find ASH, AVAL, dBWML8…");
			(obj.query) = (next) => ((this.query(next)));
			(obj.suggests) = () => ((this.suggests()));
			return obj;
		}
		layout_name(next){
			if(next !== undefined) return next;
			return "layered";
		}
		Layout(){
			const obj = new this.$.$mol_select();
			(obj.hint) = () => ("Layout");
			(obj.value) = (next) => ((this.layout_name(next)));
			(obj.dictionary) = () => ({"layered": "Layered", "force": "Force-directed"});
			return obj;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		reset_label(){
			return "Reset view";
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("Fit the whole connectome back into view");
			(obj.click) = (next) => ((this.reset(next)));
			(obj.sub) = () => ([(this.reset_label())]);
			return obj;
		}
		panel_showed(next){
			if(next !== undefined) return next;
			return true;
		}
		Panel_toggle(){
			const obj = new this.$.$mol_check();
			(obj.title) = () => ("Filters");
			(obj.hint) = () => ("Show or hide the filter panel");
			(obj.checked) = (next) => ((this.panel_showed(next)));
			return obj;
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ([
				(this.Brand()), 
				(this.Search()), 
				(this.Layout()), 
				(this.Reset()), 
				(this.Panel_toggle())
			]);
			return obj;
		}
		stage(){
			return [];
		}
		Stage(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.stage()));
			return obj;
		}
		foot_lead(){
			return "Connectome:";
		}
		Cook(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://doi.org/10.1038/s41586-019-1352-7");
			(obj.external) = () => (true);
			(obj.title) = () => ("Cook et al. 2019");
			return obj;
		}
		foot_atlas(){
			return " · cell classes and ganglia:";
		}
		Atlas(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://www.wormatlas.org/");
			(obj.external) = () => (true);
			(obj.title) = () => ("WormAtlas");
			return obj;
		}
		foot_openworm(){
			return " · data packaging:";
		}
		Openworm(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/openworm");
			(obj.external) = () => (true);
			(obj.title) = () => ("OpenWorm");
			return obj;
		}
		foot_source(){
			return " · MIT licence,";
		}
		Repo(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ("https://github.com/b-on-g/worm");
			(obj.external) = () => (true);
			(obj.title) = () => ("source and converter");
			return obj;
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ([
				(this.foot_lead()), 
				(this.Cook()), 
				(this.foot_atlas()), 
				(this.Atlas()), 
				(this.foot_openworm()), 
				(this.Openworm()), 
				(this.foot_source()), 
				(this.Repo())
			]);
			return obj;
		}
		type_on(id, next){
			if(next !== undefined) return next;
			return true;
		}
		kind_on(id, next){
			if(next !== undefined) return next;
			return true;
		}
		weight_min(next){
			if(next !== undefined) return next;
			return 1;
		}
		path_from(next){
			if(next !== undefined) return next;
			return "";
		}
		path_to(next){
			if(next !== undefined) return next;
			return "";
		}
		board(){
			return [];
		}
		types(){
			return {};
		}
		kinds(){
			return {};
		}
		focus(next){
			if(next !== undefined) return next;
			return "";
		}
		tip_left(){
			return "0px";
		}
		tip_top(){
			return "0px";
		}
		tip_text(){
			return "";
		}
		dom_name(){
			return "main";
		}
		title(){
			return "C. elegans connectome";
		}
		hint(){
			return "Interactive map of all 302 neurons of Caenorhabditis elegans and their synapses";
		}
		attr(){
			return {
				...(super.attr()), 
				"worm_panel": (this.panel_state()), 
				"worm_layout": (this.layout_kind())
			};
		}
		plugins(){
			return [(this.Theme())];
		}
		auto(){
			return [(this.keyboard())];
		}
		sub(){
			return [
				(this.Head()), 
				(this.Stage()), 
				(this.Foot())
			];
		}
		Aside(){
			const obj = new this.$.$bog_worm_panel();
			(obj.type_on) = (id, next) => ((this.type_on(id, next)));
			(obj.kind_on) = (id, next) => ((this.kind_on(id, next)));
			(obj.weight_min) = (next) => ((this.weight_min(next)));
			(obj.path_from) = (next) => ((this.path_from(next)));
			(obj.path_to) = (next) => ((this.path_to(next)));
			return obj;
		}
		Board(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.board()));
			return obj;
		}
		Canvas(){
			const obj = new this.$.$bog_worm_plot();
			(obj.layout_name) = () => ((this.layout_name()));
			(obj.types) = () => ((this.types()));
			(obj.kinds) = () => ((this.kinds()));
			(obj.weight_min) = () => ((this.weight_min()));
			(obj.focus) = (next) => ((this.focus(next)));
			(obj.path_from) = () => ((this.path_from()));
			(obj.path_to) = () => ((this.path_to()));
			return obj;
		}
		Tip(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"left": (this.tip_left()), "top": (this.tip_top())});
			(obj.sub) = () => ([(this.tip_text())]);
			return obj;
		}
		Links(){
			const obj = new this.$.$bog_worm_detail();
			(obj.focus) = (next) => ((this.focus(next)));
			return obj;
		}
	};
	($mol_mem(($.$bog_worm.prototype), "Theme"));
	($mol_mem(($.$bog_worm.prototype), "Count"));
	($mol_mem(($.$bog_worm.prototype), "Brand"));
	($mol_mem(($.$bog_worm.prototype), "query"));
	($mol_mem(($.$bog_worm.prototype), "Search"));
	($mol_mem(($.$bog_worm.prototype), "layout_name"));
	($mol_mem(($.$bog_worm.prototype), "Layout"));
	($mol_mem(($.$bog_worm.prototype), "reset"));
	($mol_mem(($.$bog_worm.prototype), "Reset"));
	($mol_mem(($.$bog_worm.prototype), "panel_showed"));
	($mol_mem(($.$bog_worm.prototype), "Panel_toggle"));
	($mol_mem(($.$bog_worm.prototype), "Head"));
	($mol_mem(($.$bog_worm.prototype), "Stage"));
	($mol_mem(($.$bog_worm.prototype), "Cook"));
	($mol_mem(($.$bog_worm.prototype), "Atlas"));
	($mol_mem(($.$bog_worm.prototype), "Openworm"));
	($mol_mem(($.$bog_worm.prototype), "Repo"));
	($mol_mem(($.$bog_worm.prototype), "Foot"));
	($mol_mem_key(($.$bog_worm.prototype), "type_on"));
	($mol_mem_key(($.$bog_worm.prototype), "kind_on"));
	($mol_mem(($.$bog_worm.prototype), "weight_min"));
	($mol_mem(($.$bog_worm.prototype), "path_from"));
	($mol_mem(($.$bog_worm.prototype), "path_to"));
	($mol_mem(($.$bog_worm.prototype), "focus"));
	($mol_mem(($.$bog_worm.prototype), "Aside"));
	($mol_mem(($.$bog_worm.prototype), "Board"));
	($mol_mem(($.$bog_worm.prototype), "Canvas"));
	($mol_mem(($.$bog_worm.prototype), "Tip"));
	($mol_mem(($.$bog_worm.prototype), "Links"));


;
"use strict";
var $;
(function ($) {
    function $mol_offline() { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const type_keys = ['sensory', 'poly', 'inter', 'motor', 'muscle', 'other'];
        const kind_keys = ['chemical', 'gap'];
        /**
         * Whole application: filters and the signal path on the left, the connectome in the middle,
         * the connections of the selected cell on the right. Every bit of that state lives in the URL.
         */
        class $bog_worm extends $.$bog_worm {
            // ------------------------------------------------------------ state in the address
            arg(key, next) {
                if (next === undefined)
                    return this.$.$mol_state_arg.value(key) ?? '';
                return this.$.$mol_state_arg.value(key, next || null) ?? '';
            }
            focus(next) {
                return this.arg('focus', next);
            }
            path_from(next) {
                return this.arg('from', next);
            }
            path_to(next) {
                return this.arg('to', next);
            }
            layout_name(next) {
                return this.arg('view', next) || 'layered';
            }
            weight_min(next) {
                if (next === undefined)
                    return Number(this.arg('weight')) || 1;
                this.arg('weight', next > 1 ? String(next) : '');
                return next;
            }
            /** Hidden cell types and connection kinds travel in the address as a dash separated list. */
            off(key, name, next) {
                const hidden = new Set(this.arg(key).split('-').filter(Boolean));
                if (next === undefined)
                    return !hidden.has(name);
                if (next)
                    hidden.delete(name);
                else
                    hidden.add(name);
                this.arg(key, [...hidden].join('-'));
                return next;
            }
            type_on(type, next) {
                return this.off('hide', type, next);
            }
            kind_on(kind, next) {
                return this.off('links', kind, next);
            }
            types() {
                const dict = {};
                for (const key of type_keys)
                    dict[key] = this.type_on(key);
                dict.unknown = dict.other;
                return dict;
            }
            kinds() {
                const dict = {};
                for (const key of kind_keys)
                    dict[key] = this.kind_on(key);
                return dict;
            }
            // ------------------------------------------------------------ header
            count() {
                const cells = $bog_worm_graph.cells();
                const neurons = cells.filter(cell => cell.type !== 'muscle' && cell.type !== 'other').length;
                return `${neurons} neurons · ${cells.length - neurons} muscles and other cells · ${$bog_worm_graph.edges().length} connections`;
            }
            query_text(next) {
                return next ?? '';
            }
            /** Typing or picking a full name — a cell like ASHL or a class like ASH — selects it right away. */
            query(next) {
                if (next === undefined)
                    return this.query_text();
                this.query_text(next);
                const needle = next.trim().toUpperCase();
                const found = $bog_worm_graph.names().find(name => name.toUpperCase() === needle);
                if (found)
                    this.focus(found);
                return next;
            }
            suggests() {
                return $bog_worm_graph.suggest(this.query());
            }
            reset(next) {
                this.Canvas().reset();
                return null;
            }
            escape(next) {
                this.focus('');
                this.path_from('');
                this.path_to('');
                this.Canvas().picked(-1);
                return null;
            }
            // ------------------------------------------------------------ layout
            /** Narrow enough that the side panels have to float above the canvas instead of beside it. */
            layout_kind() {
                return this.$.$mol_media.match('(max-width: 860px)') ? 'narrow' : 'wide';
            }
            panel_showed(next) {
                if (next !== undefined)
                    return next;
                return this.layout_kind() === 'wide';
            }
            panel_state() {
                return this.panel_showed() ? 'on' : 'off';
            }
            stage() {
                return [
                    ...this.panel_showed() ? [this.Aside()] : [],
                    this.Board(),
                    ...this.focus() ? [this.Links()] : [],
                ];
            }
            board() {
                return [
                    this.Canvas(),
                    ...this.tip_text() ? [this.Tip()] : [],
                ];
            }
            tip_text() {
                return this.Canvas().tip();
            }
            tip_left() {
                const ratio = this.$.$mol_dom_context.devicePixelRatio;
                const limit = this.Canvas().width() / ratio - 272;
                return `${Math.round(Math.max(8, Math.min(this.Canvas().tip_x() + 14, limit)))}px`;
            }
            tip_top() {
                const ratio = this.$.$mol_dom_context.devicePixelRatio;
                const limit = this.Canvas().height() / ratio - 84;
                return `${Math.round(Math.max(8, Math.min(this.Canvas().tip_y() + 16, limit)))}px`;
            }
            // ------------------------------------------------------------ keyboard
            auto() {
                return [this.keyboard()];
            }
            keyboard() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'keydown', $mol_wire_async((event) => this.key(event)));
            }
            key(event) {
                if (event.key !== 'Escape')
                    return;
                if (!this.focus() && !this.path_from() && !this.path_to())
                    return;
                this.escape();
            }
        }
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "types", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "kinds", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "query_text", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "query", null);
        __decorate([
            $mol_action
        ], $bog_worm.prototype, "reset", null);
        __decorate([
            $mol_action
        ], $bog_worm.prototype, "escape", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "panel_showed", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "stage", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "board", null);
        __decorate([
            $mol_mem
        ], $bog_worm.prototype, "keyboard", null);
        __decorate([
            $mol_action
        ], $bog_worm.prototype, "key", null);
        $$.$bog_worm = $bog_worm;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_worm, {
            flex: { direction: 'column' },
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: { color: $mol_theme.back },
            color: $mol_theme.text,
            Head: {
                flex: { direction: 'row', wrap: 'wrap', shrink: 0 },
                align: { items: 'center' },
                gap: $mol_gap.space,
                padding: { top: '.4rem', bottom: '.4rem', left: '.75rem', right: '.75rem' },
                background: { color: $mol_theme.card },
                border: { bottom: { width: '1px', style: 'solid', color: $mol_theme.line } },
            },
            Brand: {
                flex: { direction: 'column', grow: 1 },
                minWidth: '10rem',
            },
            Count: {
                font: { size: '.75rem' },
                color: $mol_theme.shade,
            },
            Search: {
                flex: { grow: 1 },
                minWidth: '11rem',
                maxWidth: '22rem',
            },
            Layout: {
                minWidth: '9rem',
            },
            Stage: {
                flex: { direction: 'row', grow: 1, shrink: 1, basis: 0 },
                position: 'relative',
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
            },
            Board: {
                flex: { direction: 'column', grow: 1, shrink: 1, basis: 0 },
                position: 'relative',
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
            },
            Tip: {
                position: 'absolute',
                zIndex: 3,
                maxWidth: '17rem',
                padding: { top: '.35rem', bottom: '.35rem', left: '.55rem', right: '.55rem' },
                background: { color: $mol_theme.card },
                border: { width: '1px', style: 'solid', color: $mol_theme.line, radius: $mol_gap.round },
                box: { shadow: [{ x: 0, y: '2px', blur: '10px', spread: 0, color: '#00000033' }] },
                font: { size: '.8rem' },
                lineHeight: '1.25rem',
                whiteSpace: 'pre-line',
                pointerEvents: 'none',
            },
            Foot: {
                flex: { direction: 'row', wrap: 'wrap', shrink: 0 },
                align: { items: 'center' },
                gap: '.3rem',
                padding: { top: '.3rem', bottom: '.3rem', left: '.75rem', right: '.75rem' },
                font: { size: '.72rem' },
                color: $mol_theme.shade,
                background: { color: $mol_theme.card },
                border: { top: { width: '1px', style: 'solid', color: $mol_theme.line } },
            },
            // too narrow to keep the panels beside the canvas — float them above it
            '@': {
                worm_layout: {
                    narrow: {
                        Aside: {
                            position: 'absolute',
                            zIndex: 6,
                            top: 0,
                            left: 0,
                            height: '100%',
                            background: { color: $mol_theme.back },
                            box: { shadow: [{ x: '2px', y: 0, blur: '16px', spread: 0, color: '#00000044' }] },
                        },
                        Links: {
                            position: 'absolute',
                            zIndex: 5,
                            top: 0,
                            right: 0,
                            height: '100%',
                            maxWidth: '82%',
                            background: { color: $mol_theme.back },
                            box: { shadow: [{ x: '-2px', y: 0, blur: '16px', spread: 0, color: '#00000044' }] },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Generated by scripts/build-data.mjs — do not edit by hand.
     * Cook S.J. et al. Whole-animal connectomes of both Caenorhabditis elegans sexes. Nature 571, 63–71 (2019)
     */
    $.$bog_worm_data = {
        dataset: {
            "id": "cook2019",
            "title": "Cook et al. 2019 — hermaphrodite whole-animal connectome",
            "citation": "Cook S.J. et al. Whole-animal connectomes of both Caenorhabditis elegans sexes. Nature 571, 63–71 (2019)",
            "doi": "https://doi.org/10.1038/s41586-019-1352-7",
            "source": "https://github.com/openworm/c302/blob/master/c302/data/herm_full_edgelist.csv"
        },
        /** Ganglia and tissue groups, ordered anterior to posterior. */
        ganglia: ["anterior pharyngeal bulb", "anterior ganglion", "dorsal ganglion", "lateral ganglion", "ventral ganglion", "posterior pharyngeal bulb", "retrovesicular ganglion", "ventral nerve cord", "midbody neurons", "preanal ganglion", "dorsorectal ganglion", "lumbar ganglion", "pharyngeal muscle", "pharyngeal marginal cell", "body wall muscle", "uterine muscle", "vulval muscle", "anal and sphincter muscle", "intestinal muscle", "other tissue"],
        /** id, class, type, ganglion index, neurotransmitters, anterior-posterior, dorsal-ventral, full name */
        cells: "ADAL,ADA,i,3,Glu,-2.398,0.321,Anterior Process from Deirid Commissure A Left\nADAR,ADA,i,3,Glu,-2.398,0.321,Anterior Process from Deirid Commissure A Right\nADEL,ADE,s,3,DA,-2.424,0.324,Anterior DEirid Neuron Left\nADER,ADE,s,3,DA,-2.424,0.324,Anterior DEirid Neuron Right\nADFL,ADF,s,3,5-HT,-2.679,0.416,Amphid Dual Ciliated Ending F Left\nADFR,ADF,s,3,5-HT,-2.679,0.416,Amphid Dual Ciliated Ending F Right\nADLL,ADL,s,3,,-2.657,0.482,Amphid Dual Ciliated Ending L Left\nADLR,ADL,s,3,,-2.657,0.482,Amphid Dual Ciliated Ending L Right\nAFDL,AFD,s,3,Glu,-2.684,0.435,Amphid Finger-like Endings D Left\nAFDR,AFD,s,3,Glu,-2.684,0.435,Amphid Finger-like Endings D Right\nAIAL,AIA,i,4,ACh,-2.629,0.357,Anterior Interneuron A Left\nAIAR,AIA,i,4,ACh,-2.627,0.356,Anterior Interneuron A Right\nAIBL,AIB,i,3,Glu,-2.662,0.379,Anterior Interneuron B Left\nAIBR,AIB,i,3,,-2.662,0.379,Anterior Interneuron B Right\nAIML,AIM,i,4,Glu 5-HT,-2.525,0.283,Anterior Interneuron M Left\nAIMR,AIM,i,4,Glu 5-HT,-2.516,0.284,Anterior Interneuron M Right\nAINL,AIN,i,3,ACh,-2.611,0.437,Anterior Interneuron N Left\nAINR,AIN,i,3,ACh,-2.613,0.438,Anterior Interneuron N Right\nAIYL,AIY,i,4,ACh,-2.515,0.289,Anterior Interneuron Y Left\nAIYR,AIY,i,4,ACh,-2.517,0.29,Anterior Interneuron Y Right\nAIZL,AIZ,i,3,Glu,-2.576,0.378,Anterior Interneuron Z Left\nAIZR,AIZ,i,3,Glu,-2.576,0.378,Anterior Interneuron Z Right\nALA,ALA,i,2,,-2.7,0.516,Anterior Lateral Neuron A\nALML,ALM,s,8,Glu,-0.608,-0.371,Anterior Lateral Microtubule Neuron Left\nALMR,ALM,s,8,Glu,-0.607,-0.371,Anterior Lateral Microtubule Neuron Right\nALNL,ALN,s,b,ACh,4.067,0.124,Anterior Lateral Neuron N Left\nALNR,ALN,s,b,ACh,4.067,0.124,Anterior Lateral Neuron N Right\nAQR,AQR,s,3,Glu,-2.43,0.339,Anterior, Q-cell Derived Receptor\nAS1,AS,m,6,ACh,-2.286,0.045,A-type Short Motor Neuron 1\nAS10,AS,m,7,ACh,2.782,-0.232,A-type Short Motor Neuron 10\nAS11,AS,m,9,ACh,3.157,-0.261,A-type Short Motor Neuron 11\nAS2,AS,m,7,ACh,-2.029,-0.107,A-type Short Motor Neuron 2\nAS3,AS,m,7,ACh,-1.514,-0.457,A-type Short Motor Neuron 3\nAS4,AS,m,7,ACh,-0.902,-0.654,A-type Short Motor Neuron 4\nAS5,AS,m,7,ACh,-0.038,-0.498,A-type Short Motor Neuron 5\nAS6,AS,m,7,ACh,0.283,-0.342,A-type Short Motor Neuron 6\nAS7,AS,m,7,ACh,1.199,0.04,A-type Short Motor Neuron 7\nAS8,AS,m,7,ACh,1.819,-0.018,A-type Short Motor Neuron 8\nAS9,AS,m,7,ACh,2.289,-0.144,A-type Short Motor Neuron 9\nASEL,ASE,s,3,Glu,-2.637,0.401,Amphid Single Cilium E Left\nASER,ASE,s,3,Glu,-2.637,0.401,Amphid Single Cilium E Right\nASGL,ASG,s,3,Glu 5-HT,-2.653,0.459,Amphid Single Cilium G Left\nASGR,ASG,s,3,Glu 5-HT,-2.653,0.459,Amphid Single Cilium G Right\nASHL,ASH,s,3,Glu,-2.656,0.41,Amphid Single Cilium H Left\nASHR,ASH,s,3,Glu,-2.656,0.41,Amphid Single Cilium H Right\nASIL,ASI,s,3,,-2.636,0.473,Amphid Single Cilium I Left\nASIR,ASI,s,3,,-2.636,0.473,Amphid Single Cilium I Right\nASJL,ASJ,s,3,,-2.627,0.37,Amphid Single Cilium J Left\nASJR,ASJ,s,3,,-2.627,0.37,Amphid Single Cilium J Right\nASKL,ASK,s,3,Glu,-2.68,0.471,Amphid Single Cilium K Left\nASKR,ASK,s,3,Glu,-2.68,0.471,Amphid Single Cilium K Right\nAUAL,AUA,i,3,Glu,-2.64,0.374,Amphid-associated Unknown Receptor A Left\nAUAR,AUA,i,3,Glu,-2.64,0.374,Amphid-associated Unknown Receptor A Right\nAVAL,AVA,i,3,,-2.704,0.428,Anterior Ventral Process A Left\nAVAR,AVA,i,3,,-2.705,0.428,Anterior Ventral Process A Right\nAVBL,AVB,i,3,,-2.635,0.426,Anterior Ventral Process B Left\nAVBR,AVB,i,3,,-2.635,0.426,Anterior Ventral Process B Right\nAVDL,AVD,i,3,,-2.613,0.415,Anterior Ventral Process D Left\nAVDR,AVD,i,3,,-2.615,0.416,Anterior Ventral Process D Right\nAVEL,AVE,i,3,,-2.687,0.404,Anterior Ventral Process E Left\nAVER,AVE,i,3,,-2.688,0.405,Anterior Ventral Process E Right\nAVFL,AVF,i,6,,-2.462,0.192,Anterior Ventral Process F Left\nAVFR,AVF,i,6,,-2.49,0.249,Anterior Ventral Process F Right\nAVG,AVG,i,6,,-2.38,0.134,Anterior Ventral Process G\nAVHL,AVH,i,3,,-2.636,0.45,Anterior Ventral Process H Left\nAVHR,AVH,i,3,,-2.638,0.45,Anterior Ventral Process H Right\nAVJL,AVJ,i,3,,-2.64,0.475,Anterior Ventral Process J Left\nAVJR,AVJ,i,3,,-2.639,0.476,Anterior Ventral Process J Right\nAVKL,AVK,i,4,,-2.496,0.261,Anterior Ventral Process K Left\nAVKR,AVK,i,4,,-2.495,0.259,Anterior Ventral Process K Right\nAVL,AVL,p,4,GABA,-2.625,0.371,Anterior Ventral Process L\nAVM,AVM,s,8,Glu,-0.557,-0.428,Anterior Ventral Microtubule Neuron\nAWAL,AWA,s,3,,-2.659,0.435,Amphid Wing Neuron A Left\nAWAR,AWA,s,3,,-2.659,0.435,Amphid Wing Neuron A Right\nAWBL,AWB,s,3,,-2.662,0.437,Amphid Wing Neuron B Left\nAWBR,AWB,s,3,,-2.662,0.437,Amphid Wing Neuron B Right\nAWCL,AWC,s,3,Glu,-2.678,0.39,Amphid Wing Neuron C Left\nAWCR,AWC,s,3,Glu,-2.678,0.39,Amphid Wing Neuron C Right\nBAGL,BAG,s,1,Glu,-2.771,0.45,BAG-like Dendritic Ending Left\nBAGR,BAG,s,1,Glu,-2.771,0.45,BAG-like Dendritic Ending Right\nBDUL,BDU,i,8,,-1.861,-0.01,Black Vesicles, Deirid Locale, Unknown Function Left\nBDUR,BDU,i,8,,-1.861,-0.01,Black Vesicles, Deirid Locale, Unknown Function Right\nCANL,CAN,u,8,,0.48,0.018,Excretory CANal-associated Neuron Left\nCANR,CAN,u,8,,0.479,0.017,Excretory CANal-associated Neuron Right\nCEPDL,CEP,s,2,DA,-2.747,0.544,CEPhalic Sensory Neuron Dorsal Left\nCEPDR,CEP,s,2,DA,-2.747,0.544,CEPhalic Sensory Neuron Dorsal Right\nCEPVL,CEP,s,1,DA,-2.771,0.399,CEPhalic Sensory Neuron Ventral Left\nCEPVR,CEP,s,1,DA,-2.771,0.399,CEPhalic Sensory Neuron Ventral Right\nDA1,DA,m,6,ACh,-2.27,0.034,Dorsal A-type Motor Neuron 1\nDA2,DA,m,7,ACh,-1.907,-0.218,Dorsal A-type Motor Neuron 2\nDA3,DA,m,7,ACh,-1.237,-0.583,Dorsal A-type Motor Neuron 3\nDA4,DA,m,7,ACh,-0.324,-0.618,Dorsal A-type Motor Neuron 4\nDA5,DA,m,7,ACh,0.843,-0.031,Dorsal A-type Motor Neuron 5\nDA6,DA,m,7,ACh,1.987,-0.064,Dorsal A-type Motor Neuron 6\nDA7,DA,m,7,ACh,2.816,-0.249,Dorsal A-type Motor Neuron 7\nDA8,DA,m,9,ACh,3.768,-0.109,Dorsal A-type Motor Neuron 8\nDA9,DA,m,9,ACh,3.768,-0.109,Dorsal A-type Motor Neuron 9\nDB1,DB,m,6,ACh,-2.303,0.068,Dorsal B-type Motor Neuron 1\nDB2,DB,m,6,ACh,-2.448,0.16,Dorsal B-type Motor Neuron 2\nDB3,DB,m,7,ACh,-1.944,-0.17,Dorsal B-type Motor Neuron 3/1\nDB4,DB,m,7,ACh,-0.963,-0.646,Dorsal B-type Motor Neuron 4\nDB5,DB,m,7,ACh,0.354,-0.305,Dorsal B-type Motor Neuron 5\nDB6,DB,m,7,ACh,1.781,-0.002,Dorsal B-type Motor Neuron 6\nDB7,DB,m,7,ACh,2.678,-0.226,Dorsal B-type Motor Neuron 7\nDD1,DD,m,6,GABA,-2.319,0.068,Dorsal D-type Motor Neuron 1\nDD2,DD,m,7,GABA,-1.565,-0.428,Dorsal D-type Motor Neuron 2\nDD3,DD,m,7,GABA,-0.286,-0.605,Dorsal D-type Motor Neuron 3\nDD4,DD,m,7,GABA,1.229,0.045,Dorsal D-type Motor Neuron 4\nDD5,DD,m,7,GABA,2.341,-0.158,Dorsal D-type Motor Neuron 5\nDD6,DD,m,9,GABA,3.657,-0.165,Dorsal D-type Motor Neuron 6\nDVA,DVA,p,a,ACh,3.965,0.059,Dorsorectal Ganglion Ventral Process A\nDVB,DVB,p,a,GABA,3.943,0.043,Dorsorectal Ganglion Ventral Process B\nDVC,DVC,i,a,Glu,3.985,0.051,Dorsorectal Ganglion Ventral Process C\nFLPL,FLP,s,3,Glu,-2.462,0.311,FLaP-like Dendritic Ending Left\nFLPR,FLP,s,3,Glu,-2.462,0.311,FLaP-like Dendritic Ending Right\nHSNL,HSN,m,8,5-HT,0.623,0.076,Hermaphrodite-Specific Neuron Left\nHSNR,HSN,m,8,5-HT,0.623,0.076,Hermaphrodite-Specific Neuron Right\nI1L,I1,p,0,ACh,-3.003,0.532,Interneuron 1 (pharynx) Left\nI1R,I1,p,0,ACh,-3.003,0.532,Interneuron 1 (pharynx) Right\nI2L,I2,p,0,Glu,-3.116,0.545,Interneuron 2 (pharynx) Left\nI2R,I2,p,0,,-3.116,0.545,Interneuron 2 (pharynx) Right\nI3,I3,p,0,,-2.966,0.582,Interneuron 3 (pharynx)\nI4,I4,i,5,,-2.539,0.44,Interneuron 4 (pharynx)\nI5,I5,p,5,Glu 5-HT,-2.477,0.297,Interneuron 5 (pharynx)\nI6,I6,p,5,ACh,-2.517,0.43,Interneuron 6 (pharynx)\nIL1DL,IL1,p,1,Glu,-2.826,0.531,Inner Labial 1 Dorsal Left\nIL1DR,IL1,p,1,Glu,-2.826,0.531,Inner Labial 1 Dorsal Right\nIL1L,IL1,p,1,Glu,-2.827,0.478,Inner Labial 1 Left\nIL1R,IL1,p,1,Glu,-2.827,0.479,Inner Labial 1 Right\nIL1VL,IL1,p,1,Glu,-2.795,0.41,Inner Labial 1 Ventral Left\nIL1VR,IL1,p,1,Glu,-2.795,0.41,Inner Labial 1 Ventral Right\nIL2DL,IL2,s,1,ACh,-2.875,0.571,Inner Labial 2 Dorsal Left\nIL2DR,IL2,s,1,ACh,-2.875,0.571,Inner Labial 2 Dorsal Right\nIL2L,IL2,s,1,ACh,-2.85,0.493,Inner Labial 2 Left\nIL2R,IL2,s,1,ACh,-2.85,0.493,Inner Labial 2 Right\nIL2VL,IL2,s,1,ACh,-2.889,0.429,Inner Labial 2 Ventral Left\nIL2VR,IL2,s,1,ACh,-2.889,0.429,Inner Labial 2 Ventral Right\nLUAL,LUA,i,b,Glu,4.042,0.044,LUmbar Ganglion A Left\nLUAR,LUA,i,b,Glu,4.042,0.044,LUmbar Ganglion A Right\nM1,M1,m,5,ACh,-2.521,0.444,Motor Neuron 1 (pharynx)\nM2L,M2,m,5,ACh,-2.525,0.38,Motor Neuron 2 (pharynx) Left\nM2R,M2,m,5,ACh,-2.525,0.38,Motor Neuron 2 (pharynx) Right\nM3L,M3,p,0,Glu,-2.939,0.482,Motor Neuron 3 (pharynx) Left\nM3R,M3,p,0,Glu,-2.939,0.482,Motor Neuron 3 (pharynx) Right\nM4,M4,m,0,ACh,-2.893,0.574,Motor Neuron 4 (pharynx)\nM5,M5,m,5,ACh,-2.418,0.402,Motor Neuron 5 (pharynx)\nMCL,MC,p,0,ACh,-2.96,0.523,Marginal Cell Neuron (pharynx) Left\nMCR,MC,p,0,ACh,-2.96,0.522,Marginal Cell Neuron (pharynx) Right\nMI,MI,p,0,Glu,-2.95,0.569,Motor/Interneuron (pharynx)\nNSML,NSM,p,0,5-HT,-2.934,0.521,NeuroSecretory Motor Neuron (pharynx) Left\nNSMR,NSM,p,0,5-HT,-2.934,0.522,NeuroSecretory Motor Neuron (pharynx) Right\nOLLL,OLL,s,1,Glu,-2.839,0.5,Outer Labial Lateral Dendrite Left\nOLLR,OLL,s,1,Glu,-2.839,0.5,Outer Labial Lateral Dendrite Right\nOLQDL,OLQ,p,1,Glu,-2.8,0.534,Outer Labial Quadrant Dendrite Dorsal Left\nOLQDR,OLQ,p,1,Glu,-2.8,0.534,Outer Labial Quadrant Dendrite Dorsal Right\nOLQVL,OLQ,p,1,Glu,-2.792,0.439,Outer Labial Quadrant Dendrite Ventral Left\nOLQVR,OLQ,p,1,Glu,-2.793,0.439,Outer Labial Quadrant Dendrite Ventral Right\nPDA,PDA,m,9,ACh,3.869,-0.055,Preanal Cell Body Dorsal Axon A\nPDB,PDB,p,9,,3.835,-0.084,Preanal Cell Body Dorsal Axon B\nPDEL,PDE,s,8,DA,1.438,0.274,Posterior DEirid Left\nPDER,PDE,s,8,DA,1.438,0.274,Posterior DEirid Right\nPHAL,PHA,s,b,Glu,4.026,0.039,PHasmid Neuron A Left\nPHAR,PHA,s,b,Glu,4.026,0.039,PHasmid Neuron A Right\nPHBL,PHB,s,b,Glu 5-HT,4.055,0.053,PHasmid Neuron B Left\nPHBR,PHB,s,b,Glu 5-HT,4.055,0.053,PHasmid Neuron B Right\nPHCL,PHC,s,b,Glu,4.088,0.073,PHasmid Neuron C Left\nPHCR,PHC,s,b,Glu,4.088,0.073,PHasmid Neuron C Right\nPLML,PLM,s,b,Glu,4.101,0.082,Posterior Lateral Microtubule Neuron Left\nPLMR,PLM,s,b,Glu,4.101,0.082,Posterior Lateral Microtubule Neuron Right\nPLNL,PLN,p,b,ACh,4.023,0.069,Posterior Lateral N Left\nPLNR,PLN,p,b,ACh,4.023,0.069,Posterior Lateral N Right\nPQR,PQR,s,b,Glu,4.074,0.077,Posterior Q-cell Derived Receptor\nPVCL,PVC,i,b,ACh,4.042,0.064,Posterior Ventral Process C Left\nPVCR,PVC,i,b,ACh,4.042,0.064,Posterior Ventral Process C Right\nPVDL,PVD,s,8,Glu,-0.33,-0.363,Posterior Ventral Process D Left\nPVDR,PVD,s,8,Glu,1.75,0.256,Posterior Ventral Process D Right\nPVM,PVM,s,8,,1.891,0.219,Posterior Ventral Microtubule Neuron\nPVNL,PVN,p,b,,4.106,0.095,Posterior Ventral Process N Left\nPVNR,PVN,p,b,,4.106,0.095,Posterior Ventral Process N Right\nPVPL,PVP,i,9,ACh,3.679,-0.143,Posterior Ventral Process P Left\nPVPR,PVP,i,9,ACh,3.578,-0.16,Posterior Ventral Process P Right\nPVQL,PVQ,i,b,Glu,4.016,0.052,Posterior Ventral Process Q Left\nPVQR,PVQ,i,b,Glu,4.016,0.052,Posterior Ventral Process Q Right\nPVR,PVR,i,b,Glu,4.074,0.077,Posterior Ventral Process R\nPVT,PVT,i,9,,3.601,-0.169,Posterior Ventral Process T\nPVWL,PVW,i,b,ACh,4.06,0.075,Posterior Ventral Process W Left\nPVWR,PVW,i,b,ACh,4.06,0.075,Posterior Ventral Process W Right\nRIAL,RIA,i,3,Glu,-2.695,0.454,Ring Interneuron A Left\nRIAR,RIA,i,3,Glu,-2.69,0.462,Ring Interneuron A Right\nRIBL,RIB,i,3,,-2.65,0.382,Ring Interneuron B Left\nRIBR,RIB,i,3,,-2.658,0.389,Ring Interneuron B Right\nRICL,RIC,i,3,Oct,-2.598,0.365,Ring Interneuron C Left\nRICR,RIC,i,3,Oct,-2.598,0.365,Ring Interneuron C Right\nRID,RID,p,2,,-2.724,0.551,Ring Interneuron D\nRIFL,RIF,i,6,,-2.386,0.181,Ring Interneuron F Left\nRIFR,RIF,i,6,,-2.445,0.238,Ring Interneuron F Right\nRIGL,RIG,i,6,Glu,-2.318,0.159,Ring Interneuron G Left\nRIGR,RIG,i,6,Glu,-2.405,0.202,Ring Interneuron G Right\nRIH,RIH,i,4,5-HT,-2.682,0.365,Ring Interneuron H\nRIML,RIM,p,3,ACh Glu Tyr,-2.619,0.39,Ring Interneuron M Left\nRIMR,RIM,p,3,ACh Glu Tyr,-2.619,0.39,Ring Interneuron M Right\nRIPL,RIP,i,1,,-2.795,0.486,Ring Interneuron P Left\nRIPR,RIP,i,1,,-2.795,0.486,Ring Interneuron P Right\nRIR,RIR,i,4,,-2.653,0.367,Ring Interneuron R\nRIS,RIS,i,4,GABA,-2.5,0.275,Ring Interneuron S\nRIVL,RIV,p,3,,-2.614,0.5,Ring Interneuron V Left\nRIVR,RIV,p,3,,-2.644,0.506,Ring Interneuron V Right\nRMDDL,RMD,m,4,ACh,-2.681,0.374,Ring Motor Neuron D Dorsal Left\nRMDDR,RMD,m,4,ACh,-2.681,0.373,Ring Motor Neuron D Dorsal Right\nRMDL,RMD,m,3,ACh,-2.702,0.411,Ring Motor Neuron D Left\nRMDR,RMD,m,3,ACh,-2.703,0.411,Ring Motor Neuron D Right\nRMDVL,RMD,m,3,ACh,-2.703,0.444,Ring Motor Neuron D Ventral Left\nRMDVR,RMD,m,3,ACh,-2.704,0.444,Ring Motor Neuron D Ventral Right\nRMED,RME,m,1,GABA,-2.757,0.578,Ring Motor Neuron E Dorsal\nRMEL,RME,m,1,GABA,-2.744,0.47,Ring Motor Neuron E Left\nRMER,RME,m,1,GABA,-2.764,0.471,Ring Motor Neuron E Right\nRMEV,RME,m,1,GABA,-2.729,0.36,Ring Motor Neuron E Ventral\nRMFL,RMF,m,4,,-2.651,0.349,Ring Motor Neuron F Left\nRMFR,RMF,m,4,,-2.651,0.349,Ring Motor Neuron F Right\nRMGL,RMG,i,3,,-2.389,0.336,Ring Motor Neuron G Left\nRMGR,RMG,i,3,,-2.389,0.336,Ring Motor Neuron G Right\nRMHL,RMH,m,4,,-2.659,0.365,Ring Motor Neuron H Left\nRMHR,RMH,m,4,,-2.659,0.365,Ring Motor Neuron H Right\nSAADL,SAA,p,4,ACh,-2.671,0.373,Sublateral Anterior A Dorsal Left\nSAADR,SAA,p,4,ACh,-2.671,0.373,Sublateral Anterior A Dorsal Right\nSAAVL,SAA,p,3,ACh,-2.709,0.454,Sublateral Anterior A Ventral Left\nSAAVR,SAA,p,3,ACh,-2.709,0.454,Sublateral Anterior A Ventral Right\nSABD,SAB,p,6,ACh,-2.348,0.149,Sublateral Anterior B Dorsal\nSABVL,SAB,p,6,ACh,-2.492,0.243,Sublateral Anterior B Ventral Left\nSABVR,SAB,p,6,ACh,-2.47,0.241,Sublateral Anterior B Ventral Right\nSDQL,SDQ,p,8,ACh,2.228,0.177,Sublateral Dorsal Q-cell Derived Left\nSDQR,SDQ,p,8,ACh,-1.305,-0.111,Sublateral Dorsal Q-cell Derived Right\nSIADL,SIA,p,4,ACh,-2.645,0.356,Sublateral Interneuron A Dorsal Left\nSIADR,SIA,p,4,ACh,-2.626,0.35,Sublateral Interneuron A Dorsal Right\nSIAVL,SIA,p,4,ACh,-2.595,0.329,Sublateral Interneuron A Ventral Left\nSIAVR,SIA,p,4,ACh,-2.595,0.329,Sublateral Interneuron A Ventral Right\nSIBDL,SIB,p,3,ACh,-2.684,0.387,Sublateral Interneuron B Dorsal Left\nSIBDR,SIB,p,3,ACh,-2.684,0.387,Sublateral Interneuron B Dorsal Right\nSIBVL,SIB,p,4,ACh,-2.661,0.364,Sublateral Interneuron B Ventral Left\nSIBVR,SIB,p,4,ACh,-2.661,0.364,Sublateral Interneuron B Ventral Right\nSMBDL,SMB,m,4,ACh,-2.637,0.339,Sublateral Motor Neuron B Dorsal Left\nSMBDR,SMB,m,4,ACh,-2.637,0.337,Sublateral Motor Neuron B Dorsal Right\nSMBVL,SMB,m,4,ACh,-2.626,0.336,Sublateral Motor Neuron B Ventral Left\nSMBVR,SMB,m,4,ACh,-2.627,0.335,Sublateral Motor Neuron B Ventral Right\nSMDDL,SMD,m,4,ACh,-2.663,0.35,Sublateral Motor Neuron D Dorsal Left\nSMDDR,SMD,m,4,ACh,-2.663,0.35,Sublateral Motor Neuron D Dorsal Right\nSMDVL,SMD,m,3,ACh,-2.703,0.463,Sublateral Motor Neuron D Ventral Left\nSMDVR,SMD,m,3,ACh,-2.704,0.464,Sublateral Motor Neuron D Ventral Right\nURADL,URA,p,1,ACh,-2.846,0.522,Unknown Receptor, not Ciliated A Dorsal Left\nURADR,URA,p,1,ACh,-2.846,0.522,Unknown Receptor, not Ciliated A Dorsal Right\nURAVL,URA,p,1,ACh,-2.796,0.414,Unknown Receptor, not Ciliated A Ventral Left\nURAVR,URA,p,1,ACh,-2.796,0.414,Unknown Receptor, not Ciliated A Ventral Right\nURBL,URB,i,1,ACh,-2.799,0.475,Unknown Receptor, not Ciliated B Left\nURBR,URB,i,1,ACh,-2.799,0.475,Unknown Receptor, not Ciliated B Right\nURXL,URX,p,2,,-2.695,0.484,Unknown Receptor, not Ciliated X Left\nURXR,URX,p,2,,-2.695,0.484,Unknown Receptor, not Ciliated X Right\nURYDL,URY,s,1,Glu,-2.814,0.519,Unknown Receptor, not Ciliated Y Dorsal Left\nURYDR,URY,s,1,Glu,-2.814,0.519,Unknown Receptor, not Ciliated Y Dorsal Right\nURYVL,URY,s,1,Glu,-2.809,0.454,Unknown Receptor, not Ciliated Y Ventral Left\nURYVR,URY,s,1,Glu,-2.809,0.454,Unknown Receptor, not Ciliated Y Ventral Right\nVA1,VA,m,6,ACh,-2.356,0.117,Ventral A-type Motor Neuron 1\nVA10,VA,m,7,ACh,2.546,-0.213,Ventral A-type Motor Neuron 10\nVA11,VA,m,7,ACh,3.124,-0.263,Ventral A-type Motor Neuron 11\nVA12,VA,m,9,ACh,3.638,-0.176,Ventral A-type Motor Neuron 12\nVA2,VA,m,7,ACh,-2.171,-0.039,Ventral A-type Motor Neuron 2\nVA3,VA,m,7,ACh,-1.841,-0.264,Ventral A-type Motor Neuron 3\nVA4,VA,m,7,ACh,-1.195,-0.587,Ventral A-type Motor Neuron 4\nVA5,VA,m,7,ACh,-0.543,-0.661,Ventral A-type Motor Neuron 5\nVA6,VA,m,7,ACh,0.215,-0.412,Ventral A-type Motor Neuron 6\nVA7,VA,m,7,ACh,0.981,0.012,Ventral A-type Motor Neuron 7\nVA8,VA,m,7,ACh,1.503,0.034,Ventral A-type Motor Neuron 8\nVA9,VA,m,7,ACh,2.088,-0.091,Ventral A-type Motor Neuron 9\nVB1,VB,p,6,ACh,-2.454,0.159,Ventral B-type Motor Neuron 1\nVB10,VB,p,7,ACh,2.181,-0.114,Ventral B-type Motor Neuron 10\nVB11,VB,p,7,ACh,2.623,-0.219,Ventral B-type Motor Neuron 11\nVB2,VB,p,6,ACh,-2.525,0.194,Ventral B-type Motor Neuron 2\nVB3,VB,p,7,ACh,-2.1,-0.088,Ventral B-type Motor Neuron 3\nVB4,VB,p,7,ACh,-1.731,-0.32,Ventral B-type Motor Neuron 4\nVB5,VB,p,7,ACh,-1.096,-0.622,Ventral B-type Motor Neuron 5\nVB6,VB,p,7,ACh,-0.366,-0.627,Ventral B-type Motor Neuron 6\nVB7,VB,p,7,ACh,0.414,-0.245,Ventral B-type Motor Neuron 7\nVB8,VB,p,7,ACh,1.088,0.029,Ventral B-type Motor Neuron 8\nVB9,VB,p,7,ACh,1.595,0.032,Ventral B-type Motor Neuron 9\nVC1,VC,m,7,ACh,-1.701,-0.358,Ventral C-type Motor Neuron 1\nVC2,VC,m,7,ACh,-1.053,-0.634,Ventral C-type Motor Neuron 2\nVC3,VC,m,7,ACh,-0.065,-0.54,Ventral C-type Motor Neuron 3\nVC4,VC,m,7,ACh 5-HT,0.429,-0.246,Ventral C-type Motor Neuron 4\nVC5,VC,m,7,ACh 5-HT,0.677,-0.12,Ventral C-type Motor Neuron 5\nVC6,VC,m,7,ACh,1.742,0.01,Ventral C-type Motor Neuron 6\nVD1,VD,m,6,GABA,-2.276,0.033,Ventral D-type Motor Neuron 1\nVD10,VD,m,7,GABA,2.374,-0.168,Ventral D-type Motor Neuron 10\nVD11,VD,m,7,GABA,2.851,-0.249,Ventral D-type Motor Neuron 11\nVD12,VD,m,9,GABA,3.466,-0.23,Ventral D-type Motor Neuron 12\nVD13,VD,m,9,GABA,3.809,-0.103,Ventral D-type Motor Neuron 13\nVD2,VD,m,6,GABA,-2.251,0.017,Ventral D-type Motor Neuron 2\nVD3,VD,m,7,GABA,-1.871,-0.242,Ventral D-type Motor Neuron 3\nVD4,VD,m,7,GABA,-1.36,-0.532,Ventral D-type Motor Neuron 4\nVD5,VD,m,7,GABA,-0.671,-0.667,Ventral D-type Motor Neuron 5\nVD6,VD,m,7,GABA,-0.002,-0.518,Ventral D-type Motor Neuron 6\nVD7,VD,m,7,GABA,0.588,-0.138,Ventral D-type Motor Neuron 7\nVD8,VD,m,7,GABA,1.364,0.04,Ventral D-type Motor Neuron 8\nVD9,VD,m,7,GABA,1.927,-0.041,Ventral D-type Motor Neuron 9\nanal,anal,M,h,,,,\ndBWML1,dBWML,M,e,,,,\ndBWML10,dBWML,M,e,,,,\ndBWML11,dBWML,M,e,,,,\ndBWML12,dBWML,M,e,,,,\ndBWML13,dBWML,M,e,,,,\ndBWML14,dBWML,M,e,,,,\ndBWML15,dBWML,M,e,,,,\ndBWML16,dBWML,M,e,,,,\ndBWML17,dBWML,M,e,,,,\ndBWML18,dBWML,M,e,,,,\ndBWML19,dBWML,M,e,,,,\ndBWML2,dBWML,M,e,,,,\ndBWML20,dBWML,M,e,,,,\ndBWML21,dBWML,M,e,,,,\ndBWML22,dBWML,M,e,,,,\ndBWML23,dBWML,M,e,,,,\ndBWML24,dBWML,M,e,,,,\ndBWML3,dBWML,M,e,,,,\ndBWML4,dBWML,M,e,,,,\ndBWML5,dBWML,M,e,,,,\ndBWML6,dBWML,M,e,,,,\ndBWML7,dBWML,M,e,,,,\ndBWML8,dBWML,M,e,,,,\ndBWML9,dBWML,M,e,,,,\ndBWMR1,dBWMR,M,e,,,,\ndBWMR10,dBWMR,M,e,,,,\ndBWMR11,dBWMR,M,e,,,,\ndBWMR12,dBWMR,M,e,,,,\ndBWMR13,dBWMR,M,e,,,,\ndBWMR14,dBWMR,M,e,,,,\ndBWMR15,dBWMR,M,e,,,,\ndBWMR16,dBWMR,M,e,,,,\ndBWMR17,dBWMR,M,e,,,,\ndBWMR18,dBWMR,M,e,,,,\ndBWMR19,dBWMR,M,e,,,,\ndBWMR2,dBWMR,M,e,,,,\ndBWMR20,dBWMR,M,e,,,,\ndBWMR21,dBWMR,M,e,,,,\ndBWMR22,dBWMR,M,e,,,,\ndBWMR23,dBWMR,M,e,,,,\ndBWMR24,dBWMR,M,e,,,,\ndBWMR3,dBWMR,M,e,,,,\ndBWMR4,dBWMR,M,e,,,,\ndBWMR5,dBWMR,M,e,,,,\ndBWMR6,dBWMR,M,e,,,,\ndBWMR7,dBWMR,M,e,,,,\ndBWMR8,dBWMR,M,e,,,,\ndBWMR9,dBWMR,M,e,,,,\nhyp,hyp,o,j,,,,- To be added... -\nintL,int,M,i,,,,\nintR,int,M,i,,,,\nintestine,intestine,o,j,,,,\nmc1dl,mc1,o,d,,,,\nmc1dr,mc1,o,d,,,,\nmc1v,mc1,o,d,,,,\nmc2dl,mc2,o,d,,,,\nmc2dr,mc2,o,d,,,,\nmc2v,mc2,o,d,,,,\nmc3dl,mc3,o,d,,,,\nmc3dr,mc3,o,d,,,,\nmc3v,mc3,o,d,,,,\npm1d,pm1,M,c,,,,\npm1vl,pm1,M,c,,,,\npm1vr,pm1,M,c,,,,\npm2d,pm2,M,c,,,,\npm2vl,pm2,M,c,,,,\npm2vr,pm2,M,c,,,,\npm3d,pm3,M,c,,,,\npm3vl,pm3,M,c,,,,\npm3vr,pm3,M,c,,,,\npm4d,pm4,M,c,,,,\npm4vl,pm4,M,c,,,,\npm4vr,pm4,M,c,,,,\npm5d,pm5,M,c,,,,\npm5vl,pm5,M,c,,,,\npm5vr,pm5,M,c,,,,\npm6d,pm6,M,c,,,,\npm6vl,pm6,M,c,,,,\npm6vr,pm6,M,c,,,,\npm7d,pm7,M,c,,,,\npm7vl,pm7,M,c,,,,\npm7vr,pm7,M,c,,,,\npm8,pm8,M,c,,,,- To be added... -\nsph,sph,M,h,,,,\num1aL,um1,M,f,,,,\num1aR,um1,M,f,,,,\num1pL,um1,M,f,,,,\num1pR,um1,M,f,,,,\num2aL,um2,M,f,,,,\num2aR,um2,M,f,,,,\num2pL,um2,M,f,,,,\num2pR,um2,M,f,,,,\nvBWML1,vBWML,M,e,,,,\nvBWML10,vBWML,M,e,,,,\nvBWML11,vBWML,M,e,,,,\nvBWML12,vBWML,M,e,,,,\nvBWML13,vBWML,M,e,,,,\nvBWML14,vBWML,M,e,,,,\nvBWML15,vBWML,M,e,,,,\nvBWML16,vBWML,M,e,,,,\nvBWML17,vBWML,M,e,,,,\nvBWML18,vBWML,M,e,,,,\nvBWML19,vBWML,M,e,,,,\nvBWML2,vBWML,M,e,,,,\nvBWML20,vBWML,M,e,,,,\nvBWML21,vBWML,M,e,,,,\nvBWML22,vBWML,M,e,,,,\nvBWML23,vBWML,M,e,,,,\nvBWML3,vBWML,M,e,,,,\nvBWML4,vBWML,M,e,,,,\nvBWML5,vBWML,M,e,,,,\nvBWML6,vBWML,M,e,,,,\nvBWML7,vBWML,M,e,,,,\nvBWML8,vBWML,M,e,,,,\nvBWML9,vBWML,M,e,,,,\nvBWMR1,vBWMR,M,e,,,,\nvBWMR10,vBWMR,M,e,,,,\nvBWMR11,vBWMR,M,e,,,,\nvBWMR12,vBWMR,M,e,,,,\nvBWMR13,vBWMR,M,e,,,,\nvBWMR14,vBWMR,M,e,,,,\nvBWMR15,vBWMR,M,e,,,,\nvBWMR16,vBWMR,M,e,,,,\nvBWMR17,vBWMR,M,e,,,,\nvBWMR18,vBWMR,M,e,,,,\nvBWMR19,vBWMR,M,e,,,,\nvBWMR2,vBWMR,M,e,,,,\nvBWMR20,vBWMR,M,e,,,,\nvBWMR21,vBWMR,M,e,,,,\nvBWMR22,vBWMR,M,e,,,,\nvBWMR23,vBWMR,M,e,,,,\nvBWMR24,vBWMR,M,e,,,,\nvBWMR3,vBWMR,M,e,,,,\nvBWMR4,vBWMR,M,e,,,,\nvBWMR5,vBWMR,M,e,,,,\nvBWMR6,vBWMR,M,e,,,,\nvBWMR7,vBWMR,M,e,,,,\nvBWMR8,vBWMR,M,e,,,,\nvBWMR9,vBWMR,M,e,,,,\nvm1aL,vm1,M,g,,,,\nvm1aR,vm1,M,g,,,,\nvm1pL,vm1,M,g,,,,\nvm1pR,vm1,M,g,,,,\nvm2aL,vm2,M,g,,,,\nvm2aR,vm2,M,g,,,,\nvm2pL,vm2,M,g,,,,\nvm2pR,vm2,M,g,,,,",
        /** source index, target index, synapse count — all base 36 */
        chemical: "39,3b,a;39,3d,3;39,3f,2;39,3g,1;39,3w,3;39,3y,8;39,3z,2;39,42,2;39,43,2;39,44,2;39,45,3;39,a5,2;39,ab,7;39,ad,1;39,ae,2;3a,3c,6;3a,3d,1;3a,3f,2;3a,3v,1;3a,3w,1;3a,3x,3;3a,3y,1;3a,3z,6;3a,42,3;3a,43,4;3a,44,1;3a,45,1;3a,46,2;3a,a6,1;3a,ac,5;3a,ad,1;3a,af,2;3a,ai,1;3b,39,2;3b,3c,3;3b,3e,d;3b,3f,2;3b,3v,1;3b,45,e;3b,46,o;3b,ab,1;3b,ae,2;3b,ag,1;3b,ah,2;3b,ai,1;3c,3a,1;3c,3b,3;3c,3e,k;3c,3f,2;3c,3v,3;3c,3x,2;3c,3z,2;3c,40,3;3c,42,1;3c,45,y;3c,46,7;3c,a6,1;3c,ac,1;3c,ad,2;3c,ae,1;3c,ah,1;3c,ai,4;3d,39,1;3d,3f,2;3d,3g,1;3d,3v,2;3d,3w,2;3d,3y,2;3d,3z,2;3d,40,2;3d,42,1;3d,43,2;3d,44,1;3d,46,2;3d,ad,2;3d,ag,4;3e,3c,7;3e,3f,2;3e,3w,5;3e,3y,6;3e,3z,m;3e,44,1;3e,45,8;3e,46,f;3e,ad,1;3e,ah,b;3e,ai,2;3f,39,2;3f,3b,3;3f,3c,1;3f,3d,1;3f,3e,7;3f,3v,3;3f,3w,4;3f,3y,4;3f,3z,2;3f,40,j;3f,44,4;3f,45,1;3f,46,5;3f,ah,4;3f,ai,e;3g,3a,1;3g,3b,1;3g,3c,4;3g,3d,c;3g,3y,a;3g,40,f;3g,45,o;3g,46,n;3g,ag,d;3v,3b,3;3v,3c,2;3v,3d,8;3v,3e,1;3v,3f,2;3v,44,6;3v,45,2;3v,a7,1;3v,ab,1;3v,ad,1;3v,ag,3;3w,3d,2;3w,3e,8;3w,3f,2;3w,3y,3;3w,3z,1;3w,ad,3;3w,ae,9;3w,ag,2;3w,ah,l;3x,3e,1;3x,3f,3;3x,3y,2;3x,3z,1;3x,46,1;3x,ad,3;3x,af,3;3x,ai,c;3y,45,1;3y,ad,h;3y,ae,6;3y,ag,4;3y,ah,2;3z,40,2;3z,ad,6;3z,af,1;40,3e,5;40,3f,1;40,3w,1;40,3y,1;40,40,f;40,42,1;40,af,1;40,ag,1x;40,ah,1e;40,ai,20;41,ah,1;41,ai,3;41,aj,2;41,ak,2;41,al,2;41,am,3;41,ao,2;42,9z,7;42,a0,d;43,9y,6;43,9z,4;43,a0,b;44,39,1;44,3d,2;44,3e,1;44,3v,7;44,3w,3;44,3x,2;44,3y,2;44,42,3;44,45,1;44,46,2;44,ad,2;44,ae,1;44,af,7;44,ag,5;45,3e,1;45,3y,l;45,3z,1;45,40,d;45,46,7;45,ae,2;45,ag,12;45,ah,1r;45,ai,8;46,3b,1;46,3c,1;46,3e,3;46,3g,4;46,3z,o;46,ad,3;46,ag,9;46,ah,1;46,ai,1h;4,6,1;4,22,2;4,25,2;4,8,1;4,72,1;4,1f,c;4,a,2;4,c,2;4,d,1;4,k,13;4,0,2;4,57,1a;4,59,4;4,5g,4;4,5h,1;4,5n,4;4,5p,1;4,6o,1;4,6q,9;4,6u,1;5,5,1;5,18,6;5,21,1;5,23,4;5,25,1;5,9,1;5,4c,1;5,26,6;5,73,a;5,77,2;5,1g,9;5,j,2;5,l,11;5,1,4;5,58,1p;5,5h,o;5,5i,2;5,5n,7;5,1s,1;5,50,1;5,6p,2;5,6r,j;6,13,1;6,14,c;6,15,2;6,17,6;6,20,1;6,22,3;6,24,2;6,4b,2;6,a,j;6,c,q;6,0,1;6,m,5;6,57,1;6,5g,1;6,5n,1;6,5l,3;6,1u,3;6,1v,9;6,1h,9;6,1i,5;6,1j,c;6,1l,4;6,1m,f;6,6q,5;7,7,3;7,14,2;7,18,4;7,25,7;7,4c,1;7,48,1;7,2f,1;7,73,8;7,b,m;7,d,r;7,1,1;7,5b,1;7,5c,5;7,5f,2;7,71,6;7,5m,2;7,1u,2;7,1v,3;7,4s,3;7,1i,8;7,1j,3;7,1k,7;7,1l,q;7,1m,3;7,6m,2;7,6r,5;13,5,1;13,14,2;13,1b,1;13,22,1;13,24,g;13,25,b;13,9,3;13,3q,1;13,48,1;13,a,6;13,c,g;13,d,d;13,i,w;13,j,l;13,k,1;13,58,2;13,5n,1;14,6,4;14,7,1;14,13,3;14,18,2;14,1d,1;14,21,1;14,24,1;14,25,1;14,8,2;14,9,3;14,a,8;14,b,4;14,c,4;14,d,w;14,i,9;14,j,12;14,k,1;15,1d,2;15,a,1a;15,c,h;15,h,2;16,14,3;16,b,1f;16,d,k;16,j,1;16,5f,e;17,4,6;17,6,6;17,1d,1;17,72,2;17,a,o;17,c,d;17,k,3;17,0,2;17,57,9;17,5n,4;17,5l,4;17,1p,2;17,1t,2;17,1h,f;17,1i,1;17,1j,e;17,1l,7;17,1m,k;17,5j,4;17,37,2;18,5,3;18,7,d;18,18,2;18,21,1;18,22,1;18,b,s;18,d,7;18,1,5;18,58,3;18,64,6;18,1s,1;18,50,1;18,4s,3;18,1i,a;18,1k,6;18,1l,r;18,1m,2;18,1o,7;18,6r,7;18,37,4;18,38,5;19,4,1;19,14,8;19,15,3;19,1d,3;19,21,2;19,24,3;19,25,4;19,2f,1;19,a,2;19,c,3;19,i,3;19,j,2;19,k,1;19,57,3;19,59,1;19,61,1;19,69,2;1a,7,1;1a,13,2;1a,14,2;1a,16,3;1a,18,2;1a,21,1;1a,24,2;1a,25,5;1a,2f,1;1a,a,1;1a,b,4;1a,d,3;1b,1c,1;1b,1d,c;1b,1e,1;1b,2c,1;1b,m,3;1b,51,y;1b,37,1;1b,38,1;1c,1e,c;1c,52,j;1c,38,1;1d,14,4;1d,1b,1;1d,a,t;1d,c,9;1d,e,5;1e,7,3;1e,14,1;1e,16,1;1e,21,2;1e,2f,2;1e,a,1;1e,b,z;1e,d,2;1e,f,5;1e,m,1;1e,5f,1;1e,37,1;20,13,7;20,15,1;20,17,2;20,22,9;20,8,7;20,i,3;20,k,n;20,0,2;21,5,9;21,14,5;21,16,1;21,19,2;21,23,3;21,9,n;21,1g,1;21,b,3;21,j,8;21,l,p;21,5f,5;21,5h,6;21,5n,2;22,4,p;22,13,1;22,17,2;22,20,2;22,24,1;22,a,4;22,d,1;22,i,1;22,k,f;22,57,a;22,5g,2;22,1t,2;22,1j,2;22,6o,2;22,6q,3;22,37,1;23,5,7;23,14,1;23,16,1;23,18,2;23,4c,1;23,77,1;23,j,1;23,l,8;23,f,1;23,58,3;23,5f,1;23,5n,7;23,1k,2;23,37,2;23,38,2;24,14,1;24,16,1;24,19,1;24,25,b;24,8,2;24,a,2;24,b,4;24,c,c;24,d,2;24,i,m;24,k,1;24,57,6;24,1h,1;24,6u,1;25,5,1;25,13,8;25,14,5;25,16,3;25,18,1;25,19,2;25,1a,2;25,24,h;25,3p,2;25,a,1;25,b,8;25,c,3;25,d,i;25,i,c;25,j,m;25,57,3;25,5p,3;8,13,1;8,14,1;8,22,4;8,8,1;8,c,1;8,i,p;8,h,3;9,13,1;9,14,4;9,8,1;9,j,t;3h,3n,1;3h,5l,b;3h,5s,3;3h,5v,3;3h,5y,1;3h,6w,a;3h,6k,3;3h,8f,b;3h,8q,4;3h,8w,5;3h,8z,9;3h,9o,2;3i,3i,1;3i,3k,2;3i,3o,5;3i,48,1;3i,75,2;3i,5m,s;3i,53,5;3i,5r,b;3i,5w,w;3i,6x,8;3i,93,e;3i,9e,6;3i,9k,c;3j,3p,1;3j,47,1;3j,63,1;3j,70,1;3j,1o,5;3j,5r,k;3j,5t,3;3j,5u,9;3j,5v,m;3j,5w,5;3j,5z,4;3j,6y,4;3j,8w,g;3j,8x,f;3j,8y,7;3j,az,k;3j,ba,6;3j,bg,4;3k,48,1;3k,73,1;3k,1n,2;3k,1o,5;3k,5r,8;3k,5s,c;3k,5t,b;3k,5u,4;3k,5v,8;3k,5w,h;3k,5y,5;3k,65,3;3k,9k,g;3k,9l,3;3k,9m,d;3k,c4,j;3l,3j,3;3l,3l,5;3l,4b,2;3l,76,4;3l,5l,d;3l,1y,1;3l,5r,u;3l,5w,3;3l,65,1;3l,6y,4;3l,az,f;3l,ba,i;3m,3k,4;3m,3s,2;3m,4c,5;3m,48,1;3m,5m,g;3m,5s,14;3m,5v,5;3m,6z,4;3m,bx,g;3m,c4,o;3n,3h,h;3n,3n,2;3n,49,2;3n,1f,2;3n,59,1;3n,5i,2;3n,5l,s;3n,1k,2;3n,5x,2;3n,5y,b;3n,5z,8;3n,60,1;3n,65,1;3n,6w,8;3o,3i,s;3o,4a,2;3o,2d,2;3o,5b,1;3o,5c,2;3o,5l,1;3o,5m,17;3o,5x,3;3o,5y,c;3o,5z,b;3o,60,5;3o,6x,5;3p,3j,6;3p,49,k;3p,4b,j;3p,72,3;3p,2,6;3p,5b,1;3p,5i,p;3p,1n,2;3p,5t,5;3p,5u,3;3p,5z,a;3p,60,5;3p,6y,2;3q,3k,2;3q,4a,a;3q,4c,q;3q,48,5;3q,73,1;3q,3,5;3q,5i,j;3q,64,1;3q,71,3;3q,1o,2;3q,5t,3;3q,5y,5;3q,60,2;3q,6x,2;3q,6z,1;3r,3l,r;3r,3p,1;3r,4b,6;3r,27,1;3r,57,4;3r,5i,5;3r,5l,10;3r,34,1;3r,5y,7;3r,5z,6;3r,60,2;3r,6y,7;3s,7,1;3s,3m,t;3s,4c,9;3s,73,1;3s,58,2;3s,5i,5;3s,5m,17;3s,1h,1;3s,5x,2;3s,5y,8;3s,5z,h;3s,60,f;3s,6z,g;3s,6h,1;49,2c,3;49,74,3;49,5c,6;49,5i,3;49,5r,1;49,5s,a;49,5x,1;49,5y,2;49,65,1;49,6k,9;49,8z,1;4a,3i,1;4a,5b,2;4a,5c,2;4a,5i,2;4a,5r,b;4a,5z,1;4a,66,3;4a,6l,6;4b,3p,1;4b,5b,4;4b,1h,1;4b,1m,1;4b,5w,e;4b,65,2;4b,6m,d;4c,3m,2;4c,58,a;4c,5c,3;4c,5i,i;4c,5m,i;4c,5v,i;4c,5z,2;4c,66,1;4c,6n,i;47,3l,3;47,47,4;47,2c,5;47,2e,e;47,74,2;47,76,1;47,59,o;47,1o,1h;47,5r,m;47,5t,6;47,5v,3;47,5y,5;47,6s,8;47,6t,9;47,6v,a;48,3i,1;48,3m,2;48,3q,1;48,4a,1;48,48,4;48,2d,4;48,2f,g;48,76,3;48,3,2;48,5a,l;48,5o,2;48,1n,13;48,5s,q;48,5t,9;48,5u,2;48,5w,6;48,5x,1;48,5z,3;48,6s,3;48,6t,1;48,6u,b;48,6v,4;2c,8,2;2c,3h,i;2c,3n,1;2c,49,r;2c,47,8;2c,2d,1;2c,n,2;2c,74,7;2c,g,2;2c,59,3;2c,5b,b;2c,5c,8;2c,5i,1;2c,5o,3;2c,63,6;2c,70,b;2c,5l,8;2c,1o,d;2c,5v,d;2c,65,1;2c,66,8;2c,6w,8;2c,6h,4;2c,6k,2;2c,6n,2;2c,6p,5;2c,8y,2;2d,3i,f;2d,3k,1;2d,4a,k;2d,48,d;2d,2d,6;2d,29,5;2d,73,2;2d,75,3;2d,5b,d;2d,5c,j;2d,5f,2;2d,5i,4;2d,64,1;2d,71,e;2d,1n,9;2d,5u,1;2d,5w,3;2d,65,7;2d,66,1;2d,6x,3;2d,6l,1;2d,6o,1;2d,9k,5;2d,9m,2;2e,3l,9;2e,4b,j;2e,47,4;2e,72,2;2e,76,5;2e,57,1;2e,59,3;2e,5b,k;2e,5c,h;2e,63,2;2e,5l,4;2e,53,3;2e,1o,5;2e,5r,7;2e,5w,8;2e,65,a;2e,66,5;2e,6y,6;2e,6i,6;2e,6q,1;2e,6v,1;2e,bh,1;2e,bj,2;2f,7,3;2f,16,2;2f,3m,8;2f,3s,3;2f,4c,b;2f,48,e;2f,2d,1;2f,77,2;2f,57,1;2f,58,1;2f,5b,d;2f,5c,c;2f,5m,3;2f,1n,d;2f,5s,4;2f,66,f;2f,5p,2;2f,6z,3;2f,6j,7;2f,6r,2;2f,6t,2;2f,c3,1;2f,c5,2;2f,c8,2;n,2c,2;n,2e,3;n,n,1;n,28,f;n,6e,2;n,e,1;n,5b,2;n,5c,3;n,5e,2;n,63,3;n,4s,b;n,4t,4;n,1m,3;n,1n,3;n,5s,1;n,6p,2;o,2d,1;o,2f,3;o,29,e;o,71,1;o,4t,a;o,5r,1;o,6g,1;o,6s,1;1z,28,3;1z,29,5;1z,3,4;1z,1s,3;1z,1v,1;1z,1w,1;1z,4x,4;1z,4y,3;1z,53,6;1z,5d,2;1z,4s,a;1z,4t,h;1z,1j,d;1z,1k,9;1z,1l,1;1z,1m,1;1z,6m,4;1z,2g,2;1z,7c,1;1z,7o,1;4w,1z,2;4w,1w,f;4w,32,3;4w,53,3;4w,4s,1;4w,4t,2;4w,bn,2;p,57,1;p,63,1;p,5s,1;p,65,1;p,69,8;p,6h,1;p,6p,7;p,6u,1;q,3o,7;q,3,1;q,1h,6;q,5j,5;q,6a,3;q,6o,4;q,6t,1;q,6u,2;4p,5v,1;4p,68,8;4p,69,1;4p,6i,a;4p,6q,a;4p,6r,d;4p,6v,2;4q,67,5;4q,6j,a;4q,6q,7;4q,6r,a;4q,6u,2;35,36,2;35,2,m;35,3,3;35,c,3;35,d,3;35,5o,1;35,32,1;35,4t,6;35,1h,x;35,1i,1c;35,1j,m;35,1k,m;35,1l,u;35,1m,y;35,2w,6;35,78,5;36,35,e;36,3,6;36,0,1;36,1,1;36,1u,2;36,1v,2;36,32,6;36,4s,2;36,1h,n;36,1i,a;36,1j,u;36,1k,b;36,1l,p;36,1m,8;36,1n,l;36,1o,7;36,7k,1;28,n,1;28,2,6;28,0,2;28,5e,2;28,63,3;28,1s,2;28,1v,2;28,4x,2;28,4y,4;28,6w,3;28,67,3;28,8y,3;28,37,3;29,2f,1;29,o,4;29,6e,2;29,3,4;29,1s,2;29,1u,5;29,4x,b;29,4y,5;29,4s,3;29,1h,7;29,1k,1;29,6x,3;29,9n,1;29,38,8;6e,n,1;6e,35,2;6e,d,2;6e,5c,3;6e,61,3;6e,5o,8;6e,5m,1;6e,32,1;6e,4s,1;6e,1h,6;6e,1i,8;6e,1j,1;6e,1k,2;6e,1l,3;6e,1n,1;6e,68,2;6e,6h,2;6e,6m,1;6e,6p,b;6f,6,1;6f,n,1;6f,6e,4;6f,c,8;6f,5c,3;6f,32,a;6f,1h,8;6f,1j,n;6f,1k,j;6f,65,f;6f,66,7;6f,6g,2;6f,6l,1;6f,6q,b;6f,c7,1;4u,4v,a;4u,1p,1;4u,1r,8;4u,4z,1;4u,4s,d;4u,4t,10;4u,1h,d;4u,1i,t;4u,1l,1;4u,1m,1;4u,30,3;4u,82,3;4u,9r,7;4v,4u,2;4v,32,5;4v,4s,t;4v,4t,t;4v,1h,9;4v,1i,u;4v,1l,1;4v,7j,2;4v,7b,3;4v,7q,1;4v,7r,4;4v,9r,6;26,5,1;26,2f,2;26,27,1;26,73,1;26,1g,2;26,c,2;26,l,2;26,g,1;26,58,i;26,5a,j;26,5g,3;26,5h,7;26,5m,1;26,5d,3;26,1i,3;26,1n,2;26,1o,7;26,5q,2;26,6z,1;27,4b,2;27,26,3;27,r,3;27,i,3;27,57,i;27,59,m;27,5a,1;27,5g,a;27,1h,4;27,1n,8;27,6u,1;72,4,1;72,17,1;72,19,1;72,3h,2;72,3p,1;72,4b,2;72,2c,1;72,27,2;72,72,3;72,1f,e;72,k,1;72,0,6;72,e,2;72,57,f;72,5b,8;72,5g,6;72,5n,1;72,63,5;72,1v,4;72,1h,1;72,1j,4;72,1m,1;72,1n,9;72,38,1;73,5,4;73,7,3;73,23,2;73,4c,2;73,2d,1;73,o,1;73,1g,l;73,1,1;73,f,3;73,58,k;73,5c,3;73,5f,3;73,5h,7;73,5n,4;73,64,6;73,71,8;73,5m,a;73,1i,2;73,1j,2;73,1k,3;73,1o,2;73,5r,2;73,5u,8;73,6g,2;73,6j,4;73,6r,7;74,3h,3;74,49,2;74,47,3;74,k,1;74,59,8;74,1n,1;74,1o,9;74,5s,f;74,5v,i;74,6s,2;74,6t,3;75,24,1;75,3i,5;75,4a,1;75,2d,3;75,73,1;75,5a,1;75,1j,1;75,1n,5;75,1o,2;75,5r,9;75,5w,c;75,5x,7;75,6s,b;75,6v,3;75,9e,2;76,3l,1;76,4b,9;76,47,9;76,48,5;76,2e,3;76,72,2;76,57,2;76,59,9;76,5a,3;76,5i,2;76,5o,1;76,1v,1;76,5d,4;76,1k,1;76,1m,2;76,1n,8;76,1o,n;76,5r,n;76,5w,h;76,6m,1;76,6n,4;76,6v,d;77,3m,3;77,2f,1;77,1,1;77,58,2;77,5a,j;77,1y,5;77,1h,2;77,1j,5;77,1n,q;77,5s,w;77,5t,2;77,5v,j;77,6m,5;77,6n,4;77,6p,1;77,6u,b;r,26,8;r,27,5;r,72,5;r,57,8;r,58,4;r,5g,1;r,5n,1;r,1u,3;r,32,6;r,4z,3;r,50,1;r,4s,1;r,4t,4;r,1h,4;r,1i,6;r,1j,7;r,1k,c;r,1l,3;r,1m,2;4r,4j,2;4r,1r,1;4r,1s,1;4r,1v,1;4r,4x,2;4r,50,1;4r,4s,1;4r,4t,1;4r,1h,n;4r,1i,q;4r,1l,f;4r,1m,k;4r,3u,3;4r,2n,1;4r,2v,2;1f,4,1;1f,27,3;1f,72,1;1f,d,1;1f,i,1;1f,k,2;1f,57,l;1f,59,z;1f,32,2;1f,1h,b;1f,1m,2;1f,1n,9;1g,26,1;1g,73,5;1g,j,1;1g,l,2;1g,g,1;1g,h,1;1g,58,m;1g,5a,v;1g,1i,3;1g,1o,d;2,3j,3;2,3p,5;2,47,6;2,2c,1;2,n,1;2,35,4;2,28,1;2,3,5;2,0,1;2,57,2;2,5e,1;2,5g,i;2,5h,f;2,5i,3;2,63,7;2,70,2;2,1s,2;2,1y,1;2,1h,7;2,1i,9;2,1l,2;2,1n,3;2,5t,b;2,5z,1;2,65,1;2,66,2;2,5p,2;2,5q,2;2,68,1;2,6h,2;2,6n,2;2,6p,1;2,6q,2;2,7k,2;3,1a,1;3,3k,1;3,3q,1;3,48,3;3,2d,5;3,2f,1;3,q,1;3,35,1;3,36,4;3,73,2;3,2,3;3,1,1;3,58,1;3,5g,c;3,5h,b;3,64,5;3,71,1;3,1v,1;3,1h,9;3,1i,4;3,1m,5;3,1o,4;3,5t,1;3,5u,6;3,6v,1;3,9l,1;4f,32,1;4g,4f,5;4g,32,7;4g,53,2;4h,4i,d;4h,4j,7;4h,4k,a;4h,1p,4;4h,1r,b;4h,1s,4;4h,1t,1;4h,32,2;4h,51,3;4h,1m,2;4h,2n,3;4i,4h,b;4i,4j,3;4i,4k,8;4i,1r,9;4i,1t,1;4i,32,6;4i,4z,3;4i,51,4;4i,52,1;4i,54,2;4i,1m,2;4i,2n,2;4j,4k,4;4j,1r,1;4j,4x,1;4j,4s,1z;4j,1h,1c;4j,1i,x;4j,1l,6;4j,1m,1;4j,2n,1;4j,u,1;4j,7b,5;4j,9r,2;4k,4j,3;4k,4m,3;4k,4s,13;4k,4t,l;4k,1h,z;4k,1i,12;4k,1l,7;4k,1m,5;4k,7b,1;4l,4m,2;4l,1t,1;4l,32,c;4l,52,2;4l,4s,7;4l,1h,5;4l,3t,2;4l,2o,1;4l,7b,6;4m,4i,2;4m,4l,4;4m,1t,2;4m,32,m;4m,52,4;4m,4t,p;4m,3u,6;4m,2o,n;4m,7b,8;a,4,2;a,6,1;a,13,5;a,14,a;a,15,1;a,17,1;a,1b,4;a,1d,9;a,24,1;a,25,6;a,c,z;a,k,4;a,0,1;a,e,6;a,5e,a;a,5n,2;a,63,2;a,51,1;b,7,a;b,14,5;b,16,5;b,1a,2;b,21,4;b,24,6;b,25,6;b,d,x;b,l,2;b,1,4;b,5f,a;c,17,1;c,18,3;c,3o,1;c,35,1;c,c,2;c,l,7;c,5a,g;c,5e,1;c,5h,5;c,62,6;c,1h,5;c,1j,l;c,1n,1;c,5j,1;c,5k,1k;c,67,6;c,68,a;c,69,3;c,6h,2;c,6j,2;c,6l,3;c,6t,g;c,6v,4;d,7,1;d,25,1;d,r,1;d,1f,1;d,b,1;d,j,1;d,57,2;d,59,b;d,5c,1;d,5g,1;d,61,1;d,32,1;d,1i,2;d,1k,d;d,1n,4;d,5j,1b;d,5k,5;d,67,2;d,68,2;d,6a,1;d,6g,1;d,6n,2;d,6s,h;d,6u,7;d,7k,3;i,14,1;i,20,e;i,24,5;i,25,3;i,8,2;i,c,3;i,k,1v;i,57,1f;i,59,16;i,5i,1;i,5n,1;i,38,1;j,5,1;j,13,2;j,14,4;j,16,2;j,21,1;j,23,1;j,9,1;j,27,1;j,i,7;j,l,1y;j,g,1;j,58,1e;j,5a,1o;j,5q,1;k,4,1;k,13,4;k,25,2;k,8,1;k,74,3;k,a,c;k,c,a;k,d,1h;k,57,t;k,5c,b;k,5g,4;k,1x,4;k,32,1;k,1n,3;k,1o,q;k,5j,z;k,6o,o;k,6q,l;k,6u,3;k,7n,1;k,bj,1;l,5,1;l,14,2;l,21,1;l,25,2;l,b,5;l,c,1e;l,d,3;l,58,p;l,32,3;l,1n,s;l,1o,1;l,5k,y;l,6h,1;l,6p,h;l,6r,a;l,6t,4;0,6,2;0,72,2;0,a,2;0,c,2;0,d,2;0,0,6;0,5b,3;0,5c,1;0,5l,4;0,1v,b;0,4z,1;0,5d,1;0,1h,3;0,1i,7;0,1j,5;0,1k,l;0,1l,1;0,1m,2;0,1n,3;0,5j,9;0,6y,1;0,6v,3;1,18,2;1,73,2;1,75,2;1,c,1;1,d,3;1,5f,1;1,5m,9;1,1u,d;1,53,6;1,1i,8;1,1j,8;1,1k,f;1,1l,2;1,1m,3;1,1n,1;1,5k,f;1,5q,5;1,6u,1;e,15,8;e,1b,2;e,1d,7;e,2c,3;e,n,1;e,72,1;e,a,b;e,5e,2;e,63,3;e,1p,5;e,1q,4;e,1s,2;e,1t,1;e,1u,1;e,51,1;e,5d,2;e,1l,1;e,6q,4;f,5,2;f,16,6;f,1c,4;f,1e,4;f,4a,1;f,2f,1;f,29,2;f,73,5;f,b,a;f,f,1;f,m,2;f,5f,3;f,64,4;f,1p,3;f,1q,4;f,1t,2;f,1v,1;f,4y,1;f,1i,1;f,1m,2;f,5u,1;f,37,3;f,38,3;g,13,1;g,16,1;g,19,b;g,9,a;g,2f,2;g,26,5;g,1g,2;g,b,1;g,59,2;g,5a,3;g,61,1;g,5d,2;g,5v,3;g,69,3;h,13,1;h,14,3;h,15,1;h,24,2;h,8,9;h,9,3;h,2c,2;h,27,9;h,72,2;h,73,2;h,1f,1;h,1g,2;h,a,2;h,c,2;h,g,1;h,h,1;h,59,8;h,5d,2;m,1c,4;m,58,2;m,1i,3;m,1m,1;m,1n,8;m,1o,4;m,5u,3;57,2c,1;57,27,2;57,72,2;57,r,4;57,k,1;57,58,n;57,59,2;57,5n,3;57,1h,2;57,5j,2;57,5k,2;57,5r,1c;57,5s,z;57,5t,q;57,5u,h;57,5v,1c;57,5w,1c;57,5p,8;57,5q,c;57,67,1;57,6g,3;57,6j,2;57,6p,7;57,6s,m;57,6t,x;57,6u,e;57,6v,w;58,5,2;58,3k,2;58,2e,1;58,2f,1;58,1g,2;58,57,12;58,58,3;58,5a,1;58,1i,2;58,5r,1c;58,5s,1h;58,5t,9;58,5u,z;58,5v,1l;58,5w,1b;58,5p,3;58,5q,3;58,68,1;58,6h,4;58,6i,7;58,6p,2;58,6r,2;58,6s,w;58,6t,q;58,6u,17;58,6v,q;58,bi,2;59,2e,5;59,27,3;59,74,3;59,1f,9;59,d,8;59,57,6;59,5g,1;59,5o,5;59,34,1;59,1h,5;59,1k,1;59,1m,4;59,1n,9;59,1o,e;59,5j,1;59,5u,1;59,6v,6;5a,48,1;5a,26,8;5a,77,2;5a,1g,2;5a,c,3;5a,l,2;5a,g,1;5a,58,8;5a,5h,5;5a,5i,2;5a,5o,1;5a,1i,6;5a,1j,2;5a,1n,6;5a,1o,4;5a,5w,1;5a,5x,1;5a,6s,2;5a,6u,2;5a,6v,2;5b,7,2;5b,4b,1;5b,2c,1;5b,2e,2;5b,0,1;5b,1,7;5b,5c,2;5b,62,2;5b,71,2;5b,1h,f;5b,1i,i;5b,5j,1;5b,5k,8;5b,5q,4;5b,69,2;5b,6o,5;5b,6p,1;5b,6s,b;5b,6t,8;5b,6v,1;5c,2c,1;5c,2d,1;5c,c,2;5c,d,2;5c,k,6;5c,1,2;5c,5b,3;5c,61,1;5c,63,1;5c,71,2;5c,1x,1;5c,1h,f;5c,1i,d;5c,5j,a;5c,5k,1;5c,5p,1;5c,6p,3;5c,6s,9;5c,6t,9;5c,6u,6;5c,6v,3;5c,7k,7;5e,n,5;5e,1t,1;5e,1v,8;5e,4z,8;5e,1j,q;5e,1k,1;5e,5j,7;5e,8y,2;5f,7,1;5f,18,6;5f,23,2;5f,2f,2;5f,73,3;5f,k,1;5f,58,1;5f,5e,1;5f,5m,2;5f,1p,1;5f,1u,2;5f,1v,2;5f,50,6;5f,4s,1;5f,4t,1;5f,1j,1;5f,1k,z;5f,5k,a;5f,37,2;5f,38,3;5g,4,1;5g,6,2;5g,4b,2;5g,p,6;5g,27,3;5g,72,6;5g,d,4;5g,k,a;5g,l,2;5g,59,3;5g,5i,2;5g,5n,8;5g,63,6;5g,1x,h;5g,32,1;5g,4z,2;5g,1n,7;5g,1o,1;5g,66,n;5h,9,1;5h,4c,2;5h,q,3;5h,26,2;5h,73,3;5h,77,2;5h,c,2;5h,l,5;5h,58,3;5h,5a,2;5h,5n,5;5h,1w,l;5h,1x,5;5h,32,4;5h,34,2;5h,54,5;5h,1l,1;5h,1o,4;5h,65,h;5i,5,3;5i,3p,2;5i,3q,3;5i,3r,4;5i,3s,5;5i,49,b;5i,4a,7;5i,4b,d;5i,4c,7;5i,2c,6;5i,2e,3;5i,2f,6;5i,26,2;5i,27,5;5i,77,4;5i,1g,2;5i,i,3;5i,j,4;5i,k,c;5i,l,j;5i,57,y;5i,58,10;5i,59,i;5i,5a,f;5i,5l,i;5i,5m,7;5i,5z,6;5i,60,a;5i,6z,1;5n,4,1;5n,5,4;5n,17,1;5n,18,1;5n,23,1;5n,9,1;5n,27,1;5n,72,9;5n,73,6;5n,r,2;5n,1f,7;5n,k,c;5n,l,f;5n,1,1;5n,f,1;5n,57,b;5n,58,4;5n,5g,2;5n,5h,4;5n,63,1;5n,64,1;5n,32,9;5n,4z,2;5n,50,1;5n,1n,4;5n,37,1;5o,48,5;5o,2c,4;5o,2e,7;5o,2f,4;5o,75,1;5o,76,1;5o,77,5;5o,59,8;5o,5a,i;5o,5o,3;5o,1w,6;5o,1x,d;5o,1y,9;5o,1n,h;5o,1o,i;5o,5j,a;5o,5k,f;5o,5r,1;5o,5s,1;5o,5t,a;5o,5u,g;5o,60,3;5o,6s,1;5o,6t,6;5o,6u,1;5o,6v,1;61,26,1;61,5a,1;61,5o,1;61,1w,9;61,1x,e;61,34,1;61,54,3;61,5k,2;61,5u,d;61,65,2;61,6a,1;61,6u,1;62,5i,1;62,1w,7;62,1x,9;62,34,2;62,5t,6;62,5u,1;63,6,1;63,17,1;63,2c,1;63,72,3;63,d,2;63,0,4;63,e,3;63,5e,1;63,1q,1;63,4z,1;63,5d,2;63,1h,3;63,1k,3;63,1n,2;63,5s,1;63,5t,2;63,5u,g;63,5v,f;63,65,1;63,66,4;63,5q,1;63,67,1;63,6g,2;63,6h,2;63,6i,4;63,6k,5;63,6n,4;63,6q,2;63,6s,1;63,6t,2;63,8x,7;63,8y,1;63,bh,2;64,18,1;64,3o,1;64,3q,2;64,48,1;64,o,1;64,q,4;64,73,3;64,3,2;64,1,2;64,f,2;64,5h,2;64,5n,1;64,1u,4;64,1h,1;64,1j,2;64,1k,3;64,1l,2;64,1o,6;64,5r,1;64,5t,k;64,5u,7;64,5w,n;64,67,3;64,6g,1;64,6j,2;64,6m,2;64,6r,1;64,9m,3;64,c8,2;70,3j,a;70,47,1;70,2c,2;70,72,q;70,74,1;70,0,3;70,5b,1;70,5c,1;70,70,1;70,53,1;70,1j,1;70,5s,2;70,66,5;70,6h,2;70,6i,2;70,6m,1;70,6p,3;70,6q,1;71,7,2;71,3i,2;71,3k,5;71,3q,3;71,4a,2;71,48,1;71,2d,1;71,2f,4;71,73,g;71,3,1;71,1,5;71,5b,1;71,5c,1;71,64,8;71,1k,1;71,1l,1;71,5t,1;71,5u,1;71,6g,3;71,6j,3;71,6l,2;71,6n,2;71,6o,4;71,6r,1;5l,4a,2;5l,4b,1;5l,5i,2;5l,5l,2;5m,4a,3;5m,4c,2;5m,5i,1;5m,1k,2;5m,6z,1;1p,e,1;1p,5e,1;1p,5f,1;1p,1q,c;1p,1r,5;1p,1s,4;1p,1t,1;1p,1u,2;1p,1y,5;1p,33,1;1p,4x,1;1p,51,1;1p,1j,4;1p,1k,1;1p,6q,1;1p,t,1;1p,7k,2;1p,7n,2;1p,b0,1;1p,b1,1;1p,b3,1;1p,9r,1;1p,9u,1;1p,37,2;1p,38,3;1p,7v,1;1q,18,1;1q,4u,1;1q,a,1;1q,e,1;1q,63,1;1q,1p,7;1q,1r,1;1q,1s,3;1q,1t,3;1q,1u,5;1q,50,1;1q,51,2;1q,4t,1;1q,1h,1;1q,1j,6;1q,1k,6;1q,5r,1;1q,7c,1;1q,b1,1;1q,b2,1;1q,bn,1;1q,br,2;1q,9r,1;1q,37,4;1q,38,3;1r,4h,3;1r,1p,3;1r,1r,2;1r,1u,7;1r,1v,3;1r,34,2;1r,4x,2;1r,4y,4;1r,52,2;1r,54,2;1r,4s,1;1r,4t,2;1r,1h,3;1r,1i,3;1r,1j,5;1r,1k,3;1r,1l,1;1r,1m,3;1r,1o,1;1r,2n,1;1r,7g,1;1r,7a,1;1r,b0,1;1r,b1,2;1r,b6,2;1r,7v,2;1s,5,5;1s,18,1;1s,23,3;1s,29,1;1s,5f,1;1s,5n,2;1s,1p,1;1s,1q,5;1s,1t,1;1s,1u,4;1s,1v,1;1s,50,2;1s,52,3;1s,1i,1;1s,1j,2;1s,1k,1;1s,1l,1;1s,5k,1;1s,6b,1;1s,6p,4;1s,6r,4;1s,2w,1;1s,81,1;1t,7,3;1t,1e,1;1t,22,1;1t,r,1;1t,5g,1;1t,5n,8;1t,1p,2;1t,1q,2;1t,1s,1;1t,1v,5;1t,32,1;1t,4z,9;1t,1h,1;1t,1j,3;1t,1k,1;1t,1m,1;1t,6o,3;1t,6q,1;1t,c9,1;1u,18,1;1u,g,1;1u,5f,1;1u,5o,1;1u,1s,3;1u,1v,1;1u,4y,4;1u,4s,5;1u,4t,1;1u,1i,1;1u,1j,5;1u,1k,6;1u,1l,1;1u,1n,1;1u,6b,1;1v,n,3;1v,1z,1;1v,36,2;1v,1u,1;1v,5d,2;1v,4s,5;1v,4t,7;1v,1h,4;1v,1i,5;1v,1j,a;1v,1k,2;1v,1l,1;1v,1m,7;1v,1o,3;1v,6c,3;1w,1z,2;1w,61,2;1w,32,1;1w,1j,2;1w,1n,4;1w,1o,2;1w,5j,3;1w,5k,2;1w,5t,1;1w,5p,5;1w,67,1;1w,68,3;1w,69,3;1w,6j,2;1w,6n,2;1w,b1,3;1w,c6,2;1x,28,3;1x,5g,1;1x,61,2;1x,63,2;1x,1w,3;1x,4z,1;1x,51,1;1x,5j,5;1x,5k,3;1x,5t,1;1x,5u,2;1x,66,1;1x,67,2;1x,6g,3;1x,6o,3;1x,6t,3;1x,6v,1;1x,bl,2;1x,b1,1;1x,9r,2;1y,5o,1;1y,1x,2;1y,33,1;1y,34,2;1y,50,2;1y,55,1;1y,1n,3;1y,5k,2;1y,6b,9;1y,6c,9;1y,6d,6;1y,2w,4;1y,31,1;1y,84,3;1y,b0,5;1y,b1,4;1y,b2,1;1y,b5,1;1y,c8,4;1y,9u,1;1y,38,2;1y,7v,2;1y,7w,2;1y,80,1;32,72,1;32,74,3;32,r,6;32,1f,4;32,1g,8;32,4g,1;32,k,5;32,l,3;32,57,3;32,58,4;32,5n,4;32,50,3;32,53,2;32,4s,4;32,4t,1;32,1h,6;32,1i,2;32,1j,1;32,1k,1;32,1m,2;32,1n,j;32,1o,h;32,5k,5;32,68,5;32,69,3;32,6a,1;32,6b,2;32,6o,6;32,6p,6;32,6q,5;32,6r,6;32,6u,1;32,2h,1;32,2q,2;32,2r,3;32,2s,1;32,2v,1;32,7c,2;32,7g,1;32,7i,1;32,7b,1;32,7k,1;32,7m,2;32,9r,1;33,4l,2;33,1y,l;33,34,5;33,4z,a;33,2n,a;33,4d,2;33,31,a;33,85,1;33,9r,c;33,9u,9;33,9s,3;34,4v,1;34,c,3;34,d,3;34,59,2;34,5a,6;34,5g,g;34,5h,d;34,61,e;34,62,9;34,1w,2;34,4z,4;34,54,1;34,1h,e;34,1i,g;34,1j,1;34,5q,2;34,6y,1;34,8d,2;34,by,2;4x,28,5;4x,29,2;4x,4u,1;4x,4r,5;4x,1r,2;4x,1u,6;4x,1v,8;4x,1y,1;4x,4y,9;4x,50,1;4x,54,6;4x,55,4;4x,56,1;4x,4s,5;4x,1h,6;4x,1k,2;4x,1l,7;4x,1m,6;4x,3t,3;4x,2w,5;4x,7b,1;4x,84,1;4x,b1,5;4x,9r,3;4y,2c,2;4y,n,2;4y,28,1;4y,4v,5;4y,72,2;4y,4r,4;4y,70,2;4y,1u,1;4y,1v,1;4y,1y,3;4y,4y,1;4y,53,1;4y,54,3;4y,55,9;4y,56,2;4y,4t,2;4y,1h,5;4y,1k,1;4y,1l,1;4y,1m,2;4y,1n,5;4y,2r,1;4y,2x,1;4y,7g,1;4y,7a,1;4y,87,3;4y,88,6;4y,8a,1;4y,8b,1;4y,85,2;4y,9r,9;4y,38,1;4y,7w,1;4z,4u,1;4z,r,8;4z,0,1;4z,5g,3;4z,5n,1;4z,1t,3;4z,4s,3;4z,4t,9;4z,1h,4;4z,1i,3;4z,1j,d;4z,1k,c;4z,1m,3;4z,b0,2;50,5,2;50,18,2;50,73,1;50,r,5;50,58,2;50,5h,2;50,1r,1;50,1s,3;50,1u,2;50,1y,4;50,34,3;50,52,1;50,4s,6;50,4t,d;50,1h,1;50,1i,5;50,1j,8;50,1k,b;50,2x,1;50,bn,1;50,bo,1;50,38,2;51,1b,3;51,1d,c;51,20,1;51,a,a;51,63,1;51,1t,1;51,4z,1;51,2n,1;51,31,1;51,bn,1;51,37,3;51,38,6;52,14,2;52,1b,1;52,1e,6;52,21,4;52,a,1;52,b,c;52,f,2;52,5f,4;52,64,1;52,1q,1;52,1y,2;52,1k,1;52,2w,1;52,31,2;52,81,1;52,7w,1;53,3i,5;53,3l,9;53,3m,9;53,2f,2;53,o,2;53,4w,1;53,6f,5;53,1,1;53,5l,g;53,5m,j;53,1u,b;53,1v,5;53,1w,1;53,32,2;53,53,1;53,4s,4;53,1j,h;53,1k,h;53,6w,3;53,6b,2;53,2k,1;53,2o,2;53,2q,2;53,2r,3;53,2s,1;53,2v,2;53,7o,2;53,bo,1;54,c,5;54,d,a;54,5g,1;54,5h,6;54,61,3;54,62,7;54,5i,2;54,5o,1;54,1w,7;54,1x,8;54,1y,3;54,34,3;54,60,4;55,54,1;55,56,1;55,4s,1;55,4t,1;55,84,1;56,1i,1;56,1m,2;56,3u,1;56,7b,1;5d,35,1;5d,5x,5;5d,2h,1;5d,2l,2;5d,2p,1;5d,2w,3;5d,2x,2;5d,89,1;5d,8j,1;5d,8k,1;5d,94,1;4s,7,2;4s,18,2;4s,4g,1;4s,5o,2;4s,1r,2;4s,1u,3;4s,1v,2;4s,32,4;4s,5d,c;4s,4s,1;4s,4t,a;4s,1h,5;4s,1i,7;4s,1j,7;4s,1k,r;4s,1l,7;4s,1m,b;4s,1n,2;4s,1o,7;4s,6m,7;4s,6r,3;4s,2k,1;4s,2n,2;4s,2q,4;4s,2r,2;4s,2s,6;4s,2v,5;4s,s,1;4s,v,1;4s,7a,1;4s,7p,3;4s,7r,2;4s,7m,1;4t,35,2;4t,4u,2;4t,4v,1;4t,r,2;4t,4g,1;4t,1s,1;4t,1y,1;4t,32,3;4t,50,1;4t,53,1;4t,56,1;4t,5d,j;4t,4s,4;4t,1h,a;4t,1i,5;4t,1j,l;4t,1k,e;4t,1l,g;4t,1m,6;4t,1n,6;4t,1o,6;4t,3u,1;4t,6n,a;4t,2h,1;4t,2j,1;4t,2k,2;4t,2m,1;4t,2q,4;4t,2r,6;4t,2s,6;4t,7o,1;4t,7p,1;4t,7r,4;4t,7m,3;1h,57,3;1h,4x,1;1h,4s,l;1h,4t,g;1h,1i,c;1h,1j,2;1h,1l,3;1h,1m,2;1h,1n,1;1h,1o,2;1h,3t,6;1h,3u,2;1h,6c,2;1h,2g,6;1h,2h,a;1h,2i,c;1h,2j,c;1h,2k,e;1h,2m,4;1h,2n,5;1h,2o,3;1h,2v,2;1h,v,2;1h,x,2;1h,y,6;1h,10,6;1h,11,6;1h,12,b;1h,t,5;1h,u,8;1h,78,2;1h,7c,8;1h,7d,6;1h,7e,7;1h,7f,7;1h,7g,8;1h,7h,7;1h,7i,7;1h,7j,7;1h,79,9;1h,7a,6;1h,7b,5;1i,5g,1;1i,4s,k;1i,4t,k;1i,1h,7;1i,1j,3;1i,1k,4;1i,1l,3;1i,1m,6;1i,1o,3;1i,3t,4;1i,3u,g;1i,6a,6;1i,6d,2;1i,6v,1;1i,2g,2;1i,2h,9;1i,2i,8;1i,2j,9;1i,2k,9;1i,2l,4;1i,2m,6;1i,2n,k;1i,2o,3;1i,2q,2;1i,2r,2;1i,s,2;1i,v,3;1i,x,2;1i,y,1;1i,z,2;1i,10,6;1i,11,a;1i,12,a;1i,u,a;1i,7c,5;1i,7d,6;1i,7e,6;1i,7f,2;1i,7g,9;1i,7h,7;1i,7i,7;1i,7j,7;1i,79,4;1i,7a,d;1i,9r,1;1j,6e,1;1j,1v,1;1j,1y,1;1j,32,2;1j,4y,3;1j,50,3;1j,4t,2;1j,1h,9;1j,1i,e;1j,1k,6;1j,1m,3;1j,1o,1;1j,2k,1;1j,2m,1;1j,x,1;1j,y,2;1j,t,2;1j,7c,3;1j,79,1;1j,7n,3;1j,9r,1;1j,7x,3;1k,d,1;1k,1u,2;1k,1h,a;1k,1i,e;1k,1j,2;1k,1l,4;1k,1o,2;1k,2i,3;1k,2j,1;1k,2m,1;1k,2s,1;1k,s,2;1k,w,3;1k,x,1;1k,t,1;1k,7d,3;1k,7e,2;1k,87,2;1k,b6,1;1k,38,1;1l,1u,1;1l,34,2;1l,4s,1;1l,1h,11;1l,1i,11;1l,1m,5;1l,1n,5;1l,3t,2;1l,6b,5;1l,6c,2;1l,6d,5;1l,2g,4;1l,2h,2;1l,2i,9;1l,2j,3;1l,2k,1;1l,2n,2;1l,x,2;1l,t,1;1l,u,4;1l,7d,3;1l,7f,1;1l,79,2;1l,7b,1;1m,4r,3;1m,m,1;1m,1v,1;1m,34,4;1m,4t,2;1m,1h,15;1m,1i,1g;1m,1j,1;1m,1l,3;1m,1o,2;1m,3t,3;1m,6b,1;1m,6c,5;1m,6d,1;1m,2g,5;1m,2h,5;1m,2i,3;1m,2j,2;1m,2k,3;1m,2n,1;1m,2p,1;1m,2s,1;1m,t,2;1m,u,3;1m,7c,1;1m,7d,2;1m,7f,3;1m,7a,1;1m,9r,2;1n,n,1;1n,63,2;1n,54,1;1n,4s,1;1n,4t,2;1n,1h,h;1n,1i,3;1n,1l,5;1n,6b,i;1n,6c,g;1n,6d,c;1n,2g,b;1n,2h,5;1n,2i,6;1n,2r,1;1n,s,3;1n,78,c;1n,7d,1;1n,86,1;1n,87,1;1o,47,1;1o,2c,1;1o,73,1;1o,l,1;1o,64,1;1o,1h,e;1o,1i,x;1o,1l,4;1o,1m,4;1o,1n,3;1o,5k,1;1o,6b,1;1o,6c,c;1o,6d,b;1o,2g,b;1o,2h,7;1o,2i,3;1o,2r,1;1o,s,6;1o,v,4;1o,w,1;1o,78,5;1o,7c,4;1o,7d,1;1o,7e,2;3t,4j,2;3t,1u,4;3t,1v,1;3t,4x,1;3t,55,1;3t,1h,r;3t,1i,n;3t,1l,r;3t,1m,6;3u,4r,7;3u,1v,4;3u,4x,1;3u,53,2;3u,55,3;3u,56,2;3u,4t,9;3u,1h,d;3u,1i,v;3u,1l,5;3u,1m,e;3u,4e,2;3u,9r,1;5j,c,1;5j,d,m;5j,57,3;5j,59,9;5j,5c,1;5j,61,2;5j,62,2;5j,1x,1;5j,1h,5;5j,1i,2;5j,1j,9;5j,1k,b;5j,1o,5;5j,5j,b;5j,5k,2;5j,5t,9;5j,5u,l;5j,67,1;5j,68,4;5j,69,a;5j,6a,a;5j,6s,b;5j,6t,e;5j,6u,b;5j,7k,8;5j,9m,6;5j,c4,2;5k,c,f;5k,1,9;5k,5a,4;5k,61,1;5k,62,7;5k,5o,2;5k,1u,4;5k,1w,1;5k,1h,9;5k,1j,9;5k,1k,c;5k,5j,4;5k,5t,f;5k,5u,c;5k,69,b;5k,6a,8;5k,6s,9;5k,6t,e;5k,6u,2;5k,6v,3;5k,7k,2;5k,8y,f;5k,bg,5;5r,3i,2;5r,3k,9;5r,2e,2;5r,57,1;5r,1o,1;5r,5v,1;5r,5w,m;5r,60,2;5r,65,1;5r,93,8;5r,9e,4;5r,9k,8;5r,9l,c;5r,9m,d;5r,9n,2;5r,az,1;5s,5r,1;5s,5v,q;5s,5w,3;5s,8f,2;5s,8q,c;5s,8w,1;5s,8x,h;5s,8z,3;5s,93,3;5s,9e,7;5s,9n,3;5s,9o,3;5s,az,2;5t,3j,1;5t,3k,1;5t,47,1;5t,48,3;5t,2e,1;5t,73,1;5t,2,1;5t,3,3;5t,57,k;5t,58,m;5t,5a,1;5t,62,1;5t,5o,1;5t,1x,1;5t,5j,3;5t,5s,7;5t,5u,8;5t,5v,2;5t,5w,3;5t,5z,3;5t,65,3;5t,66,1;5t,5p,1;5t,6l,3;5t,6r,2;5t,6t,1;5t,8w,1;5t,8y,2;5t,9k,4;5t,9l,6;5t,az,4;5t,c4,8;5t,c8,1;5u,3j,2;5u,48,2;5u,57,e;5u,58,l;5u,5o,1;5u,63,1;5u,1x,1;5u,5k,1;5u,5r,6;5u,5t,b;5u,5v,9;5u,6i,1;5u,6t,1;5u,8y,2;5u,bg,2;5u,bh,2;5v,3k,2;5v,3s,1;5v,4c,3;5v,2c,2;5v,77,1;5v,1o,2;5v,5s,15;5v,5u,2;5v,5w,1;5v,6j,2;5v,6n,1;5v,bx,k;5v,c3,b;5v,c4,v;5v,c6,i;5v,c7,3;5w,3i,1;5w,3j,1;5w,4b,2;5w,76,2;5w,58,1;5w,1i,1;5w,5r,17;5w,5w,2;5w,6y,8;5w,6i,2;5w,6l,1;5w,6m,1;5w,6p,1;5w,8w,5;5w,az,l;5w,ba,f;5w,bf,8;5w,bg,j;5w,bh,8;5w,bi,5;5w,bj,2;5w,c3,2;5w,c6,2;5w,c7,2;5x,59,1;5x,5a,1;5x,5x,1;5x,6s,1;5x,6t,4;5x,ba,f;5x,bf,a;5x,bx,p;5x,c3,q;5x,c6,2;5y,3k,2;5y,48,1;5y,5m,1;5y,60,1;5y,9k,m;5y,9m,7;5y,c4,9;5z,3j,4;5z,5z,5;5z,66,3;5z,8w,19;5z,8x,4;5z,az,e;5z,bg,7;60,5a,2;60,5i,2;60,5o,1;60,5r,1;60,5s,1;60,5x,1;60,6t,1;60,6u,1;60,8f,1;60,8q,5;60,93,9;60,9e,5;60,9n,5;60,9o,4;65,3k,2;65,5b,1;65,5c,1;65,5d,1;65,1i,1;65,5r,2;65,5u,1;65,69,1;65,6l,1;65,9k,7;65,9l,2;65,9m,2;66,2e,1;66,d,3;66,63,8;66,5t,4;66,5u,1;66,5z,4;66,65,3;66,6s,3;66,8w,1;66,8x,7;66,8y,8;66,az,3;5p,15,1;5p,1b,1;5p,57,5;5p,58,2;5p,5t,4;5p,5v,5;5p,68,b;5p,6j,5;5p,6t,8;5p,6u,2;5p,c5,6;5p,c6,3;5p,c7,i;5q,57,6;5q,58,2;5q,5r,1;5q,5u,4;5q,5w,1;5q,66,2;5q,5p,8;5q,67,c;5q,6i,5;5q,6m,1;5q,6o,1;5q,6s,6;5q,6v,3;5q,9o,1;5q,bf,2;5q,bg,1;5q,bj,9;5q,c6,8;5q,c7,e;6w,3h,4;6w,5i,3;6w,5l,c;6w,5y,8;6w,8f,2;6w,8q,7;6w,8z,b;6x,3i,3;6x,75,1;6x,5m,g;6x,5z,1;6x,93,f;6x,9e,5;6x,9k,4;6x,9l,4;6x,9m,7;6y,3j,3;6y,3l,6;6y,2e,1;6y,59,1;6y,5l,f;6y,34,1;6y,1o,1;6y,5r,7;6y,5w,1;6y,5y,8;6y,5z,3;6y,60,a;6y,az,k;6y,ba,h;6y,bf,5;6z,3k,2;6z,3m,9;6z,3s,3;6z,77,1;6z,1,1;6z,5i,1;6z,5m,d;6z,54,3;6z,5s,1;6z,5v,1;6z,5y,1;6z,5z,4;6z,60,2;6z,bx,e;6z,c3,7;6z,c4,i;6z,c6,1;67,48,4;67,c,1;67,5g,1;67,62,1;67,1h,h;67,1k,1;67,5j,b;67,5k,g;67,5w,1;67,5q,1;67,6b,2;67,6k,1;67,6l,1;67,6m,1;67,9k,7;67,9l,3;67,9n,2;67,9r,2;68,47,3;68,4p,1;68,c,1;68,d,1;68,61,5;68,62,1;68,63,1;68,1h,1;68,1i,q;68,5j,e;68,5k,n;68,6b,2;68,6p,2;68,6r,1;68,6u,5;68,8w,7;68,8x,3;68,8z,2;68,9r,2;69,48,1;69,c,1;69,62,b;69,1h,1k;69,5j,5;69,5k,x;69,68,5;69,6b,1;69,6d,2;69,6p,2;69,6t,i;69,6u,1;69,2w,1;69,78,1;69,7c,2;69,7d,2;69,7e,2;69,7n,1;69,81,4;69,86,2;69,bl,1;69,c3,7;69,c4,3;69,c6,2;69,9r,2;6a,1a,1;6a,3h,c;6a,q,1;6a,d,1;6a,58,1;6a,5l,c;6a,1i,13;6a,1j,1;6a,5j,c;6a,5k,7;6a,60,1;6a,6a,1;6a,6c,2;6a,6o,1;6a,6s,h;6a,bf,7;6a,bg,3;6a,bi,2;6a,9r,2;6b,67,4;6b,68,4;6b,8f,f;6b,8w,1v;6b,8x,1r;6b,8z,k;6b,93,f;6b,9k,1v;6b,9l,1r;6b,9n,k;6b,9r,3y;6c,5h,1;6c,6a,4;6c,az,f;6c,bf,1v;6c,bg,1r;6c,bi,k;6c,9r,1z;6d,69,4;6d,bm,f;6d,c3,1v;6d,c4,1r;6d,c6,k;6d,9r,1z;6g,q,4;6g,6f,4;6g,1q,1;6g,5t,4;6g,6k,4;6g,6o,i;6g,6s,h;6g,9m,8;6g,9n,3;6g,9o,8;6g,9p,c;6g,9q,8;6g,94,8;6g,95,8;6g,96,8;6g,97,8;6g,98,8;6g,99,8;6g,9a,3;6h,3m,1;6h,2c,1;6h,n,1;6h,6e,4;6h,1h,1;6h,6l,4;6h,6p,h;6h,6t,h;6h,8y,8;6h,8z,3;6h,90,8;6h,91,c;6h,92,8;6h,8g,8;6h,8h,8;6h,8i,8;6h,8j,8;6h,8k,8;6h,8l,8;6h,8m,3;6i,3p,1;6i,4p,a;6i,2,1;6i,6n,2;6i,6q,2;6i,6v,a;6i,bh,4;6i,bi,1;6i,bj,4;6i,bk,5;6i,bl,4;6i,b0,4;6i,b1,4;6i,b2,4;6i,b3,4;6i,b4,4;6i,b5,4;6i,b6,1;6j,4q,a;6j,5t,1;6j,6m,2;6j,6r,2;6j,6u,a;6j,c5,4;6j,c6,1;6j,c7,4;6j,c8,5;6j,c9,4;6j,bn,4;6j,bo,4;6j,bp,4;6j,bq,4;6j,br,4;6j,bs,4;6j,bt,1;6k,2c,1;6k,r,1;6k,4z,1;6k,6g,2;6k,6q,1;6k,6s,a;6k,9m,3;6k,9n,1;6k,9o,3;6k,9p,4;6k,9q,3;6k,94,3;6k,95,3;6k,96,3;6k,97,3;6k,98,3;6k,99,3;6k,9a,1;6l,6h,2;6l,6t,a;6l,8y,3;6l,8z,1;6l,90,3;6l,91,4;6l,92,3;6l,8g,3;6l,8h,3;6l,8i,3;6l,8j,3;6l,8k,3;6l,8l,3;6l,8m,1;6l,9l,1;6m,q,1;6m,64,1;6m,5r,1;6m,6j,5;6m,6s,1;6m,6u,m;6m,ba,1;6m,c5,a;6m,c6,3;6m,c7,a;6m,c8,d;6m,c9,a;6m,bn,a;6m,bo,a;6m,bp,a;6m,bq,a;6m,br,a;6m,bs,a;6m,bt,4;6n,7,3;6n,4c,1;6n,4p,1;6n,5b,3;6n,66,1;6n,6i,5;6n,6j,1;6n,6v,m;6n,bh,a;6n,bi,3;6n,bj,a;6n,bk,d;6n,bl,a;6n,b0,a;6n,b1,a;6n,b2,a;6n,b3,a;6n,b4,a;6n,b5,a;6n,b6,4;6o,q,1;6o,6f,i;6o,k,1;6o,5i,2;6o,5x,4;6o,6a,9;6o,6g,j;6o,6i,3;6o,6q,2;6o,6s,7;6o,93,4;6o,9e,b;6o,9k,6;6o,9l,9;6o,9m,9;6o,9n,a;6o,9o,9;6o,9p,c;6o,9q,9;6o,94,9;6o,95,9;6o,96,9;6o,97,9;6o,98,9;6o,99,9;6o,9a,3;6p,p,5;6p,6e,i;6p,1h,1;6p,5x,p;6p,5p,1;6p,69,8;6p,6h,k;6p,6j,1;6p,6o,3;6p,6t,4;6p,8f,5;6p,8q,b;6p,8x,3;6p,8y,k;6p,8z,7;6p,90,9;6p,91,c;6p,92,9;6p,8g,9;6p,8h,9;6p,8i,9;6p,8j,9;6p,8k,9;6p,8l,9;6p,8m,3;6p,93,3;6p,9e,3;6p,9o,9;6q,4p,5;6q,4q,2;6q,e,1;6q,1p,1;6q,1t,1;6q,1v,1;6q,4z,1;6q,1k,1;6q,5w,1;6q,60,k;6q,67,g;6q,6i,1;6q,6o,2;6q,az,3;6q,ba,8;6q,bf,5;6q,bg,6;6q,bh,5;6q,bi,h;6q,bj,9;6q,bk,2;6q,bl,2;6q,b0,2;6q,b1,2;6q,b2,2;6q,b3,2;6q,b4,2;6q,b5,2;6q,b6,1;6r,7,2;6r,2f,8;6r,4p,5;6r,4q,5;6r,58,1;6r,64,3;6r,1s,2;6r,53,2;6r,5t,2;6r,5u,3;6r,60,8;6r,68,c;6r,6j,1;6r,6p,2;6r,9l,1;6r,bm,7;6r,bx,3;6r,c3,a;6r,c4,c;6r,c5,2;6r,c6,c;6r,c7,c;6r,c8,5;6r,c9,2;6r,bn,2;6r,bo,2;6r,bp,2;6r,bq,2;6r,br,2;6r,bs,2;6r,bt,1;6s,57,9;6s,58,e;6s,5o,2;6s,1n,1;6s,1o,1;6s,5j,2;6s,5k,1;6s,5t,3;6s,5u,1;6s,5x,7;6s,60,1;6s,5q,1;6s,6a,1;6s,6g,e;6s,6k,e;6s,6m,2;6s,6o,3;6s,6t,1;6s,6v,h;6s,8f,4;6s,8q,3;6s,90,1;6s,93,3;6s,9l,1;6s,9m,6;6s,9n,2;6s,9o,6;6s,9p,8;6s,9q,6;6s,94,6;6s,95,6;6s,96,6;6s,97,6;6s,98,6;6s,99,6;6s,9a,2;6s,ba,7;6s,bf,7;6t,p,1;6t,q,2;6t,l,2;6t,57,5;6t,58,3;6t,59,1;6t,5o,3;6t,1o,1;6t,5k,3;6t,5u,1;6t,5x,5;6t,5p,1;6t,6h,e;6t,6l,e;6t,6n,3;6t,6p,3;6t,6s,4;6t,6u,5;6t,8q,3;6t,8y,b;6t,8z,4;6t,90,6;6t,91,8;6t,92,6;6t,8g,6;6t,8h,6;6t,8i,6;6t,8j,6;6t,8k,6;6t,8l,6;6t,8m,2;6t,ba,3;6t,bx,6;6t,c6,2;6u,3p,1;6u,2f,1;6u,p,2;6u,q,6;6u,4p,6;6u,57,j;6u,58,v;6u,5a,1;6u,53,1;6u,5s,3;6u,60,1;6u,5p,6;6u,6h,1;6u,6j,u;6u,6m,u;6u,6t,m;6u,6v,2;6u,8f,3;6u,8q,3;6u,bx,7;6u,c3,8;6u,c5,f;6u,c6,g;6u,c7,f;6u,c8,k;6u,c9,f;6u,bn,f;6u,bo,f;6u,bp,f;6u,bq,f;6u,br,f;6u,bs,f;6u,bt,7;6v,2e,1;6v,4p,6;6v,d,1;6v,57,o;6v,58,g;6v,1i,1;6v,1o,1;6v,5j,1;6v,5r,3;6v,5x,9;6v,5q,1;6v,6i,u;6v,6l,u;6v,6s,e;6v,6u,1;6v,7k,1;6v,ba,9;6v,bf,9;6v,bg,5;6v,bh,j;6v,bi,e;6v,bj,f;6v,bk,j;6v,bl,f;6v,b0,f;6v,b1,f;6v,b2,f;6v,b3,f;6v,b4,f;6v,b5,f;6v,b6,7;2g,36,2;2g,2p,1;2g,s,d;2g,2w,c;2g,86,4;2g,8z,9;2g,90,8;2g,91,3;2g,9n,8;2g,9o,9;2h,2i,1;2h,2p,1;2h,v,1;2h,2w,7;2h,86,h;2h,87,b;2h,90,1;2h,91,5;2h,92,4;2h,8g,2;2h,9o,3;2h,9p,6;2h,9q,7;2i,2j,2;2i,2r,2;2i,x,2;2i,2x,3;2i,87,17;2i,88,d;2i,92,3;2i,8g,h;2i,8h,c;2i,9q,3;2i,94,e;2i,95,4;2i,96,2;2j,2q,2;2j,2x,4;2j,88,b;2j,89,l;2j,8h,6;2j,8i,a;2j,8j,1;2j,95,5;2j,96,4;2j,97,9;2k,2j,1;2k,2s,1;2k,2y,c;2k,89,1;2k,8a,m;2k,8i,1;2k,8j,a;2k,8k,7;2k,96,2;2k,97,7;2k,98,8;2l,2k,1;2l,2t,1;2l,2y,7;2l,88,3;2l,89,3;2l,8a,d;2l,8b,d;2l,8h,1;2l,8i,1;2l,8j,5;2l,8k,4;2l,8l,4;2l,8m,4;2l,94,1;2l,95,1;2l,96,1;2l,97,5;2l,98,4;2l,99,4;2l,9a,4;2m,2l,1;2m,2u,1;2m,2z,3;2m,8b,a;2m,8c,c;2m,8d,a;2m,8k,3;2m,8l,3;2m,8m,3;2m,8n,3;2m,8o,4;2m,8p,3;2m,98,3;2m,99,3;2m,9a,3;2m,9b,3;2m,9c,4;2m,9d,3;2n,2m,1;2n,2v,1;2n,2z,4;2n,30,4;2n,8c,5;2n,8d,5;2n,82,7;2n,83,5;2n,84,5;2n,85,5;2n,8m,3;2n,8n,3;2n,8o,3;2n,8p,3;2n,8r,4;2n,8s,3;2n,9a,3;2n,9b,3;2n,9c,3;2n,9d,3;2n,9f,4;2n,9g,3;2o,32,1;2o,2n,1;2o,2v,1;2o,u,1;2o,31,4;2o,7b,1;2o,8d,5;2o,82,5;2o,83,b;2o,84,b;2o,85,1;2o,8p,3;2o,8r,3;2o,8s,3;2o,8t,3;2o,8u,3;2o,8v,4;2o,9d,3;2o,9f,3;2o,9g,3;2o,9h,3;2o,9i,3;2o,9j,4;2o,9r,2;4d,4y,1;4d,2o,1;4d,31,3;4d,83,a;4d,84,c;4d,85,a;4d,8s,4;4d,8t,4;4d,8u,5;4d,8v,6;4d,9g,4;4d,9h,4;4d,9i,5;4d,9j,6;4d,9r,1;2p,36,1;2p,5d,1;2p,2g,g;2p,2h,2;2p,s,s;2p,v,4;2p,2w,v;2p,86,o;2p,87,2;2p,8z,3;2p,91,3;2p,92,6;2p,9p,6;2p,9q,2;2q,2h,3;2q,2i,c;2q,2j,1;2q,w,3;2q,x,2;2q,2w,3;2q,2x,g;2q,87,x;2q,88,f;2q,92,2;2q,8g,4;2q,8h,5;2q,8i,1;2q,9q,1;2q,94,6;2q,95,8;2r,2j,4;2r,2k,1;2r,x,2;2r,y,1;2r,2x,3;2r,2y,e;2r,30,e;2r,88,9;2r,89,o;2r,8a,4;2r,8h,6;2r,8i,1;2r,8j,3;2r,8k,1;2r,95,2;2r,96,d;2r,97,1;2s,2k,3;2s,z,2;2s,2y,9;2s,2z,2;2s,30,9;2s,31,2;2s,8a,e;2s,8j,4;2s,8k,1;2s,8l,3;2s,8m,3;2s,97,3;2s,98,5;2s,99,3;2s,9a,3;2t,2l,3;2t,2m,c;2t,2n,1;2t,10,3;2t,11,2;2t,88,3;2t,89,3;2t,8a,d;2t,8b,d;2t,8k,2;2t,8l,2;2t,8m,2;2t,8n,2;2t,8o,2;2t,8p,2;2t,98,2;2t,99,2;2t,9a,2;2t,9b,2;2t,9c,2;2t,9d,2;2u,2n,4;2u,2o,1;2u,11,2;2u,12,1;2u,8b,a;2u,8c,c;2u,8d,a;2u,8m,2;2u,8n,2;2u,8o,2;2u,8p,2;2u,8r,2;2u,8s,2;2u,9a,2;2u,9b,2;2u,9c,2;2u,9d,2;2u,9f,2;2u,9g,2;2v,2o,3;2v,t,2;2v,u,2;2v,8c,5;2v,8d,5;2v,82,7;2v,83,5;2v,84,5;2v,85,5;2v,8p,2;2v,8r,2;2v,8s,2;2v,8t,2;2v,8u,2;2v,8v,2;2v,9d,2;2v,9f,2;2v,9g,2;2v,9h,2;2v,9i,2;2v,9j,2;s,2g,8;s,2p,3;s,s,3;s,2w,2;s,81,k;s,8z,4;s,90,6;s,9n,a;s,9o,a;v,5d,2;v,2p,1;v,2w,3;v,86,l;v,90,2;v,91,5;v,92,6;v,9o,3;v,9p,4;v,9q,2;w,2i,1;w,87,n;w,92,1;w,8g,7;w,9q,8;w,94,5;x,2i,2;x,2q,2;x,2w,2;x,2x,4;x,88,l;x,8g,5;x,8h,5;x,8i,2;x,95,4;x,96,5;y,y,3;y,89,c;y,8h,2;y,8i,8;y,96,2;z,2k,1;z,2s,1;z,8a,k;z,8j,2;z,8k,3;z,97,5;z,98,9;10,8b,k;10,8l,2;10,8m,3;10,99,2;10,9a,3;11,8c,k;11,8n,2;11,8o,3;11,9b,2;11,9c,3;12,8d,k;12,8p,3;12,8r,2;12,9d,2;12,9f,3;t,82,a;t,83,a;t,8r,3;t,8s,2;t,9g,3;t,9h,2;u,31,6;u,84,k;u,85,4;u,8s,3;u,8t,2;u,9h,3;u,9i,2;4e,31,2;4e,84,a;4e,85,a;4e,8u,2;4e,8v,3;4e,9i,3;4e,9j,2;2w,2h,3;2w,7n,1;2w,86,1;2w,8z,1;2w,90,4;2w,91,9;2w,92,d;2w,9n,3;2w,9o,2;2w,9p,a;2w,9q,8;2w,94,2;2x,2i,2;2x,87,1;2x,88,1;2x,8g,4;2x,8h,9;2x,8i,6;2x,94,2;2x,95,a;2x,96,1;2y,2k,1;2y,8i,4;2y,8j,6;2y,8k,2;2y,8l,5;2y,95,1;2y,96,8;2y,97,8;2y,98,3;2y,99,5;2z,8m,5;2z,8n,9;2z,8o,5;2z,97,1;2z,98,2;2z,99,2;2z,9a,5;2z,9b,9;2z,9c,5;30,8p,5;30,8r,9;30,8s,5;30,9d,5;30,9f,9;30,9g,5;31,8t,5;31,8u,9;31,8v,5;31,9h,5;31,9i,9;31,9j,5;78,2h,1;78,2w,c;78,81,3;78,bj,d;78,bk,1;78,c7,2;78,c8,2;7c,1h,1;7c,69,1;7c,2w,k;7c,78,2;7c,7d,2;7c,7k,1;7c,7n,1;7c,81,1;7c,86,r;7c,bj,1;7c,bk,a;7c,bl,3;7c,c7,5;7c,c8,7;7c,c9,5;7d,2w,i;7d,2x,a;7d,7e,2;7d,7n,1;7d,7o,3;7d,86,3;7d,87,b;7d,bk,1;7d,bl,4;7d,b0,b;7d,b1,3;7d,c9,3;7d,bn,5;7d,bo,7;7e,1i,1;7e,1l,1;7e,1o,1;7e,2x,h;7e,7o,8;7e,7p,1;7e,88,8;7e,b2,5;7e,b3,3;7e,bo,8;7e,bp,5;7e,bq,1;7f,2x,6;7f,2y,h;7f,7g,2;7f,7p,1;7f,89,9;7f,b2,3;7f,b3,6;7f,bp,6;7f,bq,4;7f,br,4;7g,1i,1;7g,s,d;7g,v,1;7g,2y,l;7g,7f,2;7g,7p,1;7g,7q,7;7g,89,3;7g,8a,6;7g,b3,2;7g,b4,a;7g,b5,1;7g,bp,2;7g,bq,1;7g,br,5;7g,bs,1;7h,s,1;7h,v,a;7h,w,3;7h,2y,3;7h,2z,h;7h,7r,1;7h,8a,2;7h,8b,d;7h,b4,2;7h,b5,8;7h,b6,6;7h,br,3;7h,bs,a;7h,bt,2;7i,v,1;7i,w,4;7i,x,b;7i,y,3;7i,2z,9;7i,30,9;7i,7r,1;7i,8b,2;7i,8c,3;7i,8d,3;7i,b6,3;7i,b7,4;7i,b8,4;7i,bs,1;7i,bt,3;7i,bu,4;7i,bv,4;7j,z,5;7j,10,3;7j,2z,6;7j,30,6;7j,31,6;7j,7s,1;7j,7t,1;7j,8d,2;7j,82,3;7j,83,3;7j,b7,3;7j,b8,4;7j,b9,4;7j,bu,3;7j,bv,4;7j,bw,4;79,z,3;79,10,6;79,30,9;79,31,9;79,7t,1;79,7u,1;79,82,2;79,83,3;79,84,3;79,b8,3;79,b9,4;79,bb,4;79,bv,3;79,bw,3;79,by,3;79,bz,2;7a,4y,1;7a,10,2;7a,11,a;7a,12,1;7a,31,j;7a,7l,6;7a,83,5;7a,84,3;7a,b9,3;7a,bb,4;7a,bc,4;7a,by,3;7a,bz,3;7a,c0,3;7a,c1,2;7b,4m,1;7b,4s,3;7b,4t,4;7b,1h,3;7b,3t,2;7b,2n,9;7b,2o,h;7b,2v,a;7b,11,2;7b,12,8;7b,t,6;7b,u,6;7b,31,2;7b,7a,4;7b,7m,4;7b,84,7;7b,85,c;7b,bc,3;7b,bd,4;7b,be,4;7b,c0,3;7b,c1,4;7b,c2,4;7b,9r,2;7k,d,2;7k,0,5;7k,61,a;7k,5j,a;7k,67,i;7k,6q,3;7k,2w,1;7k,78,7;7k,7c,2;7k,7d,2;7k,7e,2;7k,81,4;7k,86,2;7k,bj,2;7k,c7,5;7k,c9,1;7n,1n,1;7n,2w,u;7n,2x,1;7n,7c,5;7n,7d,b;7n,86,e;7n,87,4;7n,bk,2;7n,bl,e;7n,b0,4;7n,b1,1;7n,c8,6;7n,bn,a;7n,bo,6;7n,7w,1;7o,2x,10;7o,7e,a;7o,7f,1;7o,87,4;7o,88,6;7o,b0,1;7o,b1,8;7o,b2,8;7o,b3,3;7o,bn,4;7o,bo,6;7o,bp,8;7o,bq,4;7p,1r,1;7p,2x,7;7p,2y,d;7p,7e,1;7p,7f,1;7p,7q,1;7p,88,1;7p,89,3;7p,b2,3;7p,b3,5;7p,bp,3;7p,bq,3;7p,br,4;7q,2y,y;7q,7g,2;7q,8a,a;7q,b2,3;7q,b3,1;7q,b4,8;7q,b5,7;7q,bq,7;7q,br,6;7q,bs,1;7r,4y,1;7r,2z,w;7r,7h,3;7r,7i,2;7r,8a,1;7r,8b,m;7r,b5,4;7r,b6,3;7r,br,6;7r,bs,c;7r,bt,4;7s,30,t;7s,7j,1;7s,79,1;7s,8c,5;7s,8d,6;7s,b6,4;7s,b7,4;7s,b8,4;7s,bt,4;7s,bu,4;7s,bv,4;7t,30,a;7t,31,j;7t,7a,2;7t,8d,5;7t,82,6;7t,b8,4;7t,b9,4;7t,bb,4;7t,bv,4;7t,bw,4;7t,by,4;7u,30,a;7u,31,j;7u,7a,2;7u,82,5;7u,83,6;7u,b9,4;7u,bb,4;7u,bc,4;7u,bw,4;7u,by,4;7u,bz,4;7l,54,1;7l,31,j;7l,7a,3;7l,83,7;7l,84,6;7l,bb,4;7l,bc,4;7l,bd,4;7l,by,4;7l,bz,4;7l,c0,4;7m,55,1;7m,56,1;7m,4t,1;7m,31,j;7m,7b,5;7m,84,2;7m,85,m;7m,bc,4;7m,bd,4;7m,be,4;7m,bz,4;7m,c0,4;7m,c1,4;81,69,1;81,2w,2;81,78,8;81,7k,5;81,bj,b;81,bk,3;86,1n,1;86,s,1;86,2w,1;86,7c,c;86,7n,4;86,bj,2;86,bk,8;86,bl,c;86,c7,3;86,c8,c;86,c9,5;87,2w,6;87,7d,4;87,7n,2;87,7o,1;87,b0,6;87,b1,8;87,bn,6;87,bo,c;88,7e,1;88,7o,2;88,b2,5;88,b3,6;88,bo,4;88,bp,4;88,bq,3;89,1i,1;89,69,1;89,7f,2;89,7g,1;89,7k,1;89,7p,2;89,b2,4;89,b3,7;89,b4,1;89,bp,3;89,bq,a;8a,4y,1;8a,1h,1;8a,7g,3;8a,7q,1;8a,b3,1;8a,b4,a;8a,b5,3;8a,b6,1;8a,bq,4;8a,br,7;8a,bs,1;8b,7h,2;8b,7r,2;8b,7s,1;8b,b4,1;8b,b5,8;8b,b6,7;8b,br,6;8b,bs,7;8b,bt,1;8c,7i,2;8c,7j,1;8c,7s,2;8c,b5,4;8c,b6,4;8c,b7,4;8c,bt,4;8c,bu,4;8c,bv,4;8d,7j,3;8d,7t,2;8d,b7,4;8d,b8,4;8d,b9,4;8d,bv,4;8d,bw,4;8d,by,4;82,79,2;82,7u,1;82,b8,4;82,b9,4;82,bb,4;82,bw,4;82,by,4;82,bz,4;83,54,1;83,1i,2;83,31,2;83,7a,2;83,7l,1;83,b9,4;83,bb,4;83,bc,4;83,by,4;83,bz,4;83,c0,4;84,31,2;84,7a,3;84,7b,d;84,7m,1;84,bb,4;84,bc,4;84,bd,4;84,bz,4;84,c0,4;84,c1,4;85,55,1;85,4t,1;85,1i,2;85,31,3;85,7b,b;85,84,1;85,bc,4;85,bd,4;85,be,4;85,c0,4;85,c1,4;85,c2,4;85,9u,1;37,6,1;37,7,1;37,17,3;37,18,1;37,1c,2;37,1d,3;37,1e,2;37,21,3;37,22,5;37,23,3;37,a,8;37,k,6;37,l,3;37,f,2;37,5e,9;37,5n,3;37,64,1;37,1p,b;37,1q,4;37,1u,3;37,51,1;37,5j,4;37,b1,1;37,b5,3;37,b6,1;37,bo,1;37,9r,1;37,37,1;37,38,5;37,7z,9;37,ce,6;37,cf,6;37,cg,6;37,ch,6;38,17,4;38,22,2;38,29,2;38,a,3;38,c,2;38,k,3;38,l,1;38,5f,6;38,64,1;38,1p,4;38,1q,2;38,1s,2;38,1t,2;38,1u,3;38,4y,2;38,50,1;38,52,1;38,54,1;38,1k,1;38,1m,1;38,1o,1;38,5j,1;38,5k,1;38,5s,1;38,6b,1;38,6d,1;38,2k,2;38,2l,1;38,y,2;38,7g,2;38,c9,1;38,bn,4;38,bs,1;38,bt,2;38,37,1;38,7w,6;38,7x,1;38,7y,1;38,7z,2;38,ce,6;38,cf,6;38,cg,6;38,ch,6;7v,1p,1;7v,1y,2;7v,34,1;7v,50,1;7v,54,4;7v,2w,6;7v,2x,8;7v,2y,8;7v,81,5;7v,86,1;7v,87,2;7v,88,4;7v,89,4;7v,8a,1;7v,bj,1;7v,bl,1;7v,b1,1;7v,bp,3;7v,7w,4;7v,7x,2;7w,34,3;7w,50,1;7w,52,1;7w,54,6;7w,4s,1;7w,2s,1;7w,2w,6;7w,2x,4;7w,2y,8;7w,81,2;7w,86,3;7w,88,6;7w,89,4;7w,8a,2;7w,bk,2;7w,bl,4;7w,b1,1;7w,b3,1;7w,b4,3;7w,c8,1;7w,c9,2;7w,bo,1;7w,bp,1;7w,bq,3;7w,7v,3;7w,7x,4;7x,1u,1;7x,1y,1;7x,4y,1;7x,50,2;7x,52,2;7x,54,5;7x,1j,1;7x,6c,1;7x,2w,1;7x,2x,3;7x,2y,5;7x,7n,1;7x,7p,1;7x,81,2;7x,86,1;7x,87,2;7x,88,3;7x,89,3;7x,8a,5;7x,8b,8;7x,b1,1;7x,b2,1;7x,b3,1;7x,b4,1;7x,b5,3;7x,b6,2;7x,bo,2;7x,bq,1;7x,bs,2;7x,38,1;7x,7v,5;7x,7w,2;7y,1t,1;7y,1k,1;7y,b6,1;7y,bt,3;7y,7x,1;7y,7z,2;7y,ce,2;7y,cf,3;7y,cg,2;7y,ch,2;7z,1p,2;7z,1q,1;7z,34,3;7z,53,1;7z,54,1;7z,b5,4;7z,b6,1;7z,37,1;7z,38,3;7z,7y,4;7z,7z,6;7z,ce,2;7z,cf,2;7z,cg,3;7z,ch,2;80,1r,1;80,1y,2;80,4y,2;80,31,2;80,83,5;80,84,3;80,b7,1;80,bu,1",
        /** cell index, cell index, contact count — all base 36 */
        gap: "39,3b,2;39,3y,2;39,43,1;39,45,3;39,ae,1;39,5l,2;3a,3c,1;3a,3d,1;3a,43,4;3a,46,2;3a,ac,3;3a,af,2;3a,5m,2;3b,3e,1;3b,3w,1;3c,3v,1;3c,3x,1;3c,43,1;3c,46,2;3d,3v,1;3d,44,1;3d,ad,3;3d,ag,1;3e,3x,2;3e,40,1;3e,ah,1;3f,3w,1;3f,3x,1;3f,41,1;3g,40,5;3v,ag,3;3w,40,1;3w,42,1;3w,ae,1;3w,ah,1;3x,3z,1;3x,43,b;3x,44,5;3x,ag,1;3y,46,1;3y,ad,2;3y,ag,1;3y,ah,1;3z,46,2;3z,af,1;3z,ag,1;3z,ai,1;40,40,1;40,41,2;40,ag,1;40,ah,1;40,ai,1;41,41,1;41,ah,2;41,al,2;44,ad,3;45,46,2;46,ag,2;a4,a7,2;a5,a8,2;a6,a9,2;a7,aa,2;a8,ab,2;a9,ac,2;aa,ad,2;9v,aa,2;9w,aa,2;ab,ae,2;9v,ab,2;9x,ab,2;ac,af,2;9x,ac,2;ad,ag,2;9v,ad,2;9w,ad,2;ae,ah,2;9v,ae,2;9x,ae,2;af,ai,2;9w,af,4;9x,af,2;ag,aj,2;9y,ag,2;9z,ag,2;ah,ak,2;9y,ah,2;a0,ah,2;ai,al,2;9z,ai,2;a0,ai,2;a1,aj,2;a2,aj,2;a1,ak,2;a3,ak,2;a2,al,2;a3,al,2;am,ap,2;a1,am,2;a2,am,2;an,ap,2;a1,an,2;a3,an,2;ao,ap,2;a2,ao,2;a3,ao,2;a1,ap,2;a2,ap,2;a3,ap,2;9v,9y,2;9w,9z,2;9y,a1,2;9z,a2,2;4,17,1;4,24,1;4,8,3;4,k,1;0,4,5;4,57,1;4,70,1;4,5l,2;5,16,1;5,21,3;5,23,1;5,9,5;5,b,4;1,5,4;5,5i,1;5,6r,1;5,6v,2;6,7,6;6,20,1;6,63,3;6,1m,2;6,9r,1;7,16,1;7,1e,1;13,15,3;13,24,1;13,25,2;8,13,6;9,13,2;14,16,3;14,23,1;9,14,1;14,52,1;15,22,1;k,15,3;e,15,1;h,15,1;15,5p,2;16,1a,4;16,25,2;b,16,3;l,16,1;g,16,1;17,18,7;17,1d,i;k,17,2;17,5b,5;17,63,3;18,1e,2;9,18,4;b,18,1;l,18,6;1,18,3;18,5c,4;18,64,3;18,1s,2;18,1i,2;18,1o,1;a,19,1;h,19,1;a,1a,2;b,1a,3;j,1a,1;1b,1c,7;1b,3p,1;a,1b,1;m,1b,2;1b,51,1;1b,5p,1;f,1c,1;1c,52,5;1d,1e,9;a,1d,2;c,1d,1;1d,1s,8;1d,51,8;1d,37,1;1e,1e,2;b,1e,1;d,1e,3;m,1e,1;1e,64,1;1e,1t,a;1e,52,p;1e,38,3;20,21,2;k,20,3;b,21,3;l,21,3;22,23,3;1f,22,4;a,22,1;22,63,1;1g,23,3;23,5b,4;23,64,1;1f,24,1;9,25,3;a,25,1;b,25,1;8,9,1;8,c,2;8,i,2;8,70,9;8,1n,1;9,71,2;9,5w,1;3h,3i,3;3h,3j,2;3h,60,1;3i,3k,8;3i,5w,1;3i,60,4;3j,3l,8;3j,70,2;3j,5l,1;3j,5z,1;3k,3m,8;3l,3m,b;3l,5r,1;3l,5x,3;3m,3s,1;3m,6z,4;3n,6w,1;3o,5x,1;3o,6x,1;3p,47,2;3p,72,1;3p,63,5;3p,70,4;3p,5t,2;3p,5z,2;3p,6y,1;3q,73,4;3q,64,1;3q,71,4;3r,6y,3;2f,3s,1;2c,49,2;49,59,5;49,5g,3;49,70,3;49,5v,1;2d,4a,8;4a,5a,5;4a,5h,4;4a,5i,2;4a,71,7;4a,5w,1;2e,4b,4;0,4b,4;4b,59,2;4b,5g,2;4b,5r,3;2f,4c,1;4c,5a,6;4c,5h,6;4c,71,5;4c,5v,2;47,48,b;47,5g,3;48,5h,5;2e,5i,1;2e,6y,3;f,2f,1;n,1z,7;n,28,n;n,63,3;n,53,3;n,5s,2;n,6p,1;o,1z,g;o,29,n;o,6f,2;o,53,3;o,1m,2;1z,53,4;1l,1z,8;4w,4w,1;4f,4w,b;4g,4w,8;1w,4w,1;32,4w,1;4w,53,1;2r,4w,2;4w,8d,1;4n,4p,1;4f,4n,2;4g,4n,3;4l,4n,b;4n,4s,4;3t,4n,8;4n,9r,3;4o,4q,1;4f,4o,4;4g,4o,2;4o,53,3;4o,4t,8;3u,4o,9;4o,9r,1;p,6p,3;p,6t,2;p,6u,1;p,9r,3;3,q,2;q,64,1;q,53,g;q,6s,1;4h,4p,1;4j,4p,1;4l,4p,2;4p,55,1;4p,7c,2;4p,9r,3;4i,4q,6;4k,4q,c;4q,9r,2;35,36,6;35,6e,1;c,35,1;35,5i,1;1l,35,5;35,6h,1;2w,35,1;3,36,4;1l,36,9;1m,36,2;2g,36,5;2h,36,6;2i,36,g;s,36,1;28,4x,1;29,53,3;29,38,1;6e,6f,2;32,6e,1;6e,6h,1;c,6f,1;32,6f,1;1j,6f,1;5p,6f,5;5q,6f,3;67,6f,1;6f,6j,1;6f,6k,2;4u,4v,3;1r,4u,1;4t,4u,1;1i,4u,4;4u,79,1;4g,4v,1;34,4v,1;4t,4v,2;1h,4v,6;4v,8d,1;26,27,1;h,26,3;26,5g,1;26,5h,2;26,5n,4;27,5n,5;1n,27,1;63,72,3;1g,73,3;5c,73,1;64,73,5;5g,74,4;1h,74,2;5h,75,3;1i,75,5;6x,75,1;5g,76,3;1h,77,2;r,5h,3;r,1w,7;r,1x,2;r,4z,15;r,50,1p;r,1j,3;4j,4r,1;1u,4r,5;1v,4r,2;4r,4x,3;4r,4y,2;4r,4z,g;4r,50,a;4r,55,2;4r,4s,2;1l,4r,2;1m,4r,3;4r,9r,1;1f,1g,2;h,1f,3;1f,5v,2;j,1g,1;g,1g,1;2,g,2;2,5h,1;3,h,4;3,1v,1;3,1w,4;3,52,2;4f,4g,p;1w,4f,2;1x,4f,1;32,4f,3;4f,53,8;4f,4t,2;4f,7l,1;4f,7m,4;4f,8a,2;32,4g,6;4g,53,9;4g,4s,1;4g,7u,7;4g,7l,4;4g,8d,5;4g,9r,1;4h,4i,7;4h,4l,1;1r,4h,3;1s,4h,1;4h,50,7;4h,51,1;4h,9r,1;4i,4k,1;1r,4i,2;1t,4i,2;4i,4z,f;4i,53,2;4i,4t,2;4i,9r,1;4j,4k,h;1s,4j,1;1t,4j,2;1v,4j,1;4j,51,3;4j,4s,3;1i,4j,1;4j,9r,3;4k,4m,1;1s,4k,a;1t,4k,2;4k,4z,1;4k,52,4;4k,53,1;4k,54,1;4k,56,1;4k,9r,4;4l,4m,2;1h,4l,1;2n,4l,2;4l,7b,1;4l,9r,1;1r,4m,1;1s,4m,2;1v,4m,1;4m,4t,5;1h,4m,3;1i,4m,1;3u,4m,1;2o,4m,7;a,b,7;a,c,5;b,b,2;c,l,4;c,5h,3;c,5o,1;c,34,2;c,5k,1;c,5x,2;c,6h,1;c,6t,1;d,k,3;d,5c,1;d,5g,3;d,5o,3;d,34,9;d,4z,2;d,54,1;d,5j,2;d,5q,3;d,6i,1;d,6s,2;i,j,4;i,1w,1;i,5j,5;j,5k,3;k,l,i;k,5g,1;k,5i,1;l,6m,1;0,1,3;0,51,4;0,1m,2;1,52,2;1,1l,3;e,6n,1;f,1x,3;f,6r,1;g,h,1;h,57,2;m,5d,4;m,1h,1;m,1o,3;m,38,1;57,59,1;57,6u,4;58,5r,1;58,5s,1;58,6a,1;58,6i,1;58,6j,1;58,6s,1;58,6v,1;59,59,3;59,5a,f;59,5g,3;1j,59,6;1k,59,3;59,60,2;59,6g,2;59,6i,1;59,6k,5;59,6m,1;59,6n,2;59,6s,3;5a,5a,5;5a,5h,2;1j,5a,2;1k,5a,3;5a,6h,3;5a,6j,2;5a,6l,2;5a,6n,6;5a,6p,2;5a,6s,4;5a,6t,2;1x,5b,4;5c,66,1;1l,5e,1;1o,5e,1;37,5e,1;5f,64,1;1r,5f,3;1u,5f,1;2w,5f,2;5g,5h,29;5g,61,1;1w,5g,2;4z,5g,2;5g,5y,2;5g,81,3;5h,61,1;1w,5h,1;1x,5h,2;5h,81,2;1u,5o,f;1n,5o,3;5j,5o,2;5k,5o,2;5o,5u,1;5o,60,1;5o,6s,2;5o,6t,5;5o,6u,2;5j,61,3;61,68,1;61,6a,1;1q,63,1;1n,63,2;5s,63,1;63,65,6;50,64,3;64,65,1;64,66,4;64,6r,3;6r,71,1;5l,5l,4;5l,5m,2;5l,5x,2;5l,6y,1;5m,5x,4;1p,1q,v;1p,1r,1;1p,1s,4;1p,1t,5;1p,4y,1;1p,4z,2;1p,50,1;1p,52,5;1p,4s,1;u,1p,2;1p,7a,1;1p,84,3;1p,9r,8;1p,7z,1;1q,1r,1;1q,1s,b;1q,1t,7;1q,4z,3;1q,51,2;1q,52,2;1q,7k,1;1q,9r,3;1r,1t,4;1r,1v,1;1r,1y,4;1r,34,c;1r,4z,3;1r,50,2;1r,51,1;1r,54,4;u,1r,1;1r,31,1;1r,9r,6;1s,1t,f;1s,1v,6;1s,33,1;1s,4x,1;1s,4y,1;1s,4z,2;1s,50,6;1l,1s,2;1s,3t,1;1s,2v,3;t,1s,1;u,1s,3;1s,84,8;1s,9r,z;1t,1u,3;1t,1v,2;1t,1y,2;1t,34,4;1t,4x,1;1t,4y,1;1t,4z,4;1t,50,3;1t,51,3;1t,52,2;1t,54,2;1t,6i,1;1t,2n,5;u,1t,h;1t,31,1;1t,7a,1;1t,84,d;1t,9r,b;1u,1v,a;1u,4x,5;1u,4y,2;1u,55,3;1u,56,5;1u,4s,3;1u,4t,j;1h,1u,7;1m,1u,6;1u,3t,5;1u,3u,1;1u,4e,2;1u,9r,3;1v,4y,5;1v,54,1;1v,56,1;1v,4s,3;1v,4t,1;1h,1v,4;1i,1v,3;1k,1v,3;1l,1v,1;1v,3u,1;1v,7a,2;1v,9r,3;1w,4g,1;1w,1x,9;1w,1y,3;1w,32,i;1w,4z,3;1w,50,6;1w,54,5;1w,6o,2;1w,6p,2;1w,6q,6;1w,6r,2;t,1w,1;u,1w,1;1w,7l,1;1w,9r,1;1x,4z,m;1x,51,2;1x,54,1;1o,1x,1;1x,5k,1;1x,6o,1;1x,6p,9;1x,6r,6;1x,9r,y;1y,33,e;1y,34,m;1y,4y,2;1y,4z,1;1y,50,8;1y,54,6;1y,56,3;1n,1y,1;1y,2o,4;1y,4d,3;1y,31,s;1y,83,1;1y,84,2;1y,85,5;1y,80,2;32,34,1;32,4z,1;32,53,f;32,54,8;32,4s,3;32,4t,1;1j,32,b;1k,32,3;32,6a,1;32,6h,1;32,6j,1;2o,32,3;32,4d,1;2p,32,3;2u,32,2;2v,32,3;u,32,1;32,7a,1;32,9r,4;33,33,2;33,34,f;33,4z,4;33,50,4;33,54,3;2n,33,5;u,33,4;30,33,1;31,33,3;33,83,2;33,85,5;33,9r,1;34,4y,1;34,4z,k;34,50,y;34,52,7;34,54,b;31,34,1;34,81,2;34,83,1;34,85,1;34,9r,2;34,80,1;4x,4y,2;4x,4z,2;4x,50,6;4x,54,2;4s,4x,2;1h,4x,1;1k,4x,7;1m,4x,1;3t,4x,3;31,4x,1;4x,84,1;4x,9r,2;4y,50,2;4y,53,5;4y,54,3;4y,56,6;1j,4y,5;1k,4y,2;1l,4y,1;1m,4y,1;3u,4y,2;4y,85,1;4y,9r,1;38,4y,2;4y,80,1;4z,4z,1;4z,50,2;4z,51,8;4z,54,e;1h,4z,1;u,4z,6;4e,4z,1;31,4z,2;4z,7a,6;4z,7b,1;4z,83,1;4z,85,b;4z,9r,1b;37,4z,1;50,54,h;50,55,1;1h,50,2;1k,50,1;1n,50,1;31,50,9;50,84,z;50,9r,4;38,50,1;50,7v,1;50,80,1;51,52,1a;3t,51,1;51,9r,3;52,54,1;52,56,1;4s,52,1;2m,52,1;52,9r,1;53,56,2;4t,53,j;3t,53,6;3u,53,9;2o,53,f;2v,53,4;4e,53,d;53,85,1;53,9r,c;54,56,2;4t,54,4;1i,54,2;1l,54,1;3u,54,4;54,60,1;54,6y,1;31,54,3;54,83,3;54,84,4;54,85,h;54,9r,1;54,7x,1;54,80,2;55,56,2;4s,55,4;4t,55,a;3u,55,3;2n,55,1;55,84,6;55,85,1;55,9r,6;4t,56,a;1i,56,2;1m,56,1;3u,56,3;56,85,2;56,9r,4;5d,5d,5;1j,5d,2;1k,5d,7;2p,5d,2;2r,5d,1;4s,4t,1v;1h,4s,5;1i,4s,a;2j,4s,1;2m,4s,1;2n,4s,h;2v,4s,8;4s,7b,i;4s,7l,2;4s,7m,4;4s,85,1;4s,9r,4;1h,4t,f;1i,4t,m;1m,4t,2;4t,6m,1;2m,4t,3;2n,4t,1;2o,4t,3;4d,4t,1;2v,4t,2;4t,7a,3;4t,7b,8;4t,7l,1;4t,7m,2;4t,84,1;4t,9r,3;1h,1i,i;1h,1l,7;1h,1m,9;1h,1n,2;1h,3t,2;1h,3u,2;1h,5k,b;1h,6b,7;1h,6d,8;1h,2g,2;1h,2h,7;1h,2i,6;1h,2j,2;1h,2k,2;1h,2l,4;1h,2m,a;1h,2n,8;1h,2o,1;t,1h,5;1h,78,5;1h,7c,d;1h,7d,6;1h,7e,6;1h,7f,5;1h,7g,d;1h,7h,2;1h,7i,2;1h,7j,5;1h,79,6;1h,7a,2;1h,7m,2;1h,9r,3;1i,1j,3;1i,1l,2;1i,1m,f;1i,1o,2;1i,3u,4;1i,5j,8;1i,5k,2;1i,5u,2;1i,5w,1;1i,6a,1;1i,6c,f;1i,6d,2;1i,2g,9;1i,2h,3;1i,2i,7;1i,2j,2;1i,2k,5;1i,2l,4;1i,2n,5;1i,2o,4;w,1i,1;y,1i,3;z,1i,2;t,1i,2;u,1i,3;1i,78,7;1i,7d,3;1i,7e,3;1i,7f,5;1i,7h,5;1i,7i,2;1i,7j,5;1i,79,4;1i,7a,g;1i,7b,3;1i,83,1;1i,9r,4;1j,1k,h;1j,6m,2;1j,2q,4;1j,2r,9;1j,2s,4;1j,2t,3;1j,2u,4;1j,2v,d;z,1j,1;t,1j,1;1j,7a,1;1j,7k,1;1j,7n,e;1j,7p,3;1j,7q,3;1j,7r,3;1j,7s,4;1j,7t,4;1j,7u,4;1j,7l,4;1j,7m,5;1k,6k,2;1k,2p,f;1k,2q,3;1k,2r,2;1k,2s,5;1k,2t,4;1k,2u,4;1k,2v,3;y,1k,2;z,1k,1;1k,7a,3;1k,7n,6;1k,7o,7;1k,7p,5;1k,7q,3;1k,7r,4;1k,7s,3;1k,7t,4;1k,7u,4;1k,7l,4;1k,7m,6;1k,9r,5;1l,1m,6;1l,79,1;1l,9r,3;1m,6g,1;1n,1o,5;1n,5j,a;1n,5k,7;1n,5w,2;1n,60,1;1n,6v,1;s,1n,2;1o,5j,9;1o,5k,b;1o,5r,2;1o,5u,5;1o,5v,1;1o,5w,7;1o,60,1;1o,6t,1;1o,2g,1;s,1o,1;3u,9r,7;5j,5t,1;5j,6g,1;5k,6h,1;5r,5t,1;5r,5v,2;5r,6l,1;5r,6s,3;5s,5t,1;5s,5w,5;5s,68,1;5s,6g,1;5s,6t,1;5t,5v,1;5t,5z,1;5t,6j,1;5t,6m,2;5t,6s,2;5u,5w,1;5v,69,3;5v,6j,1;5w,67,1;5w,6a,9;5w,6i,1;5w,6v,8;5x,60,6;5y,60,4;5z,60,1;60,6u,1;65,6n,3;65,6s,1;5p,5q,s;5p,68,2;5p,6n,1;5p,6u,2;5q,67,1;5q,6v,8;67,6o,3;69,6a,1;69,6b,3;69,6p,2;69,6r,h;69,6u,8;6a,6o,1;6a,6q,g;6a,6s,4;6b,7c,c;6b,7d,2;2w,6d,1;6g,6n,1;6g,6o,2;6h,6p,3;6h,6t,1;6i,6k,2;6i,6m,2;6k,6m,8;6l,6m,3;6l,6n,a;6l,6o,4;6m,6n,1;6m,6o,1;6m,6q,2;6m,6s,3;6m,6u,1;6n,6o,1;6p,6r,2;6p,6t,1;6t,6u,1;6t,81,5;2g,2h,1;2h,2k,1;v,2h,2;x,2h,1;2h,78,9;2h,7g,3;2i,2j,1;2i,2k,1;x,2i,4;2i,7c,1;2i,7g,1;2j,7d,1;z,2k,5;2m,2n,1;t,2m,1;2m,83,2;2n,2o,f;2n,4d,1;u,2n,1;2n,31,2;2n,79,2;2n,7b,6;2n,9r,1;2o,4d,9;t,2o,1;2o,79,1;2o,7a,3;2o,7b,1;2o,7m,1;2o,85,2;2o,9r,1;4d,4e,5;31,4d,1;4d,9r,2;2p,2q,5;2p,7o,5;2q,2r,e;2q,7p,1;2r,2s,1;2r,2y,1;2r,7r,1;2s,2t,5;2s,2y,1;2t,2u,5;2u,2v,5;t,2v,1;2v,4e,2;2v,79,1;2v,9r,1;s,7d,3;s,7g,3;s,86,n;v,7d,2;v,7e,9;t,7b,3;t,9r,7;u,4e,4;u,7a,1;u,7m,1;u,9r,v;4e,85,4;4e,9r,b;2w,2x,6;2w,86,3;2w,87,4;2w,bk,2;2w,7v,1;2x,2y,2;2x,87,1;2x,88,2;2x,89,1;2y,2z,3;2z,30,3;30,31,3;31,7b,7;31,83,3;31,84,e;31,85,2;7c,7g,1;7c,86,1;7c,9r,1;7d,87,1;7e,7h,1;7e,7o,1;79,9r,2;7a,7b,1;7a,7l,3;7a,9r,1;7b,7m,7;7b,84,8;7b,85,6;7k,7n,2;7n,7o,a;7n,7p,1;7o,7p,1;32,7p,1;7p,7q,1;7q,7r,5;7r,7s,5;7s,7t,5;7t,7u,5;7l,7u,5;7l,7m,4;7l,83,1;7l,84,1;7m,9r,1;81,86,4;7w,81,1;86,86,3;86,87,7;86,92,1;87,88,6;88,89,1;89,8a,a;8a,8b,f;8b,8c,6;8c,8d,6;82,8d,6;82,83,6;83,84,6;83,9r,2;84,85,6;84,9r,5;80,84,1;8f,8q,f;8f,8w,f;8q,8w,f;8w,8x,f;8x,8y,f;8y,8z,f;8z,90,f;90,91,f;91,92,f;8g,92,f;8g,8h,f;8h,8i,f;8i,8j,f;8j,8k,f;8k,8l,f;8l,8m,f;8m,8n,f;8n,8o,f;8o,8p,f;8p,8r,f;8r,8s,f;8s,8t,f;8t,8u,f;8u,8v,f;93,9e,f;93,9k,f;9e,9k,f;9k,9l,f;9l,9m,f;9m,9n,f;9n,9o,f;9o,9p,f;9p,9q,f;94,9q,f;94,95,f;95,96,f;96,97,f;97,98,f;98,99,f;99,9a,f;9a,9b,f;9b,9c,f;9c,9d,f;9d,9f,f;9f,9g,f;9g,9h,f;9h,9i,f;9i,9j,f;az,ba,f;az,bf,f;ba,bf,f;bf,bg,f;bg,bh,f;bh,bi,f;bi,bj,f;bj,bk,f;bk,bl,f;b0,bl,f;bl,c8,2;b0,b1,f;b1,b2,f;b2,b3,f;b3,b4,f;b4,b5,f;b5,b6,f;b6,b7,f;b7,b8,f;b8,b9,f;b9,bb,f;bb,bc,f;bc,bd,f;bd,be,f;bm,bx,f;bm,c3,f;bx,c3,f;c3,c4,f;c4,c5,f;c5,c6,f;c6,c7,f;c7,c8,f;2w,c8,2;c8,c9,f;bn,c9,f;bn,bo,f;bo,bp,f;bp,bq,f;bq,br,f;br,bs,f;bs,bt,f;bt,bu,f;bu,bv,f;bv,bw,f;bw,by,f;by,bz,f;bz,c0,f;c0,c1,f;c1,c2,f;9r,9r,d;9s,9t,4;9s,aq,4;8e,9s,4;9t,aq,4;8e,9t,4;8e,aq,4;37,38,1;7v,7w,c;7v,7x,7;7w,7w,1;7w,7x,3;7x,7y,4;7x,ce,2;7x,cf,2;7x,cg,2;7x,ch,2;7y,7z,4;7z,80,4;av,aw,4;ar,av,4;as,aw,4;ar,as,4;ar,at,4;ar,ce,4;as,au,4;as,cf,4;at,au,4;at,ax,4;at,cg,4;au,ay,4;au,ch,4;ax,ay,4;ce,cf,4;ca,ce,4;cb,cf,4;ca,cb,4;ca,cc,4;cb,cd,4;cc,cd,4;cc,cg,4;cd,ch,4;cg,ch,4",
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const types = {
        s: 'sensory',
        i: 'inter',
        m: 'motor',
        p: 'poly',
        u: 'unknown',
        M: 'muscle',
        o: 'other',
    };
    /**
     * The connectome as a graph: cells, edges and the two layouts.
     * The data never changes, so everything here is a plain memoized static.
     */
    class $bog_worm_graph extends $mol_object2 {
        /** Columns of the layered layout, left to right. */
        static columns = [
            ['sensory'],
            ['poly'],
            ['inter'],
            ['motor'],
            ['muscle'],
            ['other', 'unknown'],
        ];
        static ganglia() {
            return $bog_worm_data.ganglia;
        }
        static dataset() {
            return $bog_worm_data.dataset;
        }
        /** Cells and edges are built together — every cell keeps its own incident edges. */
        static model() {
            const cells = $bog_worm_data.cells.split('\n').map((line, index) => {
                const part = line.split(',');
                return {
                    index,
                    id: part[0],
                    cls: part[1],
                    type: types[part[2]],
                    ganglion: parseInt(part[3], 36),
                    nt: part[4] ? part[4].split(' ') : [],
                    ap: part[5] ? Number(part[5]) : null,
                    dv: part[6] ? Number(part[6]) : null,
                    title: part.slice(7).join(','),
                    out: [],
                    inp: [],
                    gap: [],
                };
            });
            const edges = [];
            const parse = (packed, kind) => {
                if (!packed)
                    return;
                for (const chunk of packed.split(';')) {
                    const part = chunk.split(',');
                    const edge = {
                        index: edges.length,
                        from: parseInt(part[0], 36),
                        to: parseInt(part[1], 36),
                        kind,
                        weight: parseInt(part[2], 36),
                    };
                    edges.push(edge);
                    if (kind === 'chemical') {
                        cells[edge.from].out.push(edge);
                        cells[edge.to].inp.push(edge);
                    }
                    else {
                        cells[edge.from].gap.push(edge);
                        // a dozen gap junctions in the source join two processes of one cell — count them once
                        if (edge.to !== edge.from)
                            cells[edge.to].gap.push(edge);
                    }
                }
            };
            parse($bog_worm_data.chemical, 'chemical');
            parse($bog_worm_data.gap, 'gap');
            const by_weight = (left, right) => right.weight - left.weight;
            let weight_max = 1;
            for (const cell of cells) {
                cell.out.sort(by_weight);
                cell.inp.sort(by_weight);
                cell.gap.sort(by_weight);
            }
            for (const edge of edges)
                if (edge.weight > weight_max)
                    weight_max = edge.weight;
            const index = new Map(cells.map(cell => [cell.id, cell]));
            return { cells: cells, edges: edges, index, weight_max };
        }
        static cells() {
            return this.model().cells;
        }
        static edges() {
            return this.model().edges;
        }
        static index() {
            return this.model().index;
        }
        static cell(id) {
            return this.model().index.get(id) ?? null;
        }
        /** Heaviest edge weight, for scaling line widths. */
        static weight_max() {
            return this.model().weight_max;
        }
        /** Every name the user may search for: cell names and class names alike. */
        static names() {
            const names = new Set();
            for (const cell of this.cells()) {
                names.add(cell.id);
                names.add(cell.cls);
            }
            return [...names].sort();
        }
        static suggest(query, limit = 12) {
            const needle = query.trim().toUpperCase();
            if (!needle)
                return [];
            const starts = [];
            const inside = [];
            for (const name of this.names()) {
                const upper = name.toUpperCase();
                if (upper.startsWith(needle))
                    starts.push(name);
                else if (upper.includes(needle))
                    inside.push(name);
            }
            return [...starts, ...inside].slice(0, limit);
        }
        /** sensory → polymodal → interneurons → motor → muscle, sorted by ganglion inside a column. */
        static layered() {
            const cells = this.cells();
            const xs = new Float64Array(cells.length);
            const ys = new Float64Array(cells.length);
            const columns = this.columns.map(types => cells
                .filter(cell => types.includes(cell.type))
                .sort((left, right) => left.ganglion - right.ganglion || (left.id < right.id ? -1 : left.id > right.id ? 1 : 0)));
            columns.forEach((column, place) => {
                const x = (place + .5) / columns.length;
                column.forEach((cell, row) => {
                    xs[cell.index] = x;
                    ys[cell.index] = (row + .5) / Math.max(column.length, 1);
                });
            });
            return { xs, ys };
        }
        /**
         * Fruchterman-Reingold, seeded from the layered layout plus a fixed pseudo-random jitter,
         * so the picture is identical on every machine and every reload.
         */
        static forced() {
            const cells = this.cells();
            const edges = this.edges();
            const count = cells.length;
            const layered = this.layered();
            const xs = new Float64Array(count);
            const ys = new Float64Array(count);
            let seed = 20190701; // the Cook et al. publication date, any fixed number would do
            const random = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
            for (let i = 0; i < count; ++i) {
                xs[i] = layered.xs[i] + (random() - .5) * .2;
                ys[i] = layered.ys[i] + (random() - .5) * .2;
            }
            const dx = new Float64Array(count);
            const dy = new Float64Array(count);
            const k = Math.sqrt(1 / count); // ideal edge length for a unit square
            const rounds = 300;
            const gravity = .02; // keeps cells without synapses from drifting off the picture
            const repulsion = 2.5; // spreads the core apart, the connectome is dense enough to clump otherwise
            // hubs carry hundreds of edges — without a mass term they collapse the whole graph into a dot
            const mass = new Float64Array(count).fill(1);
            for (const edge of edges) {
                mass[edge.from] += .25;
                mass[edge.to] += .25;
            }
            for (let round = 0; round < rounds; ++round) {
                dx.fill(0);
                dy.fill(0);
                for (let i = 0; i < count; ++i) {
                    for (let j = i + 1; j < count; ++j) {
                        let ox = xs[i] - xs[j];
                        let oy = ys[i] - ys[j];
                        let dist = Math.sqrt(ox * ox + oy * oy);
                        if (dist < 1e-4) {
                            ox = 1e-4;
                            oy = 1e-4;
                            dist = 1.41e-4;
                        }
                        const force = repulsion * k * k * mass[i] * mass[j] / dist / dist;
                        dx[i] += ox * force;
                        dy[i] += oy * force;
                        dx[j] -= ox * force;
                        dy[j] -= oy * force;
                    }
                }
                for (const edge of edges) {
                    const ox = xs[edge.from] - xs[edge.to];
                    const oy = ys[edge.from] - ys[edge.to];
                    const dist = Math.sqrt(ox * ox + oy * oy) || 1e-4;
                    const force = dist * dist / k * (edge.kind === 'gap' ? 1.4 : 1) / dist;
                    dx[edge.from] -= ox * force;
                    dy[edge.from] -= oy * force;
                    dx[edge.to] += ox * force;
                    dy[edge.to] += oy * force;
                }
                const heat = .05 * (1 - round / rounds);
                for (let i = 0; i < count; ++i) {
                    dx[i] += (.5 - xs[i]) * gravity * mass[i] / k;
                    dy[i] += (.5 - ys[i]) * gravity * mass[i] / k;
                    const step = Math.min(heat, Math.hypot(dx[i], dy[i]) / mass[i]);
                    const len = Math.hypot(dx[i], dy[i]) || 1e-9;
                    xs[i] += dx[i] / len * step;
                    ys[i] += dy[i] / len * step;
                }
            }
            return this.normalized(xs, ys);
        }
        /**
         * Rescales a cloud of points into the unit square, keeping the aspect ratio.
         * The bounds come from the 2nd and 98th percentile — a handful of cells without any synapse
         * end up far outside the core and would otherwise squeeze the whole picture into a dot.
         */
        static normalized(xs, ys) {
            const bounds = (values) => {
                const sorted = Array.from(values).sort((left, right) => left - right);
                const edge = Math.floor(sorted.length * .02);
                return [sorted[edge], sorted[sorted.length - 1 - edge]];
            };
            const [left, right] = bounds(xs);
            const [top, bottom] = bounds(ys);
            const span = Math.max(right - left, bottom - top) || 1;
            const shift_x = (span - (right - left)) / 2;
            const shift_y = (span - (bottom - top)) / 2;
            const clamp = (value) => Math.min(1, Math.max(0, value));
            for (let i = 0; i < xs.length; ++i) {
                xs[i] = clamp((xs[i] - left + shift_x) / span);
                ys[i] = clamp((ys[i] - top + shift_y) / span);
            }
            return { xs, ys };
        }
        /**
         * Up to `limit` shortest signal paths along directed chemical synapses.
         * Returns cell index chains, heaviest first. Empty when nothing reaches the target in `hops`.
         */
        static paths(from, to, limit = 3, hops = 5) {
            const cells = this.cells();
            if (from === to || from < 0 || to < 0)
                return [];
            const ahead = this.distances(from, hops, cell => cell.out.map(edge => edge.to));
            const behind = this.distances(to, hops, cell => cell.inp.map(edge => edge.from));
            const length = ahead[to];
            if (length < 0 || length > hops)
                return [];
            const found = [];
            const walk = (chain) => {
                if (found.length >= limit)
                    return;
                const last = chain[chain.length - 1];
                if (last === to) {
                    found.push(chain);
                    return;
                }
                const next = cells[last].out
                    .filter(edge => ahead[edge.to] === chain.length && behind[edge.to] === length - chain.length)
                    .sort((left, right) => right.weight - left.weight);
                for (const edge of next)
                    walk([...chain, edge.to]);
            };
            walk([from]);
            return found;
        }
        /** Breadth first hop counts from a cell, -1 where unreachable within `hops`. */
        static distances(start, hops, step) {
            const cells = this.cells();
            const dist = new Int16Array(cells.length).fill(-1);
            dist[start] = 0;
            let front = [start];
            for (let depth = 1; depth <= hops && front.length; ++depth) {
                const next = [];
                for (const index of front) {
                    for (const near of step(cells[index])) {
                        if (dist[near] >= 0)
                            continue;
                        dist[near] = depth;
                        next.push(near);
                    }
                }
                front = next;
            }
            return dist;
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_worm_graph, "model", null);
    __decorate([
        $mol_memo.method
    ], $bog_worm_graph, "names", null);
    __decorate([
        $mol_memo.method
    ], $bog_worm_graph, "layered", null);
    __decorate([
        $mol_memo.method
    ], $bog_worm_graph, "forced", null);
    $.$bog_worm_graph = $bog_worm_graph;
})($ || ($ = {}));


export default $
//# sourceMappingURL=node.js.map
