import React from 'react'
import { Button } from '@/components/ui/button'
import { uploadPic } from '@/lib/utils/uploadPic'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import { onboardingUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
const OnboardForm = ({email}:{email:string}) => {

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const image = formData.get('avatar')
        const bio = formData.get('bio')
        const dob = formData.get('dob')
        const url = await uploadPic(image)
        
        const data = {
            email:email,
            avatar: url,
            bio: bio,
            dob: dob
        }
        const response = await onboardingUser(data,'/')
        if(response.status){
            redirect('/profile')
        }
    }
    return (

        <div className='md:border-[1px] md:border-dark-secondary p-10 rounded-lg '>
            <form action={handleSubmit} className='flex gap-4 flex-col'>
                <label >Upload your profile picture</label>
                <Input type='file' name='avatar'  />
                <label >Enter your bio</label>

                <Textarea rows={5} cols={8} name='bio'  className='bg-dark-secondary' placeholder='Enter you Bio'/>
                <label >Enter your dob</label>
                
                <Input type='date' name='dob'  className='bg-dark-secondary' placeholder='Enter you dob'/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default OnboardForm