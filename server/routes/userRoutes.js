'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var User = require("../Model/User");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var path = require('path');

let router = express.Router();
const saltRounds = 13;

var smtpConfig = {
    host: 'smtp.gmail.com',
    auth: {
        user: 'orangebees68@gmail.com',
        pass: 'BigHoney68'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/register', function(req, res){
	bcrypt.hash(req.body.password, saltRounds, function(err, passwordHash){
		var user = new User({
			email: req.body.email.toLowerCase(),
			password: passwordHash,
			admin: false
		});
		user.save(function(err){
			if(err){
				res.status(500).json({err:err});
			} else{
				res.status(200).end();
			}
		});
	});
});


router.post('/auth', function(req, res){
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if(err){
			res.status(500).json({err: err});
		} else if(!user){
			res.json({err:"User not found"});
		} else {
			bcrypt.compare(req.body.password, user.password, function(err, match){
				if(!match){
					res.json({err:"Incorrect password"});
				} else{
					var token = jwt.sign({id: user.id}, req.app.get('superSecret'),{expiresIn: "24h"});
					res.status(200).json({token:token});
				}
			});
		}
	});
});

router.post('/forgot', function(req, res){
	//Search for the email address the user entered for the password reset
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if(err){
			res.status(500).json({err: err});
		} else if(!user){
			res.json({err:"Email address not found"});
		} else {
			//Check there is a connection to the email account
			transporter.verify(function(err) {
				if(err){
					res.status(500).json({err:err});
				} else{
					//Create a unique token
					var token = jwt.sign({email: user.email}, req.app.get('superSecret'),{expiresIn: "24h"});

					transporter.sendMail({
					from: 'orangebees68@gmail.com',
					  to: user.email,
					  subject: 'Password Change Request',
					  text: 'Go fuck yourself, remember your password next time you idiot. http://localhost:3000/user/forgot/' + token
					});

					//Save the token in the DB for reference later 
					user.passwordChangeToken = token;
					user.save(function(err){
			          if(err){
			            res.status(500).json({"err": err});
			          } else{
			            res.status(200).end();
			          }
			        });
				}
			});


			res.status(200).end();

		}
	});
});
//TODO: respond with a webpage here
router.get('/forgot/:token', function(req, res){
	res.sendFile(path.join(__dirname,'../../public/index.html'));
});

router.post('/forgot/:token', function(req, res){
	User.findOne({passwordChangeToken: req.params.token}, function(err, user){
		if(err){
			res.status(500).json({err: err});
		} else if(!user){
			res.json({err:"Token not found"});
		} else {
			bcrypt.hash(req.body.password, saltRounds, function(err, passwordHash){
				user.password = passwordHash;
				user.passwordChangeToken = null;
				user.save(function(err){
					if(err){
						res.status(500).json({err:err});
					} else{
						res.status(200).end();
					}
				});
			});
		}
	});
});


module.exports = router;

























