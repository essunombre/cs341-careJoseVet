// InKcyIQCOiESzszP
// esnuestronombre
//connection string / collection name databse name
// mongodb+srv://esnuestronombre:<password>@cluster0.06d3ea4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const mongodb = require("./data/database")
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

app.use("/", mainRouter)
// I make it to listen
app.listen(port);
console.log("Web server is listening at port: " + port);