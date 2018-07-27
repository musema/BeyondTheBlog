
const appUtils=require('../appUtils.js');
const config=require('../config.js');

const dynamoDbClient=appUtils.getDynamoDbClient();

var getBlogsByPresenterId = async function(event, context){
    if (!("pathParameters" in event) || !(event.pathParameters)) {
        return {
          statusCode: 404,
          headers: config.commonHeaders,
          error: `no pathParameters`
        };
      }
      if (!(event.pathParameters.presenterId)) {
        return {
          statusCode: 404,
          headers: config.commonHeaders,
          error: `no presenterId in Query String: ${JSON.stringify(event.pathParameters)}`
        };
      }
    
      const params = {
        TableName: config.BLOG_TABLE,
        IndexName: "presenterIndex",
        KeyConditionExpression: "presenterIndex = :presenterIndex",
        ExpressionAttributeValues: {
            ":presenterIndex": event.pathParameters.presenterIndex
        }
      };
    
      try {
        const data = await dynamoDbClient.query(params).promise();
        console.log(`getBlogsByPresnterId data=${JSON.stringify(data.Items)}`);
        return { 
          statusCode: 200,
          headers: config.commonHeaders,
          body: JSON.stringify(data.Items) 
        };
      } catch (error) {
        console.log(`getBlogsByPresnterId ERROR=${error.stack}`);
        return {
          statusCode: 400,
          headers: config.commonHeaders,
          error: `could not query blogs with presnterId ${event.pathParameters.presenterId}: ${error.stack}`
        };
      }  
};

module.exports.getBlogsByPresenterId=getBlogsByPresenterId;