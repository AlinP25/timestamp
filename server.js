var path = require("path");
var express = require("express");
var moment = require("moment");
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'), function (err) {
        if (err)
            console.log("Error: " + err);
        else
            console.log("File sent: " + path.join(__dirname + '/index.html'));
    });
});

app.get('/:timeparameter', function (req, res) {
    var time = req.params.timeparameter;
    console.log(typeof(time));
    if(!moment(time).isValid())
        res.end(JSON.stringify({
            'unix': null,
            'humanReadable': null
        }));
    else
        res.end(JSON.stringify({
            'unix': moment(time).format('X'),
            'humanReadable': moment(time).format('MMMM DD, YYYY')
        }));
});

app.listen(8080);

console.log("Server is running");