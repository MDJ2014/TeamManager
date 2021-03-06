var express = require('express');
var router = express.Router();
var User = require('../models/userModel').User;
var Team = require('../models/teamModel').Team;
var Message = require('../models/messgeModel').Message;
var Player = require('../models/playerModel').Player;
var Game = require('../models/gameModel').Game;
var mid = require('../middleware');



/* GET all teams.*/
router.get('/' , mid.requiresLogin, function (req, res, next) {
    Team.find({})
        .exec(
            function (err, teams) {
                if (err) return next(err);
                res.status(200);
                res.json(teams);

            });
});



        
          
    
      





/** GET Teams by Age group*/
router.get('/ageGroup/:age', mid.requiresLogin, function (req, res, next) {
    Team.find({ ageGroup: req.params.age })
        .exec(
            function (err, teams) {
                if (err) return next(err);
                res.status(200);
                res.json(teams);

            });
});







/*Post a new team  mid.requiresMod*/
router.post('/', mid.requiresMod, function (req, res, next) {
    var completeTeamName = req.body.teamName + "-" + req.body.ageGroup;
    var newTeam = {
        teamName: completeTeamName,
        ageGroup: req.body.ageGroup,
        logo: req.body.logo
    }


    var team = new Team(newTeam);
    team.save(function (err, team) {
        if (err) return next(err);
        res.status(201);
        res.json(team);
    });
});





/*GET team ranking*/
router.get('/rankings', mid.requiresLogin, function (req, res, next) {
    Team.find({})
        .sort({ wins: "desc" })
        .exec(function (err, docs) {
            if (err) return next(err);
            res.status(200);
            res.json(docs);
        })

});




/**GET specific team */
router.get('/team/:id', mid.requiresLogin, function (req, res, next) {
    let teamData = {
        teamId: req.params.id,
        teamInfo: "",
        messages: "",
        games: ""
    }

    Team.findById(req.params.id)
        .populate("coaches roster")
        .exec(function (err, doc) {
            if (err) return next(err);
            teamData.teamInfo = doc;

            var teamId = req.params.id;
            Game.find().or([{ homeTeam: teamId }, { awayTeam: teamId }])
                .populate('homeTeam', 'teamName')
                .populate('awayTeam', 'teamName')
                .exec(function (err, gameDoc) {
                    if (err) return next(err);
                    teamData.games = gameDoc;

                    Message.find(

                        {
                            $or: [
                                { "team": { "$in": teamId } },
                                { "universal": { "$in": true } }
                            ]
                        }
                    )
                        .exec(function (err, messageDoc) {
                            if (err) return next(err);
                            teamData.messages = messageDoc;
                            res.status(201);
                            res.json(teamData);


                        });






                });




        });



});






/*Get players*/
router.get('/roster/:teamId', mid.requiresLogin, function (req, res, next) {
    Team.find({ _id: req.params.teamId }, { roster: 1 })
        .populate("roster")
        .exec(
            function (err, players) {
                if (err) return next(err);
                var x = players[0].roster;
                res.status(200);
                res.json(x);

            });
});





/*update team , mid.requiresMod*/
router.put('/team/update',mid.requiresMod, function (req, res, next) {

    var newData = req.body;


    Team.findById(req.body.teamId)


        .exec(function (err, doc) {
            if (err) return next(err);


            var newInfo = {
                teamName: req.body.newTeamInfo.teamName,
                logo: req.body.newTeamInfo.logo,
                ageGroup: req.body.newTeamInfo.ageGroup
            }

            doc.update(newInfo, function (err, savedDoc) {
                if (err) return next(err);
                res.status(200);
                res.json(savedDoc);
            });
        });

});





router.delete('/team/delete',mid.requiresMod, function (req, res, next) {
    Team.findByIdAndDelete(req.body.teamId, function (err, doc) {
        if (err) return next(err);

        res.status(200);
        res.json(doc);
    });
});





/*Assign Player to team */
router.put('/assign-players',mid.requiresMod, function (req, res, next) {

    var players = req.body.players;


    Team.findByIdAndUpdate({ _id: req.body.teamId },
        { $push: { "roster": { $each: players } } })
        .exec(function (err, doc) {
            if (err) return next(err);


            Player.updateMany({
                "_id": {
                    "$in":
                        req.body.players
                }
            }, { $set: { "team": req.body.teamId } })
                .exec(function (err, doc) {
                    if (err) return next(err);


                    res.status(201);
                    res.json(doc);
                })

        })



});





router.put('/delete-player',mid.requiresMod, function (req, res, next) {

    var players = req.body.players;


    Player.findById({ "_id": req.body.playerId })
        .exec(function (err, doc) {
            if (err) return next(err);
            doc.update({ $set: { "team": null } })
                .exec(function (err, doc) {
                    if (err) return next(err);
                    Team.update({ "roster": req.body.playerId }, { $pull: { "roster": null } })
                        .exec(function (err, teamDoc) {
                            if (err) return next(err);

                            Team.update({ "roster": req.body.playerId }, { $pull: { "roster": req.body.playerId } })
                                .exec(function (err, teamDoc) {
                                    if (err) return next(err);




                                    res.status(200);
                                    res.json(teamDoc);
                                })


                        })


                })




        })


});




router.put('/coaches',mid.requiresAdmin, function (req, res, next) {
    var coaches = req.body.coaches;

    User.updateMany({
        "_id": {
            "$in": coaches
        }
    }, { $set: { "position.team": req.body.teamId } }, { upsert: true })
        .exec(function (err, doc) {
            if (err) return next(err);


            Team.findByIdAndUpdate({ _id: req.body.teamId },
                { $addToSet: { "coaches": { $each: coaches } } })
                .exec(function (err, saveddoc) {
                    if (err) return next(err);
                    res.status(201);
                    res.json(saveddoc);

                })

        })




})








router.put('/delete-coach',mid.requiresAdmin, function (req, res, next) {




    User.findById({ "_id": req.body.userId })
        .exec(function (err, doc) {
            if (err) return next(err);


            doc.update({ $set: { "position.team": null, "position.title": "None" } })


                .exec(function (err, doc) {
                    if (err) return next(err);
                    Team.update({ "roster": req.body.teamId }, { $pull: { "roster": req.body.userId } })

                        .exec(function (err, teamDoc) {
                            if (err) return next(err);

                            Team.update({ "roster": req.body.teamId }, { $pull: { "roster": null } })
                                .exec(function (err, teamDoc) {
                                    if (err) return next(err);




                                    res.status(200);
                                    res.json(teamDoc);
                                })


                        })


                })




        })


});


module.exports = router;