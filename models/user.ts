import mongoose, {Schema} from "mongoose";

const taskSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    roles: {type: [String], default: []}
});

export const User = mongoose.model('User', taskSchema, 'todo-users');