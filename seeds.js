var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment=require('./models/comment');


var data=[
	{
		name:"Cloud's Rest",
		image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Dark Forest",
		image:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Hill Spot",
		image:"https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
