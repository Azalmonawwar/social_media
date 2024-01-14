import { Schema,model,models,Document } from "mongoose";

export interface ISaved extends Document{
    user:string;
    post:string;
    createdAt:Date;
}

const SavedSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const Saved = models.Saved || model<ISaved>("Saved",SavedSchema);

export default Saved;