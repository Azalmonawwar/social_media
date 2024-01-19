
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

  const MAX_FILE_SIZE = 1000000000;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const OnBoardValidation = z.object({
  bio: z.string().min(4, { message: "Bio must be at least 4 characters." }),
  dob: z.string().min(8, { message: "please enter correct date" }),
  avatar: z
  .any()
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 10MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  )
});

  
export const PostValidation = z.object({
  caption: z.string().min(2, { message: "Caption must be at least 8 characters." }),
  tags: z.string().min(2, { message: "Tags must be at least 4 characters." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  image: z.string()
});
