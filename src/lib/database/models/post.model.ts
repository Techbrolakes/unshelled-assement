import mongoose from "mongoose";

export interface PostPojo extends mongoose.Document {
  name: string;
  color: string;
  capacity: string;
}

export interface PostDoc extends PostPojo {}
export type PostModel = mongoose.Model<PostDoc>;

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel =
  mongoose.models.Post || mongoose.model<PostDoc, PostModel>("Post", schema);

export default PostModel;
