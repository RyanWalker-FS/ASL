const express = require("express");
const router = express();
const contactsRouter = require("./contacts");

router.get("/v1", (req, res) => {
  res.status(200).json({
    method: req.method,
    message: "Received get request",
  });
});

router.use("/v1", contactsRouter);

module.exports = router;
