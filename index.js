const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const isAuthenticated = require("./isAuthenticated");
const Produit = require("./produit");
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb+srv://DEVyounes:DEVyounes@cluster0.zrhgs6u.mongodb.net/?retryWrites=true&w=majority/produit-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
);
app.post("/produit/ajouter", isAuthenticated, (req, res, next) => {
    const { nom, description, prix } = req.body;
    const newProduit = new Produit({
        nom,
        description,
        prix
    });
    newProduit.save()
        .then(produit => res.status(201).json(produit))
        .catch(error => res.status(400).json({ error }));
});
app.get("/produit/acheter", isAuthenticated, (req, res, next) => {
    const { ids } = req.body;
    Produit.find({ _id: { $in: ids } })
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));
});
app.listen(PORT, () => {
    console.log(`Product-Service at 4000`);
});