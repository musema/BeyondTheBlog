'use strict';
const createBlogService=require('./blog/createBlogService.js');
const getBlogsByPresenterIdService=require('./blog/getBlogsByPresenterIdService.js');
const getBlogsByBlogIdService=require('./blog/getBlogsByBlogIdService.js');

//POST:/blogs
module.exports.createBlog = async (event, context) => {
  return createBlogService.createBlog(event,context);
};


// /blogs/presenter/{presenterId}

module.exports.getBlogsByPresenterId = async (event, context) => {
  return getBlogsByPresenterIdService.getBlogsByPresenterId(event,context);
};


// /blogs?blogId=####

module.exports.getBlogsByBlogId = async (event, context) => {
  return getBlogsByBlogIdService.getBlogsByBlogId(event,context);
};


