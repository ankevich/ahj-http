const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const uuid = require('uuid');


const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello Annie';
  console.log('Hello Annie');
});

app.listen(3000);