'use client'
import React, { useState ,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import {fetchuser,updateprofile} from "@/actions/useractions"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const Dashboard = () => {
  const {data:session,update}=useSession();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  })

  const handleChange = (e) => {
    
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  useEffect(() => {
    if (session) {
      getData()
    }
  }, [session])
  useEffect(() => {
   
    document.title="Dashboard-Get me chai"
  }, )
  const getData=async()=>{
    let u=await fetchuser(session.user.username);
     
    setForm((u));
  }
  const handleSubmit = async (formdata ) => {
   
   
    let a=await updateprofile(formdata,session.user.username);
    
    const data = Object.fromEntries(formdata);
  setForm(data);
     await update();

     toast('Profile updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

      
    

    // later: POST to /api/dashboard or /api/user
  }

  return (<>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    <form action={handleSubmit} className="flex text-white flex-col mt-10 items-start gap-2 m-auto w-1/3 min-h-screen">

      <h1>Username</h1>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="text"
      />

      <h1>Name</h1>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="text"
      />

<div className="flex items-center gap-2">
  <h1 className="text-white">Email</h1>
  <button 
    type="button" // This is VERY important so it doesn't submit the form
    onClick={() => toast.info("Email is locked to your login provider", {
       
      autoClose: 1500,
      theme: "dark"
    })}
    className="bg-slate-700 text-slate-300 text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-slate-500 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
  >
    i
  </button>
</div>
      
      <input
        name="email"
        value={form.email}
        readOnly
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="email"
      />

      <h1>Profile Picture URL</h1>
      <input
        name="profilepic"
        value={form.profilepic}
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="text"
      />

      <h1>Cover Picture URL</h1>
      <input
        name="coverpic"
        value={form.coverpic}
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="text"
      />

      <h1>Razorpay ID</h1>
      <input
        name="razorpayid"
        value={form.razorpayid}
        onChange={handleChange}
        className="w-full p-2 bg-slate-900 border border-slate-400 rounded-l"
        type="text"
      />

      <h1>Razorpay Secret</h1>
      <input
        name="razorpaysecret"
        value={form.razorpaysecret}
        onChange={handleChange}
        className="w-full p-2  bg-slate-900 border border-slate-400 rounded-l"
        type="password"
      />

      <button   type="submit"
       
        className="w-1/3 p-2 text-black hover:bg-slate-50 rounded-lg ml-[33%] mt-2 bg-slate-300"
      >
        Save
      </button>
    </form>
    </>
  )
}

export default Dashboard
