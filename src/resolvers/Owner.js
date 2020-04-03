module.exports = {
  Query: {
    ownerDetail: async (_, { input: owner }, { controllers: { OwnerController } }) => {
      try {
        const ownerResult = await OwnerController.findOwner(owner);
        return ownerResult;
      } catch (err) {
        throw Error('Cannot find the owner');
      }
    },
  },
  Mutation: {
    createOwner: async (_, { input: owner }, { controllers: { OwnerController } }) => {
      try {
        const ownerResult = await OwnerController.createOwner(owner);
        return ownerResult;
      } catch (err) {
        throw Error('Cannot create the owner');
      }
    },
  },
  Owner: {
    id: (owner) => {
      const { _id: id } = owner;
      return id;
    },
  },
};
