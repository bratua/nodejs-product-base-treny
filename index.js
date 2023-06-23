const argv = require("yargs").argv;
const { hideBin } = require("yargs");

// const { program } = require("commander");

const products = require("./products.js");
// console.log("index.js: ", products);

/**
 *
 *
 * @param {String} - action, id, productData
 * @returns {Promise<Object>}
 */
const invokeAction = async ({ action, id, ...productData }) => {
   // const allProducts = Object.values(await products.getAllProductsByName());
   console.log(action);

   switch (action) {
      // returns the array of objects {id:<number>, name:<string>}
      case "read":
         const allProducts = await products.getAllProducts();
         return allProducts;

      case "readNames":
         const allProductsByName = await products.getAllProductsByName();
         return allProductsByName;

      case "readID":
         const product = await products.getProductByID(id);
         return product;

      case "add":
         const newProduct = await products.addProduct(productData);
         return newProduct;

      case "delete":
         const deletedProduct = await products.deleteProduct(id);
         return deletedProduct;

      case "update":
         const updatedItem = await products.updateProduct(id, productData);
         return updatedItem;

      default:
         console.warn("\x1B[31m Unknown action type!");
   }
};

// console.log(argv);

//return Promise

invokeAction(argv).then(console.log);

// invokeAction({ action: "read" }).then(console.log);

// invokeAction({ action: "readNames" }).then(console.log);

// invokeAction({ action: "readID", id: 40901 }).then(console.log);

// invokeAction({
//    action: "add",
//    productData: { Name: "Name of new product", PriceUSD: 12312312312 },
// }).then(console.log);

// invokeAction({ action: "delete", id: 15 }).then(console.log);

// invokeAction({
//    action: "update",
//    id: 239,
//    productData: {
//       PriceUSD: 1234,
//       Price_ind: 99,
//       Bonus: 20,
//       RecommendedPrice: 1220,
//       DDP: 1230,
//       Warranty: 36,
//       Stock: "3",
//       ProductID: 123124124,
//    },
// }).then(console.log);
