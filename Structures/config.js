require('dotenv').config();

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} DISCORD_BOT_TOKEN your discord bots Token
 * @prop {string} DISCORD_CLIENT_ID not used for anything atm
 * @prop {string} DISCORD_CLIENT_SECRET not used for anything atm
 * @prop {string} DISCORD_GUILD_ID ID of your discord server
 * @prop {string} WELCOMER_ID Welcomer Webhook ID
 * @prop {string} WELCOMER_TOKEN Welcomer Webhook Token
 * @prop {string} DAYD_WELCOME_TOKEN Webhook token for the DAYD discord server welcome channel
 * @prop {string} DAYD_WELCOME_ID Webhook ID for the DAYD discord server welcome channel
 * @prop {string} ERROR_LOG_CHANNEL Channel where all logs are sent
 * @prop {string} NEW_GUILD_ADDED_WEBHOOK Webhook url for new guilds added
 * @prop {string} MONGO_USERNAME Mongo DB Username
 * @prop {string} MONGO_PASSWORD Mongo DB Password
 * @prop {string} MONGO_DATABASE Mongo Database Name
 * @prop {string} MONGO_HOST Mongo Database Host
 * @prop {string} NITRADO_API Api key to access the nitrado services through the api
 * @prop {string} NITRADO_USERNAME Username to access Nitrado
 * @prop {string} NITRADO_ID ID for the Game Server
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
	...process.env,
};

module.exports = config;