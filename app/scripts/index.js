var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');


bindButton();

$('.attack-button').click(function(){
    $(this).trigger('hero-attack');
});

function bindButton(){
  $('.attack-button').bind('hero-attack', heroAttack);
}

function unbindButton(){
  $('.attack-button').unbind('hero-attack');
}

function heroAttack(){
  unbindButton();
  var enemyHealthContainer = $('.enemy-health');
  var enemyNotifications = $('.enemy-notifications');
  var currentDamage = attackDamage();
  var currentEnemyHealth = function(){
    return enemyHealthContainer.html();
  }
  currentEnemyHealth = (currentEnemyHealth() - currentDamage);
  enemyHealthContainer.html(currentEnemyHealth);
  enemyNotifications.append("<li class='list-group-item'>You did " + currentDamage + " damage!</li>")
  setTimeout(enemyAttack, 2000);
}

function enemyAttack(){
  var heroHealthContainer = $('.hero-health');
  var heroNotifications = $('.hero-notifications');
  var currentDamage = attackDamage();
  var currentHeroHealth = function(){
    return heroHealthContainer.html();
  }
  currentHeroHealth = (currentHeroHealth() - currentDamage);
  heroHealthContainer.html(currentHeroHealth);
  heroNotifications.append("<li class='list-group-item'>The enemy did " + currentDamage + " damage to you!</li>")
  bindButton();
}

function attackDamage(attackPower){
  attackPower = 1.2;
  var damageAmount = Math.floor(_.random(1, 10) * attackPower);
  return damageAmount;
}
