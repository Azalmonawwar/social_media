'use server'
import Post from "@/lib/db/models/post.models"
import User from "@/lib/db/models/user.models"
import { IPost } from "@/lib/types"
import { connectToDatabase } from "@/lib/db/connect"


//create a post 
export async function createPost (userId:string,post:IPost){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        if(!post.caption || !post.image  ){
            const response = {
                status:400,
                message:"Caption is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //create post 
        const newPost = await Post.create({
            ...post,
            user:userId
        })

        const response = {
            status:200,
            message:"Post created successfully",
            data:newPost
        }
        return JSON.parse(JSON.stringify(response))

    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//get all posts
export async function getAllPosts (){
    try {
        await connectToDatabase()
        const posts = await Post.find().sort({createdAt:-1})
        const response = {
            status:200,
            message:"Posts fetched successfully",
            data:posts
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}


//get post by id
export async function getPostById (postId:string){
    try {
        await connectToDatabase()
        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }
        const response = {
            status:200,
            message:"Post fetched successfully",
            data:post
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//delete post by id
export async function deletePostById (postId:string,userId:string){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        if(post.user.toString() !== userId){
            const response = {
                status:400,
                message:"User not authorized"
            }
            return JSON.parse(JSON.stringify(response))
        }

        await post.remove()
        const response = {
            status:200,
            message:"Post deleted successfully",
            data:post
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//updata post by id
export async function updatePostById (postId:string,userId:string,post:IPost){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const postExists = await Post.findById(postId)
        if(!postExists){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        if(postExists.user.toString() !== userId){
            const response = {
                status:400,
                message:"User not authorized"
            }
            return JSON.parse(JSON.stringify(response))
        }

        await postExists.updateOne({
            ...post
        })
        const response = {
            status:200,
            message:"Post updated successfully",
            data:postExists
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//get post search by caption and limit to 10 posts with page number
export async function getPostByCaption (caption:string,page:number){
    try {
        await connectToDatabase()
        const posts = await Post.find({caption:{$regex:caption,$options:"i"}}).limit(10).skip(page*10).sort({createdAt:-1})
        const response = {
            status:200,
            message:"Posts fetched successfully",
            data:posts
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}


//get likes count by post id
export async function getLikesCountByPostId (postId:string){
    try {
        await connectToDatabase()
        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }
        const response = {
            status:200,
            message:"Likes count fetched successfully",
            data:post.likes.length
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//get comments count by post id
export async function getCommentsCountByPostId (postId:string){
    try {
        await connectToDatabase()
        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }
        const response = {
            status:200,
            message:"Comments count fetched successfully",
            data:post.comments.length
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}


//get all comments by post id
export async function getAllCommentsByPostId (postId:string){
    try {
        await connectToDatabase()
        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }
        const response = {
            status:200,
            message:"Comments fetched successfully",
            data:post.comments
        }
        return JSON.parse(JSON.stringify(response))
    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))
    }
}

//create comment by post id with userid
export async function createCommentByPostId (postId:string,userId:string,comment:string){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const newComment = {
            user:userId,
            text:comment,
        }

        post.comments.unshift(newComment)
        await post.save()
        const response = {
            status:200,
            message:"Comment created successfully",
            data:post.comments
        }
        return JSON.parse(JSON.stringify(response))

    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))

    }
}


//delete comment by post id with userid
export async function deleteCommentByPostId (postId:string,userId:string,commentId:string){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const comment = post.comments.find(comment =>comment.id === commentId)
        if(!comment){
            const response = {
                status:400,
                message:"Comment does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        if(comment.user.toString() !== userId){
            const response = {
                status:400,
                message:"User not authorized"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(userId)
        post.comments.splice(removeIndex,1)
        await post.save()
        const response = {
            status:200,
            message:"Comment deleted successfully",
            data:post.comments
        }
        return JSON.parse(JSON.stringify(response))

    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))

    }
}

//like post by post id with userid
export async function likePostByPostId (postId:string,userId:string){
    try {
        await connectToDatabase()
        if(!userId){
            const response = {
                status:400,
                message:"User Id is required"
            }
            return JSON.parse(JSON.stringify(response))
        }

        //check if user exists

        const userExists = await User.findById(userId)
        if(!userExists){
            const response = {
                status:400,
                message:"User does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        const post = await Post.findById(postId)
        if(!post){
            const response = {
                status:400,
                message:"Post does not exist"
            }
            return JSON.parse(JSON.stringify(response))
        }

        if(post.likes.filter(like=>like.user.toString() === userId).length > 0){
            const response = {
                status:400,
                message:"Post already liked"
            }
            return JSON.parse(JSON.stringify(response))
        }

        post.likes.unshift({user:userId})
        await post.save()
        const response = {
            status:200,
            message:"Post liked successfully",
            data:post.likes
        }
        return JSON.parse(JSON.stringify(response))

    } catch (error:any) {
        const response = {
            status:400,
            message:error.message
        }
        return JSON.parse(JSON.stringify(response))

    }
}



//unlike post by post id with userid

// export async function unlikePostByPostId (postId:string,userId:string){
//     try {
//         await connectToDatabase()
//         if(!userId){
//             const response = {
//                 status:400,
//                 message:"User Id is required"
//             }
//             return JSON.parse(JSON.stringify(response))
//         }

//         //check if user exists

//         const userExists = await User.findById(userId)
//         if(!userExists){
//             const response = {
//                 status:400,
//                 message:"User does not exist"
//             }
//             return JSON.parse(JSON.stringify(response))
//         }

//         const post = await Post.findById(postId)
//         if(!post){
//             const response = {
//                 status:400,
//                 message:"Post does not exist"
//             }
//             return JSON.parse(JSON.stringify(response))
//         }

//         if(post.likes.filter(like=>like.user.toString() === userId).length === 0){
//             const response = {
//                 status:400,
//                 message:"Post has not yet been liked"
//             }
//             return JSON.parse(JSON.stringify(response))
//         }

//         const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(userId)
//         post.likes.splice(removeIndex,1)
//         await post.save()
//         const response = {
//             status:200,
//             message:"Post unliked successfully",
//             data:post.likes
//         }
//         return JSON.parse(JSON.stringify(response))

//     } catch (error:any) {
//         const response = {
//             status:400,
//             message:error.message
//         }
//         return JSON.parse(JSON.stringify(response))

//     }
// }




