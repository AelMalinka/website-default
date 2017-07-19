/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const forward = require('forward');

const config = require('./config.js');

const app = new koa();

app.use(logger());
app.use(forward());
app.use(conditional());
app.use(etag());

app.use(async (ctx, next) => {
	for(const x in config.forwards) {
		if(ctx.url.startsWith(config.forwards[x].path))
			return await ctx.forward(config.forwards[x].forward + ctx.url.replace(config.forwards[x].path, ''));
	}

	await next();
});
app.use(route.get('/favicon.ico', async (ctx, next) => {
	await next();

	return ctx.throw(404);
}));
app.use(async (ctx, next) => {
	await next();

	return await ctx.forward(config.forwards['static'].forward + 'default.html');
});

app.listen(config.port);
