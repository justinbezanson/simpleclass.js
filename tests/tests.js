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

  test('extend function', function() {
    var object1 = {
        '1': 'apples',
        '2': 'oranges'
      },
      object2 = {
        '2': 'carrots',
        '3': 'peas'
      },
      object3 = Class.extend(object1, object2),
      object4 = {
        '1': 'apples',
        '2': 'carrots',
        '3': 'peas'
      };

    equal(true, object3['1'] == 'apples' && object3['2'] == 'carrots' && object3['3'] == 'peas');
  });

  test('typeof array', function() {
    equal(Class.typeof([]), 'array');
  }); 

  test('typeof object', function() {
    equal(Class.typeof({}), 'object');
  });

  test('typeof function', function() {
    equal(Class.typeof(function(){}), 'function');
  }); 

  test('typeof int', function() {
    equal(Class.typeof(5), 'number');
  });

  test('typeof string', function() {
    equal(Class.typeof('hi'), 'string');
  });

  test('typeof float', function() {
    equal(Class.typeof(parseFloat(5)), 'number');
  });
})();
