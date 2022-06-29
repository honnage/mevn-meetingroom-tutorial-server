const express = require("express");
const server = express();
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");
const port = 3000;

// setup Session for system
server.use(
  expressSession({
    secret: "data",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post("/", [check("firtname").not().isEmpty()], (req, res) => {
  try {
    validationResult(req).throw();
    res.json(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

server.get("/s", (req, res) => {
  //   res.json(req.body);
  req.session.item = "Hello World";
  res.end("Set Session");
});

server.get("*", (req, res) => {
  res.end(`<h1>Backend server is start.</h1>`);
});

server.listen(port, () => console.log(`Server is running port ${port}`));
