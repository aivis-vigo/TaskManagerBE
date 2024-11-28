// @ts-ignore
const {MongoClient} = require('mongodb');
require('dotenv').config();

async function insertLanguages() {
    const client = new MongoClient(process.env.ATLAS_URI);

    try {
        await client.connect();

        const db = client.db('angular-todo');
        const collection = db.collection('translations');

        const languages = [
            {
                'language': 'lv',
                "navigationBar": {
                    "task": {
                        "listName": "Uzdevumi",
                        "create": "Jauns uzdevums",
                        "listUser": "Lietotāji"
                    },
                    "group": {
                        "list": "Grupu Saraksts",
                        "create": "Izveidot Grupu",
                    },
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
                    "assignedToUser": "Piešķirts",
                    "assignedToGroup": "Atbildīgā komanda",
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
                    "task": {
                        "listName": "Task List",
                        "create": "Create Task",
                        "listUser": "User List"
                    },
                    "group": {
                        "list": "Group List",
                        "create": "Create Group",
                    },
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
                    "assignedToUser": "Assigned To User",
                    "assignedToGroup": "Group Responsible:",
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
