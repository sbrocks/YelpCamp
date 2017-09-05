var express =require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment=require('./models/comment');
var seedDB=require('./seeds');
var port=3000||process.env.PORT;

var app=express();

seedDB();

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('landing');
});

app.get('/campgrounds',function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index',{campgrounds:campgrounds});
		}
	})


	//res.render('campgrounds',{campgrounds:campgrounds});
	// we are passing an object for frontend    {name,data}
	//here, data is the campgrounds array
	//and we can give any name to it for using it in frontend
});

app.post('/campgrounds',function(req,res){
	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name,image:image,description:desc};
	
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new',function(req,res){
	res.render('campgrounds/new');
});



//show more info about one campground
app.get('/campgrounds/:id',function(req,res){
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

// =====================================
// COMMENTS ROUTES
// =====================================

app.get('/campgrounds/:id/comments/new',function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render('comments/new',{campground:campground});
		}
	});
});

app.post('/campgrounds/:id/comments',function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			});
		}
	});

});

app.listen(port,function(){
	console.log('YelpCamp server is running on port'+port);
});