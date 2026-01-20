"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
const page = () => {
  
  
  const { data: session } = useSession()
  const router = useRouter()
   
  return (
    <div className='text-white'>
      hui dkmvqkpnblk

    </div>
  )
}

export default page
