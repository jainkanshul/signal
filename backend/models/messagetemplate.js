const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  prefix: { type: String },
  suffix: { type: String},
  createddate: {type: Date, default: Date.now },
  message: {type: String},
  templatename: {type: String}
});

module.exports = mongoose.model('Messagetemplate', postSchema);
