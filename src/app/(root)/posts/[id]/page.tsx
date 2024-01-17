import { getPostById } from "@/lib/actions/post.action"


const pages =async ({params}:any) => {
  const {id} = params
  const data = await getPostById(id)
  console.log(data)
  return (
    <div>{params.id}</div>
  )
}

export default pages