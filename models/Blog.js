import mongoose from 'mongoose';
import Comment from './Comment';

let BlogSchema = mongoose.Schema({
  subject: { type: String, required: true },
  image: { type: String },
  contents: [{ type: String }],
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

BlogSchema.pre('remove', async function (next) {
  try {
    await Comment.deleteMany({
      _id: {
        $in: this.comments,
      },
    });
  } catch (err) {}
});

let Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
