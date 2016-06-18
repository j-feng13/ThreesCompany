var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));

app.get('/', handleIndex);
app.get('/lesson/:id', handleLesson);
app.post('/test', handleTest);

function handleIndex(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
}

function handleLesson(req, res) {
	var lessonNumber = req.params.id;
	res.sendFile(path.join(__dirname+'/lesson'+lessonNumber+'.html'));
}

function handleTest(res, req) {

}

app.listen(3000, function() {
	console.log('Server started on port 3000');
})