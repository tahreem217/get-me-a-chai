"use client"
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
export default function Home() {
  
  return (
    
      <>
  
         <div className="h-[40vh] text-center   items-center justify-center  text-white gap-4 flex flex-col">
 <div className=" flex gap-3 font-bold text-3xl justify-center items-center "> 
          BUY ME A CHAI
          <video 
        src="/tea.mp4"    
        autoPlay
        loop
        muted
        className="w-10 h-10 rounded-full"
      /></div>
      <p className="text-sm w-4/5"> Your digital chai companion! Built with React and Vite, this app lets users order their favorite tea quickly and easily!</p>
      <div className="flex gap-4">
      <Link href="/Login">
      <button type="button" className="text-white bg-gradient-to-br rounded-xl from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-4 px-2 py-2.5 text-center leading-5">Get started</button>
      </Link>
      <Link href="/about">
      <button type="button" className="text-white bg-gradient-to-br  rounded-xl from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-4 px-2 py-2.5 text-center leading-5">Know more</button>
      </Link>
      </div>
      
         </div>
          <div className="bg-white opacity-20 h-0.5"></div>
          <div className="h-[40vh] md:w-[70vw] w-[95vw]    m-auto  flex items-center justify-between p-4   ">
          <div className="h-[30vh]  flex justify-between items-start">
          <div className="flex flex-col  text-slate-200    text-center items-center justify-center gap-2">
          <video 
        src="/laptop.mp4"    
        autoPlay
        loop
        muted
        className="w-16 h-16 m-2 md:w-24 md:h-24 rounded-full"
      />
      <p className="font-bold text-sm md:text-lg">Shared Success</p>
      <p className="text-xs md:text-lg">Every cup contributed helps bring new projects to life.</p>
      </div>
      <div className="flex flex-col text-center text-slate-200 items-center justify-center gap-2">
          <video 
        src="/cion2.mp4"    
        autoPlay
        loop
        muted
        className="w-16 md:w-24 m-2 md:h-24 h-16 rounded-full"
      />
      <p className="font-bold text-sm md:text-lg">Fuel the Creativity</p>
      <p className="text-xs md:text-lg">Your fans want to buy you a chai to keep the ideas brewing.</p>
      </div>
      <div className="flex flex-col text-center text-slate-200 items-center justify-center gap-2">
          <video 
        src="/group.mp4"    
        autoPlay
        loop
        muted
        className="w-16 h-16 m-2  md:w-24 md:h-24 rounded-full"
      />
      <p className="font-bold text-sm md:text-lg">Join the Inner Circle</p>
      <p className="text-xs md:text-lg">Give your community a way to back your journey..</p>
      

          </div>
          </div>

          </div>
          <div className="bg-white opacity-20 h-0.5"></div>

          <div className="h-[50vh] md:w-[70vw] w-[95vw] text-white   m-auto  flex flex-col gap-6 justify-center pt-10 items-center ">
          <h1 className="text-xl font-bold">Learn more about crowd funding </h1>
          <iframe width="560" className="w-[80vw]   object-fit: cover; " height="315" src="https://www.youtube.com/embed/5HO8080ynNc?si=Pfo1croRzL4XKydT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          
      </>   
  );
}


