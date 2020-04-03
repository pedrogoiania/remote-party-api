const mongoose = require('mongoose');

const { Schema } = mongoose;

const ownerModel = require('./Owner');

const ownerSchema = ownerModel.schema;

ownerSchema.set(
  'email', {
    type: String,
    lowercase: true,
    trim: true,
    unique: false,
    required: true,
  },
);

const PartySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: ownerSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'partys',
  },
);

const Party = mongoose.model('Party', PartySchema);

module.exports = Party;
