import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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
                phoneNumber: mobile,
            });
        }

        console.log(cartProducts);

        // Fetch product information
        const productsIds = cartProducts.map((product: CartProduct) => product.item._id);
        const productsInfos = await Product.find({ _id: { $in: productsIds } });

        // Prepare line items
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

        // Create order
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
            paymentMode: "COD" // Change payment mode to "COD"
        });

        // Associate order with customer
        customer.orders.push(order._id);
        await customer.save();

        return new NextResponse(JSON.stringify({
            orderId: order._id,
            message: "Order placed successfully.",
        }), { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new NextResponse("Failed to create order", { status: 400 });
    }
};
