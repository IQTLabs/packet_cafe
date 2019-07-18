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
