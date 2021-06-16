const express = require('express');
const router = express.Router();

  router.get('/', (req, res) => {
     res.sendFile(path.resolve(__dirname, "../../client/build/", "index.html"));
  });
  router.all("/users*", require('./users'));

module.exports = router;