import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

const Blog = model('Blog', blogSchema);
export { Blog };