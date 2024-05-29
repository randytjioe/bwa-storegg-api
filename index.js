require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("node:http");
const { app } = require("./app");
const server = http.createServer(app);
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

const { API_PORT } = process.env;

const port = API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
