const express = require('express');
var socketio = require('socket.io');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();


const server = app.listen(3000);
const io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.set('view engine', 'html');
app.use(express.static('public'));
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});


var locals = {
	title: 'People',
	people: [
		{name: 'Olivia'},
		{name: 'Alex'},
		{name: 'Karen'}
		]
};


app.use('/', routes(io));

app.use((req, res, next) => {
    console.log(req.method, req.path, res.statusCode);
    next();
});

nunjucks.render('index.html', locals, function(err, res){
	if (err){
		throw err;
	}
	console.log(res);
});

