const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  
  title: { type: String, },
  primaryColor: { type: String },
  secondaryColor: { type: String },
  review: { type: String },
  bookId: { type: String },
  category: { type: String },
  cover: { type: String },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);