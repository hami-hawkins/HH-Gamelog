/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('gamelog', (table) => {
    table.increments('id').primary()
    table.string('game')
    table.boolean('played_before')
    table.boolean('clocked_before')
    table.string('platform')
    table.string('start_date')
    table.string('finish_date')
    table.string('playtime_estimate')
    table.string('playtime_final')
    table.integer('gameplay_rating')
    table.integer('story_rating')
    table.integer('graphics_rating')
    table.integer('performance_rating')
    table.integer('fun_rating')
    table.integer('final_rating')
    table.string('final_thoughts')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('gamelog')
}
