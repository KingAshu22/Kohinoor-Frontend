import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { create } from 'venom-bot';

// const initializeWhatsAppClient = async () => {
//     try {
//         const client = await create(
//             'sessionName',
//             (base64Qr, asciiQR, attempts, urlCode) => {
//                 console.log(asciiQR); // Optional to log the QR in the terminal
//                 var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//                     response = {};

//                 if (matches.length !== 3) {
//                     return new Error('Invalid input string');
//                 }
//                 response.type = matches[1];
//                 response.data = new Buffer.from(matches[2], 'base64');

//                 var imageBuffer = response;
//                 require('fs').writeFile(
//                     'out.png',
//                     imageBuffer['data'],
//                     'binary',
//                     function (err) {
//                         if (err != null) {
//                             console.log(err);
//                         }
//                     }
//                 );
//             },
//             undefined,
//             { logQR: false }
//         )

//         client.onMessage(async (message) => {
//             console.log('Received message:', message.body);
//         });

//         return client;
//     } catch (error) {
//         console.error('Error initializing WhatsApp client:', error);
//         return null;
//     }
// };

// const client = await initializeWhatsAppClient();

// const sendWhatsAppMessage = async (to: string, message: string) => {
//     try {
//         if (!client) {
//             console.error('WhatsApp client is not initialized.');
//             return;
//         }

//         await client.sendText(to, message);
//         console.log('Message sent successfully.');
//     } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//     }
// };


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
            state,
            cartProducts,
        } = await req.json();

        // Data validation
        if (!amount || !name || !email || !mobile || !streetAddress || !city || !postalCode || !state || !cartProducts) {
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
                state: state,
                postalCode: postalCode,
            },
            totalAmount: amount,
        });

        // Associate order with customer
        customer.orders.push(order._id);
        await customer.save();

        // // Send WhatsApp message with order details
        // const message = `New quotation created:\nOrder ID: ${order._id}\nTotal Amount: ${amount}\nShipping Address: ${streetAddress}, ${city}, ${state}, ${postalCode}`;
        // await sendWhatsAppMessage(`${mobile}@c.us`, message);
        // await sendWhatsAppMessage("+918104461820@c.us", message);

        return new NextResponse(JSON.stringify({
            orderId: order._id,
            message: "Order placed successfully.",
        }), { status: 200 });


    } catch (error) {
        console.error('Error creating order:', error);
        return new NextResponse("Failed to create order", { status: 400 });
    }
};
