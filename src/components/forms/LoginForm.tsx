'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {  LoginValidation } from "@/lib/validations";
import { loginUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "../shared/Loader";
const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {      
            email: "",
            password: "",
        },
    });
    const [isLoading,setIsLoading] = React.useState<boolean>(false)
    const [message, setMessage] = React.useState<string>("");
    const router = useRouter();
    const handleLogin = async (data: z.infer<typeof LoginValidation>) => {
        try {
            setIsLoading(true)
            const response = await loginUser(data)
            setIsLoading(false)
            if(response?.status){
                if(response?.data?.onboarding){
                    router.push('/')
                }else{
                    
                    router.push('/onboarding')
                }
            }
            else{
                setMessage(response.message)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    };
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <h2 className=" pt-5 md:pt-8 text-center">
                    Login into Your Account
                </h2>
                {
                    message && (
                        <div className="bg-red-500 text-white p-2 rounded-md mt-2">
                            {message}
                        </div>
                    )
                }
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

                   

                    <Button type="submit" className="shad-button_primary flex items-center justify-center">

                        {isLoading?<Loader/>:"Login"}

                    </Button>

                    <Link href='/forgotpassword'>Forget Password ? </Link>
                </form>
            </div>
        </Form>
    )
}

export default LoginForm