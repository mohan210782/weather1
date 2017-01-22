var weather = require ('openweathermap');
var loc = require('./models/weather.js');
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.post('/test', function(req, res) {
		//console.log(req.body);
		//res.sendfile('./public/index.html');
		//weather.defaults {"units":"metric", "lang":"de", "mode":"json"}
		var exists = 0;
		var location_id = "";
		var weatherPrevious = {};
		 loc.findOne({"location":req.body.location}, function (err, post) {
			 if(err){
				 console.log("err",err);
			 }else{
				 console.log("first already post", post);
				  if(post == '' || post == null ){
					  console.log("no data");
				  }else{
				exists = 1;
				location_id = post._id;
				console.log("already", post);
				console.log(location_id);
				weatherPrevious = JSON.parse(post.weather_data);
				}
			 }
			 
			 
		 });
		var stt = {
			units: 'internal',
			lang:  'en',
			mode:  'json',
			q:     req.body.location,
			APPID: "6b2e916800ceaf95d4d38ec9a158420f"

		}
		weather.now(stt,function(err,post){
			 if (err){
            console.log("err",err);
			 }else{
				 //console.log("post",post);
				 var weatherData = {
					 "location":req.body.location,
					 "weather_data" : JSON.stringify(post),
					 };

					 if( exists == 1){
						 console.log(location_id);
						  loc.findByIdAndUpdate({_id:location_id}, weatherData, function (err, post) {
							if (err) {
							console.log({
								"message": "Update failed",
								"weather" :post,
								"error" : err
								});
							}else{

							console.log(
								{
									"message":"Updated successfully",
									"weather" :post,
									"status": 1
								}
								);
							}
							
						});

					 }else
					 {
						 	loc.create(weatherData, function (err, post) {
							console.log("update");
							if (err){
								
								console.log({
											"message": "Added failed",
											"weather" :post,
											"error" : err
											});
							}else{
								console.log({
											"message": "Added success",
											"weather" :post,
											"error" : err
											});
							}
						});

					 }
				 var wetrData = {
					 "previous":weatherPrevious,
					 "current" : post
				 };
				 res.json(wetrData);
			 }
			//res.json(res)
		});
		//res.send({"test": "ok"});
	});

};