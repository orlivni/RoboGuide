var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var path = require('path');

const https = require('https');

var app = express();

app.use(express.static('video'));
app.use(express.static('website'));

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var data  = fs.readFileSync('Station.json');
var Stationdata = JSON.parse(data);


var server = app.listen(4242,listening);

function listening(argument) {
  console.log("listening ....");
}

/////////////////////////////////////////////////////////////////////////////////////////////

app.post('/kk', function(request, response) {

 var data = request.body;


 var StName = data["StationName"];

 var stt = Stationdata[StName]
 if(stt) {
 
  var indexL = stt[0].PlayL
  var indexS = stt[0].PlayS

}

 else {

  var indexL = false
  var indexS = false

      }
 
 console.log(indexL);
 console.log(indexS);

  var reply = {           
             statusL: indexL ,
             statusS: indexS
              }

     response.send(reply);
})


////////////////////////////////////////////////////////////////////////////////////////////

app.post('/Update', function(request, response) {

 var data = request.body;

 
 Stationdata["Station1"][0].PlayL = data["Station1"];
 Stationdata["Station2"][0].PlayL = data["Station2"];
 Stationdata["Station3"][0].PlayL = data["Station3"];
 Stationdata["Station4"][0].PlayL = data["Station4"];
 Stationdata["Station5"][0].PlayL = data["Station5"];
 Stationdata["Station6"][0].PlayL = data["Station6"];
 Stationdata["Station7"][0].PlayL = data["Station7"];
 Stationdata["Station8"][0].PlayL = data["Station8"];

 Stationdata["Station1"][0].PlayS = data["Station11"];
 Stationdata["Station2"][0].PlayS = data["Station22"];
 Stationdata["Station3"][0].PlayS = data["Station33"];
 Stationdata["Station4"][0].PlayS = data["Station44"];
 Stationdata["Station5"][0].PlayS = data["Station55"];
 Stationdata["Station6"][0].PlayS = data["Station66"];
 Stationdata["Station7"][0].PlayS = data["Station77"];
 Stationdata["Station8"][0].PlayS = data["Station88"];


let data1 = JSON.stringify(Stationdata);
fs.writeFileSync('Station.json', data1);

console.log(Stationdata)


  var reply = {           
             status: "ok"  
              }
     response.send(reply);
})


///////////////////////////////////////////////////////////////////


app.post('/download', function(request, response ,next) {

 var data = request.body;


 var StName = data["StationName"];

 var options = {
        root: path.join(__dirname)
    };

 var fileName = '/website/mp4/' + StName + '.mp4'


 response.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });


})



////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/uploadST1', function(req, res) {
 
 
  console.log("Uploading File Action");
  
  if (!req.files)
    return res.status(400).send({message: "No files were uploaded.",});
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile1;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL1' + path.extname(sampleFile.name);
 
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});




app.post('/uploadST2', function(req, res) {
 
 
   console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile2;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL2' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});



app.post('/uploadST3', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile3;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL3' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST4', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile4;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL4' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST5', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile5;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL5' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST6', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile6;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL6' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST7', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile7;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL7' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST8', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile8;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationL8' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/uploadST11', function(req, res) {
 
 
  console.log("Uploading File Action");
  
  if (!req.files)
    return res.status(400).send({message: "No files were uploaded.",});
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile11;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS1' + path.extname(sampleFile.name);
 
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});




app.post('/uploadST22', function(req, res) {
 
 
   console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile22;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS2' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});



app.post('/uploadST33', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile33;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS3' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST44', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile44;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS4' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST55', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile55;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS5' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST66', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile66;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS6' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST77', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile77;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS7' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/uploadST88', function(req, res) {
 
 
  console.log("Uploading File Action");

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile88;
  
  // Use the mv() method to place the file somewhere on your server
  imgFilename = './website/mp4/' + 'StationS8' + path.extname(sampleFile.name);
   
  sampleFile.mv(imgFilename, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

