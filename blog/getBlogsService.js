
const appUtils=require('../appUtils.js');
const config=require('../config.js');

const dynamoDbClient=appUtils.getDynamoDbClient();

var getBlogs = async function(event, context){

  const params = {
    TableName: config.BLOG_TABLE
  };

  try {
    const data = await dynamoDbClient.scan(params).promise();
      console.log(`blogs=${JSON.stringify(data.Items)}`);
      return { 
        statusCode: 200,
        headers: config.commonHeaders,
        body: JSON.stringify(data.Items) 
        };
    
  } catch (error) {
    console.log(`could not retrieve blogs=${error.stack}`);
    return {
      statusCode: 400,
      headers: config.commonHeaders,
      body: `could not retrieve blogs: ${error.stack}`
    };
  }
};

module.exports.getBlogs=getBlogs;