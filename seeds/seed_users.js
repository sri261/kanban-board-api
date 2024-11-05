/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();
  await knex("boards").del();
  await knex("columns").del();
  await knex("cards").del();

  const users = await knex("users")
    .insert([
      {
        name: "Sriharsh Dubale",
        email: "dsriharsh@gmail.com",
        password: "password",
      },
      {
        name: "Sri",
        email: "sriharsh.dubale1@gmail.com",
        password: "password",
      },
    ])
    .returning("*");

  const boards = await knex("boards")
    .insert([
      {
        user_id: users[0].id,
        title: "Project 1",
      },
      {
        user_id: users[0].id,
        title: "Project 2",
      },
      {
        user_id: users[0].id,
        title: "Project 3",
      },
      {
        user_id: users[0].id,
        title: "Project 4",
      },
    ])
    .returning("*");

  const columns = await knex("columns").insert([
    {
      board_id: boards[0].id,
      title: "Todo",
      position: 1,
    },
    {
      board_id: boards[0].id,
      title: "Doing",
      position: 2,
    },
    {
      board_id: boards[0].id,
      title: "Testing",
      position: 3,
    },
    {
      board_id: boards[0].id,
      title: "Done",
      position: 4,
    },
  ]);
}
