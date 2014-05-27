
/*** Entity Manager service provider (base factory) ***/

define(['angular'], function() {

	var factory = {},
	    isDefined = angular.isDefined,
	    forEach   = angular.forEach;

	factory.syncOriginal = function(instance) {
		instance._original = {};
		forEach(instance, function(value, key) {
			if ((key[0] != '$') && (key[0] != '_')) {
				instance._original[key] = value;
			}
		});
	};

	factory.sync = function(instance, keys) {
		if (!isDefined(instance._original)) {
			return;
		}
		forEach(keys, function(key) {
			instance._original[key] = instance[key];
		});
	};

	factory.isDirty = function(instance, key) {
		if (!isDefined(instance) || !isDefined(instance._original)) {
			return undefined;
		}
		if (isDefined(key)) {
			return (instance._original[key] != instance[key]);
		}
		var dirty = false;
		forEach(instance._original, function(value, key){
			if (instance[key] != value) {
				dirty = true;
			}
		});
		return dirty;
	};

	factory.setPristine = function(instance) {
		if (!isDefined(instance) || !isDefined(instance._original)) return;
		forEach(instance._original, function(value, key){
			instance[key] = value;
		});
	};

	return factory;

});
