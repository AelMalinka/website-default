/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

module.exports = {
	name: 'default',
	port: process.env.PORT || 8080,
	forward: 'http://' + (process.env.FORWARD !== undefined ? proces.env.FORWARD : 'localhost:' + process.env.PORT) + '/',
};
