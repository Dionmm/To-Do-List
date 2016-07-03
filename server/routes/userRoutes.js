'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var User = require("../Model/User");
var jwt = require('jsonwebtoken');

let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/auth', function(req, res){
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if(err){
			console.error(err);
		} else if(!user){
			res.json({message:"user not found", err: err});
		} else {
			if (user.password != req.body.password){
				res.json({message:"Incorrect password", err:err});
			} else{
				//Simply using the user object returned from the query adds an excessive amount
				//of data to the payload for some reason, so I'm individually assigning stuff like
				//{id: user.id} instead
				var token = jwt.sign({
					id: user.id,
					email: user.email,
					admin: user.admin
				}, req.app.get('superSecret'),{expiresIn: "24h"});
				res.json({success: true, token:token, user:user});
			}
		}
	});
});

module.exports = router;