const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Stock', StockSchema);