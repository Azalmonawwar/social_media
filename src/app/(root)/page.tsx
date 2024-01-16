import Image from 'next/image'
import Container from '@/components/shared/Container'
import { getAllPosts } from '@/lib/actions/post.action'

const Home = async() =>{

  const data = await getAllPosts()
  return (
    <Container>
      {
        data.data.map((item, index) => (
          
          <div key={index}>
            <h1>{item.user.name}</h1>
            <Image src={item.image} alt="Picture of the author" width={100} height={100} />
            <p>{item.caption}</p>
            <p>{item.tags}</p>
          </div>
        ))
      }
      
    </Container>
  )
}

export default Home
