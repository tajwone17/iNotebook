const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
 const obj = {
    name: "fffg",
    number:77
  }
  res.json(obj);
});

module.exports = router;
