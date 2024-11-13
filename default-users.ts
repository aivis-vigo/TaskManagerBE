// @ts-ignore
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertUsers() {
    const client = new MongoClient(process.env.ATLAS_URI);

    try {
        await client.connect();

        const db = client.db('angular-todo');
        const collection = db.collection('todo-users');

        const users = [
            {
                firstName: 'John',
                lastName: 'Doe',
                username: 'john_doe',
                password: 'john123',
                role: ['User']
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                username: 'jane_doe',
                password: 'jane123',
                role: ['User']
            },
            {
                firstName: 'Jake',
                lastName: 'Doe',
                username: 'jake_doe',
                password: 'jake123',
                role: ['User', 'Admin']
            }
        ];

        const result = await collection.insertMany(users);
        console.log(`${result.insertedCount} users inserted successfully`);
    } catch (error) {
        console.error('Error inserting users:', error);
    } finally {
        await client.close();
    }
}

insertUsers();
