var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs = require('fs')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.crop_image);
app.get('/images/:id', routes.images);

// to be able to see the images after being saved
app.get('/uploads/full/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/routes/uploads/full/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});
app.get('/uploads/crop/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/routes/uploads/crop/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});
app.get('/uploads/thumb/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/routes/uploads/thumb/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
