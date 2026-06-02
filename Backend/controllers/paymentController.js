// controllers/paymentController.js
import stripe from "../config/stripe.js";

export const checkout = async (req, res) => {
    try {
        const { productName, price } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",

                        product_data: {
                            name: productName,
                        },

                        unit_amount: price * 100,
                    },

                    quantity: 1,
                },
            ],

            mode: "payment",

            success_url:
                "http://localhost:5173/success",

            cancel_url:
                "http://localhost:5173/cancel",
        });

        res.json({
            id: session.id,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};