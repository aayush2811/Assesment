const express = require("express");
const app = express();
const port = 3000;
const db = require("./db/connection");
const customerRouter = require("./router/customerRouter");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', customerRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});