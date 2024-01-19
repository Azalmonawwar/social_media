'use client'
import { onboardingUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import { OnBoardValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { Button } from '../ui/button'
import { uploadImage } from '@/lib/utils/uploadPic'
import React from 'react'
import Loader from '../shared/Loader'
const OnboardForm = ({ email }: { email: string }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof OnBoardValidation>>({
        resolver: zodResolver(OnBoardValidation),
    })
    const [isLoading,setIsLoading] = React.useState<boolean>(false)
    const onsubmit = async (data: z.infer<typeof OnBoardValidation>) => {
        const bio = data.bio;
        const dob = data.dob
        const image = data.avatar[0]
        const reader = new FileReader();
        reader.onload = async function (e: any) {
            const base64string = e.target.result;
            setIsLoading(true)
            const image = await uploadImage(base64string)
            const newData = {
                email: email,
                avatar: image.image_url,
                avatarId:image.public,
                bio: bio,
                dob: dob
            }
            const response = await onboardingUser(newData, '/')
            setIsLoading(false)
            if(response.status){
                redirect('/')
            }
        }
        reader.readAsDataURL(image);
    
    }
    return (

        <div className='md:border-[1px] md:border-dark-secondary p-10 rounded-lg '>
            <form onSubmit={handleSubmit(onsubmit)} className='flex gap-4 flex-col'>
                <label >Upload your profile picture</label>
                <input type='file' id="avatar" {...register("avatar")} />
                {/* {errors && <p>{errors?.avatar?.message}</p>} */}
                <label >Enter your bio</label>
                <textarea rows={5} cols={8} className='bg-dark-secondary' placeholder='Enter you Bio' {...register('bio')} />
                {errors&& <p>{errors?.bio?.message}</p>}

                <label >Enter your dob</label>
                <input type='date' className='bg-dark-secondary' placeholder='Enter you dob' {...register('dob')} />
                {errors&& <p>{errors?.dob?.message}</p>}
                <Button type='submit'>{
                isLoading?<Loader/>:"On board"
                }</Button>
            </form>
        </div>
    )
}

export default OnboardForm