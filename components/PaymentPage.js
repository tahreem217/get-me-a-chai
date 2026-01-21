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
   

    if (a.error) {
       
      toast(a.message, {
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
      return; // Stop here
    }
 
    let orderId=a.id;
    const options = {
     "key": process.env.NEXT_PUBLIC_KEY_ID,
    "amount": amount,   
    "currency": "INR",
    "name": "get me a chai",  
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId,  
   // THE HANDLER: This replaces callback_url
   "handler": async function (response) {
    // Show a "Processing" toast
    const loadingToast = toast.loading("Verifying payment...");

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
    });

    const result = await res.json();

    if (result.success) {
      toast.update(loadingToast, { 
        render: "Thanks for your support ❤️", 
        type: "success", 
        isLoading: false, 
        autoClose: 5000 
      });
      
      // REFRESH DATA: This updates your supporters list and total raised
      await getData(); 
      setpaymnentform({ name: "", message: "", amount: "" });
      // Optional: Clean up the URL
      router.push(`/${params.username}`);
    } else {
      toast.update(loadingToast, { 
        render: "Payment verification failed", 
        type: "error", 
        isLoading: false, 
        autoClose: 5000 
      });
    }
  },
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
       
       <div className='bg-slate-800 rounded-lg border border-slate-700 '>
         <img className='object-cover h-[450px] w-full' src={currentUser.coverpic || "https://www.pixelstalk.net/wp-content/uploads/2016/04/Grey-backgrounds-wallpapers-HD.png"} alt="" />
       </div>
       <div   >
       <img className=' absolute h-[200px] w-[200px] rounded-full top-[370px] left-1/2 -translate-x-1/2 border border-white  ' src={currentUser.profilepic || "https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg"} alt="" />
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
return (
  <li key={p.oid} className='flex border border-slate-700 rounded-lg gap-3 p-3 items-center my-3 bg-slate-800/50 hover:bg-slate-800 transition-colors'>
    <img className='w-8 h-8 rounded-full border border-slate-600' src="/wallpaper.avif" alt="" />
    
    <span className='text-sm text-slate-200'> 
      <span className='font-semibold text-white'>{p.name}</span> 
      <span> donated </span>
      <span className='font-bold text-green-400'>₹{p.amount}</span> 
      <span className='text-slate-400 italic block mt-1'>"{p.message}"</span>
    </span>
  </li>
)
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
           
 <input onChange={handleChange} name="message" value={paymentform.message}  className=" w-full   rounded-lg p-2 bg-slate-800 border border-slate-400  " type="text" placeholder='Leave a message' />
 <button onClick={() => handlePay(Number(paymentform.amount) * 100)}  className='py-2 md:px-6 px-2 rounded-lg text-slate-100  bg-gradient-to-br from-purple-700 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:from-purple-400 disabled:to-blue-400 ' disabled={!paymentform.name?.trim() || !paymentform.message?.trim()|| paymentform.amount.length<1  } >Pay</button>
 
 </div>
         </div>
       </div>
     </div>
     <div className='w-screen h-72 md:h-36'>

     </div>
   </>
  )
}

export default PaymentPage
