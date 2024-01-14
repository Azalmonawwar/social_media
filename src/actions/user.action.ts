"use server";
// Path: src/actions/user.action.ts

import User from "@/lib/db/models/user.models";
import { connectToDatabase } from "@/lib/db/connect";
import jwt from "jsonwebtoken";
import {cookies} from 'next/headers'
import { IUser } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { StringExpressionOperatorReturningArray } from "mongoose";
import Post from "@/lib/db/models/post.models";

export const createUser = async (user: IUser) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (
      !user.name ||
      !user.username ||
      !user.password ||
      (!user.email || !user.phone)
    ) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }
    // check if user enter email or phone number
    if (!user.email && !user.phone) {
      const response = {
        status: false,
        message: "Please provide email or phone number",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });

    if (existingUser) {
      const response = {
        status: false,
        message: "User already exists",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // create new user
    const newUser = await User.create(user);

    //check if user is created or not
    if (!newUser) {
      const response = {
        status: false,
        message: "User not created",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // return new user
    const response = {
      status: true,
      message: "User created successfully",
      data: newUser,
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


//login user
export const loginUser = async (user:{
    email: string;
    phone: string;
    password: string;
}) => {
  try {
    await connectToDatabase();
    // check if all required fields are provided
    if (!user.password || (!user.email && !user.phone)) {
      const response = {
        status: false,
        message: "Please provide all required fields",
      };
      return JSON.parse(JSON.stringify(response));
    }
    // check if user enter email or phone number
    if (!user.email && !user.phone) {
      const response = {
        status: false,
        message: "Please provide email or phone number",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // check if user exists
    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
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
        message: "Password is incorrect",
      };
      return JSON.parse(JSON.stringify(response));
    }

    // if user is not verified
    if (!existingUser.isVerified) {
      const response = {
        status: false,
        message: "User not verified",
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
export const logoutUser = async () => {
  try {
    await connectToDatabase();
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

//onboarding user
export const onboardingUser = async (user: IUser,path:string) => {
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
      $or: [{ email: user.email }, { phone: user.phone }],
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
      $or: [{ email: user.email }, { phone: user.phone }],
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


