const cron = require("node-cron");
const monitor = require("./service/monitor")
const controller = require("./controller/auth")
const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log("Starting...");

let app = express(); // Defina a variável app aqui

app.use(cors()); // Configuração do CORS

/*
    Update execution interval.
    Configured to be executed every X minutes.
*/
let cronExpression = '*/' + process.env.IDP_ADDRESS + ' * * * *';
cron.schedule(cronExpression, function() {
    monitor.monitor();
}, {});

app.get("/jwt", function(req, res) {
    controller.getAccessToken(req, res)
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
