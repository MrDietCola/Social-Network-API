const { User, Thought } = require('../models');

module.exports = {
// GET all users
async getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
},

// GET a single user by its _id and populated thought and friend data


// PUT to update a user by its _id


// DELETE to remove user by its _id and associated thoughts


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list


}