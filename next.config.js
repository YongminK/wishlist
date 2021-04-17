const withImages = require('next-images');
const config = {
	webpack: config => {
		return config;
	},
	env: {
        apiUrl: '',
	},
};

module.exports = withImages(config);
