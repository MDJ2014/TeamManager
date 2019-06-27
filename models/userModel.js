'use strict';


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    userType: {type: String, default: 'Member'},
    position:{title: {type: String,default:"None"}, team:{type: Schema.Types.ObjectId, ref: 'Team', default: null},preference:{type: String, default:"None"}},
    name:{firstName: {type: String, trim: true, required: true}, lastName: {type: String, trim: true, required: true}},
    userName: {type: String, unique: true, required: [true, 'User name required']},
    userAddress:{street: String, city: String, state: {type: String, uppercase: true}, zip: Number},
    userPhone:{type: String, trim: true},
    userEmail:{type: String, trim: true, unique: true, required: [true, 'Email required']},
    passWord: {type: String, required: true},
   // payment: [{type: Schema.Types.ObjectId, ref: 'Payment'}],
    dateJoined:{type: Date, default: Date.now},
   // players:[{type: Schema.Types.ObjectId, ref: 'Player'}]
});


UserSchema.statics.authenticate = function(email,password, callback){
   User.findOne({userEmail: email})
   .exec(function(err, user){
      if(err){ 
         return callback(err);
      }else if(!user){
         var err = new Error("User not found.");
         err.status = 401;
         return callback(err);
      }
      bcrypt.compare(password, user.passWord, function(err, result){
            if(result === true){
               return callback(null, user);
            }else{
               return callback();
            }
      });
   });
}




UserSchema.pre("save",function(next){
   var user = this;
   bcrypt.hash(user.passWord, 10, function(err,hash){
      if(err) return next(err);
      user.passWord = hash;
      next();
   })
})

var User = mongoose.model('User',UserSchema);

module.exports.User = User;

