var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');

router.get('/',function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index',{campgrounds:campgrounds});
		}
	});


	//res.render('campgrounds',{campgrounds:campgrounds});
	// we are passing an object for frontend    {name,data}
	//here, data is the campgrounds array
	//and we can give any name to it for using it in frontend
});

router.post('/',isLoggedIn,function(req,res){
	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,image:image,description:desc,author:author};
	
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

router.get('/new',isLoggedIn,function(req,res){
	res.render('campgrounds/new');
});



//show more info about one campground
router.get('/:id',function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			console.log(foundCampground);
			res.render('campgrounds/show',{campground:foundCampground});
		}
	});

	
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


module.exports=router;

