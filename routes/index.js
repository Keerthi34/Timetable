var express = require('express');
var router = express.Router();

var winston = require('winston');
var Timetable= require('../models/timetable');

/*Logger*/
winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"Info level")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* Get all records*/
router.get('/fetch', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Timetable.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

/*Add Timetable*/
router.post('/add', function(req,res,next){
  var t= new Timetable({
    School_Id:req.body.School_Id,
    Class_Id:req.body.Class_Id,
    Teacher_Id:req.body.Teacher_Id,
    Subject:req.body.Subject,
    Time_in:req.body.Time_in,
    Time_out:req.body.Time_out,
    Day:req.body.Days,
    Class_Teacher:req.body.Teacher_type
  })


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})

/*Delete Records*/
router.get('/delete/:_id',function(req,res,next){
  winston.log('info',"Info: Delete")
  Timetable.remove({_id:req.params._id},function(err){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(200).json({"Message":"Deleted"});
  })
})

/*Update Records*/
router.put('/update/:_id', function(req,res,next){
  winston.log('info',"Info level")
var query={_id: req.params._id};
      Timetable.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }

  })
})



module.exports = router;
