const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true, 
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\S+@\S+\.(com|net|edu|org)/,
      // validate: {
      //   validator: function(value) {
      //     // Email validation logic
      //     return /\S+@\S+\.(com|net|edu|org)/.test(value);
      //   },
      //   message: 'Invalid email format'
      // }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter function to get number of friends
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
