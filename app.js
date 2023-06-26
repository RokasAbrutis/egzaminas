const express = require('express')
const app = express()
const port = 5000

const cors = require('cors');
var session = require('express-session')

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
  secret: "cookie_secret123",
  resave: true,
  saveUninitialized: false,
  maxAge: 3600000
}));


app.use(userRoutes);
app.use(eventRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})