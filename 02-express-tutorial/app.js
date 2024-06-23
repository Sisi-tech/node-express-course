const express = require('express')
const app = express()
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



// const http = require('http');
// const { readFileSync } = require('fs')

// const formPage = readFileSync('./methods-public/index.html')
// const formStyles = readFileSync('./methods-public/styles.css')
// const formLogic = readFileSync('./methods-public/javascript.html')

// const server = http.createServer((req, res) => {
//     console.log(req.method)
//     console.log('user hit the server')
//     const url = req.url
//     // res.end('home page')
//     if (url === '/') {
//         res.writeHead(200, { 'content-type': 'text/html' })
//         res.write('<h1>Home Page</h1>')
//         res.end()
//     } else if (url === '/about') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.write('<h1>About page</h1>')
//         res.end()
//     } else if (url === '/contact') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.write('<h1>Contact page</h1>')
//         res.end()
//     // form page
//     } else if (url === '/form') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.write(formPage)
//         res.end()
//     // form styles
//     } else if (url === '/styles.css') {
//         res.writeHead(200, { 'content-type': 'text/css'})
//         res.write(formStyles)
//         res.end()
//     // form javascript
//     } else if (url === '/javascript.html') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.write(formLogic)
//         res.end()
//     } else {
//         res.writeHead(400, {'content-type': 'text/html'})
//         res.write('<h1>Page not found</h1>')
//         res.end()
//     }
// });

// // port 5000 already in use, can't use it here. otherwise, cause an error.
// server.listen(5001)

// ---- express basics -----
// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//     res.status(200).send('Home page')
// })

// app.get('/about', (req, res) => {
//     res.status(200).send('About page')
// })

// app.all('*', (req, res) => {
//     res.status(404).send('<h1>Resource not found</h1>')
// })

// app.listen(5001, () => {
//     console.log('server is listening on port 5001...');
// })


// ----- static and middleware -----
// const express = require('express');
// const path = require('path')
// const app = express()

// // setup static and middleware
// app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

// app.get('*', (req, res) => {
//     res.status(404).send('resource not found')
// })

// app.listen(5001, () => {
//     console.log('server is listening on port 5001...')
// })


// -----------------------------

// const express = require('express')
// const app = express()
// const { products } = require('./data')
 
// app.get('/', (req, res) => {
//     res.send('<h1>Home page</h1><a href="/api/products">products</a>')
// })

// app.get('/api/products', (req, res) => {
//     const newProducts = products.map((product) => {
//         const {id, name, image} = product;
//         return {id, name, image}
//     })
//     res.json(newProducts)
// })

// app.get('/api/products/:id', (req, res) => {
//     const {id} = req.params;
//     const singleProduct = products.find((product) => product.id === Number(id))
//     if (!singleProduct) {
//         return res.status(404).send('Product does not exist')
//     }
//     return res.json(singleProduct)
// })

// // query 
// app.get('/api/v1/query', (req, res) => {
//     const { search, limit } = req.query 
//     let sortedProducts = [...products]

//     if (search) {
//         sortedProducts = sortedProducts.filter((product) => {
//             return product.name.startsWith(search)
//         })
//     }
//     if (limit) {
//         sortedProducts = sortedProducts.slice(0, Number(limit))
//     }
//     if (sortedProducts.length < 1) {
//         return res.status(200).json({ success: true, data: []})
//     }
//     res.status(200).json(sortedProducts)
// })

// app.listen(5001, () => {
//     console.log('Server is listening on port 5001...')
// })