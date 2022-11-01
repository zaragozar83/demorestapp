const res = require('express/lib/response')
const express = require("express");
const fs = require("fs")
const https = require("https")
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(8080, function () {
    console.log(
      "Example app listening on port 8080! Go to https://localhost:8080/"
    );
  });
