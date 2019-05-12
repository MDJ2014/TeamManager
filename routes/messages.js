var express = require('express');
var router = express.Router();
var Message = require('../models/messgeModel').Message;

/* GET all messages */
router.get('/', function(req, res, next) {
    Message.find({})
    .exec(
      function(err, messages)  {
        if(err) return next(err);
        res.json(messages);
       
    });
    });

/*Get Team Messages*/
router.get('/team/:id', function(req,res,next){
    Message.find({team: req.params.id})
    //.populate('messages')
    .exec(function(err,messages){
        if(err) return next(err);
        res.status(201);
        res.json(messages);
    })
});




/*Post new Message*/
    router.post('/', function(req,res,next){
        var newMessage = new Message(req.body);
        newMessage.save(function(err,message){
            if(err) return next(err);
            res.status(201);
            res.json(message);
        
        });
        
        });

/*Update message*/
router.put('/message/:id', function(req,res,next){
    Message.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec(function(err,doc){
      if(err) return next(err);
      res.json(doc);
    });
  });

/*Delete message*/
router.delete('/message/:id', function(req,res,next){
    Message.findByIdAndDelete(req.params.id, function(err,deletedDoc){
        if(err) return next(err);
        res.status(200);
        res.json(deletedDoc);
        })
        
    })


/////////////////////////////////////////////TEST IT
/*Delete old messages*/
router.delete('/message/:id', function(req,res,next){
var toDate = req.body.toDate;

Message.deleteMany({datePosted: {$lt: toDate}}, function(err,docs){
    if(err) return next(err);
        res.status(200);
        res.json(docs);
})


   
        
    })


module.exports = router;