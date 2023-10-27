const knex = require("../db/connection");

function list() {
  return knex("products").select("*");
}

/* The query above selects the product_quantity_in_stock column (aliased as out_of_stock) from the products
   table. It also selects a count all of the products where product_quantity_in_stock is set to 0. 
   Finally, it groups the result by the out_of_stock column.
*/
function listOutOfStockCount(){
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

/* selects the supplier_id column from the products table and returns the minimum, 
   maximum, and average values of the product_price column, grouped by the supplier_id column. 
*/
function listPriceSummary(){
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

/* The listTotalWeightByProduct query selects the product_sku, product_title, and a third special column. 
   This third column consists of the sum of multiplying the values from two columns 
   (product_weight_in_lbs and product_quantity_in_stock) from the products table. 
   The result is then grouped by product_title and product_sku.
*/
function listTotalWeightByProduct() {

  return knex("products")
    .select(
      "product_sku",
      "product_title",

      knex.raw(
        "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
      )
    )
    .groupBy("product_title", "product_sku");
}


/* creates a Knex query that selects all columns from the products table 
   where the product_id column matches the argument passed to the read() function.
   The first() method returns the first row in the table as an object.
*/
function read(productId) {
  return knex("products").select("*").where({ product_id: productId}).first();
}

module.exports = {
  list, 
  listOutOfStockCount, 
  listPriceSummary, 
  listTotalWeightByProduct,
  read
};