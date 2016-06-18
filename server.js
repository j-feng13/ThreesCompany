var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var child_process = require('child_process');
var util = require('util');
var bodyParser = require('body-parser');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

var process = require('child_process');
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', handleIndex);
app.get('/lesson/:id', handleLesson);
app.post('/test/:id', handleTest);
app.get('/test/:id', handleTest);

function handleIndex(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
}

function handleLesson(req, res) {
	var lessonNumber = req.params.id;
	res.sendFile(path.join(__dirname+'/lesson'+lessonNumber+'.html'));
}

function handleTest(req, res) {
	var filename = createSpec('foo', req.params.id);

	var process = child_process.spawn('jasmine', [filename]);
	var output = '';
	var error = '';
	process.stdout.on('data', function (data) {
      output += data;
   });

   process.stderr.on('data', function (data) {
   		error += data;
      console.log('stderr: ' + data);
   });

   process.on('close', function (code) {
      console.log('child process exited with code ' + code);
      res.send({"output" : output, "error" : error});
   });
}

function createSpec(code, id) {
	var testFile = fs.readFileSync(path.join(__dirname+'/tests/test' + id + '.js'), {'encoding' : 'utf8'});
	var test = util.format(testFile, code);
	fs.writeFileSync(path.join(__dirname+'/spec/test' + id + '.js'), test, {"flag" : 'w'});
	return '/spec/test' + id + '.js';

}

app.listen(3000, function() {
	console.log('Server started on port 3000');
})