var _ = require('underscore');

module.exports = {
  heroes: [
    {
      name: "Obi Wan Kenobi",
      hp: 100,
      avatar: "url",
      power: 1.5
    },
    {
      name: "Luke Skywalker",
      hp: _.random(70, 90),
      avatar: "url",
      power: 1
    },
    {
      name: "Han Solo",
      hp: _.random(50, 80),
      avatar: "url",
      power: .75
    }
  ],
  enemies: [
    {
      name: "Darth Vader",
      hp: 100,
      avatar: "url",
      power: 1.5
    },
    {
      name: "Stormtrooper",
      hp: _.random(70, 90),
      avatar: "url",
      power: 1
    },
    {
      name: "Jabba the Hut",
      hp: _.random(50, 80),
      avatar: "url",
      power: .75
    }
  ]
};
