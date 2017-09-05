var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment=require('./models/comment');


var data=[
	{
		name:"Cloud's Rest",
		image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
		description:"blah blah blah"
	},
	{
		name:"Dark Forest",
		image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
		description:"blah blah"
	},
	{
		name:"Hill Spot",
		image:"https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description:"blah blah blah"
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log('removed campgrounds');
			//add few campgrounds
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log('added a campground');
						//create a comment
						Comment.create({
							text:"This place is great, but I wish there was internet",
							author:"Shaury"
						},function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log(comment);
								console.log('Created a comment!');
							}
						});
					}
				});
			});
		}
	});
}

module.exports=seedDB;
