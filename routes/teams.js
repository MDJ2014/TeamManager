var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');

var Team = require('../models/teamModel').Team;
var Player = require('../models/playerModel').Player;
var Game = require('../models/gameModel').Game;
var mid = require('../middleware');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() +  ".png")
    }
  })

//var uplaod = multer({storage: storage});

var upload = multer({ dest: '../public/uploads/' });





/* GET all teams. */
router.get('/', mid.requiresLogin, function(req, res, next) {
    Team.find({})
       .exec(
        function(err, teams)  {
            if(err) return next(err);
            res.json(teams);
            //render add team form
            //res.render('teams',teams)
        });
 });

 /*Post a new team */
router.post('/', mid.requiresMod, function(req,res,next){
    var team = new Team(req.body);

    team.save(function(err, team){
        if(err) return next(err);
        res.status(201);
        res.json(team);
    });
});

/*GET team ranking*/
router.get('/rankings', mid.requiresLogin, function(req,res,next){
Team.find({})
.sort({wins: "desc"})
.exec(function(err,docs){
    if(err) return next(err);
    res.status(200);
    res.json(docs);
})

});






/*GET specific team */
router.get('/team', mid.requiresLogin, function(req,res,next){
Team.findById(req.body.teamId)
.exec(function(err,doc){
    if(err) return next(err);

var a = req.body.teamId;
      
Game.find().or([{homeTeam: a},{awayTeam: a}])
 .exec(
 function(err, games)  {
     if(err) return next(err);
   
  id = req.body.teamId
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


doc.update({wins: wins, losses: losses}, function(err, savedDoc){
    if(err) return next(err);
     res.status(201);
    res.json(doc);
//render add player form add logo form, update team form 
});
  

});

   
});
});



/*update team */
router.put('/team/update', mid.requiresMod, function(req,res,next){

var newData = req.body;


    Team.findById(req.body.teamId)
    .exec(function(err,doc){
        if(err) return next(err);
        if(req.body.logo){
           req.body.logo =  '../public/images/assets/' + req.body.logo;
            
           
        }
        doc.update(newData, function(err,savedDoc){
            if(err) return next(err);
            res.status(201);
            res.json(doc);
        });
    });

});



/*Uplaod team Logo */
router.post('/team/upload/logo',mid.requiresMod,  upload.single('logo'), function(req,res,next){
    var file = req.file;
// file.upload(req,res, function(err){
//      if(err instanceof multer.MulterError){
// return next(err);
//      }else{return next(err)}

     
 //});
// var filename=file.originalname;
// var filetype = file.mimetype;
// var filesize= file.size;
res.status(201);
res.json({"name": "filename", "type": "filetype", "size":" filesize", "uploaded": true})
});



 


module.exports = router;