const partyPersistence = require('../models/Party');

const createParty = async (party) => {
  try {
    return partyPersistence.create(party);
  } catch (err) {
    return err;
  }
};

const findPartys = async () => {
  try {
    return partyPersistence.find({});
  } catch (err) {
    return err;
  }
};

module.exports = {
  createParty,
  findPartys,
};
