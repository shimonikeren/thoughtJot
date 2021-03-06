const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./../models');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

router.post('/addUser', function(request, response){
    var name = request.body.name;
    var email = request.body.email;
	var password = request.body.password;
	console.log(name);
	console.log(email);

	function checkEmail(email){

		console.log("starting to check the email");
		db.Users.findOne({
			where: {
				email: email
			}
		}).then(function(data){

			if(data == null){
				console.log("starting to add user")
				addUser(name, email, password);
			} else {
				console.log("else thrown")
				throw {error: 1}
			}
		}).catch(function(error){
			console.log(error);
			response.status(422);
			response.json({ 
				message: "There was an error.", 
				data: {email: "This email is already in use."}});
			return;
		})
	}

	function addUser(name, email, password){
		console.log("adding user");
		bcrypt.hash(password, 10, function(err, password) {

			db.Users.create({
                name: name,
				email: email,
				password: password
			}).then(function(data){
				console.log('created user')
				response.status(200);
				response.json(data);
			}).catch(function(error){
				console.log("did not create user")
				console.log(error);
				response.status(500);
			});
			
		});
	}
	checkEmail(email);
})

module.exports = router;