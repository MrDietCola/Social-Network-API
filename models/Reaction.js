const { Schema, model } = require('mongoose');

const formatDate = (timeStamp) => {
  // Format the date as "month day, year"
  const date = new Date(timeStamp);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

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
      get: timestamp => formatDate(timestamp)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// reactionSchema
//   .virtual('formatTime')
//   // Getter function 
//   .get(function () {
//     // Format the date as "month day, year"
//     const date = new Date(this.createdAt);

//     // Get the month, day, and year
//     const month = date.toLocaleString('default', { month: 'long' });
//     const day = date.getDate();
//     const year = date.getFullYear();

//     const formattedDate = `${month} ${day}, ${year}`;
//     return formattedDate;
//   })


module.exports = reactionSchema;
