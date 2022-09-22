
import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from './cache';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

const client = new ApolloClient({
    cache,
    link,
});

export default client
