const withImages = require('next-images');
const config = {
	webpack: config => {
		return config;
	},
	env: {
        apiUrl: 'https://api.wish-list.online:8000',
	},
};

module.exports = withImages(config);
