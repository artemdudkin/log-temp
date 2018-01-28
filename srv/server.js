const connect = require('connect'),
      http = require('http'),
      serveStatic = require('serve-static'),    
      bodyParser = require('body-parser'),
      compression = require('compression');
    
const {log2, get2:get3} = require('./srv_log2');




console.log('home dir == ' + process.cwd());

var app = connect();

app.use(compression());

//static files
app.use(serveStatic('./'));

//json dynamic data
app.use(bodyParser.json())
    .use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
   
		console.log('<< ' + req.url);

	if (req.url.indexOf('/log?') >= 0) {
		log2(req, (data) => {
			console.log('>> ' + JSON.stringify(data));
			//emulate ping 1000ms
			//setTimeout(function() {
			res.end(JSON.stringify(data));
			//}, 1000);
		});
	} else
	if (req.url.indexOf('/get3?') >= 0) {
		get3(req, (data) => {
			console.log('>> ' + JSON.stringify(data));
			//emulate ping 1000ms
			//setTimeout(function() {
			res.end(JSON.stringify(data));
			//}, 1000);
		});
	} else
	{
		console.log('>> not found');
		next();
	}
    });

http.createServer(app).listen(8089);
