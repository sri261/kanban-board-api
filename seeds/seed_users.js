/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
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
  ]);
}
