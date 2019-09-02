const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Employee } = require('../model/employee');

// get data from rest database
router.get('/', (req, res) => {
  Employee.find((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else {
      console.log('Error in retriving Data: ' + JSON.stringify(err, undefined, 2));
    }
  })
})
// get data by id
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Employee.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving data:' + JSON.stringify(err, undefined, 2)); }
  });
});


// post data to the database
router.post('/', (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);

    } else {
      console.log('Error in employee' + JSON.stringify(err, undefined, 2));
    }
  })
})

// Updata data to the database
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  };
  Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: false, useFindAndModify: false },  (err, doc) => {
    if (!err) {
       res.send(doc);

    }
    else {
      console.log('Error In employee Update' + JSON.stringify(err, undefined, 2));
    }
  });
});


// delete employee
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else {
      console.log('Error In Employee Delete' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
