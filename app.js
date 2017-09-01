var express =require('express');
var bodyParser=require('body-parser');
var port=3000||process.env.PORT;

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds=[
		{name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
		{name:"Granite Hill",image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
		{name:"Mountain Goat's",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},{name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
		{name:"Granite Hill",image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
		{name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
		{name:"Granite Hill",image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"}
		
];

app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('landing');
});

app.get('/campgrounds',function(req,res){
	
	res.render('campgrounds',{campgrounds:campgrounds});
	// we are passing an object for frontend    {name,data}
	//here, data is the campgrounds array
	//and we can give any name to it for using it in frontend
});

app.post('/campgrounds',function(req,res){
	//get data from form and add to campgrounds array
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name,image:image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new',function(req,res){
	res.render('new');
});

app.listen(port,function(){
	console.log('YelpCamp server is running on port'+port);
});