import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch Razorpay key ID from environment variables
        const razorpayKeyId = process.env.RAZORPAY_KEY_ID;

        return new NextResponse(JSON.stringify({ RAZORPAY_KEY_ID: razorpayKeyId }), { status: 200 });
    } catch (error) {
        console.error('Error fetching Razorpay configuration:', error);
        return new NextResponse("Failed to fetch Razorpay configuration", { status: 500 });
    }
};
