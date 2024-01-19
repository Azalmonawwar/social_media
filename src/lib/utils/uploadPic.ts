'use server'
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  type ResProps = {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: any[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
  }

export async function uploadImage(base64url:string){
    try {
        const res:ResProps = await cloudinary.uploader.upload(base64url)
        const image = {
          public : res.public_id,
          image_url: res.secure_url
        }

        return JSON.parse(JSON.stringify(image))
    } catch (error:any) {
      console.log(error.message)
    }
}
export async function deleteImage(imageId:string){
    try {
        const res:ResProps = await cloudinary.uploader.destroy(imageId)
        console.log(res)
    } catch (error:any) {
      console.log(error.message)
    }
}
