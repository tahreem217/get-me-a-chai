import React from 'react'
import PaymentPage from '../../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from "@/lib/dbConnect"
import User from '@/models/Users'

const Username = async ({ params }) => {
 
  await connectDb();

 
  const { username } = params;

 
  const u = await User.findOne({ username: username });
  
  if (!u) {
    return notFound();
  }

  return (
    <>
      <PaymentPage params={params}/>
    </>
  )
}

export default Username

export async function generateMetadata({ params }){
  return {
    title: `${params.username} - Get me a chai`,
  }
}