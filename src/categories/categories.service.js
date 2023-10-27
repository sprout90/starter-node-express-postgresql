
//equires the Knex instance initialized in ./db/connection.js.
const knex = require("../db/connection");

//builds a query that selects all columns from the categories table.
function list() {
  return knex("categories").select("*");
}

/*Exports the list() function so that it can be required in other files.
 You can add any other functions that you'd like to export inside the 
  module.exports object, separated by commas.
*/
module.exports = {
  list,
};