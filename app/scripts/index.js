var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var models = require('./models.js');
var views = require('./views.js');

var enemiesArray = models.enemies;
var heroesArray = models.heroes;

var game = {
  hero: {},
  enemy: {},
};

$(document).on('ready', function(){
  var view = new views.StartGameView();
  view.startGame();
  $('.random-battle-button').on('click', randomBattleBuilder.bind(null, heroesArray, enemiesArray));
  $('.custom-battle-button').on('click', characterScreenBuilder.bind(null, heroesArray, enemiesArray));
  $(document).on('bind-button', bindButton);
});

$(document).on('game:reset', function(){
  $('.random-battle-button').on('click', randomBattleBuilder.bind(null, heroesArray, enemiesArray));
  $('.custom-battle-button').on('click', characterScreenBuilder.bind(null, heroesArray, enemiesArray));
});

// EVENT HANDLERS

function bindButton(){
    $('.attack-button').bind('hero-attack', heroAttack); // sets special listener and trigger on attack button
    $('.attack-button').on('click', function(){ // this bind is bound and unbound when attack is clicked
      $(this).trigger('hero-attack'); // this keeps player from clicking attack over and over
    });
    console.log('bind');
  }

function unbindButton(){
    $('.attack-button').unbind('hero-attack');
  }

$(document).on('characterscreen:built', function(){
  var view = new views.BuildCharacterScreenView();
  view.chooseYourPlayer(heroesArray, enemiesArray, game);
});

$(document).on('characterscreen:return', function(){
  var view = new views.BuildCharacterScreenView();
  var hero = {};
  var enemy = {};
  view.buildCharacterScreen(heroesArray, enemiesArray, game);
});

$(document).on('hero:chosen', function(){
  var view = new views.BuildCharacterScreenView();
  var hero = game.hero;
  var enemy = game.enemy;
  view.confirmYourPlayer(hero, enemy, game);
});

$(document).on("hero:confirmed", function(){
  console.log(game.hero);
  var view = new views.BuildCharacterScreenView();
  view.chooseYourEnemy(heroesArray, enemiesArray, game);
});

$(document).on("enemy:chosen", function(){
  var view = new views.BuildBattleView(); // starts new battle view with hero and enemy
  view.buildBattle(game.hero, game.enemy);
});


// CONTROLLERS

function randomBattleBuilder(heroesArray, enemiesArray){
  var randomEnemy = _.sample(enemiesArray); //picks random enemy and random hero and assigns them to global object
  var randomHero = _.sample(heroesArray);

  game.hero = randomHero;
  game.enemy = randomEnemy;

  var view = new views.BuildBattleView(); // starts new battle view with hero and enemy
  view.buildBattle(randomHero, randomEnemy);
}

function characterScreenBuilder(heroesArray, enemiesArray){
  var view = new views.BuildCharacterScreenView(); //builds view with all available characters
  view.buildCharacterScreen(heroesArray, enemiesArray);
}

function heroAttack(){ // when hero attacks
  var view = new views.BuildBattleView(); // set view and who the hero and enemy are
  var hero = game.hero,
      enemy = game.enemy;
  unbindButton(); // block attack button from being pressed until enemy has attacked
  hero.calculateDamage(enemy); //calculate how much damage is done on this turn
  view.showEnemyDamage(hero, enemy); // apply damage to screen
  var deadTest = enemy.isDead(); //see if enemy is dead
  if(deadTest === true){
    view.showPreVictory(hero, enemy); //if dead play animation
  }
  setTimeout(enemyAttack, 2000); // else have enemy attack in 2 seconds
}

function enemyAttack(){
  var view = new views.BuildBattleView();// set view and who the hero and enemy are
  var hero = game.hero,
      enemy = game.enemy;
  enemy.calculateDamage(hero);
  view.showHeroDamage(hero, enemy);
    var deadTest = hero.isDead();
    if(deadTest === true){ // if enemy is dead
      view.showPreLoss(hero, enemy); // play animations
    }
  bindButton(); // bind button again so attack may be pressed
}

//listen for character screen trigger


module.exports = {
  "heroAttack": heroAttack
};
