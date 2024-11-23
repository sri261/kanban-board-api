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

  const columns = await knex("columns")
    .insert([
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
    ])
    .returning("*");

  const cards = await knex("cards").insert([
    {
      column_id: columns[0].id,
      title: "Task 1",
      position: 1,
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum",
    },
    {
      column_id: columns[0].id,
      title: "Task 34",
      position: 2,
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum",
    },
    {
      column_id: columns[1].id,
      title: "Task 4234",
      position: 1,
      description:
        "Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum",
    },
    {
      column_id: columns[2].id,
      title: "Task 3",
      position: 1,
      description:
        "Latin literature frofessor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum",
    },
  ]);
}
