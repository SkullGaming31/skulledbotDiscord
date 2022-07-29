const { model, Schema } = require('mongoose');

module.exports = model('SuggestDB', new Schema({
	GuildID: String,
	MessageID: String,
	Details: Array
}));