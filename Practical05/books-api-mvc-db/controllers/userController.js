
const userModel = require("../models/userModel");

// GET /users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error retrieving users" });
  }
}

// GET /users/:id
async function getUserById(req, res) {
  try {
    const { id }  = req.params;
    const user    = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// POST /users
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "username, email & password required" });

    const newUser = await userModel.createUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error creating user" });
  }
}

// PUT /users/:id
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const ok = await userModel.updateUser(id, req.body);
    if (!ok) return res.status(404).json({ error: "User not found or no data changed" });
    res.json({ message: "User updated" });
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error updating user" });
  }
}

// DELETE /users/:id
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const ok = await userModel.deleteUser(id);
    if (!ok) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error deleting user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
