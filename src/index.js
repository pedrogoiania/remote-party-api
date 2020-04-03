const { ApolloServer } = require('apollo-server');

const resolvers = require('./resolvers');
const types = require('./types');
const controllers = require('./controllers');

require('./utils/db');

const typeDefs = [...types];

const context = ({ req }) => ({
  headers: req.headers,
  controllers,
});

const server = new ApolloServer({
  resolvers,
  typeDefs,
  tracing: true, // @todo configure using .env
  playground: true,
  introspection: true,
  context,
  // extensions,
});

const running = ({ url }) => {
  console.info(`Server running on ${url}`);
};

server.listen({ port: 5000 }).then(running);

module.exports = {
  server,
  running,
};
