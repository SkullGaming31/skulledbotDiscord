require('dotenv').config();

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} DISCORD_BOT_TOKEN your discord bots Token
 * @prop {string} DISCORD_CLIENT_ID not used for anything atm
 * @prop {string} DISCORD_CLIENT_SECRET not used for anything atm
 * @prop {string} DISCORD_GUILD_ID ID of your discord server
 * @prop {string} DISCORD_PROMOTE_CHANNEL_ID the channel id for you Promotion channel
 * @prop {string} DISCORD_PROMOTE_CHANNEL_ID Channel id for your Promotion channel
 * @prop {string} DISCORD_MOD_ROLE_ID your Moderator Roles ID
 * @prop {string} DISCORD_ADMIN_ROLE_ID your Admin Roles ID
 * @prop {string} DISCORD_LOGS_CHANNEL_ID Channel ID for your Logs Channel
 * @prop {string} DISCORD_EVERYONE_ROLE_ID Everyone Role ID
 * @prop {string} DISCORD_TICKET_SYSTEM_ID ticket system Parent Channel ID
 * @prop {string} DISCORD_OPEN_TICKET_ID Open Ticket Channel ID
 * @prop {string} DISCORD_TRANSCRIPT_ID Transcript Channel ID
 * @prop {string} DISCORD_BOT_ROLE_ID Discord Bot Role ID
 * @prop {string} MONGO_USERNAME Mongo DB Username
 * @prop {string} MONGO_PASSWORD Mongo DB Password
 * @prop {string} MONGO_DATABASE Mongo Database Name
 * @prop {string} MONGO_HOST Mongo Database Host
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
	...process.env,
};

module.exports = config;