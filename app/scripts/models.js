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
  var attackPower = this.power; //gets players attack power multiplier
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

Hero.prototype.isActive = false;

var heroes = {
    "ObiWanKenobi": new Hero ({
      name: "Obi Wan Kenobi",
      id: "ObiWanKenobi",
      hp: 100,
      avatar: "images/obi.png",
      power: 1.5
    }),
    "PoeDameron": new Hero ({
      name: "Poe Dameron",
      id: "PoeDameron",
      hp: _.random(80, 95),
      avatar: "images/poe.png",
      power: 1.25
    }),
    "LukeSkywalker": new Hero({
      name: "Luke Skywalker",
      id: "LukeSkywalker",
      hp: _.random(70, 90),
      avatar: "images/luke.png",
      power: 1
    }),
    "HanSolo": new Hero({
      name: "Han Solo",
      id: "HanSolo",
      hp: _.random(50, 80),
      avatar: "images/han.png",
      power: .75
      })
};

// ENEMIES

Enemy.prototype.calculateDamage = function(hero){ //make this a method on both prototypes
  var attackPower = this.power;
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

var enemies = {
    "DarthVader": new Enemy ({
      name: "Darth Vader",
      id: "DarthVader",
      hp: 100,
      avatar: "images/vader.png",
      power: 1.5
    }),
    "KyloRen": new Enemy ({
      name: "Kylo Ren",
      id: "KyloRen",
      hp: _.random(90, 100),
      avatar: "images/kylo.png",
      power: 1.25
    }),
    "Stormtrooper": new Enemy({
      name: "Stormtrooper",
      id: "Stormtrooper",
      hp: _.random(70, 90),
      avatar: "images/trooper.png",
      power: 1
    }),
    "JabbatheHut": new Enemy({
      name: "Jabba the Hut",
      id: "JabbatheHut",
      hp: _.random(50, 80),
      avatar: "images/jabba.png",
      power: .75
      })
};

module.exports = {
  enemies: enemies,
  heroes: heroes
};
