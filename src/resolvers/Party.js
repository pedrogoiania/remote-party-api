module.exports = {
  Query: {
    getAllPartys: (_, __, { controllers: { PartyController } }) => PartyController.findPartys(),
  },
  Mutation: {
    createParty: async (
      _,
      {
        input: { name, url, ownerEmail },
      }, {
        controllers: { OwnerController, PartyController },
      }) => {
      let owner = {
        email: ownerEmail,
      };

      try {
        owner = await OwnerController.findOwner(owner);
      } catch (err) {
        throw new Error('Cannot find owner');
      }

      if (!owner) {
        throw new Error('Incorrect owner');
      }

      const party = {
        name, url, owner,
      };

      try {
        return PartyController.createParty(party);
      } catch (err) {
        throw new Error('Cannot create party');
      }
    },
  },
  Party: {
    id: (party) => {
      const { _id: id } = party;
      return id;
    },
  },
};
