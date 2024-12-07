const express = require("express");
const app = express();
const port = 8080;

const contactRoutes = require("./routes/contacts");
const contactMethodRoutes = require("./routes/contactMethods");

app.use("/v1/contacts", contactRoutes);
app.use("/v1/contacts", contactMethodRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
