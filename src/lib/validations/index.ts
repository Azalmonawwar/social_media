
import * as z from "zod";
export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });


export const LoginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });


export const OnBoardValidation = z.object({
    avatar: z.string().min(2, { message: "Avatar must be at least 2 characters." }),
    bio: z.string().min(2, { message: "Bio must be at least 2 characters." }),
    dob: z.string().min(8, { message: "." }),
  });