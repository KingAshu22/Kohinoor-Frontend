import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.toString() : '')
            .update(text)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            console.log("Transaction is not legit!");

            return new NextResponse("Transaction is not legit!", { status: 400 }); // Passing a string as the first argument
        }


        return new NextResponse(
            JSON.stringify({
                msg: "Success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing Razorpay payment:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
