var express = require('express');
var router = express.Router();
var Player = require('../models/playerModel').Player;




/* GET all players listing. */
router.get('/', function(req, res, next) {
    Player.find({})
    .exec(
      function(err, players)  {
        if(err) return next(err);
        res.json(players);
       
    });
    });




    /*Register a Player */
//router.post('/user/:id/register-player', function(req,res,next){
  router.post('/register-player', function(req,res,next){
  var newPlayer = new Player(req.body);
  newPlayer.save(function(err,player){
      if(err) return next(err);
      res.status(201);
      res.json(player);
  
  });
  
  });


   /**Get Team Players (roster) */
   router.get('/:teamId', function(req, res, next) {
    Player.find({team: req.params.teamId})
    //.populate("team")
    .exec(
      function(err, players)  {
        if(err) return next(err);
        res.json(players);
       
    });
    });

/**Get Parents Players */
router.get('/parent/:userId', function(req, res, next) {
  Player.find({parent: req.params.userId})
  .exec(
    function(err, players)  {
      if(err) return next(err);
      res.json(players);
     
  });
  });

/**UPDATE PLayer */
router.put('/player/:id', function(req,res,next){
  Player.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .exec(function(err,doc){
    if(err) return next(err);
    res.json(doc);
  });
});



module.exports = router;