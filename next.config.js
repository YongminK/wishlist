const withImages = require('next-images');
const config = {
	webpack: config => {
		return config;
	},
	env: {
        apiUrl: 'http://3.68.29.204:8000/',
	},
};

module.exports = withImages(config);
