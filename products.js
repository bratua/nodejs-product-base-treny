const fs = require("fs/promises");
const path = require("path");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 9);

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

const getProductByID = async (id) => {
   const data = await getAllProductsByName();
   const product = data.find(({ ProductID }) => id === ProductID);

   return product || null;
};

const deleteProduct = async (id) => {
   const products = await getAllProducts();
   const index = products.findIndex(({ ProductID }) => ProductID === id);
   if (index === -1) return null;
   const [deletedProduct] = products.splice(index, 1);

   fs.writeFile(productsPath, JSON.stringify(products, null, 2));

   return deletedProduct;
};

const updateProduct = async (id, newData) => {
   const products = await getAllProducts();
   const index = products.findIndex(({ ProductID }) => ProductID === id);
   if (index === -1) return null;

   const updatedItem = { ...products[index], ...newData, ProductID: id };
   products.splice(index, 1, updatedItem);

   fs.writeFile(productsPath, JSON.stringify(products, null, 2));

   return updatedItem;
};

const addProduct = async (newProduct) => {
   const skeleton = await createSkeleton();
   const products = await getAllProducts();

   const newItem = {
      ...skeleton,
      ProductID: Number(nanoid()),
      ...newProduct,
   };

   products.push(newItem);

   fs.writeFile(productsPath, JSON.stringify(products, null, 2));
   return newItem;
};

module.exports = {
   getProductByID,
   getAllProductsByName,
   getAllProducts,
   addProduct,
   deleteProduct,
   updateProduct,
};
