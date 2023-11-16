const { User, Thought } = require('../models');

module.exports = {
// GET to get all thoughts
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    // Returning found thoughts
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},

// GET to get a single thought by its _id
async getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    // Checking if thought exists
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    // Returning single thought 
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

// POST to create a new thought
async createThought(req, res) {
  try {
    // Creating the thought from the body 
    const thought = await Thought.create(req.body);
    // Adding the thought to the users array of thoughts
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true },
      );
    // Checking if user exists
    if (!user) {
      return res.status(404).json({
        message: 'Thought created, but found no user with that ID',
      });
    }
    // Returning a message that thought was created
    res.json({ message: 'Thought successfully created!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// PUT to update a thought by its _id
async updateThought(req, res) {
  try {
    // Finding and updating the thought with the body
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );
    // Checking if that thought exists
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    // Returning success message
    res.json({ message: 'Thought successfully updated!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// DELETE to remove a thought by its _id
async deleteThought(req, res) {
  try {
    // Finding thought to delete
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    // Checking if thought exists
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    // Removing thought from user thought array
    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    // Checking if user exists 
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Thought deleted but no user with this id!' });
    }
    // Returning success message
    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

// POST to create a reaction stored in a single thought's reactions array field
async addReaction(req, res) {
  try {
    // Finding thought and adding reaction to thought
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
      // Checking if the thought exists
    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with this id!' });
    }
    // Returning success message
    res.json({ message: 'Reaction successfully created!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

// DELETE to pull and remove a reaction by the reaction's reactionId value
async removeReaction(req, res) {
  try {
    // Getting the thought to update
    const thoughtToUpdate = await Thought.findOne({ _id: req.params.thoughtId });
    // Checking if the thought exists
    if (!thoughtToUpdate) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    // Getting the reaction id's of the specific thought
    const thoughtReactions = thoughtToUpdate.reactions.map(reaction => reaction._id.toString())
    // Checking if the reaction belongs to that thought and removing it from thought array
    if (thoughtReactions.includes(req.params.reactionId)) {
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
        );
        console.log('reaction removed', req.params.thoughtId, req.params.reactionId, thoughtToUpdate.reactions, thoughtReactions);
      } else {
        return res.json({ message: 'This thought does not include that reaction!' });
      }
    // Returning success message
    res.json({ message: 'Reaction successfully removed!' });
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
},

}