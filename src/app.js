const express = require("express");
const app = express();

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const auth = require("./routes/auth");
const bookRoute = require("./routes/book");

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.use("/books", auth);
app.use("/books", bookRoute);

module.exports = app;
