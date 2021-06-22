const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title for article is required!'],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Article cannot be created without description.'],
    },
    body: {
      type: String,
      required: [true, 'Article cannot be created without body'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

articleSchema.pre('save', async function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
