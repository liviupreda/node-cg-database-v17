// DB seeding file. clears DB and populates it with some campgrounds

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Granite Hill",
		image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500",
		description: "Sed placerat interdum velit id fringilla. Aliquam cursus lorem eu odio efficitur consequat a et erat. Cras quis dapibus nisl, sit amet ultricies risus. In viverra et leo et bibendum. Fusce dictum justo velit, a feugiat augue molestie sed. Donec egestas in ex vel auctor. Proin et dui iaculis, suscipit purus in, varius nulla. Morbi nec risus consectetur, blandit sem sit amet, feugiat tortor. Nunc facilisis risus id libero gravida, efficitur ultricies nulla imperdiet. In hac habitasse platea dictumst. Ut sed dolor vel mi varius venenatis. Etiam nec dignissim felis. Aliquam et arcu posuere, ornare nisl ac, tincidunt nisi. Ut ut pharetra ipsum, eu posuere lacus. Aenean vel rutrum sem."
	},
	{
		name: "Salmon Creek", 
		image: "https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500",
		description: "Sed placerat interdum velit id fringilla. Aliquam cursus lorem eu odio efficitur consequat a et erat. Cras quis dapibus nisl, sit amet ultricies risus. In viverra et leo et bibendum. Fusce dictum justo velit, a feugiat augue molestie sed. Donec egestas in ex vel auctor. Proin et dui iaculis, suscipit purus in, varius nulla. Morbi nec risus consectetur, blandit sem sit amet, feugiat tortor. Nunc facilisis risus id libero gravida, efficitur ultricies nulla imperdiet. In hac habitasse platea dictumst. Ut sed dolor vel mi varius venenatis. Etiam nec dignissim felis. Aliquam et arcu posuere, ornare nisl ac, tincidunt nisi. Ut ut pharetra ipsum, eu posuere lacus. Aenean vel rutrum sem."
	},
	{
		name: "Mountain Goat's Rest", 
		image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500",
		description: "Sed placerat interdum velit id fringilla. Aliquam cursus lorem eu odio efficitur consequat a et erat. Cras quis dapibus nisl, sit amet ultricies risus. In viverra et leo et bibendum. Fusce dictum justo velit, a feugiat augue molestie sed. Donec egestas in ex vel auctor. Proin et dui iaculis, suscipit purus in, varius nulla. Morbi nec risus consectetur, blandit sem sit amet, feugiat tortor. Nunc facilisis risus id libero gravida, efficitur ultricies nulla imperdiet. In hac habitasse platea dictumst. Ut sed dolor vel mi varius venenatis. Etiam nec dignissim felis. Aliquam et arcu posuere, ornare nisl ac, tincidunt nisi. Ut ut pharetra ipsum, eu posuere lacus. Aenean vel rutrum sem."
	}
]

function seedDB(){
	// remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed campgrounds");	
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err,campground){
				if (err){
					console.log(err);
				} else {
					console.log("added a campground");
					// create a comment for each campground
					Comment.create(
						{
							text: "Generic campground comment, review",
							author: "Liviu"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
				}
			});
		});		
	});
	// add a few comments
}
module.exports = seedDB;

