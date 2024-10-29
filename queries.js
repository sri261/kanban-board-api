const getUsers = "SELECT * FROM users";
const getUser = "SELECT * FROM users WHERE email  = $1";

export default { getUsers, getUser };
