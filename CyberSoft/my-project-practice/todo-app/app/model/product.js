const fs = require('fs');

const readAllProduct = () => {
    const products = fs.readFileSync('product.json');
    const productJSON = JSON.parse(products);
    return productJSON;
};

const readDetailProduct = (id) => {
    const products = readAllProduct();
    const product = products.find(item => item.id === id);
    return product;
}

const createProduct = (name, amount) => {
    let products = readAllProduct();
    const product = {
        id: Math.random().toString(),
        name, 
        amount
    };
    products = [...products, product];
    const productStr = JSON.stringify(products);
    fs.writeFileSync("product.json", productStr);
    return product;
};

const updateProduct = (id, name, amount) => {
    const products = readAllProduct();
    const index = products.findIndex(product => product.id == id);
    if (index !== -1) {
        products[index].name = name;
        products[index].amount = amount;
        const productStr = JSON.stringify(products);
        fs.writeFileSync("product.json", productStr);
        return products[index];
    } else {
        return -1;
    }
}

const deleteProduct = (id) => {
    const products = readAllProduct();
    const product = readDetailProduct(id);
    if (product !== undefined) {
        const productsCopy = products.filter(item => item.id !== id);
        const productStr = JSON.stringify(productsCopy);
        fs.writeFileSync("product.json", productStr);
        return product;    
    } else {
        return -1;
    }
}

const importProduct = (id) => {
    const products = readAllProduct();
    const index = products.findIndex(item => item.id == id);
    if (index !== -1) {
        products[index].amount = Number.parseInt(products[index].amount) + 50;
        const productStr = JSON.stringify(products);
        fs.writeFileSync("product.json", productStr);
        return products[index];
    } else {
        return -1;
    }
}

module.exports = {
    readAllProduct,
    createProduct,
    readDetailProduct,
    updateProduct,
    deleteProduct,
    importProduct
};