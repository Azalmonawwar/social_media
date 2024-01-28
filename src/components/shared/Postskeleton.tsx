import React from 'react'

const Postskeleten = () => {
  return (
    <div className="   mx-auto flex flex-col w-full  md:w-[50%] h-[100%] ">
        <div className="flex justify-between items-center mx-2 md:mx-0">
          <div className="flex items-center gap-3 mb-2">
            <div  className="w-12 h-12 rounded-full overflow-hidden bg-white">
              <div
                
                className='object-contain h-full w-full'
              />
            </div>

            <div className="flex flex-col ">
              <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold  text-white first-letter:capitalize">
                
              </p>
              <div className="flex justify-center text-xs  items-center gap-2 whitespace-nowrap text-gray-400 ">
                <p >
                  
                </p>
                •
                <p className="capitalize whitespace-nowrap">
                  
                </p>
              </div>
            </div>
          </div>

          
            

        </div>

        <div className="bg-gray-500">

          <div className={`  overflow-hidden w-full md:h-[500px] md:w-auto mb-5`}>
                
            <div
              
              className="   object-contain w-full  md:h-full h-[400px] "
            />
            
          </div>
        </div>
        {/* <Poststatus likes={post?.likes?.length} like={post?.likes} saved={saved?.data?.post} postId={post._id} userId={user} /> */}
        <div className="text-gray-300 text-sm mx-2 md:mx-0 mt-4">
          <p className='first-letter:capitalize'><span className='text-zinc-500'> more</span></p>
          <ul className="flex gap-1 mt-2">
            
          </ul>
        </div>

            
      </div>
  )
}

export default Postskeleten