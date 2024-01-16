'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/lib/actions/user.action'
import React from 'react'
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from 'next/image'

const page = ({ searchParams }: any) => {
    const { token } = searchParams
    const form = useForm({
        defaultValues: {
            password: "",
        },
    });
    const [message, setMessage] = React.useState('' as string)
    const reset = async (data: { password: string }) => {
        try {
            const res = await resetPassword(data.password, token)
            setMessage(res.message)
        } catch (error: any) {
            setMessage(error.message)
        }

    }
    return (

        <div className='flex flex-col gap-5'>
            <Image src='/icons/logo.png' width={325} height={125} className='invert' alt='logo' />
            <h2 className='text-3xl font-bold'>Reset Your Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(reset)} className='flex flex-col gap-4 '>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder=" Enter your new password" className="bg-gray-800 outline-none border-none no-ring focus:outline-none focus:border-none focus:ring-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' variant={'secondary'}>Reset Password</Button>
                    {
                        message && (
                            <div className="bg-red-500 text-white p-2 rounded-md mt-2">
                                {message}
                            </div>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

export default page