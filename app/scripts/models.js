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

Hero.prototype.calculateDamage = function(enemy){ //make this a method on both prototypes
  var attackPower = (this.power)/50; //gets players attack power multiplier
  var currentEnemyHealth = function(enemy){
    return enemy.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower); //calculates damage based on power
  enemy.hp = (currentEnemyHealth(enemy) - this.currentDamage); //sets hp to last hp minus damage
  return enemy.hp;
};

Hero.prototype.isDead = function(){
  if(this.hp > 0){
    return false;
  } else {
    return true;
  }
};

Hero.prototype.specialAttack = function(enemy){
  console.log("before", this.power);
  this.power = this.power * (100/this.boostPower);
  var currentEnemyHealth = function(enemy){
    return enemy.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * (this.power/75)); //calculates damage based on power
  console.log("after", this.power);
  enemy.hp = (currentEnemyHealth(enemy) - this.currentDamage); //sets hp to last hp minus damage

  return enemy.hp;
};

Hero.prototype.healthBoost = function(character){
  character.hp = character.hp * (100/character.boostHp);
  character.boostHp = false;
  return character.hp;
};

var heroes = {
    "ObiWanKenobi": new Hero ({
      name: "Obi Wan Kenobi",
      id: "ObiWanKenobi",
      hp: 100,
      avatar: "images/obi.png",
      power: _.random(95,100),
      boostPower:  50,
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

Enemy.prototype.calculateDamage = function(hero){ //make this a method on both prototypes
  var attackPower = (this.power)/50;
  var currentHeroHealth = function(hero){
    return hero.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower);
  hero.hp = (currentHeroHealth(hero) - this.currentDamage);
  return hero.hp;
};

Enemy.prototype.isDead = function(){ // checks if character is dead by checking if hp is at 0
  if(this.hp > 0){
    return false;
  } else {
    return true;
  }
};

Enemy.prototype.specialAttack = function(character){
  console.log("before", this.power);
  this.power = this.power * (100/this.boostPower);
  var currentEnemyHealth = function(character){
    return character.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * (this.power/75)); //calculates damage based on power
  console.log("after", this.power);
  character.hp = (currentEnemyHealth(enemy) - this.currentDamage); //sets hp to last hp minus damage

  return character.hp;
};

Enemy.prototype.healthBoost = function(character){
  character.hp = character.hp * (100/character.boostHp);
  character.boostHp = false;
  return character.hp;
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
      boostPower:  35,
      boostHp: 25
    }),
    "JabbatheHut": new Enemy({
      name: "Jabba the Hut",
      id: "JabbatheHut",
      hp: _.random(50, 80),
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
