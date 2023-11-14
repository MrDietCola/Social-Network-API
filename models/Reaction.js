const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema
  .virtual('reactionCount')
  // Getter function to get number of reactions
  .get(function () {
    return this.reactions.length;
  })

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
