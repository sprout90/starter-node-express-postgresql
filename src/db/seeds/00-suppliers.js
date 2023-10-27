/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


//requires the suppliers seed data and stores it in the suppliers variable.
const suppliers = require("../fixtures/suppliers");


/*  1. The knex.raw() method uses the SQL statement RESTART IDENTITY 
      to reset the primary key values.
    2. Adding CASCADE ensures that any references to the entries in the
      suppliers table are deleted as well when the entries are deleted.
    3. As a note, the Knex truncate() method is preferable to writing a raw SQL
     statement to truncate the data, but it does not provide a way to reset the values 
     in the primary key column after entries are deleted from the table.
*/

exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("suppliers").insert(suppliers);
    });
};
