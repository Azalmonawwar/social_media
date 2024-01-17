'use server'
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: 'dctrpu6tf', 
    api_key: '582452511596592', 
    api_secret: '9h49bQZ2-fdlvHF9HjjBCuR4M8Q' 
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
export async function uploadPic(file: any) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const res:ResProps = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            tags: ['nextjs-server-actions-upload-sneakers']
          }, function (error :any, result:any) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
        } 
        );
        return res?.secure_url;
}
catch (error:any)  {
        console.log(error)
    }
}