const mongoose = require('mongoose');
const config = require('../Structures/config');


if (!config.MONGO_DATABASE) return;
mongoose.connect(config.MONGO_DATABASE, {
	user: config.MONGO_USERNAME,
	pass: config.MONGO_PASSWORD,
	dbName: 'Discord',
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => { console.log('Mongo Database Connected'); }).catch((err) => { console.error(err); });
