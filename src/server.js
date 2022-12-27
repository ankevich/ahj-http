const fs = require("fs");
const http = require("http");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require('@koa/cors')
const koaStatic = require("koa-static");
const path = require("path");
const uuid = require("uuid");

const allTickets = [
  {
    id: 1,
    name: "Ticket 1",
    description: "Description 1",
    status: "closed",
    created: "2020-01-01",
  },
  {
    id: 2,
    name: "Ticket 2",
    description: "Description 2",
    status: "open",
    created: "2020-01-01",
  },
];

const app = new Koa();
app.use(koaBody());
app.use(cors());

// Logger
app.use(async (ctx, next) => {
  await next();

  console.log(`Method: ${ctx.method}  URL: ${ctx.url} `);
  console.log(ctx.request);
});

app.use(async (ctx) => {
  // GET ?method=allTickets
  if (ctx.request.query.method === "allTickets") {
    ctx.body = JSON.stringify(allTickets);
  }

  // GET ?method=ticketById&id=<id>
  if (ctx.request.query.method === "ticketById") {
    const id = ctx.request.query.id;
    const ticket = allTickets.find((ticket) => ticket.id == id);
    console.log(id, ticket);
    ctx.body = JSON.stringify(ticket);
  }
  
  // POST ?method=createTicket - создание тикета (<id> генерируется на сервере, в теле формы name, description, status)
  if (ctx.request.query.method === "createTicket") {
    const { name, description, status } = ctx.request.body;
    const id = uuid.v4();
    const created = new Date().toISOString().slice(0, 10);
    const ticket = { id, name, description, status, created };
    allTickets.push(ticket);
    ctx.body = JSON.stringify(ticket);
  }
});

app.listen(3000);
