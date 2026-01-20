 
import React from 'react'
import PaymentPage from '../../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from "@/lib/dbConnect"
import User from '@/models/Users'
const Username =async ({params}) => {
  const checkUser=async()=>{
    let u=await User.findOne({username:params.username});
  if(!u){
    return notFound();
  }
  }
  await checkUser();
 
  
  if(!params.username)
    {
     return notFound();
    }
  return (
    <>
  
    <PaymentPage params={params}/>
    </>
  )
}

export default  Username
export async function generateMetadata({params}){
  return {
    title: `${params.username}-Get me a chai`,
}
}