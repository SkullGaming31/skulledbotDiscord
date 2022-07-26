const { model, Schema } = require('mongoose');

/**
 * Roles Structure
 * - roleId: String
 * - roleDescription: String
 * - roleEmoji: String
 */
module.exports = model('ReactionRoles', new Schema({
	GuildID: String,
	Roles: Array,
}));