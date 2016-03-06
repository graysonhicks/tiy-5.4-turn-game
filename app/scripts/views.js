var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');
var jqueryui = require('jquery-ui');

function flashDamage(element, color){
  $(element).last().effect("highlight", {
    color: color
  }, 750);
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
  $(document).trigger('game:reset');
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

  enemyNotifications.html("<li class='list-group-item'>You did " + hero.currentDamage + " damage to " + enemy.name + "!</li>");

  flashDamage('.enemy-notifications li', "#006DA8");
  $('.enemy-image').effect("shake");
  $('.enemy-health').css('width', enemy.hp+'%').attr('aria-valuenow', enemy.hp); 
  enemyHealthContainer.html(enemy.hp);
};

// change hero and enemy to victim and attacker
BuildBattleView.prototype.showHeroDamage = function (hero, enemy){
  var heroHealthContainer = $('.hero-health');
  var heroNotifications = $('.hero-notifications');
  var heroNotificationsListLength = $('.hero-notifications li').length;

  heroNotifications.html("<li class='list-group-item'>" + enemy.name + " did " + enemy.currentDamage + " damage to you!</li>");

  flashDamage('.hero-notifications li', "#FA4F1E");
  $('.hero-image').effect("shake");
  $('.hero-health').css('width', hero.hp+'%').attr('aria-valuenow', hero.hp);
  heroHealthContainer.html(hero.hp);
};

BuildBattleView.prototype.showPreVictory = function (hero, enemy){
  $('.enemy-health').html(0);
  $('.enemy-image').effect("shake", {times: 40});
  $('.enemy-image').effect("explode", {pieces: 25}, 1000);
  $('.enemy-image').promise().done(function(){
    ShowVictoryScreen(hero, enemy);
  });
};


BuildBattleView.prototype.showPreLoss = function (hero, enemy){

  $('.hero-health').html(0);
  $('.hero-image').effect("shake", {times: 40});
  $('.hero-image').effect("explode", {pieces: 25}, 1000);
  $('.hero-image').promise().done(function(){
    ShowLossScreen(hero, enemy);
  });
};

function BuildCharacterScreenView(){}

BuildCharacterScreenView.prototype.buildCharacterScreen = function(heroes, enemies){
  var BuildCharacterScreenViewSource = $("#character-screen-template").html();
  var BuildCharacterScreenViewTemplate = handlebars.compile(BuildCharacterScreenViewSource);
  var BuildCharacterScreenViewRenderedTemplate = BuildCharacterScreenViewTemplate({
    "heroes": heroes,
    "enemies": enemies
  });

  $('.main-content').html(BuildCharacterScreenViewRenderedTemplate);
  //screen built trigger
  $(document).trigger("characterscreen:built");
};

BuildCharacterScreenView.prototype.chooseYourPlayer = function(heroesArray, enemiesArray, game){
  $('.character-choice').click(function(){
    var id = $(this).attr("id"); // set hero to character that is clicked
    game.hero = heroesArray[id] || enemiesArray[id];
    // $(this).siblings('li').not(this).toggle(400);
    // $(this).closest('.character-list').siblings('.character-list').not($(this).parents()).toggle(400);
    // $(this).toggleClass('center-block');
    $(document).trigger('hero:chosen');
    return game.hero;
  });
};

BuildCharacterScreenView.prototype.confirmYourPlayer = function(hero, enemy, game){
    var confirmViewSource = $("#confirm-screen-template").html();
    var confirmViewTemplate = handlebars.compile(confirmViewSource);
    var confirmViewRenderedTemplate = confirmViewTemplate({
      "hero": hero,
      "enemy": enemy
    });
    $('.main-content').html(confirmViewRenderedTemplate);
    var checkbox = $(this).find('.checkmark'); // toggle checkbox when clicked
    checkbox.addClass('showcheck');
    $('.back-button').on('click', function(){
      $(document).trigger('characterscreen:return');
    });
    $('.confirm-button').on('click', function(){
      $(document).trigger('hero:confirmed');
    });
};

BuildCharacterScreenView.prototype.chooseYourEnemy = function(heroes, enemies, game){
  var BuildCharacterScreenViewSource = $("#character-screen-template").html();
  var BuildCharacterScreenViewTemplate = handlebars.compile(BuildCharacterScreenViewSource);
  var BuildCharacterScreenViewRenderedTemplate = BuildCharacterScreenViewTemplate({
    "heroes": heroes,
    "enemies": enemies
  });

  $('.main-content').html(BuildCharacterScreenViewRenderedTemplate);
  var characterList = $('.character-choice')
  _.each(characterList, function(item){
    console.log(item);
      if($(item).attr("id") == game.hero.id){
        $(item).addClass('chosen-already');
        $(this).prop('disabled', 'disabled');
      }
    });
  $('.character-choice').click(function(){
    var id = $(this).attr("id"); // set enemy to character that is clicked
    game.enemy = heroes[id] || enemies[id];
    $(document).trigger('enemy:chosen');
    console.log(game.enemy);
    return game.enemy;
  });
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
