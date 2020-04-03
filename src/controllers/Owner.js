const ownerPersistence = require('../models/Owner');

const createOwner = async (owner) => {
  try {
    return ownerPersistence.create(owner);
  } catch (err) {
    return err;
  }
};

const findOwner = async (owner) => {
  try {
    return ownerPersistence.findOne(owner);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createOwner,
  findOwner,
};
