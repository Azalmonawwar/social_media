import {Schema,model,models,Document} from "mongoose";

export interface IComment extends Document {
    text: string;
    user: string;
    post: string;
    replies: string[];
    createdAt: Date;
}

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);

export default Comment;