const { model, Schema } = require('mongoose');

module.exports = model('ticket', new Schema({
	GuildID: String,
	MembersID: [String],
	TicketID: String,
	ChannelID: String,
	Closed: Boolean,
	Locked: Boolean,
	Type: String
}));