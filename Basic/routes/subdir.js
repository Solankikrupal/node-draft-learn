const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/innerpage(.html)?", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "views", "subdir", "inner-page.html")
  );
});

module.exports = router;
