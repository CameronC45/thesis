import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/typeDefs";
import accessEnv from '#root/helpers/accessEnv';

import formatGraphQLErrors from "./formatGraphQLErrors";
const path = require('path')

const { graphqlUploadExpress } = require('graphql-upload');

const PORT = accessEnv("PORT", 7000);

const app = express();

app.set('trust proxy', true);


let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        context: a => a,
        formatError: formatGraphQLErrors,
        typeDefs,
        resolvers,
        playground:{
            settings:{
                'request.credentials': 'same-origin',
            }
        },
        introspection: true
    });
    await apolloServer.start();
    app.use(express.static(path.join(__dirname, "../../public")),
            graphqlUploadExpress());
    apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });
}

app.use(
    cors({

        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

 startServer();

app.listen(PORT, "0.0.0.0", () => {
    console.info(`API gateway listening on ${PORT}`);
});
