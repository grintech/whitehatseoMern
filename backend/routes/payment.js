const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')('sk_test_51HbJttFgaAoSLfnXGZ1NRshw1gEFsPgDliwytL7KNCsROasC4ht1UCPdwHEQPcRBUEHMfKvSJ5fEj09Rp8BnWARe00m0tj0owi');


/*---- Routes -----*/

router.post('/payment', async (req, res) => {
    const {price, planName} = req.body;

    try {
        const product = await stripe.products.create({
            name: planName || "Plan"
        });

        if(product){
            var stripePrice = await stripe.prices.create({
                product : product.id,
                unit_amount : price * 100,
                currency: 'usd',
            });
        }

        if(stripePrice.id) {
            var session = await stripe.checkout.sessions.create({
                line_items : [
                    {
                        price: stripePrice.id,
                        quantity: 1,
                    }
                ],
                mode: "payment",
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
                customer_email: req.body.email,
            });
        }

        res.json(session);

    }catch(error){
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Server error');
    }
});

//     router.post('/payment', async(req, res) => {
//     const product = await stripe.products.create({
//     name:"T-shirt"
//     });
//     if(product){
//         var price = await stripe.prices.create({
//             product: `${product.id}`,
//             unit_amount: 100 * 100,
//             currency: 'usd',
//         });
//     }
//     if(price.id){
//         var session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: `${price.id}`,
//                     quantity: 1,
//                 }
//             ],

//             mode: 'payment',
//             success_url: 'http://localhost:3000/success',
//             cancel_url:  'http://localhost:3000/cancel',
//             customer_email: 'ankush.grintech@gmail.com'
//         })
//     }
//     res.json(session)

//  })


module.exports = router;
