var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = require('../models/teamModel').Team;
var Game = require('../models/gameModel').Game;
var mid = require('../middleware');





/* GET all games. */
router.get('/', function(req, res, next) {
    Game.find({})
       .exec(
        function(err, games)  {
            if(err) return next(err);
            //render post new game form for admin
            res.json(games);
            
        });
 });

/*Get Team Games / Schedule   , mid.requiresLogin        */
 router.get('/team/:id', function(req, res, next) {
    // var a = req.body.teamId;
     var teamId = req.params.id;
       Game.find().or([{homeTeam: teamId},{awayTeam: teamId}])
       .populate({ path: 'homeTeam', select: 'teamName'})
       .populate({path: 'awayTeam',select:'teamName'})
        .exec(
        function(err, games)  {
            if(err) return next(err);
            res.status(200);
            res.json(games);
            //render update form
        });
 });


 

 /*Post a new game , mid.requiresMod, */
 router.post('/' ,function(req,res,next){
    var game = new Game(req.body);

    game.save(function(err, game){
        if(err) return next(err);
        res.status(201);
        res.json(game);
    });
});



/*update game , mid.requiresMod*/
router.put('/game/:id', function(req,res,next){
 
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