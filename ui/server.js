const express = require('express');
const path = require('path');
const request = require('request');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');


const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`});
const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

// render results from tools
app.get('/results/:id/:tool', function(req, res) {
  // '/0/' is the counter of results for that tool
  // if '0' it means return all results from that tool
  var url = 'http://lb/v1/results/' + req.params['tool'] + '/0/' + req.params['id']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    res.send(body);
  });

});

// render images from tools
app.get('/id/:id/:tool/:counter/:file', function(req, res) {
  var url = 'http://lb/v1/id/' + req.params['id'] + '/' + req.params['tool'] + '/' + req.params['counter'] + '/' + req.params['file']
  console.log(url);
  console.log(req.headers);

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    res.set('Content-Type', 'image/png');
    res.send([body]);
  });

});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/express-upload', upload.single("file"), function(req, res) {
  console.log('receiving data ...');

  var file = req.file

  var formData = {
    file: {
      value:  fs.createReadStream(file.path),
      options: {
        filename: file.originalname
      }
    }
  };

  request.post({url:'http://lb/v1/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Uploaded file, server responded with:', body);
  });

  console.log(req.file);


});

app.listen(5000,() =>{
  console.log(`Express App listening on port ${5000}!`)
});
