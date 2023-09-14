const users = require("../../data/userData");

exports.getAll = (req, res) => {
  res.json(users);
};

exports.getOne = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user)
    return res.status(404).json({
      status: 404,
      message: "User not found!",
    });

  res.json(user);
};

exports.addUser = (req, res) => {
  let { name, email } = req.body;

  users.push({ id: users.length + 1, name: name, email: email });
  return res.json(users);
};

exports.updateUser = (req, res) => {
  let { name, email } = req.body;
  let id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user)
    return res.status(404).json({
      status: 404,
      message: "User not found!",
    });

  users[id].name = name;
  users[id].email = email;

  return res.json(users[id]);
};

exports.deleteUser = (req, res) => {
  let id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user)
    return res.status(404).json({
      status: 404,
      message: "User not found!",
    });

  users = users.filter((u) => u.id !== id);

  return res.json({
    status: 204,
    message: "User deleted!",
  });
};