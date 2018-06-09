var mongoose    =   require("mongoose");
var express     =   require("express");
var app         =   express();
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Blog = require("./models/blog");
var blogPreproc = require("./blogPreproc");

app.use(express.static("public"));
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost/my_blog");

//route-HOME
app.get("/", function(req, res) {
    res.redirect("/blogs");
})

//route-INDEX
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
})

//route-CREATE
app.post("/blogs", function(req, res) {
    blogPreproc(req);
    Blog.create(req.body.blog, function(err, newBlog){
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//route-NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//route-SHOW
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if (err) {
            console.log("Error");
        } else {
            res.render("show", {blog:blog});
        }
    })
});

//route-EDIT
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if (err) {
            console.log("Error");
        } else {
            res.render("edit", {blog:blog});
        }
    });
});

//route-UPDATE
app.put("/blogs/:id", function(req, res) {
    blogPreproc(req);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
        if (err) {
            console.log("Error");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

//route-DESTROY
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("Error");
        } else {
            res.redirect("/blogs");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running");
});