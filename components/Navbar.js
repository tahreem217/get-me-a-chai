"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
const Navbar = () => {
  const { data: session } = useSession()
  const [showDropDown,setShowDropDown]=useState(false);
  return (
    <nav className="flex fixed top-0 z-10 left-0 w-screen bg-gray-900 h-[6vh] md:px-6 px-1 items-center text-white justify-between">
      
      <div >
        <Link href="/" onClick={() => setShowDropDown(false)}className="flex gap-1">
        <video
          src="/tea.mp4"
          autoPlay
          loop
          muted
          className="w-7 h-7 rounded-full"
        />
       
        <h1 className="font-bold  text-sm md:text-xl gap-1">GetMeAChai</h1>
        </Link>
      </div>
    

      <div className="flex gap-2">

         
            
             
        {session && <div className=" relative " onClick={() => setShowDropDown(!showDropDown)} onBlur={()=>{ setTimeout(()=>{setShowDropDown(false)},[300])}}
>
<button id="dropdownDelayButton"  
 data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="inline-flex  items-center justify-center text-white     box-border border     border-slate-500  focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-xs md:text-sm rounded-l  px-1 md:px-4 py-1.5 focus:outline-none" type="button">
<span className="font-bold mr-1">
Welcome </span> {session.user.name}
<svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
 </button>
  


<div id="dropdownDelay" className={`z-10 ${showDropDown?"":"hidden" } absolute top-12  right-0 rounded-xl  bg-gray-800 border border-default-medium rounded-base shadow-lg w-44`}>
    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDelayButton">
      <li>
        <Link href="/"   className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Home</Link>
      </li>
      <li>
        <Link href="/Dashboard"  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
      </li>
      <li>
        <Link href= {`${session.user.username}`} onClick={() => setShowDropDown(false)} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"> Profile</Link>
      </li>
      {/* <li>
        <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Settings</Link>
      </li>
      <li>
        <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</Link>
      </li> */}
      <li>
        <Link href="#"  onClick={() => signOut({ callbackUrl: '/' })} className="inline-flex items-center w-full p-2 font-bold  gap-1 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out <img 
      src="/out.png" 
      alt="Sign out" 
      className="w-4 h-4 mr-2 filter invert" 
    /> </Link>
       
      </li>
    </ul>
</div>
</div>}
        

        {!session && (
          <Link
            href="/Login"
            className="rounded-xl h-[34px] flex justify-center items-center w-fit p-3 text-white border border-white bg-gradient-to-br from-purple-600 to-blue-500"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  )
}

export default Navbar
