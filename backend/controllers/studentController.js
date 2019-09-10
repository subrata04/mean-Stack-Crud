const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Student } = require('../model/student');


//get data from db
router.get('/', (req, res) => {
  Student.find((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else {
      console.log('Data can not fetched', JSON.stringify(err, undefined, 2));
    }
  })
})
// get data by id
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    res.status(400).send(`No record with given id: ${req.params.id}`);

  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else {
      console.log('Error in Retrivng Data' + JSON.stringify(err, undefined, 2));
    }
  })

})

// post data to the database
router.post('/', (req, res) => {
  var stdn = Student({
    name: req.body.name,
    batchNo: req.body.batchNo,
    studentId: req.body.studentId,
    batchTime: req.body.batchTime,
    admissionDate: req.body.admissionDate,
    tusionFees: req.body.tusionFees,
  });
  stdn.save((err, doc) => {
    if (!err) {
      res.send(doc);

    } else {
      console.log('Error in employee' + JSON.stringify(err, undefined, 2));
    }
  })
})

// edit data

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Data found with given id ${res.params.id}`);

  var stdn = {
    name: req.body.name,
    batchNo: req.body.batchNo,
    studentId: req.body.studentId,
    batchTime: req.body.batchTime,
    admissionDate: req.body.admissionDate,
    tusionFees: req.body.tusionFees
  };

  Student.findByIdAndUpdate(req.params.id, { $set: stdn }, { new: false, useFindAndModify: false }, (err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else {
      console.log('Error in Update' + JSON.stringify(err, undefined, 2));
    }
  })



  // delete employee
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else {
      console.log('Error In Student Delete' + JSON.stringify(err, undefined, 2));
    }
  });
});


})
module.exports = router;
