
const API_VERSION=process.env.API_VERSION;
const BLOG_TABLE = process.env.BLOG_TABLE;
const API_DEPLOY_REGION = process.env.API_DEPLOY_REGION;

const config={
    "API_VERSION":API_VERSION,
    "BLOG_TABLE":BLOG_TABLE,
    "API_DEPLOY_REGION":API_DEPLOY_REGION,
    "commonHeaders": {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Credentials': true
      }
};


module.exports=config;