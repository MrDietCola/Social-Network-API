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
async getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

// POST a new user:
async createUser(req, res) {
  try {
    const dbUserData = await User.create(req.body);
    // await req.body.email.validate();
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
    // assert.equal(error.errors['email'].message, 'Email validation failed');
  }
},

// PUT to update a user by its _id


// DELETE to remove user by its _id and associated thoughts


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list


}