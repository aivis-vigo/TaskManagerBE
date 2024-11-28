import mongoose, {Schema} from "mongoose";

const roleSchema: Schema = new Schema({
    title: String,
    description: String,
    members: {type: [String], default: []}
});

export const Group = mongoose.model('Group', roleSchema, 'groups');