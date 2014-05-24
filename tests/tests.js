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

  var Flyer = {
    fly: function() {
      this.action = 'flying';
    }
  };

  var Bird = new Class({
    initialize: function() {
      this.action = 'standing';
    },

    Implements: Flyer
  });

  var BirdOverride = new Class({
    initialize: function() {
      this.action = 'standing';
    },

    fly: function() {
      this.action = 'flying fast';
    },

    Implements: Flyer
  });

  var BirdInherit = new Class({
    Extends: Bird
  });

  var BirdInheritOverride = new Class({
    Extends: Bird,

    fly: function() {
      this.action = 'flying override';
    }
  });

  var BirdInheritOverrideParent = new Class({
    Extends: Bird,

    initialize: function() {
      this.parent();
    },

    fly: function() {
      this.parent();
    }
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

  test('basic interface', function() {
    var bird = new Bird();
    bird.fly();
    equal(bird.action, 'flying');
  });

  test('basic interface override', function() {
    var bird = new BirdOverride();
    bird.fly();
    equal(bird.action, 'flying fast');
  });

  test('inherited interface', function() {
    var bird = new BirdInherit();
    bird.fly();
    equal(bird.action, 'flying');
  });

  test('inherited interface override', function() {
    var bird = new BirdInheritOverride();
    bird.fly();
    equal(bird.action, 'flying override');
  });

  test('inherited interface override parent', function() {
    var bird = new BirdInheritOverrideParent();
    bird.fly();
    equal(bird.action, 'flying');
  });
})();
