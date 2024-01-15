'use server'


import Saved from "@/lib/db/models/saved.models"
import { connectToDatabase } from "@/lib/db/connect"

//save a post to user's saved posts
export async function savePost(userId: string, postId: string) {
    try {
        await connectToDatabase()
    
        const saved = await Saved.findOne({ user: userId })
    
        if (saved) {
            if (saved.posts.includes(postId)) {
                saved.posts.pull(postId)
            } else {
                saved.posts.push(postId)
            }
            await saved.save()
            const response = {
                status:"200",
                message:"saved post successfully",
                data:saved
            }
            return JSON.parse(JSON.stringify(response)) 
        } else {
            const newSaved = await Saved.create({
                user: userId,
                posts: [postId],
            })
            const response = {
                status:"200",
                message:"saved post successfully",
                data:newSaved
            }
            return JSON.parse(JSON.stringify(response))
        }
    } catch (error:any) {
        
        const response = {
            status:"400",
            message:error.message,
            data:null
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//get all saved posts of a user
export async function getSavedPosts(userId: string) {
   try {
     await connectToDatabase()
 
     const saved = await Saved.findOne({ user: userId }).populate("posts")
 
         const response = {
             status:"200",
             message:"saved post successfully",
             data:saved
         }
         return JSON.parse(JSON.stringify(response))
      
   } catch (error:any) {
         
         const response = {
              status:"400",
              message:error.message,
              data:null
         }
         return JSON.parse(JSON.stringify(response))
   }
}

//check if a post is saved by a user
export async function checkSavedPost(userId: string, postId: string) {
    try {
        await connectToDatabase()
    
        const saved = await Saved.findOne({ user: userId })
    
        if (saved) {
            if (saved.posts.includes(postId)) {
                const response = {
                    status:"200",
                    message:"saved post successfully",
                    data:true
                }
                return JSON.parse(JSON.stringify(response))
            } else {
                const response = {
                    status:"200",
                    message:"saved post successfully",
                    data:false
                }
                return JSON.parse(JSON.stringify(response))
            }
        } else {
            const response = {
                status:"200",
                message:"saved post successfully",
                data:false
            }
            return JSON.parse(JSON.stringify(response))
        }
    } catch (error:any) {
        
        const response = {
            status:"400",
            message:error.message,
            data:null
        }
        return JSON.parse(JSON.stringify(response))
    }
}


//delete all saved posts of a user
export async function deleteSavedPosts(userId: string) {
    try {
        await connectToDatabase()
    
        const saved = await Saved.findOne({ user: userId })
    
        if (saved) {
            saved.posts = []
            await saved.save()
            const response = {
                status:"200",
                message:"deleted saved post successfully",
                data:saved
            }
            return JSON.parse(JSON.stringify(response))
        } else {
            const response = {
                status:"200",
                message:"no saved post found",
                data:null
            }
            return JSON.parse(JSON.stringify(response))
        }
    } catch (error:any) {
        
        const response = {
            status:"400",
            message:error.message,
            data:null
        }
        return JSON.parse(JSON.stringify(response))
    }
}
