import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const schema = `
    type Query {
        me: User
    }

    type User {
        username: String!
    }
`;

const resolvers = {
    Query: {
        me: () => {
            return {
                username: 'Peter Carroll',
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({ app,  path: '/graphql' });

app.use(cors());

app.server({ port: 8000}, () => {
    console.log('Apollo Server is running on http://localhost:8000/graphql');
});
