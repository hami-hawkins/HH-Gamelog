/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('gamelog', (table) => {
    table.increments('id').primary()
    table.string('game')
    table.string('platform')
    table.string('release_date')
    table.boolean('owned')
    table.boolean('clocked')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('gamelog')
}
