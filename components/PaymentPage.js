"use client"
import React,{useEffect,useState,useDeferredValue} from 'react'
import Script from 'next/script'
import { fetchuser,fetchpayments, initiate } from '@/actions/useractions'
 
import { useSession } from 'next-auth/react'

import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams,useRouter, notFound  } from 'next/navigation'
 

const PaymentPage = ({params}) => {
  const router =useRouter();
 
const searchParams=useSearchParams();
 const [paymentform,setpaymnentform]=useState({ name: "", message: "", amount: "" })
 const [currentUser,setCurrentUser]=useState({});
 const [ payments,setPayments]=useState([]);
   const handleChange=(e)=>{
    setpaymnentform({...paymentform,[e.target.name]:e.target.value})
   }
 const getData=async ()=>{
    let u=await fetchuser(params.username);
    setCurrentUser(u);
    let dbpayment= await fetchpayments(params.username);
    setPayments(dbpayment);
 
    
 }
 useEffect(() => {
     getData();
},[]);
useEffect(() => {
  if(searchParams.get("paymentdone")=="true"  ){
    toast('Thanks for your support ❤️', {
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
      router.push(`/${params.username}`);
  }
 
},[]);
  const handlePay=async (amount)=>{
    // Check if Razorpay is loaded
  if (typeof window.Razorpay === 'undefined') {
    alert("Razorpay is still loading. Please wait a moment and try again.");
    return;
  }
    if (!paymentform.name) {
      toast('Please enter your name and a message', {
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
        
      return;
    }
  
   
    let a = await initiate(amount,params.username,paymentform);
   


 
    let orderId=a.id;
    const options = {
      "key":`${currentUser.razorpayid}`,  
    "amount": amount,   
    "currency": "INR",
    "name": "get me a chai",  
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId,  
   "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()

  }
  return (
   <>
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
<Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
 
    
    
<div className="text-white min-h-screen  flex flex-col relative  "  >
       
       <div className='bg-white '>
         <img className='cover  h-[450px] w-full' src={currentUser.coverpic} alt="" />
       </div>
       <div   >
       <img className=' absolute h-[200px] w-[200px] rounded-full top-[370px] left-1/2 -translate-x-1/2 border border-white  ' src={currentUser.profilepic} alt="" />
       <div className='justify-center gap-2 mt-36 text-white items-center flex flex-col '>
       <h1 className='text-xl font-bold'>{params.username}</h1>
       <p className='text-slate-300'>Help {currentUser.name} to get a chai</p>
       <p className='text-slate-300'>{payments.length} Payments •  ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</p>
       
 
     </div>
       </div>
       <div className='flex flex-col mt-72 md:mt-12 md:flex-row m-auto mb-9 justify-center    gap-7 w-screen h-[40vh]  '>
         <div className='supporters m-auto p-6 flex flex-col   h-[400px]    w-[90vw] md:w-1/2 text-white bg-slate-900'>
         <h1 className='font-bold my-2'>SUPPORTERS</h1>
         <ul className='mx-3 overflow-y-scroll '>
         { payments && payments.map((p,i)=>{
            return <li key={p.oid} className='flex border border-slate-600 gap-1 p-2 items-center my-4' ><img className='w-7 h-7 rounded-full' src="/wallpaper.avif" alt="" /><span> {p.name} donated <span className='font-bold text-green-400'> ₹{p.amount}</span> with a message "{p.message}"</span></li>

         })}
         {payments.length==0 && <p className='text-slate-300'>No fundings done yet</p>}
           
           
         
           </ul>
           </div> 
         <div className='makePayment p-6 md:w-2/5  m-auto w-[90vw]    h-[400px]  bg-slate-900'>
         <h1 className='font-bold my-2'>Make a Payment </h1>
         <div className='flex gap-4 my-4'>
         <button   onClick={()=>{handlePay(10000)}} className="  rounded-lg p-2 bg-slate-700  ">Pay ₹100</button>
           <button   onClick={()=>{handlePay(20000)}} className="  rounded-lg p-2 bg-slate-700   ">Pay ₹200</button>
           <button  onClick={()=>{handlePay(40000)}}  className="  rounded-lg p-2 bg-slate-700 ">Pay ₹400</button>
           <button  onClick={()=>{handlePay(100000)}} className="  rounded-lg p-2 bg-slate-700 ">Pay  ₹1000</button>
 
         </div>
         <div className='flex flex-col my-4 gap-2   '>
           <input onChange={handleChange}  name="amount" value={paymentform.amount} className=" w-full rounded-lg p-2 bg-slate-800 border border-slate-400  " type="text" placeholder='Enter an amount' />
           <input onChange={handleChange} name="name" value={paymentform.name }  className="  w-full rounded-lg p-2 bg-slate-800 border border-slate-400  " type="text" placeholder='Enter name'/>
         </div>
         <div className=' text-white w-full flex flex-col   gap-4    justify-between'>
           
 <input onChange={handleChange} name="message" value={paymentform.message }  className=" w-full   rounded-lg p-2 bg-slate-800 border border-slate-400  " type="text" placeholder='Leave a message' />
 <button onClick={() => handlePay(Number(paymentform.amount) * 100)}  className='py-2 md:px-6 px-2 rounded-lg text-slate-100  bg-gradient-to-br from-purple-700 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:from-slate-500 ' disabled={!paymentform.name?.trim() || !paymentform.message?.trim()|| paymentform.amount.length<1  } >Pay</button>
 {/* or choose form these amount */}
  
 </div>
         </div>
       </div>
     </div>
   </>
  )
}

export default PaymentPage
