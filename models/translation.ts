import mongoose, {Schema} from "mongoose";

const taskSchema: Schema = new Schema({
    language: String,
    navigationBar: {
        task: {
            listName: String,
            create: String,
            listUser: String
        },
        login: String,
        register: String
    },
    loginForm: {
        username: String,
        password: String
    },
    registerForm: {
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        confirmPassword: String
    },
    createTaskForm: {
        title: String,
        description: String,
        type: String,
        status: String,
        createdOn: String,
        assignedTo: String
    },
    editUserForm: {
        firstName: String,
        lastName: String,
        username: String,
        role: String
    },
    userList: {
        title: String
    },
    button: {
        login: String,
        register: String,
        logout: String,
        create: String,
        update: String
    }
});

export const Translation = mongoose.model('Translation', taskSchema, 'translations');