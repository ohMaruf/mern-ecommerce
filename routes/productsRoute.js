import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/getallproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res.status(400).json({ message: "qualcosa è andato storto" });
    }
  });
});

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.productId }, (err, docs) => {
    if (!err) {
      res.send(docs[0]);
    } else {
      res.status(400).json({ message: "qualcosa è andato storto" });
    }
  });
});

router.post("/addreview", async (req, res) => {
  const { review, productId, currentUser } = req.body;
  const product = await Product.findById(productId);
  const reviewObj = {
    name: currentUser.name,
    userId: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };
  product.reviews.push(reviewObj);

  let rating =
    product.reviews.reduce((acc, it) => acc + it.rating, 0) /
    product.reviews.length;
  product.rating = rating;

  product.save((err) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send("recensione aggiunta con successo");
    }
  });
});

router.post("/deleteproduct", (req, res) => {
  Product.findByIdAndRemove({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send("prodotto eliminato con successo");
    }
  });
});

router.post("/addproduct", (req, res) => {
  const { product } = req.body;

  const productModel = new Product({
    name: product.name,
    price: product.price,
    countInStock: product.countInStock,
    seller: product.seller,
    category: product.category,
    image: product.image,
    description: product.description,
    reviews: [],
    rating: 0,
  });

  productModel.save((err) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send("prodotto aggiunto con successo");
    }
  });
});

router.post("/updateproduct", (req, res) => {
  const { product, id } = req.body;

  Product.findByIdAndUpdate(
    id,
    {
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      seller: product.seller,
      category: product.category,
      image: product.image,
      description: product.description,
    },
    (err) => {
      if (err) {
        res.status(400).json({ message: "qualcosa è andato storto" });
      } else {
        res.send("prodotto aggiornato con successo");
      }
    }
  );
});

export default router;
