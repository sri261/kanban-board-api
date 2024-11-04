/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("password", 255).notNullable();
      table.timestamps(true, true); // created_at, updated_at
    })
    .createTable("boards", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("title", 255).notNullable();
      table.timestamps(true, true);
    })
    .createTable("columns", (table) => {
      table.increments("id").primary();
      table
        .integer("board_id")
        .references("id")
        .inTable("boards")
        .onDelete("CASCADE");
      table.string("title", 255).notNullable();
      table.integer("position").notNullable(); // for ordering columns
      table.timestamps(true, true);
    })
    .createTable("cards", (table) => {
      table.increments("id").primary();
      table
        .integer("column_id")
        .references("id")
        .inTable("columns")
        .onDelete("CASCADE");
      table.string("title", 255).notNullable();
      table.text("description");
      table.integer("position").notNullable(); // for ordering cards within a column
      table.timestamp("due_date");
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists("cards")
    .dropTableIfExists("columns")
    .dropTableIfExists("boards")
    .dropTableIfExists("users");
}
