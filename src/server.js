const fs = require("fs");
const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const path = require("path");
const uuid = require("uuid");


const allTickets = [{
    id: 1,
    name: "Ticket 1",
    description: "Description 1",
    status: "open",
    created: "2020-01-01",
},
{
    id: 2,
    name: "Ticket 2",
    description: "Description 2",
    status: "open",
    created: "2020-01-01",
}]

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  console.log(
    `Method: ${ctx.method}  URL: ${ctx.url} Query: ${ctx.request.querystring} `
  );
});

// GET ?method=allTickets - список тикетов
app.use(async (ctx) => {
    if (ctx.request.query.method === "allTickets") {
        ctx.body = JSON.stringify(allTickets);
    }
    if (ctx.request.query.method === "ticketById") {
        const id = ctx.request.query.id;
        const ticket = allTickets.find((ticket) => ticket.id == id);
        console.log(id, ticket);
        ctx.body = JSON.stringify(ticket);
    }
});



// POST ?method=createTicket - создание тикета (<id> генерируется на сервере, в теле формы name, description, status)

app.listen(3000);
