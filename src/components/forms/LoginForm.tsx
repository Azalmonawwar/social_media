'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {  LoginValidation } from "@/lib/validations";
const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {      
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data: z.infer<typeof LoginValidation>) => {
        console.log(data);
    };
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <h2 className="h3-bold md:h2-bold pt-5 md:pt-8 text-center">
                    Login into Your Account
                </h2>

                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="flex flex-col gap-5 w-full mt-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder="Mobile Number or Email" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
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

                   

                    <Button type="submit" className="shad-button_primary">

                        Login

                    </Button>

                    
                </form>
            </div>
        </Form>
    )
}

export default LoginForm