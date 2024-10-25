const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

require("./db/conn");

const port = process.env.PORT || 8000;

const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

const newsRouter = require("./routes/news");
const blogRouter = require("./routes/blog");
const singleBlogRouter = require("./routes/singleblog");
const workRouter = require("./routes/ourWorks");
const aboutUsRouter = require("./routes/aboutUs");
const servicesRouter = require("./routes/services");
const singleServicesRouter = require("./routes/singleservice");
const teamRouter = require("./routes/team");
const testimonialRouter = require("./routes/testimonial");
const productRouter = require("./routes/product");
const contactRouter = require("./routes/contact");
const planRouter = require("./routes/plan");
const authRouter = require("./routes/authRoutes");
const paymentRouter = require("./routes/payment");

app.use(newsRouter);
app.use(blogRouter);
app.use(singleBlogRouter);
app.use(workRouter);
app.use(aboutUsRouter);
app.use(servicesRouter);
app.use(singleServicesRouter);
app.use(teamRouter);
app.use(testimonialRouter);
app.use(productRouter);
app.use(contactRouter);
app.use(planRouter);
app.use(authRouter);

app.use(paymentRouter);


// app.post('/payment', async(req, res) => {
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

// })
  


app.listen(port, () => {
  console.log(`Connection is setup at port ${port}`);
});
