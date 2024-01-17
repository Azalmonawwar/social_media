"use server";
// Path: src/actions/user.action.ts
import * as z from "zod";
import User from "@/lib/db/models/user.models";
import { connectToDatabase } from "@/lib/db/connect";
import jwt from "jsonwebtoken";
import {cookies} from 'next/headers'
import { IUser } from "@/lib/types";
import { revalidatePath } from "next/cache";
import nodemailer from 'nodemailer'
import Post from "@/lib/db/models/post.models";
import { LoginValidation, SignupValidation } from "../validations";
import { sendMail } from "../utils/sendVerficationMail";
import bcrypt from "bcryptjs";
export const createUser = async (user: z.infer<typeof SignupValidation>) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (
      !user.name ||
      !user.username ||
      !user.password ||
      !user.email
    ) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }
    // check if user enter email or phone number
    if (!user.email) {
      const response = {
        status: false,
        message: "Please provide email ",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user already exists
    const existingUser = await User.findOne(
       { email: user.email }
    );

    if (existingUser) {
      const response = {
        status: false,
        message: "User already exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // create new user
    const newUser = new User(user);


    //generate token for isverificationtoken
    const verificationToken = jwt.sign({
      id: newUser._id,
    }
    , process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });


    //generate token for reset password
    const resetToken = jwt.sign({
      id: newUser._id,
    }, process.env.JWT_SECRET as string, {
      expiresIn: "365d",
    });

    // if token is not created
    if (!verificationToken) {
      const response = {
        status: false,
        message: "Token not created",
      };
      return JSON.parse(JSON.stringify(response));
    }

    //add token to user
    newUser.verificationToken = verificationToken;
    newUser.resetToken = resetToken;
    newUser.resetTokenExpiry = Date.now() + 365 * 24 * 60 * 60 * 1000;
    // save new user
    const saveduser = await newUser.save();
    //check if user is created or not
    if (!newUser) {
      const response = {
        status: false,
        message: "User not created",
      };
      return JSON.parse(JSON.stringify(response));
    }
    //send verification mail
    const mail = await sendMail(saveduser.email,saveduser.name,verificationToken);
    

    // return new user
    const response = {
      status: true,
      message: "Account created successfully, Please verify your email",
      data: saveduser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};


//verify user
export const verifyUser = async (token: string) => {
  try {
    await connectToDatabase();
    // check if token is provided
    if (!token) {
      const response = {
        status: false,
        message: "Please provide token",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne({ verificationToken: token });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // verify user
    const verifiedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { isVerified: true, verificationToken: "" },
      { new: true }
    );

    // if user is not verified
    if (!verifiedUser) {
      const response = {
        status: false,
        message: "User not verified",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return verified user
    const response = {
      status: true,
      message: "User verified successfully",
      data: verifiedUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

//login user
export const loginUser = async (user:z.infer<typeof LoginValidation>) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (!user.password || !user.email ) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }
    // check if user enter email or phone number
    if (!user.email) {
      const response = {
        status: false,
        message: "Please provide email or phone number",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne({
       email: user.email.toLowerCase()
    });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if password is correct
    const isMatch = await existingUser.comparePassword(user.password);

    if (!isMatch) {
      const response = {
        status: false,
        message: "Invalid credentials",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // if user is not verified
    if (!existingUser.isVerified) {
      const response = {
        status: false,
        message: "Please verify your email",
      };
      return JSON.parse(JSON.stringify(response));
    }
    //create token
    const token = jwt.sign(
      { id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
     },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // if token is not created
    if (!token) {
      const response = {
        status: false,
        message: "Token not created",
      };
      return JSON.parse(JSON.stringify(response));
    }

    //add token to cookies
    const cookie = cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        path: '/',
        });
        
    // return existing user
    const response = {
      status: true,
      message: "User logged in successfully",
      data: existingUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

type Token = {
    value: string;
    name:string;
    };

//get user by token 
export const getUserByToken = async () => {
  try {
    await connectToDatabase();
    // check if token is provided
    const token :Token = cookies().get('token');
    const decoedToken = jwt.verify(token.value, process.env.JWT_SECRET as string);

    // check if user exists
    const existingUser = await User.findOne({
        _id: decoedToken?.id,
    });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return existing user
    const response = {
      status: true,
      message: "User logged in successfully",
      data: existingUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};


//logout user
export const logoutUser = () => {
  try {
    // check if token is provided
    cookies().delete('token');

    const response = {
        status: true,
        message: "User logged out successfully",
        };
    
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

//get user by id

export const getUserById=async(userId:string)=>{
  try {
    await connectToDatabase();
    

    // check if user exists
    const existingUser = await User.findOne({
        _id: userId
    });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return existing user
    const response = {
      status: true,
      message: "User logged in successfully",
      data: existingUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
}

//onboarding user
export const onboardingUser = async (user: any,path:string) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (  !user.email ) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne(
      { email: user.email }
    );

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { ...user, onboarding: true },
      { new: true }
    );

    // if user is not updated
    if (!updatedUser) {
      const response = {
        status: false,
        message: "User not updated",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return updated user
    const response = {
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    };
    revalidatePath(path)
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};


//update user
export const updateUser = async (user: IUser) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (!user.name || !user.username || !user.email || !user.phone) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne({
     email: user.email 
    });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      user,
      { new: true }
    );

    // if user is not updated
    if (!updatedUser) {
      const response = {
        status: false,
        message: "User not updated",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return updated user
    const response = {
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

//send reset password link
export const sendResetPasswordLink = async (email: string) => {
  try {
    await connectToDatabase();
    // check if email is provided
    if (!email) {
      const response = {
        status: false,
        message: "Please provide email",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }
    
    const token = existingUser.resetToken;

    //send reset password mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'todaytalks3@gmail.com',
        pass:process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: 'todaytalks3@gmail.com',
      to: email,
      subject: "Thank you for your message",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Dear User,</p>
      <a href=${`http://localhost:3000/reset-password?token=${token}`}>Click here to reset password</a>
      
      <p>Thank you for using our service.</p>
      <div style="padding: 10px; background-color: #d3d3d3; margin-top: 20px;">
        <small>This is an automated email. Please do not reply.</small>
      </div>
    </div>
  `
  }

    // return saved user
    const res = await transporter.sendMail(mailOption)
    const response = {
      status: true,
      message: "Reset password link sent successfully",
      data: res,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

//reset password
export const resetPassword = async (password: string, token: string) => {
  try {
    await connectToDatabase();
    // check if token is provided
    if (!token) {
      const response = {
        status: false,
        message: "Please provide token",
      };
      return JSON.parse(JSON.stringify(response));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // check if user exists
    const existingUser = await User.findOne({ resetToken: token });

    


    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }
    // check if token is expired
    if (existingUser.resetTokenExpiry < Date.now()) {
      const response = {
        status: false,
        message: "Token expired",
      };
      return JSON.parse(JSON.stringify(response));
    }

    //generate new token for reset password
    const newResetToken = jwt.sign({
      id: token,
    }, process.env.JWT_SECRET as string, {
      expiresIn: "365d",
    });

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { password:hashedPassword, resetToken: newResetToken, resetTokenExpiry: Date.now() },
      { new: true }
    );

    // if user is not updated
    if (!updatedUser) {
      const response = {
        status: false,
        message: "User not updated",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return updated user
    const response = {
      status: true,
      message: "Password reset successfully",
      data: updatedUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};
//delete user

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id);

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // delete user
    const deletedUser = await User.findByIdAndDelete(id);


    // also delete all posts of user
    await Post.deleteMany({ user: id });

    // if user is not deleted
    if (!deletedUser) {
      const response = {
        status: false,
        message: "User not deleted",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return deleted user
    const response = {
      status: true,
      message: "User deleted successfully",
      data: deletedUser,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};


//count followers
export const countFollowers = async (id: string,path:string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id);

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // count followers
    const followers = existingUser.followers.length;

    // return followers
    const response = {
      status: true,
      message: "Followers counted successfully",
      data: followers,
    };
    revalidatePath(path)
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};


//count following
export const countFollowing = async (id: string,path:string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id);

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // count following
    const following = existingUser.following.length;

    // return following
    const response = {
      status: true,
      message: "Following counted successfully",
      data: following,
    };
    revalidatePath(path)
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

//get following user 
export const getFollowing = async (id: string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id).populate('following');

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return following
    const response = {
      status: true,
      message: "Following fetched successfully",
      data: existingUser.following,
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

// get followers of a user
export const getFollowers = async (id: string,path:string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id).populate('followers');

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return followers
    const response = {
      status: true,
      message: "Followers fetched successfully",
      data: existingUser.followers,
    };
    revalidatePath(path)
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};
// get all posts of a user
export const getPosts = async (id: string,path:string) => {
  try {
    await connectToDatabase();
    // check if user exists
    const existingUser = await User.findById(id).populate('posts');

    if (!existingUser) {
      const response = {
        status: false,
        message: "User does not exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return posts
    const response = {
      status: true,
      message: "Posts fetched successfully",
      data: existingUser.posts,
    };
    revalidatePath(path)
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error);
    const response = {
      status: false,
      message: error.message,
    };
    return JSON.parse(JSON.stringify(response));
  }
};

