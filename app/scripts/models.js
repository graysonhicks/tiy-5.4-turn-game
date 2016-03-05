var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');

/*function HeroMaker(config){
  this.name = config.name;
  this.hp = config.hp;
  this.power = config.power;
  this.avatar = config.avatar;
}

HeroMaker.prototype.attack = function(){

};

function EnemyMaker(config){
  this.name = config.name;
  this.hp = config.hp;
  this.power = config.power;
  this.avatar = config.avatar;
}*/

function Hero(params){
  _.extend(this, params);
}

function Enemy(params){
  _.extend(this, params);
}

Enemy.prototype.isDead = function(){
  if(this.hp > 0){
    console.log("not dead");
    return false;
  } else {
    console.log("dead");
    return true;
  }
};

Hero.prototype.isDead = function(){
  if(this.hp > 0){
    console.log("not dead");
    return false;
  } else {
    console.log("dead");
    return true;
  }
};

Hero.prototype.calculateDamage = function(enemy){ //make this a method on both prototypes
  var attackPower = this.power;
  var currentEnemyHealth = function(enemy){
    return enemy.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower);
  console.log("hero damage amount", this.currentDamage);
  console.log("current enemy health before attack", currentEnemyHealth(enemy));
  enemy.hp = (currentEnemyHealth(enemy) - this.currentDamage);
  console.log("enemy hp after attack", enemy.hp);
  // this.health should be updated here
  return enemy.hp;
};

Enemy.prototype.calculateDamage = function(hero){ //make this a method on both prototypes
  var attackPower = this.power;
  var currentHeroHealth = function(hero){
    return hero.hp;
  };
  this.currentDamage = Math.floor(_.random(1, 10) * attackPower);
  console.log("enemy damage amount", this.currentDamage);
  console.log("current hero health before attack", currentHeroHealth(hero));
  hero.hp = (currentHeroHealth(hero) - this.currentDamage);
  console.log("hero hp after attack", hero.hp);
  // this.health should be updated here
  return hero.hp;
};

var heroes = {
    "Obi Wan Kenobi": new Hero ({
      name: "Obi Wan Kenobi",
      hp: 100,
      avatar: "url",
      power: 1.5
    }),
    "Poe Dameron": new Hero ({
      name: "Poe Dameron",
      hp: _.random(80, 95),
      avatar: "url",
      power: 1.25
    }),
    "Luke Skywalker": new Hero({
      name: "Luke Skywalker",
      hp: _.random(70, 90),
      avatar: "url",
      power: 1
    }),
    "Han Solo": new Hero({
      name: "Han Solo",
      hp: _.random(50, 80),
      avatar: "url",
      power: .75
      })
};

var enemies = {
    "Darth Vader": new Enemy ({
      name: "Darth Vader",
      hp: 100,
      avatar: "url",
      power: 1.5
    }),
    "Kylo Ren": new Enemy ({
      name: "Kylo Ren",
      hp: _.random(90, 100),
      avatar: "url",
      power: 1.25
    }),
    "Stormtrooper": new Enemy({
      name: "Stormtrooper",
      hp: _.random(70, 90),
      avatar: "url",
      power: 1
    }),
    "Jabba the Hut": new Hero({
      name: "Jabba the Hut",
      hp: _.random(50, 80),
      avatar: "url",
      power: .75
      })
};


module.exports = {
  enemies: enemies,
  heroes: heroes
};
