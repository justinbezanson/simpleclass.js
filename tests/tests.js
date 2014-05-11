(function() {
  "use strict";

  var Animal = new Class({
  	initialize: function(name) {
  		this.name = name;
  	},

  	rename: function(name) {
  		this.name = name;
  	}
  });

  var Cat = new Class({
  	Extends: Animal
  });

  test('basic instanceof', function() {
  	var animal = new Animal('Bob');
    equal(animal instanceof Animal, true);
  });

  test('init name set', function() {
  	var animal = new Animal('Bob');
  	equal(animal.name, 'Bob');
  });

  test('rename method', function() {
  	var animal = new Animal('Bob');
  	animal.rename('Fred');
  	equal(animal.name, 'Fred');
  });

  test('basic inheritence', function() {
  	var cat = new Cat('Oliver'); 
  	equal(cat.name, 'Oliver');
  });

  test('inherited rename method', function() {
  	var cat = new Cat('Oliver'); 
  	cat.rename('Fred');
  	equal(cat.name, 'Fred');
  });
})();
