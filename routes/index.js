var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing");
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

//================================
// AUTH ROUTES
//================================

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

// handles signup logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			req.flash("error", err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to CgDB, " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// show login form
router.get("/login", function(req,res){
	res.render("login");
});

//handle login logic, passport middleware
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req,res){// nothing happening here	
});

// logout route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "You are now logged out");
	res.redirect("/campgrounds");
});

module.exports = router;
