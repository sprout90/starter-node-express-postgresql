const knex = require("../db/connection");

function list() {
  return knex("products").select("*");
}

/* creates a Knex query that selects all columns from the products table 
   where the product_id column matches the argument passed to the read() function.
   The first() method returns the first row in the table as an object.
*/
function read(productId) {
  return knex("products").select("*").where({ product_id: productId}).first();
}

module.exports = {
  list, read
};