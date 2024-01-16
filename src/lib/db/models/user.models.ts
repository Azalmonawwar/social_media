import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

type NextFunction = (err?: any) => void;

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
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
  onboarding: boolean;
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
    onboarding: {
        type: Boolean,
        default: false,
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
//encrypt password using bcrypt
UserSchema.pre("save", async function (this: IUser, next: NextFunction) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
  
    this.password = hash;
    next();
  });
  
  //compare password
UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };
const User = models.User || model<IUser>("User", UserSchema);

export default User;
