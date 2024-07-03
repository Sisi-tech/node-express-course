
// ------ Week 3 --------

const port = 3000;
const { products } = require("./data");

app.use(express.static("./public"))

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
})

app.get('/api/v1/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    const productId = parseInt(req.params.productID)
    const product = products.find((product) => product.id === productId);
    if (!product) {
        return res.status(404).json({ message: "That product was not found. "})
    }
    res.status(200).json(product);
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if (price) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.price < parseFloat(price);
        });
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: []});
    }
    res.status(200).json({ success: true, data: sortedProducts });
})

app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


