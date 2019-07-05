var express = require('express');
var router = express.Router();
var Player = require('../models/playerModel').Player;
var User = require('../models/userModel').User;
var mid = require('../middleware');
var Team = require('../models/teamModel').Team;




/* GET all players listing. , mid.requiresMod*/
router.get('/', function (req, res, next) {
  Player.find({})
    .populate({ path: 'parent', select: 'name' })
    .populate({ path: 'team', select: 'teamName' })
    .sort({ "name.lastName": 1 })
    .exec(function (err, players) {
      if (err) return next(err);
      res.json(players);

    });
});



/**GET Players by age */
router.get('/:age', function (req, res, next) {
  Player.find({ playerAge: { $eq: req.params.age } })

    .sort({ "name.lastName": 1 })
    .exec(function (err, players) {

      if (err) return next(err);
      res.json(players);

    });
});












/*Register a Player */

router.post('/register-player', function (req, res, next) {

  var newPlayer = {
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    nicName: req.body.nicName,
    playerAge: req.body.age,
    positionPref: req.body.positionPref,
    parent: req.session.userId
  }

  Player.create(newPlayer, function (err, player) {
    if (err) return next(err);
    res.status(201);

    return res.json(player);
  });





});





/**Get Team Players (roster) */
router.get('/team', mid.requiresLogin, function (req, res, next) {
  Player.find({ team: req.body.teamId })

    .exec(
      function (err, players) {
        if (err) return next(err);

        res.json(players);

      });
});

/**Get Parents Players         req.session.userId*/
router.get('/parent', mid.requiresLogin, function (req, res, next) {
  Player.find({ parent: req.body.parentId })
    .exec(
      function (err, players) {
        if (err) return next(err);

        res.json(players);

      });
});




/**UPDATE PLayer mid.requiresLogin,*/
router.put('/player',mid.requiresLogin, function (req, res, next) {
  Player.findByIdAndUpdate({ _id: req.body.playerId }, req.body.newPlayerData, { new: true })
    .exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
});


router.delete('/player', mid.requiresAdmin, function (req, res, next) {
  Player.findByIdAndDelete({ _id: req.body.playerId })
    .exec(function (err, doc) {
      if (err) return next(err);
      res.json(doc);
    });
});




module.exports = router;