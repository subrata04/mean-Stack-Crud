const mongoose = require ('mongoose');

var Student = mongoose.model('Student', {
  name: { type: String },
  batchNo: { type: String},
  studentId: { type: String},
  batchTime: { type: String },
  admissionDate: { type:String},
  tusionFees: { type: Number}
})

module.exports = {Student};
