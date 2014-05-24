(function(exports) {
	"use strict";

	var SimpleClass = function(prototype) {
		var prototype = prototype || {},
			baseInit = prototype.Extends ? prototype.Extends.prototype.constructor : function() {},
			Class = prototype.initialize || baseInit || function() {},
			ctor = Class;

		if(prototype.initialize) {
			delete prototype.initialize;
		}

		if(prototype.Extends) {
			var obj = prototype.Extends;
			
			Class.prototype = Object.create(obj.prototype);
			Class.prototype.constructor = function() { ctor.apply(this, arguments); };
			Class.prototype.parent = function() { obj.apply(this, arguments); };

			delete prototype.Extends;
		}

		if(prototype.Implements) {
			if(SimpleClass.typeof(prototype.Implements) !== 'array') {
				prototype.Implements = [prototype.Implements];
			}

			for(var i = 0; i < prototype.Implements.length; i++) {
				Class.prototype = SimpleClass.extend(Class.prototype, prototype.Implements[i]);
			}

			delete prototype.Implements;
		}

		for(var name in prototype) {
			Class.prototype[name] = !Class.prototype[name] ? 
				prototype[name] :
				(function(n, fn) {
					var tmp = Class.prototype[n];
					return function() {
						this.parent = function() {
							tmp.apply(this, arguments);
						};

						return fn.apply(this, arguments);
					}
				})(name, prototype[name]);
		}

		return Class;
	};

	/**
	 *  typeof utility - http://javascript.crockford.com/remedial.html
	 */
	SimpleClass.typeof = function typeOf(value) {
	  var s = typeof value;
	  if (s === 'object') {
	    if (value) {
        if (Object.prototype.toString.call(value) == '[object Array]') {
          s = 'array';
        }
	    } else {
    		s = 'null';
	    }
	  }
	  return s;
	};

	/**
	 * extend utility - object2 overrides object1 if there is a collision
	 */
	SimpleClass.extend = function(object1, object2) {
		for(var member in object2) {
			object1[member] = object2[member];
		}

		return object1;
	};

	exports.Class = SimpleClass;
})(window);
