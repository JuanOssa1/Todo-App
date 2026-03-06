import {ApolloClient, InMemoryCache, HttpLink} from "@apollo/client";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache({
    typePolicies:{
        Project:{
            keyFields: ["id"]
        },
        Task: {
            keyFields: ["id"]
        }
    }
});

const client = new ApolloClient({
    link: httpLink,
    cache
});

export default client;