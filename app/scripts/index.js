var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var models = require('./models.js');
var views = require('./views.js');

var enemiesArray = models.enemies;
var heroesArray = models.heroes;



// EVENT HANDLERS
$('.random-battle-button').on('click', randomBattleBuilder.bind(null, enemiesArray, heroesArray));


$(document).on('bind-button', bindButton);

function bindButton(){
    $('.attack-button').bind('hero-attack', heroAttack);
    $('.attack-button').on('click', function(){
      $(this).trigger('hero-attack');
    });
    console.log('bind');
  }

function unbindButton(){
    $('.attack-button').unbind('hero-attack');
  }


function randomBattleBuilder(enemiesArray, heroesArray){

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
  views.ShowEnemyDamage();
  setTimeout(enemyAttack, 2000);
}

function enemyAttack(){
  views.ShowHeroDamage();
  bindButton();
}



module.exports = {
  "heroAttack": heroAttack
};
