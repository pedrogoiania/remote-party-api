const { GraphQLExtension } = require('graphql-extensions');


class MetadataExtension extends GraphQLExtension {
  constructor(targetOperations) {
    super();

    this.targetOperations = targetOperations;
    this.metadata = null;
  }

  shouldAddPropertiesFor(operationName) {
    return this.targetOperations.includes(operationName);
  }

  handleMetadataPromiseNotResolved(args) {
    console.error('MetadataExtension: Could not to respond with metadata');
    return args;
  }

  executionDidStart(args) {
    const {
      contextValue: {
        controllers: { PartyController },
      },
      operationName,
    } = args.executionArgs;

    if (this.shouldAddPropertiesFor(operationName)) {
      this.currentOperation = operationName;

      const metadata = {};

      PartyController.totalOfPartys()
        .then(value => {
          metadata.totalOfPartys = value;
          this.metadata = metadata;
        })
        .catch(() => {
          this.handleMetadataPromiseNotResolved(args);
        });
    }
  }

  willSendResponse(args) {
    if (!this.shouldAddPropertiesFor(this.currentOperation)) return args;

    if (this.metadata == null) {
      return this.handleMetadataPromiseNotResolved(args);
    }

    const { metadata } = this;
    const { extensions: currentExtensions } = args.graphqlResponse;

    args.graphqlResponse.extensions = {
      ...currentExtensions,
      metadata,
    };

    return args;
  }
}

module.exports = () => new MetadataExtension(['getAllPartys']);
