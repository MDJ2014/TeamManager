var express = require('express');
var router = express.Router();

var Team = require('../models/teamModel').Team;
var Player = require('../models/playerModel').Player;
var TeamMessage = require('../models/teamMessages').TeamMessage;

/* GET team listing. */
router.get('/', function(req, res, next) {
    Team.find({})
    .populate("messages")
     .exec(
        function(err, teams)  {
            if(err) return next(err);
            res.json(teams);
            //res.render('teams',teams)
        });
 });

 /*Post a new team */
router.post('/', function(req,res,next){
    var team = new Team(req.body);

    team.save(function(err, team){
        if(err) return next(err);
        res.status(201);
        res.json(team);
    });
});

/*GET specific team */
router.get('/team/:id',function(req,res,next){
Team.findById(req.params.id)
.populate('messages').populate('players','name')
.exec(function(err,doc){
    if(err) return next(err);
    res.status(201);
    res.json(doc);
})
});



/*update team */
router.put('/team/:id',function(req,res,next){
    var team = req.params.id;
    var newData = req.body;


    Team.findOneAndUpdate(team, newData, {"new":true})
    .exec(
        function(err, doc){
            if(err) return next(err);
            res.status(201);
            res.json(doc);
        }
    )
});

/*Get a teams messages*/
router.get('/team/:id/message', function(req,res,next){
    Team.findById(req.params.id)
    .populate('messages')
    .exec(function(err,team){
        if(err) return next(err);
        var messages = team.messages;
        res.status(201);
        res.json(messages);
    })
});

/*Update Team message*/
router.put('/team/:id/message', function(req,res,next){
var team = req.params.id;
    var message = {"title": req.body.title, "body": req.body.body, "author": req.body.author, "date": req.body.date, "team": team}
 

var newMessage = new TeamMessage(req.body);
newMessage.save(function(err,msg){
    if(err) return next(err);
    Team.findById(req.params.id, function(err,team){
        if(err) return next(err);
        team.messages.push(msg._id);
        team.save(function(err,doc){
            if(err) return next(err);
            res.status(201);
            res.json(doc);
        });

    });
});

});


/**Get Add Player Form */
router.get('/team/:id/build-roster',function(req,res,next){
Team.findById(req.params.id, function(err,team){
    if(err) return next(err);

    var query = Player.find({});
    query.and([{ 'team': null }, { playerAge: team.ageGroup }])
    .exec(
        function(err,doc){
            if(err) return next(err);
            res.status(201);
            res.json(doc);
        });

    
});


});



/**Add player to team */
router.put('/team/:id/add-to-roster/:playerId',function(req,res,next){
    
    Team.findById(req.params.id,function(err,team){
        if(err) return next(err);
         team.players.push(req.params.playerId) ;
        team.save(function(err,doc){
            if(err) return next(err);
  Player.findById(req.params.playerId, function(err,player){
            if(err) return next(err);
             player.team = req.params.id
            player.save(function(err,doc){
                   if(err) return next(err);
        res.status(201);
        res.json(team);
            }) ;         
        });
        });
    });
    
});







module.exports = router;