const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');


const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`});
const app = express();
const server_name = 'lb'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'build')));

// render raw results from tools
app.get('/raw/:session/:id/:tool', function(req, res) {
  // '/0/' is the counter of results for that tool
  // if '0' it means return all results from that tool
  var url = 'http://' + server_name + '/api/v1/raw/' + req.params['tool'] + '/0/' + req.params['session'] + '/' + req.params['id']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    var obj = JSON.parse(body);
    res.json(obj);
  });

});

// render status from ID
app.get('/status/:session/:id', function(req, res) {
  var url = 'http://' + server_name + '/api/v1/status/' + req.params['session'] + '/' + req.params['id']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    var obj = JSON.parse(body);
    res.json(obj);
  });

});

// render results from tools
app.get('/results/:session/:id/:tool', function(req, res) {
  // '/0/' is the counter of results for that tool
  // if '0' it means return all results from that tool
  var url = 'http://' + server_name + '/api/v1/results/' + req.params['tool'] + '/0/' + req.params['session'] + '/' + req.params['id']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('failed:', err);
    }
    var obj = JSON.parse(body);
    res.json(obj);
  });

});

// render results from tools
app.get('/ids/:session', function(req, res) {
  // '/0/' is the counter of results for that tool
  // if '0' it means return all results from that tool
  var url = 'http://' + server_name + '/api/v1/ids/' + req.params['session']

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.json([]);
      return console.error('failed:', err);
    }
    console.log(body);
    var obj = JSON.parse(body);
    res.json(obj);
  });

});

// render images from tools
app.get('/id/:session/:id/:tool/:pcap/:counter/:file', function(req, res) {
  var url = 'http://' + server_name + '/api/v1/id/' + req.params['session'] + '/' + req.params['id'] + '/' + req.params['tool'] + '/' + req.params['pcap'] + '/' + req.params['counter'] + '/' + req.params['file']

  request.get({url:url, encoding: null}, function optionalCallback(err, httpResponse, body) {

    if (err) {
      return console.error('failed:', err);
    }
    const img = new Buffer(body, 'binary');
    res.set('Content-Type', 'image/png');
    res.set('Content-Length', img.length);
    res.send(img, 'binary');
  });

});

// render tools available
app.get('/tools', function(req, res) {
  var url = 'http://' + server_name + '/api/v1/tools'

  request.get({url:url}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.json([]);
      return console.error('failed:', err);
    }
    console.log(body);
    var obj = JSON.parse(body);
    res.json(obj);
  });

});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/*', function(req, res) {
  res.redirect('/');
});

app.post('/express-upload', upload.single("file"), async function(req, res) {
  console.log('receiving data ...');
  req.connection.setTimeout(600000);

  var file = req.file;
  const sessionId = req.body.sessionId;
  console.log('server session: ' + sessionId);
  var formData = {
    file: {
      value:  fs.createReadStream(file.path),
      options: {
        filename: file.originalname
      }
    },
    sessionId: sessionId
  };

  request.post({url:'http://' + server_name + '/api/v1/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.sendStatus(500)
      return console.error('upload failed:', err);
    }
    var body_obj = JSON.parse(body);
    const uuid = body_obj.uuid;
    const filename = body_obj.filename;
    console.log('server uuid: ' + uuid);
    console.log('server filename: ' + filename);
  });
  res.sendStatus(200)
});

const port =  process.env.PORT || 5000

app.listen(port,() =>{
  console.log(`Express App listening on port ${port}!`)
});
