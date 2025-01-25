const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { TABLE_NAME } = require('/opt/nodejs/constants');

exports.handler = async (event) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await dynamo.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to get all tasks', error })
        };
    }
};
