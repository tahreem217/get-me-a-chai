import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment"
import connectDb from "@/lib/dbConnect"

export const POST = async (req) => {
    await connectDb();
    
    // 1. Parse the JSON body
    const body = await req.json();

    // 2. Find the payment record
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // 3. Verify Signature
    const secret = process.env.KEY_SECRET; // Match your .env name
    const isValid = validatePaymentVerification(
        { "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },
        body.razorpay_signature, 
        secret
    );

    if (isValid) {
     
        await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );

        
        return NextResponse.json({ success: true, message: "Payment successful" });
    } else {
        return NextResponse.json({ success: false, message: "Verification failed" }, { status: 400 });
    }
}