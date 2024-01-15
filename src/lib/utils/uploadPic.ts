'use server'
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: 'dctrpu6tf', 
    api_key: '582452511596592', 
    api_secret: '9h49bQZ2-fdlvHF9HjjBCuR4M8Q' 
  });
export async function uploadPic(file: any) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const res = await new Promise((resolve, reject) => {
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
        return res.secure_url;
}
catch (error:any)  {
        console.log(error)
    }
}