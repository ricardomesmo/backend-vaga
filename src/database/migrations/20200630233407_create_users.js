exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("email").unique().notNullable();
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("users");
};
