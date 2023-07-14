import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const link= createUploadLink({
    uri: "http://localhost:7000/graphql",
    credentials: "include"
});

const Client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});



export default Client;