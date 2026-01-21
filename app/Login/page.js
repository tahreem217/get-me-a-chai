"use client"
import React,{useEffect} from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session && session.user?.username) {
      router.push(`/${session.user.username}`)
    }
  }, [session,router])
  useEffect(() => {
   
    document.title="Login-Get me chai"
  }, )
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 px-4">
      <h1 className="text-3xl font-bold text-white  text-center">
        Login to get started
      </h1>

      <div className="flex flex-col gap-3  p-8 rounded-lg shadow-lg">
 
        <button onClick={()=>{signIn("google")}} className="flex items-center hover:border-2 hover:border-cyan-500 bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
        <svg
  className="h-5 w-5 mr-3"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
>
  <path
    fill="#EA4335"
    d="M24 9.5c3.54 0 6.35 1.22 8.72 3.23l6.48-6.48C34.9 2.38 29.92 0 24 0 14.64 0 6.4 5.38 2.56 13.22l7.53 5.85C12.16 13.1 17.6 9.5 24 9.5z"
  />
  <path
    fill="#4285F4"
    d="M46.5 24.5c0-1.54-.14-3.02-.4-4.5H24v9h12.7c-.55 2.97-2.23 5.48-4.75 7.18l7.28 5.65C43.7 37.73 46.5 31.7 46.5 24.5z"
  />
  <path
    fill="#FBBC05"
    d="M10.09 28.93c-.5-1.48-.79-3.06-.79-4.68s.29-3.2.79-4.68l-7.53-5.85C.92 16.96 0 20.37 0 24.25c0 3.88.92 7.29 2.56 10.53l7.53-5.85z"
  />
  <path
    fill="#34A853"
    d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.28-5.65c-2.02 1.35-4.61 2.15-8.61 2.15-6.4 0-11.84-3.6-13.91-9.07l-7.53 5.85C6.4 42.62 14.64 48 24 48z"
  />
</svg>

          Continue with Google
        </button>
 
        {/* <button className="flex items-center bg-white border hover:border-2 hover:border-cyan-500 border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
          <span className="mr-2 text-xl  text-blue-600 font-bold">in</span>
          Continue with LinkedIn
        </button>
  */}
        {/* <button className="flex items-center bg-white border hover:border-2 hover:border-cyan-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
          <span className="mr-2 text-xl text-sky-500 font-bold">X</span>
          Continue with Twitter
        </button>  */}

       
        {/* <button className="flex items-center bg-white border hover:border-2 hover:border-cyan-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
          <span className="mr-2  text-xl text-blue-700 font-bold">f</span>
          Continue with Facebook
        </button> */}

 
        <button onClick={()=>{signIn("github")}}  className="flex items-center bg-white border hover:border-2 hover:border-cyan-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
          <span className="mr-2   text-xl font-bold">🐙</span>
          Continue with GitHub
        </button>

        
        {/* <button className="flex items-center bg-white border hover:border-2 hover:border-cyan-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200">
          <span className="mr-2 text-xl"></span>
          Continue with Apple
        </button> */}
      </div>
    </div>
  );
};

export default Login;
 
 
 