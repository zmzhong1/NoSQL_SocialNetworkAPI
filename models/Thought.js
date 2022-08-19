const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// Schema for thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Moment
      get: (createdAtDateVal) => moment(createdAtDateVal).format("YYYY-MM-DD"),
    },
    username: {
      type: String,
      required: true,
    },
    // Use reactionSchema to validate data
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// get total reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thought = model("Thought", thoughtSchema);

// Schema for reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDateVal) => moment(createdAtDateVal).format("YYYY-MM-DD"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Export Thought Module
module.exports = Thought;
