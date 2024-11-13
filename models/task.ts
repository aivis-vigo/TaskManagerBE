import mongoose, {Schema} from "mongoose";

const taskSchema: Schema = new Schema({
    title: String,
    description: String,
    type: String,
    createdOn: String,
    status: String,
    assignedTo: String
});

export const Task = mongoose.model('Task', taskSchema, 'todo-application');