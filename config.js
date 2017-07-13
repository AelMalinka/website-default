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
	}
};
