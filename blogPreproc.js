function blogPreproc(req) {
    //sanitize blog body;
    //set default values;
    var blog = req.body.blog;
    blog.body = req.sanitize(blog.body);
    if (!blog.image) {
        blog.image = "https://bit.ly/2sqk57B";
    }
    if (!blog.title) {
        blog.title = "Untitled";
    }
    if (!blog.body) {
        blog.body = "There is nothing here.";
    }
}

module.exports = blogPreproc;