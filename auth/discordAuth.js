const express = require('express');
const axios = require('axios').default;

const discordRouter = express.Router();

const discordAuthBaseUrl = 'https://discord.com/api/oauth2/token';
const discordAuth = axios.create({
	baseURL: discordAuthBaseUrl
});

discordRouter.get('/', async (req, res) => {
	res.json({
		message: 'test'
	});
});

module.exports = discordRouter;