'use strict';

const AWS = require('aws-sdk');
const config=require('./config.js');

var getDynamoDbClient=function(){
    
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient({
        api_version: config.API_VERSION,
        region: config.API_DEPLOY_REGION
    });

    return dynamoDbClient;

}

module.exports.getDynamoDbClient=getDynamoDbClient;