const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, getRandomReaction, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    // Get some random thoughts objects using a helper function that we imported from ./data

    const username = getRandomName();
    const email = `${username}@gmail.com`; 
    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  for (let i = 0; i < users.length; i++) {

    const int = Math.floor(Math.random() * 6)
    for (let x = 0; x < int; x++) {
      const user = users[i]
      const friend = getRandomArrItem(users)
      if ( user._id !== friend._id) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { friends: friend._id } },
          { new: true }
        )
      }
    } 
  }
 
  const thoughts = []

  users.forEach(user => {
      const randomThoughts = getRandomThoughts()
      randomThoughts.forEach(thought => {
        thoughts.push({
          thoughtText: thought,
          username: user.username,
        })
      });
  });

  // Add thoughts to the collection and await the results
  for (let i = 0; i < thoughts.length; i++) { 
    const thought = await Thought.create(thoughts[i])
    const user = getRandomArrItem(users)
    await User.findOneAndUpdate(
      { username: user.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true },
      );
    const randomReactions = getRandomReaction()
    for (let i = 0; i < randomReactions.length; i++) {
      const body = {
        reactionBody: randomReactions[i],
        username: user.username,
      };
      await Thought.findOneAndUpdate(
        { _id: thought._id },
        { $addToSet: { reactions: body } },
        { new: true }
      );
    }
  };

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});





