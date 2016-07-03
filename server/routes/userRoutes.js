'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var User = require("../Model/User");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

let router = express.Router();
const saltRounds = 13;

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
				console.error(err);
			} else{
				res.status(200).end();
			}
		});
	});
});


router.post('/auth', function(req, res){
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if(err){
			console.error(err);
			res.status(500).json({err: err});
		} else if(!user){
			res.json({err:"user not found"});
		} else {
			bcrypt.compare(req.body.password, user.password, function(err, match){
				if(!match){
					res.json({err:"Incorrect password"});
				} else{
					//Simply using the user object returned from the query adds an excessive amount
					//of data to the payload for some reason, so I'm individually assigning stuff like
					//{id: user.id} instead
					var token = jwt.sign({
						id:user.id,
						email:user.email,
						admin:user.admin
					}, req.app.get('superSecret'),{expiresIn: "24h"});
					res.status(200).json({token:token});
				}
			});
		}
	});
});

module.exports = router;