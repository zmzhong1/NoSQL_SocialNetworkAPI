const { Schema, model } = require("mongoose");

// Schema for what makes up a user
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // REGEX match
      match: [
        /^[A-Za-z0-9!#$%&'"“”+/\=?^_`{}|~,():;<>[]\-.]*@[A-Za-z0-9-]*\.[A-Za-z]+(?:\.[A-Za-z]+)?(?:\.[A-Za-z]+)?$/,
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// creates virtual property that retrieves the length of user's friends
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the Users model using the Users Schema
const Users = model("Users", UsersSchema);

// Export Users module
module.exports = Users;
