var express = require('express');
var router = express.Router();
var HomePage = require('../models/homepageModel').HomePage;
/* GET home page. */

router.get('/', function (req, res, next) {
  res.redirect('/home');
});



router.get('/home', function (req, res, next) {
  HomePage.find({})
    .sort({ datePosted: -1 })
    .exec(function (err, pages) {
      if (err) return next(err);
      var page = pages[0];

      res.status(200);


      return res.json(page);
    });

});

router.put('/home/about/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "about": req.body.about } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);

        });
    });
});


router.get('/about', function (req, res, next) {

  return res.json({ title: "About" });
});

router.get('/contact', function (req, res, next) {
  res.render('about');
});


router.post('/home', function (req, res, next) {
  let pageData = {
    header: req.body.header,
    welcome: req.body.welcome,
    mainAnnouncement: { title: req.body.mainAnnouncement.title, body: req.body.mainAnnouncement.body, link: req.body.mainAnnouncement.link },
    mainCallOut: { title: req.body.mainCallOut.title, body: req.body.mainCallOut.body, link: req.body.mainCallOut.link },
    notice: req.body.notice,
    datePosted: req.body.datePosted
  }

  HomePage.create(pageData, function (err, doc) {
    if (err) return next(err);
    res.statusMessage(201);
    res.json(doc);
  });

});

router.put('/home/header/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "header": req.body.header } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json({ "message": "Header saved" });

        });
    });
});



router.put('/home/welcome/edit', function (req, res, next) {

  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "welcome": req.body.welcome } })
        .exec(function (err, doc) {
          if (err) {
            return next(err);
          }
          res.status(200);
          res.json({ "message": "Welcome saved" });

        });
    });
});

router.put('/home/main-announcement/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "mainAnnouncement": req.body.mainAnnouncement } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json({ "mainAnnouncement": req.body.mainAnnouncement, "updated to": req.body });

        });
    });
});

router.put('/home/main-callout/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "mainCallOut": req.body.mainCallOut } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json({ "mainCallOut": req.body.mainCallOut, "updated to": req.body });

        });
    });
});

router.put('/home/notice/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "notice": req.body.notice } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json({ "notice": req.body.notice, "updated to": req.body });

        });
    });
});


router.put('/home/license/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "license": req.body.license } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);

        });
    });
});

router.put('/home/terms/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "terms": req.body.terms } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);

        });
    });
});

router.put('/home/privacy/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "privacy": req.body.privacy } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);

        });
    });
});



router.put('/home/contact/edit', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, page) {
      if (err) return next(err);
      page.update({ $set: { "contact": req.body.contact } })
        .exec(function (err, doc) {
          if (err) return next(err);
          res.status(200);
          res.json(doc);

        });
    });
});





router.put('/home/announcements/add', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, doc) {
      if (err) return next(err);
      doc.announcements.push(req.body.announcements);
      doc.save(function (err, savedDoc) {
        if (err) return next(err);
        res.status(200);
        res.json(doc);
      });
    });
});




router.put('/home/calls-to-action/add', function (req, res, next) {
  HomePage.findById(req.body.id)
    .exec(function (err, doc) {
      if (err) return next(err);


      doc.callsToAction.push(req.body.callsToAction);

      doc.save(function (err, savedDoc) {
        if (err) return next(err);
        res.status(200);
        res.json(doc);
      });
    });
});






router.put('/home/calls-to-action/edit', function (req, res, next) {
  HomePage.updateOne({ _id: req.body.id, "callsToAction._id": req.body.ctaId },

    { $set: { "callsToAction.$.title": req.body.callsToAction.title, "callsToAction.$.body": req.body.callsToAction.body, "callsToAction.$.link": req.body.link } }
  )

    .exec(function (err, page) {
      if (err) return next(err);
      res.status(200);
      res.json(page);
    });
})


router.put('/home/announcements/edit', function (req, res, next) {
  HomePage.updateOne({ _id: req.body.id, "announcements._id": req.body.anId },
    { $set: { "announcements.$.title": req.body.announcements.title, "announcements.$.body": req.body.announcements.body, "announcements.$.link": req.body.announcements.link } }

  )
    .exec(function (err, page) {
      if (err) return next(err);
      res.status(200);
      return res.json(page);
    });

});




router.delete('/home/announcements/delete', function (req, res, next) {
  HomePage.findByIdAndUpdate(req.body.id, { $pull: { announcements: { _id: req.body.anId } } }, { new: true })
    .exec(function (err, doc) {
      if (err) return next(err);
      res.status(200);
      return res.json(doc);
    });
});

router.delete('/home/calls-to-action/delete', function (req, res, next) {
  HomePage.findByIdAndUpdate(req.body.id, { $pull: { callsToAction: { _id: req.body.ctaId } } }, { new: true })
    .exec(function (err, doc) {
      if (err) return next(err);
      res.status(200);
      return res.json(doc);
    });
});






module.exports = router;
