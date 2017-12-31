/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

module.exports = {
	name: 'default',
	port: process.env.PORT || 8080,
	forwards: {
		'static': {
			path: process.env.STATIC_PATH || '/static/',
			forward: process.env.STATIC_URL || 'http://localhost:8082/',
		},
	},
};

if(process.env.NODE_ENV !== 'production') {
	module.exports.forwards['style'] = {
		path: process.env.STYLE_PATH || '/style/',
		forward: process.env.STYLE_URL || 'http://localhost:8081/',
	};

	module.exports.forwards['pages'] = {
		path: process.env.PAGES_PATH || '/pages/',
		forward: process.env.PAGES_URL || 'http://localhost:8083/',
	};

	module.exports.forwards['users'] = {
		path: process.env.PAGES_PATH || '/users/',
		forward: process.env.PAGES_URL || 'http://localhost:8084/',
	};
}
