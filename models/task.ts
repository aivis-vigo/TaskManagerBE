import mongoose, {Schema} from "mongoose";

const taskSchema: Schema = new Schema({
    id: Number,
    title: String,
    description: String,
    type: String,
    createdOn: String,
    status: String
});

export const Task = mongoose.model('Task', taskSchema, 'todo-application');