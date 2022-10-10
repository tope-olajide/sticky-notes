
import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from './cache';

const link = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/graphql',
    credentials: 'include'
});
const client = new ApolloClient({
    cache,
    link,
});

export default client
