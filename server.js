const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3030;

app.use(bodyParser())

app.post('/', function (req, res) {
  res.send(req.body)
  console.dir(req.body)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));