
const appUtils=require('../appUtils.js');
const config=require('../config.js');

const dynamoDbClient=appUtils.getDynamoDbClient();

var createBlog = async function(event, context){
    console.log('createBlog is executing...')
    let _parsed;
    try {
      _parsed = JSON.parse(event.body);
    } catch (err) {
      console.error(`could not parse requested JSON ${event.body}: ${err.stack}`);
      return {
        statusCode: 500,
        headers: config.commonHeaders,
        body: `could not parse requested JSON: ${err.stack}`
      };
    }
    const { blogId, startTime, presenterId, blogDescription,blogCategory } = _parsed;
  
    const params = {
      TableName: config.BLOG_TABLE,
      Item: {
        blogId, startTime, presenterId, blogDescription,blogCategory
      }
    };
  
    try {
      const data = await dynamoDbClient.put(params).promise();
      console.log(`blog created successfully: data=${JSON.stringify(data)}`);
      return { 
        statusCode: 200,
        headers: config.commonHeaders,
        body: JSON.stringify(params.Item) };
    } catch (error) {
      console.log(`error was occured while creating blog: ERROR=${error.stack}`);
      return {
        statusCode: 400,
        headers: config.commonHeaders,
        body: `could not create blog: error= ${error.stack}`
      };
    }
  
};

module.exports.createBlog=createBlog;