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
  console.log("view enemy:", enemy);
  console.log("view hero", hero);
  var battleViewSource = $("#battle-screen-template").html();
  var battleViewTemplate = handlebars.compile(battleViewSource);
  var battleViewRenderedTemplate = battleViewTemplate({
    "enemy": enemy,
    "hero": hero
  });

  $('.main-content').html(battleViewRenderedTemplate);
};


function ShowHeroDamage(){
  var heroNotifications = $('.hero-notifications');
  var heroNotificationsListLength = $('.hero-notifications li').length;
  if(heroNotificationsListLength < 3) {
    heroNotifications.append("<li class='list-group-item'>The enemy did " + 6 + " damage to you!</li>");
  } else {
    $('.hero-notifications li').first().remove();
    heroNotifications.append("<li class='list-group-item'>The enemy did " + 8 + " damage to you!</li>");
  }
}

module.exports = {
  "ShowHeroDamage": ShowHeroDamage,
  "StartGameView": StartGameView,
  "BuildBattleView": BuildBattleView
};
