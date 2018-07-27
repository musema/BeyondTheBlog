'use strict';
const createBlogService=require('./blog/createBlogService.js');
const getBlogService=require('./blog/getBlogsService.js');
const getBlogsByPresenterIdService=require('./blog/getBlogsByPresenterIdService.js');
const getBlogsByBlogIdService=require('./blog/getBlogsByBlogIdService.js');
//will add more files here

//POST:/blogs

module.exports.createBlog = async (event, context) => {
  return createBlogService.createBlog(event,context);
};

//GET:/blogs
module.exports.getBlogs = async (event, context) => {
  return getBlogService.getBlogs(event,context);
};

//GET /blogs/presenter/{presenterId}

module.exports.getBlogsByPresenterId = async (event, context) => {
  return getBlogsByPresenterIdService.getBlogsByPresenterId(event,context);
};


//GET: /blogs/{blogId}

module.exports.getBlogsByBlogId = async (event, context) => {
  return getBlogsByBlogIdService.getBlogsByBlogId(event,context);
};
//changes made here

