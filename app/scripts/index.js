var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var models = require('./models.js');
var views = require('./views.js');

var enemiesArray = models.enemies;
var heroesArray = models.heroes;
// var game = {
//   hero: {},
//   enemy: {},
//   level: 1
// }

// EVENT HANDLERS
$('.random-battle-button').on('click', randomBattleBuilder.bind(null, enemiesArray, heroesArray));
$('.custom-battle-button').on('click', characterScreenBuilder.bind(null, enemiesArray, heroesArray));

$(document).on('bind-button', bindButton);

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

function randomBattleBuilder(enemiesArray, heroesArray){
  var randomEnemy = _.sample(enemiesArray);
  var randomHero = _.sample(heroesArray);
  // game.hero = randomHero;

  var view = new views.BuildBattleView();
  view.buildBattle(randomEnemy, randomHero);
}

function characterScreenBuilder(enemiesArray, heroesArray){
  var view = new views.BuildCharacterScreenView();
  view.buildCharacterScreen(enemiesArray, heroesArray);
}


$(document).trigger("post:fetch", [post]);

function heroAttack(){ //could receive a enemy object
  // var hero = game.hero,
  //     enemy = game.enemy;
  //
  // var inflict = enemy.calculateDamage();
  // hero.health -= inflict;

  unbindButton();
  views.ShowEnemyDamage();
  setTimeout(enemyAttack, 2000);
}

function enemyAttack(){
  //var view = views.ShowHeroDamage();
  //view.showDamage;
  views.ShowHeroDamage();
  bindButton();
}



module.exports = {
  "heroAttack": heroAttack
};
