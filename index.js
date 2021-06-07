const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MONGO CONNECTION OPEN!!!!');
})
.catch(err => {
    console.log('OH NOO!, MONGO CONNECTION ERROR!!!');
    console.log(err);
})
const Product = require('./Models/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const allProducts = await Product.find({});
    res.render('products/index', { allProducts });

})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})

