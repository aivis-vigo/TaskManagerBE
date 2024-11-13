import mongoose, {Schema} from "mongoose";

const roleSchema: Schema = new Schema({
    name: String,
});

export const Role = mongoose.model('Role', roleSchema, 'user-roles');