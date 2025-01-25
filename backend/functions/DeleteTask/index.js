const AWS = require('aws-sdk');
const { TABLE_NAME } = require('/opt/nodejs/constants');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    try {
        // Extract id from query parameters
        const id = event.pathParameters?.id;

        // Check if id field is filled
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'ID is required' }),
            };
        }

        // Specify the task to delete based on the id
        const params = {
            TableName: TABLE_NAME,
            Key: { id: id },
        };
        // Perform delete operation
        const result = await dynamo.delete(params).promise();
        console.log('Delete Result:', result);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Task deleted successfully', id })
        };
    } catch (error) {
        console.error('Error deleting task:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete task', error: error.message }),
        };
    }
};