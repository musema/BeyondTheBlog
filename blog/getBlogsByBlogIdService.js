
const appUtils=require('../appUtils.js');
const config=require('../config.js');

const dynamoDbClient=appUtils.getDynamoDbClient();

var getBlogsByBlogId = async function(event, context){

  if (!(event.pathParameters.blogId)) {//event.pathParameters !== null && event.pathParameters !== undefined
    return {
      statusCode: 404,
      headers: config.commonHeaders,
      body: `no blogId in path parameters: ${JSON.stringify(event.pathParameters)}`
    };
  }

  const params = {
    TableName: config.BLOG_TABLE,
    Key: { blogId: event.pathParameters.blogId }
  };

  try {
    const data = await dynamoDbClient.get(params).promise();
    if (!data || typeof data === 'undefined' || !data.Item) {
      console.log(`getBlogsByBlogId did not find blogId=${event.pathParameters.blogId}`);
      return {
        statusCode: 404,
        headers: config.commonHeaders,
        body: `could not find blog for blogId: ${event.pathParameters.blogId}`
      }
    } else {
      console.log(`getBlogsByBlogId data=${JSON.stringify(data.Item)}`);
      return { 
        statusCode: 200,
        headers: config.commonHeaders,
        body: JSON.stringify(data.Item) };
    }
  } catch (error) {
    console.log(`getBlogsByBlogId ERROR=${error.stack}`);
    return {
      statusCode: 400,
      headers: config.commonHeaders,
      body: `could not retrieve blog: ${error.stack}`
    };
  }
};

module.exports.getBlogsByBlogId=getBlogsByBlogId;