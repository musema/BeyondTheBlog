
const appUtils=require('../appUtils.js');
const config=require('../config.js');

const dynamoDbClient=appUtils.getDynamoDbClient();

var getBlogsByBlogId= async function(event, context){

    
  if (!("queryStringParameters" in event) || !(event.queryStringParameters)) {
    return {
      statusCode: 404,
      error: `no Query String`
    };
  }
  if (!(event.queryStringParameters.blogId)) {
    return {
      statusCode: 404,
      error: `no blogId in Query String: ${JSON.stringify(event.queryStringParameters)}`
    };
  }

  const params = {
    TableName: config.BLOG_TABLE,
    Key: { blogId: event.queryStringParameters.blogId }
  };

  try {
    const data = await dynamoDbClient.get(params).promise();
    if (!data || typeof data === 'undefined' || !data.Item) {
      console.log(`getBlogsByBlogId did not find blogId=${event.queryStringParameters.blogId}`);
      return {
        statusCode: 404,
        error: `could not find message for blogId: ${event.queryStringParameters.blogId}`
      }
    } else {
      console.log(`getBlogsByBlogId data=${JSON.stringify(data.Item)}`);
      return { statusCode: 200, body: JSON.stringify(data.Item) };
    }
  } catch (error) {
    console.log(`getBlogsByBlogId ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `could not retrieve message: ${error.stack}`
    };
  }
};

module.exports.getBlogsByBlogId=getBlogsByBlogId;