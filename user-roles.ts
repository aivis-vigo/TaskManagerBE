// @ts-ignore
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertRoles() {
    const client = new MongoClient(process.env.ATLAS_URI);

    try {
        await client.connect();

        const db = client.db('angular-todo');
        const collection = db.collection('user-roles');

        const roles = [
            {
                name: 'User',
            },
            {
                name: 'Admin',
            },
            {
                name: 'Manager',
            },
        ];

        const result = await collection.insertMany(roles);
        console.log(`${result.insertedCount} roles inserted successfully`);
    } catch (error) {
        console.error('Error inserting roles:', error);
    } finally {
        await client.close();
    }
}

insertRoles();
