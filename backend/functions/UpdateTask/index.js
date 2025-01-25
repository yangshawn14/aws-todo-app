const AWS = require('aws-sdk');
const { TABLE_NAME } = require('/opt/nodejs/constants');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Retrieve the task ID from the path parameters
        const taskId = event.pathParameters?.id;
        console.log('Received taskId:', taskId);
        if (!taskId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Task ID is required' }),
            };
        }

        // Retrieve the updated task details from the request body
        const { task, isCompleted } = JSON.parse(event.body || "{}");
        console.log('Received body:', { task, isCompleted });

        // Build the update expression dynamically
        let updateExpression = "set";
        const expressionAttributeValues = {};

        if (task !== undefined) {
            updateExpression += ' task = :task,';
            expressionAttributeValues[':task'] = task;
        }

        if (isCompleted !== undefined) {
            updateExpression += ' isCompleted = :isCompleted,';
            expressionAttributeValues[':isCompleted'] = isCompleted;
        }

        // Remove trailing comma from updateExpression
        updateExpression = updateExpression.replace(/,$/, '');

        // If no attributes are provided return an error
        if (Object.keys(expressionAttributeValues).length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'No attributes to update' }),
            };
        }

        // Define the DynamoDB update parameters
        const params = {
            TableName: TABLE_NAME,
            Key: { id: taskId }, // Primary key lookup
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW',
        };

        // Update the task in DynamoDB
        const result = await dynamo.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (error) {
        console.error('Error updating task:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to update task', error: error.message }),
        };
    }
};