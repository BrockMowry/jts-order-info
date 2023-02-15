require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "/static")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
require("./routes")(app);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));