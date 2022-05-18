require('dotenv').config();

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} DISCORD_BOT_TOKEN your discord bots Token
 * @prop {string} DISCORD_CLIENT_ID not used for anything atm
 * @prop {string} DISCORD_CLIENT_SECRET not used for anything atm
 * @prop {string} DISCORD_GUILD_ID ID of your discord server
 * @prop {string} WELCOMER_ID Welcomer Webhook ID
 * @prop {string} WELCOMER_TOKEN Welcomer Webhook Token
 * @prop {string} ERROR_LOG_CHANNEL channel where all logs are sent
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