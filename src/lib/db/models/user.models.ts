import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar: string | null;
  followers: string[];
  following: string[];
  posts: string[];
  likes: string[];
  comments: string[];
  isVerified: boolean;
  verificationToken: string;
  resetToken: string;
  resetTokenExpiry: number;
  createdAt: Date;
  bio: string;
  dob: Date;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true,
        unique: true,
        toLowerCase: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        trim: true,
        unique: true,
        toLowerCase: true,
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    followers: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    following: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    posts: [
        {
        type: Schema.Types.ObjectId,
        ref: "Post",
        },
    ],
    likes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Post",
        },
    ],
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        },
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: "",
    },
    resetToken: {
        type: String,
        default: "",
    },
    resetTokenExpiry: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bio: {
        type: String,
        default: "",
    },
    dob: {
        type: Date,
        default: null,
    },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
