const express = require('express');
const axios = require('axios').default;
const { URLSearchParams } = require('url');
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = require('./config');

const app = express();

const instance = axios.create({ baseURL: 'https://discord.com/api', });

if (process.env.NODE_ENV === 'production') {
	app.get('/api/auth/discord/redirect', async (req, res) => {
		// console.log(req.query.code);
		const { code } = req.query;
		if (code) {
			try {
				const formData = new URLSearchParams({
					client_id: DISCORD_CLIENT_ID,
					client_secret: DISCORD_CLIENT_SECRET,
					grant_type: 'authorization_code',
					code,
					redirect_uri: 'https://skulledbotv2.up.railway.app/api/auth/discord/redirect'
				});
				const response = await instance.post('/oauth2/token',
					formData.toString(),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					});
				const { access_token } = response.data;
				const { data: userResponse } = await axios.get('https://discord.com/api/v10/users/@me', {
					headers: {
						'Authorization': `Bearer ${access_token}`
					}
				});
				res.send(userResponse);
			} catch (error) {
				console.error(error);
				res.sendStatus(400);
			}
		}
	});
} else {
	app.get('/api/auth/discord/redirect', async (req, res) => {
		// console.log(req.query.code);
		const { code } = req.query;
		if (code) {
			try {
				const formData = new URLSearchParams({
					client_id: DISCORD_CLIENT_ID,
					client_secret: DISCORD_CLIENT_SECRET,
					grant_type: 'authorization_code',
					code,
					redirect_uri: DISCORD_REDIRECT_URI
				});
				const response = await instance.post('/oauth2/token',
					formData.toString(),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					});
				const { access_token } = response.data;
				const { data: userResponse } = await axios.get('https://discord.com/api/v10/users/@me', {
					headers: {
						'Authorization': `Bearer ${access_token}`
					}
				});
				res.send(userResponse);
			} catch (error) {
				console.error(error);
				res.sendStatus(400);
			}
		}
	});
	app.get('/api/auth/user', async (req, res) => {
		res.send({
			msg: 'Currently in progress'
		});
		// try {
		// 	const response = await axios.get('https://discord.com/api/v10/users/@me', {
		// 		headers: {
		// 			'Authorization': `Bearer ${}`// Grab Access Token from Database.
		// 		}
		// 	});
		// } catch (error) {
		// 	console.error(error);
		// 	res.sendStatus(400);
		// }
	});
	app.get('/api/auth/revoke', async (req, res) => {
		res.send({ msg: 'Currently in progress' });
		// try {
		// 	const formData = new URLSearchParams({
		// 		client_id: DISCORD_CLIENT_ID,
		// 		client_secret: DISCORD_CLIENT_SECRET,
		// 		token: `${access_token}`// pull accessToken from Database
		// 	});
		// 	const response = await instance.post('/oauth2/token/revoke',
		// 		formData.toString(),
		// 		{
		// 			headers: {
		// 				'Content-Type': 'application/x-www-form-urlencoded'
		// 			}
		// 		});
		// } catch (error) {
		// 	console.error(error);
		// 	res.sendStatus(400);
		// }
	});
}

app.listen(3001, () => console.log('http://localhost:3001'));