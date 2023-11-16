const { User, Thought } = require('../models');

module.exports = {
// GET all users
async getUsers(req, res) {
  try {
    const users = await User.find();
    // Returning found users
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
},

// GET a single user by its _id and populated thought and friend data
async getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
    // Checking if user exists
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    // Returning single user 
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

// POST a new user:
async createUser(req, res) {
  try {
    // Creating the user from the body 
    const dbUserData = await User.create(req.body);
    // Returning a message that user was created
    res.json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message});
  }
},

// PUT to update a user by its _id
async updateUser(req, res) {
  try {
    // Finding and updating the user with the body
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    // Checking if that user exists
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    // Returning success message
    res.json({ message: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// DELETE to remove user by its _id and associated thoughts
async deleteUser(req, res) {
  try {
    // Finding user to delete
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    // Removing thoughts created by that user
    const thoughts = await Thought.deleteMany(
      { _id: { $in: user.thoughts } }
    );
    // Checking if user has thoughts
    if (!thoughts) {
      return res
        .status(404)
        .json({ message: 'This user had no thoughts to delete' });
    }
    // Returning success message
    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    console.error(err); 
    res.status(500).json(err);
  }
},

// POST to add a new friend to a user's friend list
async addFriend(req, res) {
  try {
    // Finding user and adding friend to user's friends array
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    // Checking if the user exists
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    // Returning success message
    res.json({ message: 'Friend successfully added!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

// DELETE to remove a friend from a user's friend list
async removeFriend(req, res) {
  try {
    // Getting the user to update
    const userToUpdate = await User.findOne({ _id: req.params.userId });
    // Getting the friend
    const friend = await User.findOne({ _id: req.params.friendId });
    // Checking if the user exists
    if (!userToUpdate) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    // Checking if the friend exists
    if (!friend) {
      return res.status(404).json({ message: 'No friend with this id!' });
    }
    // Checking if that friend belongs to the user
    if (userToUpdate.friends.includes(req.params.friendId)) {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
        { new: true }
        );
      } else {
        return res.json({ message: 'These users are not friends!' });
      }
    // Returning success message
    res.json({ message: 'Friend successfully removed!' });
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
},

}