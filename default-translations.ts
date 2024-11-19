// @ts-ignore
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertLanguages() {
    const client = new MongoClient(process.env.ATLAS_URI);

    try {
        await client.connect();

        const db = client.db('angular-todo');
        const collection = db.collection('translations');

        const languages = [
            {
                "language": "lv",
                "navigationBar": {
                    "task-list": "Uzdevumi",
                    "create-task": "Jauns uzdevums",
                    "user-list": "Lietotāji",
                    "login": "Ienākt",
                    "register": "Reģistrēties"
                },
                "loginForm": {
                    "username": "Lietotājvaŗds",
                    "password": "Parole"
                },
                "registerForm": {
                    "firstName": "Vārds",
                    "lastName": "Uzvārds",
                    "username": "Lietotājvārds",
                    "password": "Parole",
                    "confirmPassword": "Atkārtot paroli"
                },
                "createTaskForm": {
                    "title": "Tituls",
                    "description": "Apraksts",
                    "type": "Tips",
                    "status": "Statuss",
                    "createdOn": "Izveidots",
                    "assignedTo": "Piešķirts"
                },
                "editUserForm": {
                    "firstName": "Vārds",
                    "lastName": "Uzvārds",
                    "username": "Lietotājvārds",
                    "role": "Piekļuve"
                },
                "userList": {
                    "title": "Datubāzē reģistrētie lietotāji:"
                },
                "button": {
                    "login": "Pieslēgties",
                    "register": "Reģistrēties",
                    "logout": "Iziet",
                    "create": "Izveidot",
                    "update": "Atjaunināt"
                }
            },
            {
                "language": "en",
                "navigationBar": {
                    "task-list": "Task List",
                    "create-task": "Create Task",
                    "user-list": "User List",
                    "login": "Login",
                    "register": "Register"
                },
                "loginForm": {
                    "username": "Username",
                    "password": "Password"
                },
                "registerForm": {
                    "firstName": "First name",
                    "lastName": "Last name",
                    "username": "Username",
                    "password": "Password",
                    "confirmPassword": "Confirm Password"
                },
                "createTaskForm": {
                    "title": "Title",
                    "description": "Description",
                    "type": "Type",
                    "status": "Status",
                    "createdOn": "Created On",
                    "assignedTo": "Assigned To"
                },
                "editUserForm": {
                    "firstName": "First name",
                    "lastName": "Last name",
                    "username": "username",
                    "role": "Role"
                },
                "userList": {
                    "title": "Users registered in the database:"
                },
                "button": {
                    "login": "Login",
                    "register": "Register",
                    "logout": "Logout",
                    "create": "Create",
                    "update": "Update"
                }
            }
        ];

        const result = await collection.insertMany(languages);
        console.log(`${result.insertedCount} translations inserted successfully`);
    } catch (error) {
        console.error('Error inserting translations:', error);
    } finally {
        await client.close();
    }
}

insertLanguages();
