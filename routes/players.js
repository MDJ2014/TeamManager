var express = require('express');
var router = express.Router();
var Player = require('../models/playerModel').Player;




/* GET users listing. */
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
      
      User.findById(req.body.userId, function(err,user){
        if(err) return next(err);
        user.players.push(player._id);
        user.save(function(err,doc){
            if(err) return next(err);
              res.status(201);
              res.json(doc);
        });  
        });
      
  });
  
  });




   





module.exports = router;