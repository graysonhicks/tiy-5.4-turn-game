var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');



function StartGameView(){}

StartGameView.prototype.startGame = function(){
  var startGameViewSource = $("#main-start-screen-template").html();
  var startGameViewTemplate = handlebars.compile(startGameViewSource);
  var startGameViewRenderedTemplate = startGameViewTemplate();

  $('.main-content').append(startGameViewRenderedTemplate);
};

function BuildBattleView(){}

BuildBattleView.prototype.buildBattle = function(enemy, hero){
  var battleViewSource = $("#battle-screen-template").html();
  var battleViewTemplate = handlebars.compile(battleViewSource);
  var battleViewRenderedTemplate = battleViewTemplate({
    "enemy": enemy,
    "hero": hero
  });
  $('.main-content').html(battleViewRenderedTemplate);
  $(document).trigger("bind-button");
};


function BuildCharacterScreenView(){}

BuildCharacterScreenView.prototype.buildCharacterScreen = function(enemies, heroes){
  console.log(enemies);
  var BuildCharacterScreenViewSource = $("#character-screen-template").html();
  var BuildCharacterScreenViewTemplate = handlebars.compile(BuildCharacterScreenViewSource);
  var BuildCharacterScreenViewRenderedTemplate = BuildCharacterScreenViewTemplate({
    "enemies": enemies,
    "heroes": heroes
  });

  $('.main-content').html(BuildCharacterScreenViewRenderedTemplate);
};

function calculateDamage(attackPower){ //make this a method on both prototypes
  attackPower = 1.2;
  var damageAmount = Math.floor(_.random(1, 10) * attackPower);
  // this.health should be updated here
  return damageAmount;
}

function ShowHeroDamage(){
  var heroHealthContainer = $('.hero-health');
  var currentHeroHealth = function(){
    return heroHealthContainer.html();
  };
  var currentDamage = calculateDamage();
  currentHeroHealth = (currentHeroHealth() - currentDamage);
  var heroNotifications = $('.hero-notifications');
  var heroNotificationsListLength = $('.hero-notifications li').length;
  if(heroNotificationsListLength < 3) {
    heroNotifications.append("<li class='list-group-item'>The enemy did " + currentDamage + " damage to you!</li>");
  } else {
    $('.hero-notifications li').first().remove();
    heroNotifications.append("<li class='list-group-item'>The enemy did " + currentDamage + " damage to you!</li>");
  }
  heroHealthContainer.html(currentHeroHealth);
}

function ShowEnemyDamage(){
  var enemyHealthContainer = $('.enemy-health');
  var currentEnemyHealth = function(){
    return enemyHealthContainer.html();
  };
  var currentDamage = calculateDamage();
  currentEnemyHealth = (currentEnemyHealth() - currentDamage);
  var enemyNotifications = $('.enemy-notifications');
  var enemyNotificationsListLength = $('.enemy-notifications li').length;
  if(enemyNotificationsListLength < 3) {
    enemyNotifications.append("<li class='list-group-item'>You did " + currentDamage + " damage to the enemy!</li>");
  } else {
    $('.enemy-notifications li').first().remove();
    enemyNotifications.append("<li class='list-group-item'>You did " + currentDamage + " damage to the enemy!</li>");
  }
  enemyHealthContainer.html(currentEnemyHealth);
}

module.exports = {
  "BuildCharacterScreenView": BuildCharacterScreenView,
  "ShowEnemyDamage": ShowEnemyDamage,
  "ShowHeroDamage": ShowHeroDamage,
  "StartGameView": StartGameView,
  "BuildBattleView": BuildBattleView
};
