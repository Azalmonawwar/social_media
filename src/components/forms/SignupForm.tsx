'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignupValidation } from "@/lib/validations";
import { createUser } from "@/lib/actions/user.action";
const SignupForm = () => {
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });
    const [message, setMessage] = React.useState<string>("");

    const handleSignup = async (data: z.infer<typeof SignupValidation>) => {
        try {
            const response = await createUser(data);
            console.log(response)
            setMessage(response.message)
            form.reset()
        } catch (error:any) {
            console.log(error.message)
        }

    };
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <h2 className="h3-bold md:h2-bold pt-5 md:pt-8 text-center">
                    Create a new account
                </h2>
                {
                                message && <p className="text-base text-center text-blue-500">{message}</p>
                            
                            }
                <form
                    onSubmit={form.handleSubmit(handleSignup)}
                    className="flex flex-col gap-5 w-full mt-4">

                    {/* // will also add for phone number  */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder="Email" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Input type="text" placeholder="Full Name" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Input type="text" placeholder="Username" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Password" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <p className="text-xs text-center text-text-tertiary">People who use our service may have uploaded your contact information to Metagram. Learn More
                    </p>

                    <p className="text-xs text-center text-text-tertiary">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                           
                    <Button type="submit" className="shad-button_primary">

                        Sign Up

                    </Button>

                    
                </form>
            </div>
        </Form>
    )
}

export default SignupForm