const yargs = require('yargs');
const chalk = require('chalk');
const { readAllProduct, 
        createProduct, 
        readDetailProduct, 
        updateProduct, 
        deleteProduct,
        importProduct
    } = require('./model/product');

// Read All Product - node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const products = readAllProduct();
        console.log(chalk.green("Product: "), products);
    }
});

// Read product detail by id - node app/index.js read-detail --id="1"
yargs.command({
    command: "read-detail",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args;
        const product = readDetailProduct(id);
        if (product !== undefined) {
            console.log(chalk.green("Product finded: "), product);
        } else {
            console.log(chalk.red("Product not found!"));
        }
    }
});

// Create Product - node app/index.js create --name="Laptop" --amount="10"
yargs.command({
    command: "create",
    builder: {
        name: {
            type: "string"
        },
        amount: {
            type: "string"
        }
    },
    handler: (args) => {
        const { name, amount } = args;
        const product = createProduct(name, amount);
        console.log(chalk.green("Product added: "), product);
    }
});

// Update Product - node app/index.js update --id="1" --name="Iphone" --amount="20"
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        amount: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id, name, amount } = args;
        const product = updateProduct(id, name, amount);
        if (product !== -1) {
            console.log(chalk.blue("Product updated: "), product);
        } else {
            console.log(chalk.red("Product not found!"));
        }
    }
});

// Delete product - node app/index.js delete --id="1"
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args;
        const product = deleteProduct(id);
        if (product !== -1) {
            console.log(chalk.green("Product deleted: "), product);
        } else {
            console.log(chalk.red("Product not found!"));
        }
    }
});

// Import product - node app/index.js import-product --id="1"
yargs.command({
    command: "import-product",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args;
        const product = importProduct(id);
        if (product !== -1) {
            console.log(chalk.green("Product imported: "), product);
        } else {    
            console.log(chalk.red("Product not found!"));
        }
    }
});

yargs.parse();