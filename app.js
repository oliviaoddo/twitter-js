const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

app.set('view engine', 'html');
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

app.listen(3000, function(){
    console.log('server listening');
});


app.use((req, res, next) => {
    console.log(req.method, req.path, res.statusCode);
    next();
});

app.get('/', (req, res) => {
    res.render('index', locals);
    // res.end();
});

app.get('/news', (req, res) => {
    res.send('<h1>News</h1');
    // res.end();
});


nunjucks.render('index.html', locals, function(err, res){
	if (err){
		throw err;
	}
	console.log(res);
});

