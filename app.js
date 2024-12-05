const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const contactsRoutes = require("./routes/contacts");
const { contacts } = require("@jworkman-fs/asl");

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/v1/contacts", contactsRoutes);

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => console.log("Server running on ${PORT}"));
