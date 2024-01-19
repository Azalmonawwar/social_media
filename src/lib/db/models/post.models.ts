import {Schema , model , models , Document} from "mongoose";


export interface IPost extends Document {
    user: string;
    caption: string;
    image: string;
    imageId:string;
    location: string;
    tags:string;
    likes: string[];
    comments: string[];
    createdAt: Date;
}

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    caption: {
        type: String,
        
    },
    image: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    tags: {
        type: String,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post =  models.Post || model<IPost>("Post", PostSchema);

export default Post;