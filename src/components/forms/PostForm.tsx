'use client'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PostValidation } from "@/lib/validations";
import Loader from "../shared/Loader";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import { uploadImage } from "@/lib/utils/uploadPic";
import { createPost } from "@/lib/actions/post.action";
import { getUserByToken } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";


const PostForm = () => {
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),

    });
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    
    const onsubmit = async (data: z.infer<typeof PostValidation>) => {
        try {
            const user = await getUserByToken()
            const id = user?.data?._id
            const caption = data.caption
            const tags = data.tags
            const location = data.location
            
            setIsLoading(true)
            const img = await uploadImage(data.image)
            const res = await createPost(id, { caption, tags, location, image: img.image_url, imageId: img.public })
            setIsLoading(false)
            
            form.reset()
            if(res.status===200){
                router.push('/')
            }
        } catch (error:any) {
            console.log(error.message)
        }
    };
    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                
                
                <form
                    onSubmit={form.handleSubmit(onsubmit)}
                    className="flex flex-col gap-5 w-full mt-4">

                    {/* // will also add for phone number  */}

                    <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Textarea rows={7} placeholder="Caption..." className="bg-gray-800 border-none text-lg p-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FileUploader fieldChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Input type="text" placeholder="Location..." className="bg-gray-800 border-none text-lg p-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" placeholder="Tags..." className="bg-gray-800 border-none text-lg p-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <Button type="submit" className="shad-button_primary" disabled={isLoading}>

                        {isLoading ? <Loader /> : "Create Post"}

                    </Button>


                </form>
            </div>
        </Form>
    )
}

export default PostForm