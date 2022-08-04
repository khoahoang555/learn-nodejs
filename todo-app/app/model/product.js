const fs = require("fs");

const readAllProduct = () => {
    const products = fs.readFileSync("product.json");
    const productsJSON = JSON.parse(products);
    return productsJSON;
}

const createProduct = (name, amount) => {

}

module.exports = {
    readAllProduct,
    createProduct
};