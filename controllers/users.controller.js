const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Juan" },
  { id: 3, name: "Diego" },
  { id: 4, name: "Laura" }
];

const getUsers = (req, res) => {
  let result = users;

  const { limit, name } = req.query;

  if (name) {
    result = result.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  res.json({
    total: result.length,
    data: result,
  });
};


const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
};

module.exports = {
  getUsers,
  getUserById,
};
