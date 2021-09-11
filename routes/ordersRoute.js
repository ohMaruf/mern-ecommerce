import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/orderModel.js";

const router = express.Router();
const stripe = Stripe(
  "sk_test_51JWLL9HeWVru92k2JvcU3WV6597SawOtlpVAmiiHHgDODCyd703Ah0hA2K2QExqked1fw5uWwb1iZzTQ4cq6Sta500p5yGmx8i"
);

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, orderItems } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const payment = await stripe.charges.create(
    {
      amount: subTotal * 100,
      currency: "EUR",
      customer: customer.id,
      receipt_email: currentUser.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (payment) {
    const order = new Order({
      userId: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      orderItems: orderItems,
      shippingAdress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        postalCode: token.card.address_zip,
        country: token.card.address_country,
      },
      orderAmount: subTotal,
      transactionId: payment.source.id,
      isDelivered: false,
    });

    order.save((err) => {
      if (err) {
        res.status(400).json({ message: "qualcosa è andato storto", err: err });
      } else {
        res.send("ordine effettuato con successo");
      }
    });
  } else {
    return res.status(402).json({ message: "pagamento fallito" });
  }
});

router.post("/getordersbyuserid", (req, res) => {
  const userId = req.body.userId;
  Order.find({ userId: userId }, (err, docs) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto", err: err });
    } else {
      res.send(docs);
    }
  });
});

router.get("/getallorders", (req, res) => {
  Order.find({ }, (err, docs) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto", err: err });
    } else {
      res.send(docs);
    }
  })
})

export default router;
