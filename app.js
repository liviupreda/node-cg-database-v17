var express			= require("express"),
	app				= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	seedDB 			= require("./seeds"), 	// require DB seed file
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	User 			= require("./models/user"),
	methodOverride	= require("method-override"),
	flash 			= require("connect-flash-plus")

// required routes
var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 	 = require("./routes/index");


//mongoose.connect("mongodb://localhost:27017/cgdb_v16", { useNewUrlParser: true });
//mongoose.connect("mongodb+srv://liviu:caterinca@cluster0-rfqoo.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
//mongoose.connect("mongodb://liviu:caterinca@cluster0-rfqoo.mongodb.net", { useNewUrlParser: true });
//mongoose.connect(`mongodb://liviu:caterinca@cgdb-shard-00-00-rfqoo.mongodb.net:27017,cgdb-shard-00-01-rfqoo.mongodb.net:27017,cgdb-shard-00-02-rfqoo.mongodb.net:27017/test?retryWrites=true`);
//mongoose.connect("mongodb+srv://liviu:caterinca@cgdb-rfqoo.mongodb.net/test?retryWrites=true");

mongoose.connect("mongodb://heroku_wv16kztx:hte5ea8lj6c09n1klc9hrvlvh9@ds019826.mlab.com:19826/heroku_wv16kztx");

//mongodb+srv://liviu:<password>@cluster0-rfqoo.mongodb.net/test?retryWrites=true

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); // add connect-flash messages
//seedDB();

// configure passport
app.use(require("express-session")({
	secret: "Tanti mama lu' Nelutzu",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	// access flash msg in the EJS templates for 'error' with 'error'
	res.locals.error = req.flash("error");
	// access flash msg in the EJS templates for 'success' with 'success'
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log("CgDB Server running");
});


