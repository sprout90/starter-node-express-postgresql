/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*  specify the Knex methods for making 
    the desired database changes, such as creating tables, adding 
    or removing a column from a table, changing indexes, and so on.
*/
exports.up = function(knex) {

    return knex.schema.createTable("suppliers", (table) => {
        table.increments("supplier_id").primary(); // Sets supplier_id as the primary key   
        table.string("supplier_name");
        table.string("supplier_address_line_1");   
        table.string("supplier_address_line_2");
        table.string("supplier_city");
        table.string("supplier_state");
        table.string("supplier_zip");
        table.string("supplier_phone");
        table.string("supplier_email");
        table.text("supplier_notes");
        table.string("supplier_type_of_goods");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*  Perform the database rollback steps (if required) resulting
    the datebase updates performed in exports.up.
*/
exports.down = function(knex) {
    return knex.schema.dropTable("suppliers");
};
