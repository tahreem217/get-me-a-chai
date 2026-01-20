"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/Users"
import connectDb from "@/lib/dbConnect" 


export const initiate = async (amount,to_username,paymentform)=>{
    await connectDb();
    let user= await User.findOne({username:to_username});
     
    const id = user.razorpayid?.trim();
    const secret = user.razorpaysecret?.trim();

     
    if (!user || !user.razorpayid || !user.razorpaysecret) {
        throw new Error("This user has not set up their Razorpay credentials yet.");
    }
   
    var instance = new Razorpay({ key_id: id, key_secret: secret })
   
    
    let options={
        amount:Number.parseInt(amount),
        currency:"INR",

    }
    let x=await instance.orders.create(options)
     

    await Payment.create({oid:x.id,amount:Number(amount) / 100,to_user:to_username,name:paymentform.name,message:paymentform.message})
    return x;
}

export const fetchuser=async (username)=>{
    await connectDb();
    let u=await User.findOne({username:username});
    
    let user= u.toObject({flattenObjectIds:true});
    return user;
}
export const fetchpayments=async (username)=>{
    await connectDb();
    //fetch all paymnet sorted by  decresing order amount 
    let p=await Payment.find({to_user:username,done:true}).sort({amount:-1}).lean()
 
    return JSON.parse(JSON.stringify(p));

}
export const updateprofile=async (data,oldusername)=>{
    await connectDb();
    let ndata=Object.fromEntries(data);
    delete ndata.email;
    //if username is being updated check if the username exist
    if(oldusername!=ndata.username)
    {
        let u=await User.findOne({username:ndata.username});
        if(u)
        {
            return {error:"User name already exist"}
        }
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }

    await User.updateOne({ username: oldusername }, ndata);return { success: true };
}