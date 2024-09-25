/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('gamelog').del()
  await knex('gamelog').insert([
    {
      game: 'Elden Ring',
      platform: 'PS5 / XBOX / PC',
      release_date: 'February 25th 2022',
      owned: true,
      clocked: true,
    },
    {
      game: 'Tekken 3',
      platform: 'PS1',
      release_date: 'March 26th 1998',
      owned: false,
      clocked: true,
    },
    {
      game: 'Halo 2',
      platform: 'XBOX',
      release_date: 'November 9th 2004',
      owned: false,
      clocked: false,
    },
    {
      game: 'Minecraft',
      platform: 'PS / XBOX / PC / Switch',
      release_date: 'May 17 2009',
      owned: true,
      clocked: false,
    },
  ])
}
