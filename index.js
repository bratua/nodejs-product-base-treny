const argv = require("yargs").argv;
require;

const products = require("./products.js");
// console.log("index.js: ", products);

/**
 *
 *
 * @param {String} - action param0
 * @param {String} - id param1
 * @returns {Promise<Array, Object>}
 */
const invokeAction = async ({ action, id, newProductData }) => {
   // const allProducts = Object.values(await products.getAllProductsByName());

   switch (action) {
      // returns the array of objects {id:<number>, name:<string>}
      case "read":
         const allProducts = await products.getAllProducts();
         return allProducts;

      case "readNames":
         const allProductsByName = await products.getAllProductsByName();
         return allProductsByName;

      case "readID":
         const product = await products.getByProductID(id);
         return product;

      case "add":
         const newProduct = await products.addProduct(newProductData);
         console.log(newProduct);
         return;
   }
};

//return Promise
// invokeAction({ action: "read" }).then(console.log);

// invokeAction({ action: "readNames" }).then(console.log);

// invokeAction({ action: "readID", id: 40901 }).then(console.log);

invokeAction({
   action: "add",
   newProductData: { Name: "Name of new product", PriceUSD: 12312312312 },
});
