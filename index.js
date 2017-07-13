/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');
const http = require('http');
const forward = require('forward');

const config = require('./config.js');

const app = new koa();

app.use(logger());
app.use(forward());

app.use(route.get('/favicon.ico', async (ctx, next) => {
	await next();

	return ctx.throw(404);
}));
app.use(async (ctx, next) => {
	await next();

	return await ctx.forward(config.forwards['static'].forward + 'default.html');
});

app.listen(config.port);
