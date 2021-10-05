const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const products = [
    { id: 1, name: 'TV'},
    { id: 2, name: 'Speaker'},
    { id: 3, name: 'Laptop'},
];

// Define routes
app.get('/', (req, res) => {
    res.send('Helllo from Duyen');
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    // Find existing one
    const product = products.find(p => p.id == req.params.id);
    if (!product)
        return res.status(404).send('NOT FOUND');

    res.send(product);
});

app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body);
    if (error)
        return res.status(400).send(error.details);

    const product = {
        id: products.length + 1,
        name: req.body.name
    };

    products.push(product);
    res.send(product);
});

app.put('/api/products/:id', (req, res) => {
    // Find existing one
    const product = products.find(p => p.id == req.params.id);
    if (!product)
        return res.status(404).send('NOT FOUND');

    // Validation
    // Using Object destructuring which = res.error
    const { error } = validateProduct(req.body);
    if (error)
        return res.status(400).send(error.details);

    // Update
    product.name = req.body.name;
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
    // Find existing one
    const product = products.find(p => p.id == req.params.id);
    if (!product)
        return res.status(404).send('NOT FOUND');

    // Delete
    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
})


function validateProduct(product) {
    const productSchema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return productSchema.validate(product);
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on: ${port}`));