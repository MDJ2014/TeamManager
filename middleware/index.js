var User = require('../models/userModel').User;



function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {

        var err = new Error("Must be logged in to view this page.");
        err.status = 401;
        return next(err);

    }
    next();
}

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("Must be logged in to view this page.");
        err.status = 401;
        return next(err);
    }

}

function requiresAdmin(req, res, next) {
    var type = "";

    if(req.session.userId){

        User.findById(req.session.userId, function (err, doc) {
            if (err) return next(err);
            type = doc.userType;
    
            if (req.session && req.session.userId && type == "Admin") {
                return next();
            } else {
                var err = new Error("Must be logged in as administrator to view this page.");
                err.status = 401;
                return next(err);
            }
    
    
        });




    }else{
        var err = new Error("Must be logged in as administrator to view this page.");
        err.status = 401;
        return next(err);
    }

  



}






function requiresMod(req, res, next) {
    var type = "";

    if(req.session.userId){

        User.findById(req.session.userId, function (err, doc) {
            if (err) return next(err);
            type = doc.userType;
    
            if (req.session && req.session.userId && type == "Coach" || req.session && req.session.userId && type == "Admin") {
                return next();
            } else {
                var err = new Error("Must be logged in as coach to view this page.");
                err.status = 401;
                return next(err);
            }
    
    
        });




    }else{
        var err = new Error("Must be logged in as coach to view this page.");
        err.status = 401;
        return next(err);
    }

  



}



module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.requiresAdmin = requiresAdmin;
module.exports.requiresMod = requiresMod;
