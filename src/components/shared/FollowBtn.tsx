'use client'

import { MouseEventHandler } from "react"
import { Button } from "../ui/button"
import { toggleFollow } from "@/lib/actions/user.action"

const FollowBtn = ({loginUser,followUser,isFollowing}:{loginUser:string,followUser:string,isFollowing:boolean}) => {
    const data = async()=>{
        const data = await toggleFollow(loginUser,followUser)
        // console.log(data)
    }
  return (
    <Button onClick={data} variant={isFollowing?"default":'secondary'}>
      {
        isFollowing?"Following"
        :"Follow"
      }
    </Button>
  )
}

export default FollowBtn