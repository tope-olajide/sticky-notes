import { gql, InMemoryCache, makeVar } from '@apollo/client';
const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`
export const isLoggedInVar = makeVar<boolean>(false);

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                      return isLoggedInVar();
                    }
                  },
            }
        }
    }
})