var express = require('express');
var router = express.Router();
var Message = require('../models/messgeModel').Message;
var mid = require('../middleware');





/* GET all messages */
router.get('/', mid.requiresMod, function(req, res, next) {
    Message.find({})
    .exec(
      function(err, messages)  {
        if(err) return next(err);
        //render post new messages form
        res.json(messages);
       
    });
    });

/*Get Team Messages*/
router.get('/team', mid.requiresLogin, function(req,res,next){
    Message.find({team: req.body.teamId})
    //.populate('messages')
    .exec(function(err,messages){
        if(err) return next(err);
        res.status(201);
        res.json(messages);
    })
});

/*Get universal Messages*/
router.get('/universal', mid.requiresLogin, function(req,res,next){
    Message.find({universal:true})
    //.populate('messages')
    .exec(function(err,messages){
        if(err) return next(err);
        res.status(201);
        res.json(messages);
    })
});


/*Post new Message*/
    router.post('/', mid.requiresMod, function(req,res,next){
        var newMessage = new Message(req.body);
        newMessage.save(function(err,message){
            if(err) return next(err);
            res.status(201);
            res.json(message);
        
        });
        
        });

/*Update message*/
router.put('/message', mid.requiresMod, function(req,res,next){
    Message.findByIdAndUpdate(req.body.messageId, req.body, {new: true})
    .exec(function(err,doc){
      if(err) return next(err);
      res.json(doc);
    });
  });

/*Delete message*/
router.delete('/message', mid.requiresAdmin, function(req,res,next){
    Message.findByIdAndDelete(req.body.messageId, function(err,deletedDoc){
        if(err) return next(err);
        res.status(200);
        res.json(deletedDoc);
        })
        
    })

    router.get('/', mid.requiresMod, function(req, res, next) {
        Message.find({})
        .exec(
          function(err, messages)  {
            if(err) return next(err);
            //render post new messages form
            res.json(messages);
           
        });
        });
    
    /*Get Old  Messages*/
    router.get('/old', mid.requiresAdmin, function(req,res,next){
        var toDate = req.body.toDate;
        
        Message.find({datePosted: {$lt: toDate}})
            .exec(function(err,messages){
            if(err) return next(err);
            res.status(201);
            res.json(messages);
        })
    });
    

    

/*Delete old messages*/
router.delete('/old', mid.requiresAdmin,  function(req,res,next){
var toDate = req.body.toDate;

Message.deleteMany({datePosted: {$lt: toDate}}, function(err,docs){
    if(err) return next(err);
        res.status(200);
        res.json(docs);
})
  
        
    })


module.exports = router;