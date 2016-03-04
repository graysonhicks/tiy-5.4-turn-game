var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var characters = require('./characters.js');
var views = require('./views.js');
console.log(views);

var enemiesArray = characters.enemies;
var heroesArray = characters.heroes;

bindButton();

// EVENT HANDLERS
$('.random-battle-button').on('click', randomBattleBuilder.bind(null, enemiesArray, heroesArray));

$('.attack-button').click(function(){
    $(this).trigger('hero-attack');
    console.log("attack!");
});

function bindButton(){
  $('.attack-button').bind('hero-attack', heroAttack);
  console.log('bind');
}

function unbindButton(){
  $('.attack-button').unbind('hero-attack');
}

function randomBattleBuilder(enemiesArray, heroesArray){
  console.log('click');
  var randomEnemy = _.sample(enemiesArray);
  var randomHero = _.sample(heroesArray);
  var view = new views.BuildBattleView();
  view.buildBattle(randomEnemy, randomHero);
}

function HeroMaker(config){
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
}

function heroAttack(){ //could receive a enemy object
  unbindButton();
  console.log("attack");
  var enemyHealthContainer = $('.enemy-health');
  var enemyNotifications = $('.enemy-notifications');
  var enemyNotificationsListLength = $('.enemy-notifications li').length;
  var currentDamage = calculateDamage();
  var currentEnemyHealth = function(){
    return enemyHealthContainer.html();
  };
  currentEnemyHealth = (currentEnemyHealth() - currentDamage);
  enemyHealthContainer.html(currentEnemyHealth);
  enemyNotifications.append("<li class='list-group-item'>You did " + currentDamage + " damage!</li>");
  setTimeout(enemyAttack, 2000);
}

function enemyAttack(){
  var heroHealthContainer = $('.hero-health');
  var currentHeroHealth = function(){
    return heroHealthContainer.html();
  };
  var currentDamage = calculateDamage();
  currentHeroHealth = (currentHeroHealth() - currentDamage);
  showHeroDamage();
  heroHealthContainer.html(currentHeroHealth);
  bindButton();
}

function calculateDamage(attackPower){ //make this a method on both prototypes
  attackPower = 1.2;
  var damageAmount = Math.floor(_.random(1, 10) * attackPower);
  // this.health should be updated here
  return damageAmount;
}
