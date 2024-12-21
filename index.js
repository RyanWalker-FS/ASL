// Load in our Express framework
const express = require(`express`);

// Create a new Express instance called "app"
const app = express();
const twig = require("twig");
const path = require("path");

// Load in our RESTful routers
const routers = require("./routers/index.js");

const bodyParser = require("body-parser");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.set("views", __dirname + "/views");
app.set("view engine", "twig");

app.use(express.static(path.join(__dirname, "public")));

// Home page welcome middleware
app.get("/", (req, res) => {
  res.status(200).render("home", { name: "Star Tracker" });
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting server:", err);
    return;
  }
  console.log("Server is running on port 3000");
});
