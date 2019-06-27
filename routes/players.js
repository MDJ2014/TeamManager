var express = require('express');
var router = express.Router();
var Player = require('../models/playerModel').Player;
var User = require('../models/userModel').User;
var mid = require('../middleware');
var Team = require('../models/teamModel').Team;




/* GET all players listing. , mid.requiresMod*/
router.get('/',  function(req, res, next) {
    Player.find({})
    .populate({ path: 'parent', select: 'name'})
    .populate({ path: 'team', select: 'teamName' })
    .sort({"name.lastName": 1})
    .exec(function(err, players)  {
        if(err) return next(err);
        res.json(players);
       
    });
    });



/**GET Players by age */
router.get('/:age',  function(req, res, next) {
  Player.find( { playerAge: { $eq: req.params.age } })
 // Player.find( { $and: [ { playerAge: { $eq: req.params.age } }, { team: { $exists: false } } ] } )
  .sort({"name.lastName": 1})
  .exec(function(err, players)  {
    
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

/**Get Parents Players         req.session.userId*/
router.get('/parent', mid.requiresLogin, function(req, res, next) {
  Player.find({parent: req.body.parentId})
  .exec(
    function(err, players)  {
      if(err) return next(err);
      //render add player form and update form
      res.json(players);
     
  });
  });




/**UPDATE PLayer mid.requiresLogin,*/
router.put('/player',  function(req,res,next){
  Player.findByIdAndUpdate({_id: req.body.playerId}, req.body.newPlayerData, {new: true})
  .exec(function(err,doc){
    if(err) return next(err);
    res.json(doc);
  });
});


router.delete('/player',  function(req,res,next){
  Player.findByIdAndDelete({_id: req.body.playerId})
  .exec(function(err,doc){
    if(err) return next(err);
    res.json(doc);
  });
});




module.exports = router;