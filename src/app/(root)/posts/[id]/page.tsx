import Comments from "@/components/shared/Comments"
import Container from "@/components/shared/Container"
import PostCard from "@/components/shared/PostCard"
import Rightbar from "@/components/shared/Rightbar"

import { getPostById } from "@/lib/actions/post.action"
import { getUserByToken } from "@/lib/actions/user.action"


const pages =async ({params}:any) => {
  const {id} = params
  const post = await getPostById(id)
  const {data} = await getUserByToken()
  // console.log(post)
  return (
    <Container>
      <PostCard  user={data._id} post={post.data}/>
      {
        post?.data?.comments.map((comment:any)=>(
              <Comments comment={comment} key={comment._id} user={data?._id}/>
        ))
      }
      <Rightbar/>
    </Container>
  )
}

export default pages