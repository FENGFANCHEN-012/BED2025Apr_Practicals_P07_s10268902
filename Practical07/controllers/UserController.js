const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {
  const { username, password, role } = req.body;

  try {
     if (!username || !password || !role) {
      return res.status(400).json({ message: "Username, password and role are required" });
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
     if(password.length<6){
      return res.status(400).json({ message: "Password must be at least 6 digit" })
     }
     if( ["Library Member","Librarian"].includes(password)){
      return res.status(400).json({ message: "Password must be at least 6 digit" })
     }
    // Hash password

     const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET_Password,
      { expiresIn: '1h' }
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
     const newUser = await userModel.createUser({
      username,
      passwordHash: hashedPassword,
      role
    });

  
    return res.status(201).json({ 
      message: "User created successfully",
      user:{
          username: newUser.username,
          passwordHash :hashedPassword,
          role: newUser.role
      },
      token: token
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}














async function getAllUsers(req, res) {
  try {
    const user = await userModel.getAllUsers;
    res.json(user);
  } catch (error) {

    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving User" });

  }
}



// Get book by ID
async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await userModel.getUserById;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// Create new book
async function createUser(req, res) {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error creating user " });
  }
}
async function updateUser (req,res){
  try{
  const id = parseInt(req.params.id);
  const user = req.body;
  const change = await userModel.updateUser(id,user);
  
  res.status(200).json(change)}
  catch(error){
      console.error("Controller error:", error);
    res.status(500).json({ error: "Error change user" });
    
  }

  
  
}
async function deleteUser(req,res){
    try{
      const id = req.params.id;
      const deletion  = await userModel.deleteUser(id)
      res.status(204).json("Delete succeed")
    }
    catch(error){
       console.error("Controller error:", error);
    res.status(500).json({ error: "Error change book" });
    }

  }
  async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error("Controller error in searchUsers:", error);
    res.status(500).json({ message: "Error searching users" });
  }
}
async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error("Controller error in getUsersWithBooks:", error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}
module.exports = {
  getAllUsers,getUserById,deleteUser,createUser
  ,updateUser, searchUsers, getUsersWithBooks,
  registerUser
};