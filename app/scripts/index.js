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
  $(document).on('bind-powerhealthbuttons', bindPowerHealthButtons);

});

$(document).on('game:reset', function(){
  location.reload(); // literally refreshes page to dump memoery from object so they start fresh
  $('.random-battle-button').on('click', randomBattleBuilder.bind(null, heroesArray, enemiesArray));
  $('.custom-battle-button').on('click', characterScreenBuilder.bind(null, heroesArray, enemiesArray));
  // reassign click handlers on main menu button
});

// EVENT HANDLERS

function bindButton(){
    $('.attack-button').bind('hero-attack', heroAttack); // sets special listener and trigger on attack button
    $('.attack-button').on('click', function(){ // this bind is bound and unbound when attack is clicked
      $(this).trigger('hero-attack'); // this keeps player from clicking attack over and over
    });
    $('.quit-game-button').on('click', function(){
      var view = new views.StartGameView(); // calls reset game view when quit button is clicked
      view.resetGame();
    });
  }

function unbindButton(){
    $('.attack-button').unbind('hero-attack'); // used to re-enable attack button on your turn
  }

function bindPowerHealthButtons(){
    $('.power-button').bind('powerbutton', boostDamage); // sets special listener and trigger on attack button
    $('.power-button').on('click', function(){ // this bind is bound and unbound when attack is clicked
      $(this).trigger('powerbutton'); // this keeps player from clicking attack over and over
    });
    $('.hp-button').bind('hpboostbutton', healthBoost); // sets special listener and trigger on attack button
    $('.hp-button').on('click', function(){ // this bind is bound and unbound when attack is clicked
      $(this).trigger('hpboostbutton'); // this keeps player from clicking attack over and over
    });
  }

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

//VIEW LISTENERS
//these are listening for document level triggers to display new views

$(document).on('characterscreen:built', function(){ // on custom game, displays character choices
  var view = new views.BuildCharacterScreenView();
  view.chooseYourPlayer(heroesArray, enemiesArray, game);
});

$(document).on('hero:chosen', function(){ // when hero is chosen, go to hero confirmation screen
  var view = new views.BuildCharacterScreenView();
  var hero = game.hero;
  var enemy = game.enemy;
  view.confirmYourPlayer(hero, enemy, game);
});

$(document).on('characterscreen:return', function(){ //if you change mind on hero, display resets on clicking back button
  var view = new views.BuildCharacterScreenView();
  var hero = {};
  var enemy = {};
  view.buildCharacterScreen(heroesArray, enemiesArray, game);
});

$(document).on("hero:confirmed", function(){
  var view = new views.BuildCharacterScreenView(); // when hero choice is confirmed, go to enemy selection screen
  view.chooseYourEnemy(heroesArray, enemiesArray, game);
});

$(document).on("enemy:chosen", function(){
  var view = new views.BuildBattleView(); // starts new battle view with hero and enemy
  view.buildBattle(game.hero, game.enemy);
});

//BATTLE FUNCTIONS

function heroAttack(){ // when hero attacks
  var view = new views.BuildBattleView(); // set view and who the hero and enemy are
  var hero = game.hero,
      enemy = game.enemy;
  unbindButton(); // block attack button from being pressed until enemy has attacked
  hero.calculateDamage(enemy); //calculate how much damage is done to enemy on this turn
  view.showEnemyDamage(hero, enemy); // apply damage to screen with message
  var deadTest = enemy.isDead(hero, enemy); //see if enemy is dead
  if(deadTest === true){
    view.showPreVictory(hero, enemy); //if dead play animation
  }
  setTimeout(enemyAttack, 2000); // else have enemy attack in 2 seconds

}

function enemyAttack(){
  var view = new views.BuildBattleView();// set view and who the hero and enemy are
  var hero = game.hero,
      enemy = game.enemy;
  if(enemy.isDead() === false) {
    enemy.calculateDamage(hero); // calculate damage done to hero and return amount
    view.showHeroDamage(hero, enemy); // print damage amount to screen with message
      var deadTest = hero.isDead(hero, enemy);
      if(deadTest === true){ // if hero is dead
        view.showPreLoss(hero, enemy); // play animations
      }
    bindButton(); // bind button again so attack may be pressed
  }
}

function boostDamage(){ // function for when the power boost attack button is clicked
  var view = new views.BuildBattleView();
  var hero = game.hero;
  var enemy = game.enemy;
  unbindButton(); // diables attack button
  hero.boostDamage(enemy); //calculates powerboost damage
  view.showBoostDamage(hero, enemy); //prints damage to screen
  var deadTest = enemy.isDead(hero, enemy); //see if enemy is dead
  if(deadTest === true){
    view.showPreVictory(hero, enemy); //if dead play animation
  } else {
    $('.power-button').addClass('chosen-already'); //disable power attack button
    $('.power-button').prop('disabled', 'disabled');
  }
  setTimeout(enemyAttack, 2000); // have enemy attack in 2 seconds
}

function healthBoost(){ //HP boost button function
  var view = new views.BuildBattleView();
  var hero = game.hero;
  var enemy = game.enemy;
  hero.boostHpCalculate(hero); //calculate HP boost amount
  view.showBoostHp(hero); // show boosted hp in bar
  $('.hp-button').addClass('chosen-already'); // disable button, but can still attack on this turn
  $('.hp-button').prop('disabled', 'disabled');
}

module.exports = {
  "heroAttack": heroAttack
};
