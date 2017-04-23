/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const forward = require('koa-forward-request');
const route = require('koa-route');

const config = require('config')(require('./config.js'));

const app = new koa();

forward(app, {
	debug: (process.env.NODE_ENV !== 'production'),
});

const index = async (ctx, next) => {
	await next();

	return ctx.forward('/static/index.html');
};

var server;

app.use(route.get('/', index));

config.onReady(function() {
	server = app.listen(config.port);
});

config.onChange(function() {
	server.close(function() {
		server = app.listen(config.port);
	});
});
