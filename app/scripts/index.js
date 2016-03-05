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

function randomBattleBuilder(heroesArray, enemiesArray){
  var randomEnemy = _.sample(enemiesArray);
  var randomHero = _.sample(heroesArray);
  // game.hero = randomHero;
  game.hero = randomHero;
  game.enemy = randomEnemy;

  var view = new views.BuildBattleView();
  view.buildBattle(randomHero, randomEnemy);
}

function characterScreenBuilder(heroesArray, enemiesArray){
  var view = new views.BuildCharacterScreenView();
  view.buildCharacterScreen(heroesArray, enemiesArray);
}


// $(document).trigger("post:fetch", [post]);

function heroAttack(){ //could receive a enemy object
  var view = new views.BuildBattleView();
  var hero = game.hero,
      enemy = game.enemy;
  unbindButton();
  hero.calculateDamage(enemy);
  view.showEnemyDamage(hero, enemy);
  var deadTest = enemy.isDead();
  if(deadTest === true){
    view.showPreVictory(hero, enemy);
    setTimeout(views.ShowVictoryScreen(hero, enemy), 2000);
    clearTimeout(enemyAttack);
  }
  setTimeout(enemyAttack, 2000);
}

function enemyAttack(){
  var view = new views.BuildBattleView();
  var hero = game.hero,
      enemy = game.enemy;
  enemy.calculateDamage(hero);
  view.showHeroDamage(hero, enemy);
    var deadTest = hero.isDead();
    if(deadTest === true){
      view.showPreLoss(hero, enemy);
      setTimeout(views.ShowLossScreen(hero, enemy), 2000);
      clearTimeout(enemyAttack);
    }
  bindButton();
}



module.exports = {
  "heroAttack": heroAttack
};
