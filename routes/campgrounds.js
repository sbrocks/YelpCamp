var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');
var middleware=require('../middleware');
var stripe=require('stripe')('sk_test_ZEFynSjq4iBo8JduSGm8hDXT');

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

router.post('/',middleware.isLoggedIn,function(req,res){
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

router.get('/new',middleware.isLoggedIn,function(req,res){
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

//Payments
router.post('/:id/charge',function(req,res){
	res.send("Test");
	console.log(req.body);
	const amount=2500;

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount:amount,
		description:'Web Development Ebook',
		currency:'usd',
		customer:customer.id
	}))
	//.then(charge => res.render('success'));

});

//Edit campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render('campgrounds/edit',{campground:foundCampground});
	});	
});

//Update campground route
router.put('/:id',middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});

router.delete('/:id',middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds');
		}
	});
});



module.exports=router;

