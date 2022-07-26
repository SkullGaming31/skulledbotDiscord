require('dotenv').config();

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} DISCORD_BOT_TOKEN your discord bots Token
 * @prop {string} DISCORD_CLIENT_ID not used for anything atm
 * @prop {string} DISCORD_CLIENT_SECRET not used for anything atm
 * @prop {string} DISCORD_GUILD_ID ID of your discord server
 * @prop {string} MONGO_USERNAME Mongo DB Username
 * @prop {string} MONGO_PASSWORD Mongo DB Password
 * @prop {string} MONGO_DATABASE Mongo Database Name
 * @prop {string} MONGO_HOST Mongo Database Host
 * @prop {string} MONGO_URL Full Url for Mongo DB
 * @prop {string} MODLOGS_CHANNEL Channel ID for your Logs
 * @prop {string} ERROR_LOGS_CHANNEL Channel ID for Development ERROR Logs
 * @prop {string} WELCOMER_ID Webbhook ID for the Welcome Channel
 * @prop {string} WELCOMER_TOKEN Webhook Token for the Welcome Channel
 * @prop {string} NEW_GUILD_ADDED_WEBHOOK Webhook for New Guilds Added
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
	...process.env,
};

module.exports = config;