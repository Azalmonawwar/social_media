import PostCard from "@/components/shared/PostCard"
import Wrapper from "@/components/shared/Wrapper"
import { getPostById } from "@/lib/actions/post.action"
import { getUserByToken } from "@/lib/actions/user.action"


const pages =async ({params}:any) => {
  const {id} = params
  const post = await getPostById(id)
  const {data} = await getUserByToken()
  return (
    <Wrapper>
      <PostCard  user={data._id} post={post.data}/>
    </Wrapper>
  )
}

export default pages