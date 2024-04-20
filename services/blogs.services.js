const blogModel = require('../models/blogModel');

const getBlogs= async () => {

    const blogs = await blogModel.find({})

    return {
        code: 200,
        success: true,
        message: ' blogs fetched successfully',
        data: {
            blogs
        }
    }
}

const createBlog= async (blog) => {

    const blogsFromRequest = blog;

    const newBlog = new blogModel();

    newBlog.title = blogsFromRequest.title;
    newBlog.body = blogsFromRequest.body;

    const savedBlog= await newBlog.save();

    return {
        code: 201,
        success: true,
        message: 'Blogs created successfully',
        data: {
            blog: savedBlog
        }
    }
}   

module.exports = {
    getBlogs,
    createBlog
}