import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", (req, res) => {
  const saltRounds = 10;
  User.find({ email: req.body.email }, (_, docs) => {
    if (docs.length > 0) {
      res.status(409).json({ message: "E-mail già registrata" });
    } else {
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        // Store hash in your password DB.
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isPremium: false,
        });

        user.save((err) => {
          if (!err) {
            res.send("Registrazione completata con successo");
          } else {
            res.status(400).json({ message: "Registrazione fallita" });
          }
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email }, (_, docs) => {
    if (docs.length > 0) {
      bcrypt.compare(req.body.password, docs[0].password).then((result) => {
        if (result) {
          const user = {
            _id: docs[0]._id,
            name: docs[0].name,
            email: docs[0].email,
            isPremium: docs[0].isPremium,
          };
          res.send(user);
        } else {
          res.status(401).json({ message: "E-mail e/o password errati" });
        }
      });
    } else {
      res.status(401).json({ message: "E-mail e/o password errati" });
    }
  });
});

router.post("/premium", async (req, res) => {
  const user = await User.findById(req.body.id);
  user.isPremium = true;
  user.save((err) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send("upgrade eseguito con successo");
    }
  });
});

router.get("/getallusers", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send(docs);
    }
  });
});

router.post("/deleteuser", (req, res) => {
  console.log(req.body);
  User.findByIdAndRemove({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(400).json({ message: "qualcosa è andato storto" });
    } else {
      res.send("utente eliminato con successo");
    }
  });
});

export default router;
