/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');
const http = require('http');

const forward = require('koa-forward');

const config = require('config')(require('./config.js'));

const app = new koa();

app.use(logger());
app.use(forward());

app.use(async (ctx, next) => {
	for(const f in ctx.forwards) {
		if(ctx.request.url.startsWith(ctx.forwards[f].path)) {
			return await ctx.forward(ctx.forwards[f].forward + ctx.request.url.replace(ctx.forwards[f].path, ""));
		}
	}

	await next();
});
app.use(route.get('/favicon.ico', async (ctx, next) => {
	await next();

	return ctx.throw(404);
}));
app.use(async (ctx, next) => {
	await next();

	return await ctx.forward(ctx.forwards['static'].forward + 'default.html');
});

app.listen(config.port);

config.onReady(function() {
	app.context.forwards = config.forward;
});

config.onChange(function() {
	app.context.forwards = config.forward;
});
