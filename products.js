const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const productsPath = path.join(__dirname, "db", "productsDB.json");
// console.log(productsPath);

const getAllProducts = async () => {
   const data = JSON.parse(await fs.readFile(productsPath, "utf-8"));

   const products = Object.values(data);

   return products;
};

const createSkeleton = async () => {
   const products = await getAllProducts();
   const keys = Object.keys(products[0]);

   const skeleton = {};
   for (const key of keys) {
      skeleton[key] = null;
   }

   return skeleton;
};

const getAllProductsByName = async () => {
   const products = await getAllProducts();

   const productNames = products.map(({ ProductID, Name }) => {
      return { ProductID, Name };
   });
   return productNames;
};

const getByProductID = async (id) => {
   const data = await getAllProductsByName();
   const product = data.find(({ ProductID }) => id === ProductID);

   return product || null;
};

const addProduct = async (newProduct) => {
   const skeleton = await createSkeleton();
   const products = await getAllProducts();

   const newItem = {
      ...skeleton,
      ProductID: nanoid(),
      ...newProduct,
   };

   products.push(newItem);

   fs.writeFile(productsPath, JSON.stringify(products, null, 2));
   return newItem;
};

module.exports = {
   getByProductID,
   getAllProductsByName,
   getAllProducts,
   addProduct,
};
