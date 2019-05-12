var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = require('../models/teamModel').Team;
var Game = require('../models/gameModel').Game;

/* GET all games. */
router.get('/', function(req, res, next) {
    Game.find({})
       .exec(
        function(err, games)  {
            if(err) return next(err);
            res.json(games);
            
        });
 });

/*Get Team Games / Schedule*/
 router.get('/team/:id', function(req, res, next) {
     var a = req.params.id;
     
       Game.find().or([{homeTeam: a},{awayTeam: a}])
        .exec(
        function(err, games)  {
            if(err) return next(err);
            res.json(games);
            
        });
 });


 
/*Get Wins and Losses for Team*/
/*
router.get('/team/:id/wins-losses', function(req,res,next){
    var a = req.params.id;
    var wins = 0;
    var losses = 0;
    var ats = 0;
    Game.find({homeTeam: req.params.id})
    
      .exec(
           function(err, games){
                if(err) return next(err);

             for(let value of games){
                  if(value.homeTeamScore > value.awayTeamScore){
                       wins +=1
                   }else{losses +=1}
                
                }

    
         
           
           res.json({team: req.params.id ,wins: wins, losses: losses});
           })
        
   
          


});

*/

/*
router.get('/team/:id/wins-losses', function(req,res,next){
    var a = req.params.id;
      
    Game.find().or([{homeTeam: a},{awayTeam: a}])
     .exec(
     function(err, games)  {
         if(err) return next(err);
       
      id = req.params.id
       var wins = 0;
       var losses = 0;


       for(let game of games){
           if(game.homeTeam == id){
                if(game.homeTeamScore > game.awayTeamScore){
                    wins +=1;
                }else{losses +=1}
           }else if(game.awayTeam == id){
                if(game.awayTeamScore > game.homeTeamScore){
                    wins+=1;
                }else{losses +=1;}
           }

       }
       
         res.json({team: req.params.id ,wins: wins, losses: losses});
    });
    

});

*/






 /*Post a new game */
 router.post('/', function(req,res,next){
    var game = new Game(req.body);

    game.save(function(err, game){
        if(err) return next(err);
        res.status(201);
        res.json(game);
    });
});



/*update game */
router.put('/game/:id',function(req,res,next){
 
    var newData = req.body;

    Game.findById(req.params.id)
    .exec(function(err,doc){
        if(err) return next(err);
        doc.update(newData, {new: true})
            .exec(function(err,savedDoc){
            if(err) return next(err);
            res.status(201);
            res.json(doc);
        });
    });

});











module.exports = router;