var express = require('express');
var router = express.Router();
var Player = require('../models/playerModel').Player;
var mid = require('../middleware');




/* GET all players listing. */
router.get('/', mid.requiresMod,  function(req, res, next) {
    Player.find({})
    .exec(
      function(err, players)  {
        if(err) return next(err);
        res.json(players);
       
    });
    });




    /*Register a Player */
//router.post('/user/:id/register-player', function(req,res,next){   mid.requiresLogin,
  router.post('/register-player', function(req,res,next){
  //var newPlayer = new Player(req.body);
var newPlayer={
  name:{firstName: req.body.firstName, lastName: req.body.lastName},
  nicName: req.body.nicName,
  playerAge: req.body.age,
  positionPref: req.body.positionPref,
  parent: req.session.userId
}

Player.create(newPlayer, function (err, player) {
  if (err) return next(err);
 res.status(201);
 // return res.redirect('/users/profile');
 return res.json(player);
});




/*
  newPlayer.save(function(err,player){
      if(err) return next(err);
 res.status(201);
        res.json(player);
         
  
  });
*/
  
});

  
  


   /**Get Team Players (roster) */
   router.get('/team', mid.requiresLogin, function(req, res, next) {
    Player.find({team: req.body.teamId})
    //.populate("team")
    .exec(
      function(err, players)  {
        if(err) return next(err);
        //render add player form
        res.json(players);
       
    });
    });

/**Get Parents Players */
router.get('/parent', mid.requiresLogin, function(req, res, next) {
  Player.find({parent: req.session.userId})
  .exec(
    function(err, players)  {
      if(err) return next(err);
      //render add player form and update form
      res.json(players);
     
  });
  });

/**UPDATE PLayer mid.requiresLogin,*/
router.put('/player',  function(req,res,next){
  Player.findByIdAndUpdate({_id: req.body.playerId}, req.body, {new: true})
  .exec(function(err,doc){
    if(err) return next(err);
    res.json(doc);
  });
});

/*
router.put('/player', function(req,res,next){

// Player.findOne({_id:req.body.playerId})
// .exec(function(err,player){
//   if(err) return next(err);

// })
Player.findOneAndUpdate({_id: req.body.playerId}, req.body, {upsert:true, new:true, returnNewDocument : true})
.exec(function(err,doc){
  if(err) return next(err);
  res.json(doc);
})
});
*/
module.exports = router;