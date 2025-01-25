const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { TABLE_NAME } = require('/opt/nodejs/constants');

exports.handler = async (event) => {
    try {
        // Extract id from query parameters
        const id = event.pathParameters?.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Task ID required' })
            };
        }

        const params = {
            TableName: TABLE_NAME,
            Key: {
                id: id,
            },
        };
        const result = await dynamo.get(params).promise();
        console.log('Task:', JSON.stringify(result));

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Task not found' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error fetching task',
                error
            }),
        };
    }
};