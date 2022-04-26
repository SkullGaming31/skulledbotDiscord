const { MessageEmbed, Message } = require('discord.js');
const { RefreshingAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');

/**
 * 
 * @param {Message} message 
 */
async function live(message) {

  const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
	const authProvider = new RefreshingAuthProvider({
		clientId,
		clientSecret,
		onRefresh: async (newTokenData) => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
	}, tokenData);

  const apiClient = new ApiClient({ authProvider: authProvider, logger: { minLevel: 'critical' } });

	setInterval(async () => {
		await apiClient.streams.getStreams({
			limit: 2,
			userName: ['famedragn', 'lonnybluebird'],
		})
	}, 300000);
}