// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Weather', {
	location : {type : String, default: ''},
    weather_data: String,
    created_at: { type: Date, default: Date.now }
});
