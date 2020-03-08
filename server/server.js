const express = require('express');
const compression = require('compression');
const { upload } = require('./middleware/upload');
const { unzip } = require('./middleware/unzip');
const { csv2json } = require('./middleware/csv2json');
const errorHandler = require('./error-handler');
const { sendFile, sendHtml } = require('./content-handler');

const { BASE_API } = require('../config');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression({ filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}}));

app.post('/admin/upload', [upload, unzip, csv2json], function(req, res) {
  res.redirect(`${BASE_API}/listAll`);
});

app.get(`${BASE_API}/listAll`, function(req, res) {
  sendHtml(res);
});

app.get(`${BASE_API}/:resource`, function(req, res) {
  sendFile(req.params.resource, res);
});

app.use((err, req, res, next) => {
  errorHandler(err, res);
});

app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});
