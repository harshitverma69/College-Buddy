const mongoose = require('mongoose');

const pyqSchema = new mongoose.Schema({
  subject: String,
  semester: String,
  branch: String,
  pdf_url: String
});

module.exports = mongoose.model('Pyq', pyqSchema);
