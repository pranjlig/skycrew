const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
var cors = require('cors');


// importing routes
const authRoutes = require("./routes/auth")
const learnerRoutes = require("./routes/learners")
const educatorRoutes = require("./routes/educators")

if ( process.env.NODE_ENV !== "production" ) {
    require("dotenv").config()
}

// connecting to mongodb
mongoose.connect("mongodb://localhost:27017/skycrew")
    .then(() => {console.log("Mongoose Connection Open...")})
    .catch((err) => {console.log("Mongoose Connection Error...", err)})


// using necessary middlewares
app.use(cors());

app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: false,
    }),
  );
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '/public')));



// using imported routes
app.use("/learners", learnerRoutes); 
app.use("/educators", educatorRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("home");
})

app.get("*", (req, res) => {
  res.send("Route does not exist.")
})


app.listen(8082, () => {
    console.log("Serving on port 8082...")
});

