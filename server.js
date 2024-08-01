const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const db = require("./mongoDB.js");

const personRoutes = require("./routes/personRoutes.js")
const menuItemRoutes = require("./routes/menuItemRoutes.js")

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to my hotel... How can i help you?");
});


app.use("/person", personRoutes)
app.use("/menu", menuItemRoutes)


app.listen(3000, () => {
  console.log("Listening to port 3000");
});
