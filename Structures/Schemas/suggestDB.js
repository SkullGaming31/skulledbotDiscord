const { model, Schema } = require('mongoose');

module.exports = model('suggestions', new Schema({
  GuildID: String,
  Details: Array
}));