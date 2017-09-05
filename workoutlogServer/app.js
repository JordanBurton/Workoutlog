var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

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

app.use(bodyParser.json());

app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			})
		},
		function createError(err){
			res.send(500, err.message);
		}
	)
});