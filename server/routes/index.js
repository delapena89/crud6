var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

router.get('/exercises', function(req, res, next) {
  Exercise.find(function(err, data) {
    if (err) {
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});

router.post('/exercise/:name/:difficulty', function(req, res, next) {
  var newExercise = new Exercise({
    name: req.params.name,
    difficulty: req.params.difficulty});
  newExercise.save(function(err, data) {
    if (err) {
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
  });

router.get('/exercise/:id', function(req, res, next) {
  Exercise.find({_id: req.params.id},function(err,data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

router.put('/exercise/:id/:name/:difficulty',function(req,res, next) {
  var query = {_id: req.params.id};
  var update = {
    name: req.params.name,
    difficulty: req.params.difficulty
  };
  var option = {new: true};
  Exercise.findOneAndUpdate(query, update, option, function(err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

router.delete('/exercise/:id', function (req, res, next) {
  Exercise.remove({_id: req.params.id}, function(err,data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});








module.exports = router;
