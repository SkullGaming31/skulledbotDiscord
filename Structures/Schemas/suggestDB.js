const { model, Schema } = require('mongoose');

module.exports = model('suggest', new Schema({
	GuildID: String,
	MessageID: String,
	Details: Array
}));