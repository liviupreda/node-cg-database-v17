var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware goes in this object
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if (err || !foundCampground){ //null is falsy, ergo !null is truthy
				req.flash("error", "Campground not found");
				res.redirect("/campgrounds");
			} else {
				// does user own cg (authorized to edit)?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("/campgrounds");
				}				
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("/campgrounds");
	}		
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				// does user own comment (authorized to edit)?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}				
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}		
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;