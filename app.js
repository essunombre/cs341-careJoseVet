// InKcyIQCOiESzszP
// esnuestronombre
//connection string / collection name databse name
// mongodb+srv://esnuestronombre:<password>@cluster0.06d3ea4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const port = process.env.PORT || 3000;

// test
// app.get("/", (req, res) => {
//   res.send("Hello I am Jose");
// });

mongodb.initDb((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DataBase Running at port: " + port);
  }
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", mainRouter);

// Exceptions to handle errors in my code, program wont stop but it continure running, like a catch all on a log
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// I make it to listen
app.listen(port);
console.log("Web server is listening at port: " + port);
