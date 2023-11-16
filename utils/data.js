const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const randomThoughts = [
  'I like the smell of fresh rain on a summer day.',
  'Do you think bears have favorite colors?',
  'If time travel was possible, would you go to the past or the future?',
  'Pineapple on pizza: yay or nay?',
  'Why is the sky blue?',
  'What if cats could talk?',
  'If you could have dinner with any historical figure, who would it be?',
  'The sound of waves crashing is so soothing.',
  'Have you ever tried eating dessert before dinner?',
  'I wonder if aliens like pizza.',
  'Why do we yawn when we see someone else yawn?',
  'If you could be any fictional character for a day, who would you choose?',
  'The smell of coffee in the morning is the best.',
  'What if our dreams are glimpses into parallel universes?',
  'I believe laughter is the best medicine.',
  'Would you rather have the ability to fly or be invisible?',
  'Why do we say "sleep like a baby" when babies wake up every two hours?',
  'I like the sound of cracking leaves in the autumn.',
  'Imagine if we could communicate with animals.',
  'What if our pets have secret lives when we\'re not around?',
  'Why is it called a "building" when it\'s already built?',
  'If you could have any superpower, what would it be?',
  'The universe is so vast and mysterious.',
  'Why do we say "close" a door but "open" a window?',
  'What if we could taste colors?',
  'I wonder if plants feel pain.',
  'The sound of birds chirping in the morning is a great alarm clock.',
  'Why do we call it a "shortcut" when it often takes longer?',
  'Imagine if we could have a conversation with our past selves.',
  'I like the feeling of sand between my toes at the beach.',
  'What if our dreams are messages from our subconscious?',
  'If you could have any animal as a sidekick, which would you choose?',
  'Why do we park in driveways and drive on parkways?',
  'I wonder what clouds taste like.',
  'Imagine if we could speak every language in the world.',
  'Why is it called a "funny bone" when hitting it is not funny at all?',
  'I like the sound of crackling fire on a winter night.',
  'What if we could travel to other dimensions?',
  'If you could have dinner with any fictional character, who would it be?',
  'Why do we say "sleep like a log" when logs don\'t really sleep?',
  'Imagine if we could breathe underwater.',
  'What if we could read each other\'s thoughts?',
  'I like the feeling of a warm blanket on a cold day.',
  'Do you believe in parallel universes?',
  'Why do we say "heads up" when we really mean "look out"?',
  'If you could visit any place in the world, where would you go?',
  'What if we could control the weather?',
  'I wonder if robots will ever have feelings.',
];

const randomReactions = [
  'Thats so true!',
  'I never thought about it that way.',
  'Haha, thats hilarious!',
  'I completely agree!',
  'Interesting perspective.',
  'Wow, mind blown!',
  'I can relate to that.',
  'Hmmm, food for thought.',
  'This made me smile.',
  'So deep!',
  'Whoa!',
  'Ive wondered the same thing.',
  'This quote speaks to me.',
  'LOL!',
  'Aha, clever!',
  'I need to ponder on this.',
  'This is so random and cool!',
  'I love it!',
  'Thats a good one!',
  'My thoughts exactly!',
  'Made my day!',
  'I cant stop thinking about it.',
  'So thought-provoking!',
  'Tell me more!',
  'Is this real?',
  'A simple truth.',
  'This deserves a round of applause!',
  'Couldnt agree more!',
  'Mind your own business!',
  'This quote is my spirit animal.',
  'This is pure gold.',
  'Too funny!',
  'I need this on a T-shirt.',
  'Totally stealing this!',
  'My new life motto.',
  'This hits different.',
  'Can we get this on a motivational poster?',
  'I need to write this down.',
  'Preach!',
  'Where has this quote been all my life?',
  'I feel seen.',
  'This made me think of something deep.',
  'I want this engraved on my tombstone.',
  'Ill never look at things the same way again.',
  'Im sharing this with everyone!',
  'This is the content Im here for.',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random number 
const getRandomNumber = () => {
  return Math.floor(Math.random() * 25)
}

// Gets a random full name
const getRandomName = () => {
  const number = getRandomNumber();
  return `${getRandomArrItem(names)}${getRandomArrItem(names)}${number}`;
}

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = () => {
  const int = Math.floor(Math.random() * 6)
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(randomThoughts)
    );
  }
  return results;
};

const getRandomReaction = () => {
  const int = Math.floor(Math.random() * 4)
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(randomReactions)
    );
  }
  return results;
}

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getRandomReaction, getRandomArrItem, getRandomNumber };
