const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  name: String,
  balance: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
