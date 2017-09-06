var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import(__dirname + '\\models\\user');

app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));

User.sync(); // sync( {force: true}) WARNING: This will DROP the table!
app.use(require('./middleware/header'))

app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//opens port 3000
app.listen(3000, function(){
	console.log("app is listening on 3000")
});

User.sync();