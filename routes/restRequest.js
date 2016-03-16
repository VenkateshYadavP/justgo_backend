/*

--------------------------------------------------------------------------------------------------------------------------------------------
Name of Module: Cast Iron Common Module 
Purpose:Common Module for connecting to Cast Iron
Input Parameters:
Outut Parameters:

Change History Log
--------------------------------------------------------------------------------------------------------------------------------------------
Date        User        Change Ref. #       Purpose
12/23/2014  IBM         Initial             Initial
--------------------------------------------------------------------------------------------------------------------------------------------
*/
var request = require('request');
exports.GET = function(options, def, callback){
	request(options, function(err, res, body){
		if(!err && res.statusCode == 200 && body){
			var body=JSON.parse(body);
			console.log(options.ratingtype);
			body.ratingtype=options.ratingtype;
			callback(body);
			
			return;
		}
		else{
			var def="{\"status\":\"FAILED\"}";
			callback(def);
			console.log("def value taken");
			console.log("error is" + err);
			return;
		}
	});
};
exports.GETPlaces = function(options, def, callback){
	request(options, function(err, res, body){
		if(!err && res.statusCode == 200 && body){
			callback(body);
			
			return;
		}
		else{
			var def="{\"status\":\"FAILED\"}";
			callback(def);
			console.log("def value taken");
			console.log("error is" + err);
			return;
		}
	});
};