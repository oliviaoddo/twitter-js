const express = require('express');

const app = express();

app.listen(3000, function(){
    console.log("server listening");
});

app.use((req, res, next) => {
    console.log(req.method, req.path, res.statusCode);
    next();
});


app.get('/news', (req, res) => {
    res.send('<h1>News</h1');
    res.end();
});


app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1');
    res.end();
});

