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
    const dbUserData = await User.create(req.body,
      //  { runValidators: true } 
       );
       
    res.json({ message: "User created" });
    
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
},

// PUT to update a user by its _id
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json({ message: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// DELETE to remove user by its _id and associated thoughts
async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    const thoughts = await Thought.deleteMany(
      { username: req.body.username },
    );
    
    if (!thoughts) {
      return res
        .status(404)
        .json({ message: 'This user had no thoughts to delete' });
    }

    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
},

// POST to add a new friend to a user's friend list
async addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json({ message: 'Friend successfully added!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

// DELETE to remove a friend from a user's friend list


}