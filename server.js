var express = require('express');
var app = express();
var https = require("https")
var multer  = require('multer')
var upload = multer()
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/get-file-size", upload.single('file'), function (req, res, next) {
  var filesize = req.file.size
  if (filesize < 1024) {
    filesize += " bytes"
  } else if (filesize > 1024) {
    filesize = Math.round(filesize/1024)
  } 
  if (filesize < 1024) {
    filesize += " kb" 
  } else if (filesize > 1024) {
    filesize = Math.round(filesize/1024)
  }
  if (filesize < 1024) {
    filesize += " mb" 
  } else if (filesize > 1024) {
    filesize = Math.round(filesize/1024)
  }
  if (filesize < 1024) {
    filesize += " GB" 
  } else if (filesize > 1024) {
    filesize = Math.round(filesize/1024) + " TB"
  }
  res.json({filesize : filesize})
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
