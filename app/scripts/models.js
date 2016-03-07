var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');

function Hero(params){
  _.extend(this, params);
}

function Enemy(params){
  _.extend(this, params);
}
//Enemy.prototype = new Hero();
//Enemy.prototype.constructor = Enemy;

// HEROES

Hero.prototype.calculateDamage = function(character){ //make this a method on both prototypes
  var attackPower = (this.power)/50; //gets players attack power multiplier
  var currentEnemyHealth = function(character){
    return character.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower); //calculates damage based on power
  character.hp = (currentEnemyHealth(character) - this.currentDamage); //sets hp to last hp minus damage
  return character.hp;
};

Hero.prototype.boostDamage = function(character){ //make this a method on both prototypes
  var attackPower = (this.power)/25; //on boost the attack number could be twice as high
  var currentEnemyHealth = function(character){
    return character.hp;
  };
  this.boostDamageAmount = Math.floor(_.random(1, 10) * attackPower); //calculates damage based on power
  character.hp = (currentEnemyHealth(character) - this.boostDamageAmount); //sets hp to last hp minus damage
  return character.hp;
};

Hero.prototype.boostHpCalculate = function(){ //make this a method on both prototypes
  var newHp = Math.floor(((this.boostHp)/(_.random(1, 5)))); //gets boost amount based on random number and prop
  this.hp = this.hp + newHp; //adds to current hp
  if(this.hp > 100){ //caps at 100
    this.hp = 100;
  }
  return this.hp; //returns to be displayed
};

Hero.prototype.isDead = function(){
  if(this.hp > 0){
    return false;
  } else {
    return true;
  }
};

var heroes = {
    "ObiWanKenobi": new Hero ({
      name: "Obi Wan Kenobi",
      id: "ObiWanKenobi",
      hp: 100,
      avatar: "images/obi.png",
      power: _.random(95,100),
      boostPower: 75,
      boostHp: 70
    }),
    "PoeDameron": new Hero ({
      name: "Poe Dameron",
      id: "PoeDameron",
      hp: _.random(80, 95),
      avatar: "images/poe.png",
      power: _.random(80, 90),
      boostPower:  55,
      boostHp: 40
    }),
    "LukeSkywalker": new Hero({
      name: "Luke Skywalker",
      id: "LukeSkywalker",
      hp: _.random(70, 90),
      avatar: "images/luke.png",
      power: _.random(90, 100),
      boostPower:  75,
      boostHp: 80
    }),
    "HanSolo": new Hero({
      name: "Han Solo",
      id: "HanSolo",
      hp: _.random(50, 80),
      avatar: "images/han.png",
      power: _.random(60, 80),
      boostPower:  35,
      boostHp: 55
      })
};

// ENEMIES

Enemy.prototype.calculateDamage = function(character){ //make this a method on both prototypes
  var attackPower = (this.power)/50; //power must be calculated so it is displayed properly on bar
  var currentHeroHealth = function(character){
    return character.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower); //calculated on random number and prop
  character.hp = (currentHeroHealth(character) - this.currentDamage); //subtracted from health
  return character.hp; //returned for display
};

Enemy.prototype.boostDamage = function(character){ //make this a method on both prototypes
  var attackPower = (this.power)/25; //gets players attack power multiplier
  var currentEnemyHealth = function(character){
    return character.hp;
  };
  this.boostDamageAmount = Math.floor(_.random(1, 10) * attackPower); //calculates damage based on power
  character.hp = (currentEnemyHealth(character) - this.boostDamageAmount); //sets hp to last hp minus damage
  return character.hp;
};

Enemy.prototype.boostHpCalculate = function(){ //make this a method on both prototypes
  var newHp = Math.floor(((this.boostHp)/(_.random(1, 5)))); //gets boost amount based on random number and prop
  this.hp = this.hp + newHp; //adds to current hp
  if(this.hp > 100){ //caps at 100
    this.hp = 100;
  }
  return this.hp; //returns to be displayed
};

Enemy.prototype.isDead = function(){ // checks if character is dead by checking if hp is at 0
  if(this.hp > 0){
    return false;
  } else {
    return true;
  }
};

var enemies = {
    "DarthVader": new Enemy ({
      name: "Darth Vader",
      id: "DarthVader",
      hp: 100,
      avatar: "images/vader.png",
      power: 90,
      boostPower:  75,
      boostHp:  70
    }),
    "KyloRen": new Enemy ({
      name: "Kylo Ren",
      id: "KyloRen",
      hp: _.random(90, 100),
      avatar: "images/kylo.png",
      power: _.random(85, 95),
      boostPower:  50,
      boostHp: 55
    }),
    "Stormtrooper": new Enemy({
      name: "Stormtrooper",
      id: "Stormtrooper",
      hp: _.random(70, 90),
      avatar: "images/trooper.png",
      power: _.random(70, 80),
      boostPower:  45,
      boostHp: 35
    }),
    "JabbatheHut": new Enemy({
      name: "Jabba the Hut",
      id: "JabbatheHut",
      hp: _.random(60, 80),
      avatar: "images/jabba.png",
      power: _.random(60, 75),
      boostPower:  100,
      boostHp:  80
      })
};

module.exports = {
  enemies: enemies,
  heroes: heroes
};
