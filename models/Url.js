const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  url: String,
  shortCode: String
}, { timestamps: true });

const ModelClass = mongoose.model('url', UrlSchema);
module.exports = ModelClass;  
