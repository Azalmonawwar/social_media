import { getAllPosts } from '@/lib/actions/post.action'
import PostCard from '@/components/shared/PostCard'
import { IPost } from '@/lib/types'
import { getUserByToken } from '@/lib/actions/user.action'
import { Suspense } from 'react'
import Rightbar from '@/components/shared/Rightbar'
import Postskeleten from '@/components/shared/Postskeleton'

const Home = async() =>{
  const data = await getAllPosts()
  const user = await getUserByToken() 
  return (
    <section className='flex flex-col items-start gap-10  py-2 md:py-16 mb-[80px]  md:px-8 lg:ml-[270px] md:ml-[100px] md:mr-0 sl:mr-[300px] '>
      <h1 className="text-2xl md:text-3xl  font-bold text-center ml-2">Home Feed</h1>
      {
        data?.data?.map((item:IPost, index:number) => (
          
          <Suspense key={index} fallback={<Postskeleten/>}>
          <PostCard
            
            user= {user?.data?._id}
            post={item}
            />
      </Suspense>
        ))
      }
      <Rightbar/>
    </section>
  )
}

export default Home
