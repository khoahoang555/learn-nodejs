const yargs = require("yargs");
const { readAllProduct, createProduct } = require("./model/product");

// Read All Product - node app/indexPD.js read-all
yargs.command({
    command: "read-all", 
    handler: () => {
        const products = readAllProduct();
        console.log("Products: ", products);
    }
});

// Create Product - node app/indexPD.js read

// Save yargs
yargs.parse();