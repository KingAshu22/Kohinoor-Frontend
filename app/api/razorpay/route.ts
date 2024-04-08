import mongoose from "mongoose";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";
import Razorpay from "razorpay";

interface CartProduct {
    item: {
        _id: string;
    };
    color?: string;
    size?: string;
    quantity: number;
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const {
            amount,
            name,
            email,
            mobile,
            streetAddress,
            city,
            postalCode,
            country,
            cartProducts,
        }: {
            amount: number;
            name: string;
            email: string;
            mobile: string;
            streetAddress: string;
            city: string;
            postalCode: string;
            country: string;
            cartProducts: CartProduct[];
        } = await req.json();

        // Data validation
        if (!amount || !name || !email || !mobile || !streetAddress || !city || !postalCode || !country || !cartProducts) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Find or create customer
        let customer = await Customer.findOne({ clerkId: userId });

        if (!customer) {
            customer = await Customer.create({
                clerkId: userId,
                name: name,
                email: email,
            });
        }

        console.log(cartProducts);

        // Fetch product information
        const productsIds = cartProducts.map(product => product.item._id);
        const productsInfos = await Product.find({ _id: { $in: productsIds } });

        // Prepare line items for Razorpay
        let line_items = [];
        for (const cartProduct of cartProducts) {
            const productInfo = productsInfos.find(p => p._id.toString() === cartProduct.item._id);
            const quantity = cartProduct.quantity;

            if (productInfo && quantity > 0) {
                line_items.push({
                    product: productInfo._id,
                    color: cartProduct.color,
                    size: cartProduct.size,
                    quantity: cartProduct.quantity,
                });
            }
        }

        // Create Razorpay order
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.toString() : '', // Check if RAZORPAY_KEY_ID is defined, convert to string, or provide a default value
            key_secret: process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.toString() : '', // Check if RAZORPAY_KEY_SECRET is defined, convert to string, or provide a default value
        });


        const options = {
            amount: (amount * 100).toString(),
            currency: 'INR',
            receipt: shortid.generate(),
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);
        const orderId = response.id;

        // Create order in MongoDB and associate with customer
        const order = await Order.create({
            customerClerkId: userId,
            products: line_items,
            shippingAddress: {
                street: streetAddress,
                city: city,
                state: '',
                postalCode: postalCode,
                country: country,
            },
            totalAmount: amount,
            paymentMode: "Online"
        });

        // Associate order with customer
        customer.orders.push(order._id);
        await customer.save();

        return new NextResponse(JSON.stringify({
            id: orderId,
            amount: response.amount,
            status: response.status,
        }), { status: 200 });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return new NextResponse("Failed to create Razorpay order", { status: 400 });
    }
};
