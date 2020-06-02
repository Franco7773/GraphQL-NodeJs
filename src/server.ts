import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import compression from 'compression';

// GraphQL
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround from 'graphql-playground-middleware-express';
import schema from './schema/index';

// Variables
const app = express();
const server = createServer( app );
const apollo = new ApolloServer({ schema, introspection: true });
const PORT = 3000;

// Middlewares
app.use('*', cors());
app.use( compression());

apollo.applyMiddleware({ app });
app.get('/', expressPlayGround({ endpoint: '/graphql' }));

server.listen({ port: PORT }, () => console.log(`Server on: http://localhost:${PORT}`))
