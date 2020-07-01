exports.up = function (knex) {
  return knex.schema.createTable("favorites", function (table) {
    table.increments();
    table.string("url_picture").notNullable();
    table.string("likes").notNullable();
    table.string("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("favorites");
};
