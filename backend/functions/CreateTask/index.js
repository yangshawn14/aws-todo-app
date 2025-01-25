const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { task, isCompleted = false } = JSON.parse(event.body);
    const id = uuidv4();

    const params = {
        TableName: 'ToDoTable',
        Item: { id, task, isCompleted },
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ id, task, isCompleted }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};
