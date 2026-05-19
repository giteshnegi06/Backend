const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A product must have a description']
  },
  shortDescription: String,
  images: [String],
  category: {
    type: String,
    required: [true, 'A product must have a category']
  },
  subCategory: String,
  brand: {
    type: String,
    required: [true, 'A product must have a brand']
  },
  sku: {
    type: String,
    unique: true
  },
  flavor: [String],
  weight: [String],
  variants: [{
    weight: String,
    price: Number,
    discountPrice: Number
  }],
  nutritionFacts: [
    {
      label: String,
      amount: String,
      dailyValue: String
    }
  ],
  ingredients: String,
  benefits: [String],
  usageInstructions: String,
  sideEffects: String,
  features: [String],
  goal: {
    type: String,
    enum: ['muscle-gain', 'weight-loss', 'recovery', 'energy', 'general-health', ''],
    default: ''
  },
  stock: {

    type: Number,
    required: [true, 'A product must have a stock quantity'],
    default: 0
  },
  isOutOfStock: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  discountPrice: {
    type: Number
  },
  ratings: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
  },
  reviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for reviews
productSchema.virtual('productReviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
