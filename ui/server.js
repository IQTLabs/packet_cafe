const express = require('express');
const path = require('path');
const request = require('request');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');


const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`});
const app = express();

const upload_file = async (formData) => {
    request.post({url:'http://lb/v1/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Uploaded file, server responded with:', body);
      return body.uuid;
  });
}


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

// render results from tools
app.get('/results/:id/:tool', function(req, res) {
  // '/0/' is the counter of results for that tool
  // if '0' it means return all results from that tool
  var url = 'http://lb/api/v1/results/' + req.params['tool'] + '/0/' + req.params['id']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    // TODO this should be pulled from workers.json
    if(req.params['tool'] != 'pcapplot') {
        res.set('Content-Type', 'application/json');
    }
    res.send(body);
  });

});

// render images from tools
app.get('/id/:id/:tool/:pcap/:counter/:file', function(req, res) {
  var url = 'http://lb/api/v1/id/' + req.params['id'] + '/' + req.params['tool'] + '/' + req.params['pcap'] + '/' + req.params['counter'] + '/' + req.params['file']

  request.get({url:url, encoding: null}, function optionalCallback(err, httpResponse, body) {

    if (err) {
      return console.error('failed:', err);
    }
    const img = new Buffer(body, 'binary');
    res.set('Content-Type', 'image/png');
    res.set('Content-Length', img.length);
    res.send(img);
  });

});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/express-upload', upload.single("file"), async function(req, res) {
  console.log('receiving data ...');
  req.connection.setTimeout(600000);
  const sessionId = req.sessionId;
  var file = req.file

  var formData = {
    sessionId: sessionId,
    file: {
      value:  fs.createReadStream(file.path),
      options: {
        filename: file.originalname
      }
    }
  };

  let uuid = null;
  request.post({url:'http://lb/api/v1/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.sendStatus(500)
      return console.error('upload failed:', err);
    }
    console.log('Uploaded file, server responded with:', body);
    uuid = body.uuid;
  });
  res.sendStatus(200)
});

app.listen(5000,() =>{
  console.log(`Express App listening on port ${5000}!`)
});
