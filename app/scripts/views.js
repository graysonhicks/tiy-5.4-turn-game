var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var jqueryui = require('jquery-ui');


function flashDamage(element, color){
  $(element).last().effect("highlight", {
    color: color
  }, 750);
  console.log("red");
}

function StartGameView(){}

StartGameView.prototype.startGame = function(){
  var startGameViewSource = $("#main-start-screen-template").html();
  var startGameViewTemplate = handlebars.compile(startGameViewSource);
  var startGameViewRenderedTemplate = startGameViewTemplate();
  $('.main-content').append(startGameViewRenderedTemplate);

};

StartGameView.prototype.resetGame = function(){
  var startGameViewSource = $("#main-start-screen-template").html();
  var startGameViewTemplate = handlebars.compile(startGameViewSource);
  var startGameViewRenderedTemplate = startGameViewTemplate();
  $('.main-content').html(startGameViewRenderedTemplate);

};


function BuildBattleView(){}

BuildBattleView.prototype.buildBattle = function(hero, enemy){
  var battleViewSource = $("#battle-screen-template").html();
  var battleViewTemplate = handlebars.compile(battleViewSource);
  var battleViewRenderedTemplate = battleViewTemplate({
    "hero": hero,
    "enemy": enemy
  });
  $('.main-content').html(battleViewRenderedTemplate);
  $(document).trigger("bind-button");
};

BuildBattleView.prototype.showEnemyDamage = function (hero, enemy){
  var enemyHealthContainer = $('.enemy-health');
  var enemyNotifications = $('.enemy-notifications');
  var enemyNotificationsListLength = $('.enemy-notifications li').length;
  if(enemyNotificationsListLength < 3) {
    enemyNotifications.append("<li class='list-group-item'>You did " + hero.currentDamage + " damage to " + enemy.name + "!</li>");
  } else {
    $('.enemy-notifications li').first().remove();
    enemyNotifications.append("<li class='list-group-item'>You did " + hero.currentDamage + " damage to " + enemy.name + "!</li>");
  }
  flashDamage('.enemy-notifications li', "#006DA8");
  $('.enemy-image').effect("shake");
  enemyHealthContainer.html(enemy.hp);
};

BuildBattleView.prototype.showHeroDamage = function (hero, enemy){
  var heroHealthContainer = $('.hero-health');
  var heroNotifications = $('.hero-notifications');
  var heroNotificationsListLength = $('.hero-notifications li').length;
  if(heroNotificationsListLength < 3) {
    heroNotifications.append("<li class='list-group-item'>" + enemy.name + " did " + enemy.currentDamage + " damage to you!</li>");
  } else {
    $('.hero-notifications li').first().remove();
    heroNotifications.append("<li class='list-group-item'>" + enemy.name + " did " + enemy.currentDamage + " damage to you!</li>");
  }
  flashDamage('.hero-notifications li', "#FA4F1E");
  $('.hero-image').effect("shake");
  heroHealthContainer.html(hero.hp);
};

BuildBattleView.prototype.showPreVictory = function (hero, enemy){
  $('.enemy-health').html(0);
  $('.enemy-image').effect("shake", {times: 40});
  $('.enemy-image').effect("explode", {pieces: 25}, 1000);
};

BuildBattleView.prototype.showPreLoss = function (hero, enemy){
  $('.hero-health').html(0);
  $('.hero-image').effect("shake", {times: 40});
  $('.hero-image').effect("explode", {pieces: 25}, 1000);
};

function BuildCharacterScreenView(){}

BuildCharacterScreenView.prototype.buildCharacterScreen = function(heroes, enemies){
  console.log(enemies);
  var BuildCharacterScreenViewSource = $("#character-screen-template").html();
  var BuildCharacterScreenViewTemplate = handlebars.compile(BuildCharacterScreenViewSource);
  var BuildCharacterScreenViewRenderedTemplate = BuildCharacterScreenViewTemplate({
    "heroes": heroes,
    "enemies": enemies
  });

  $('.main-content').html(BuildCharacterScreenViewRenderedTemplate);
};

function ShowVictoryScreen(hero, enemy){
  var ShowVictoryScreenSource = $("#victory-screen-template").html();
  var ShowVictoryScreenTemplate = handlebars.compile(ShowVictoryScreenSource);
  var ShowVictoryScreenRenderedTemplate = ShowVictoryScreenTemplate({
      "hero": hero,
      "enemy": enemy
  });
  $('.main-content').html(ShowVictoryScreenRenderedTemplate);
  $('.main-menu-button').click(function(){
    var view = new StartGameView();
    view.resetGame();
  });
}

function ShowLossScreen(hero, enemy){
  var ShowLossScreenSource = $("#loss-screen-template").html();
  var ShowLossScreenTemplate = handlebars.compile(ShowLossScreenSource);
  var ShowLossScreenRenderedTemplate = ShowLossScreenTemplate({
      "hero": hero,
      "enemy": enemy
  });
  $('.main-content').html(ShowLossScreenRenderedTemplate);
  $('.main-menu-button').click(function(){
      var view = new StartGameView();
      view.resetGame();
  });
}

module.exports = {
  "ShowLossScreen": ShowLossScreen,
  "ShowVictoryScreen": ShowVictoryScreen,
  "BuildCharacterScreenView": BuildCharacterScreenView,
  "StartGameView": StartGameView,
  "BuildBattleView": BuildBattleView
};
