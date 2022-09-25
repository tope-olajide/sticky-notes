import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $fullname: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    signupUser(
      data: {
        fullname: $fullname
        email: $email
        password: $password
        username: $username
      }
    ) {
      token
    }
  }
`;
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOGIN_MUTATION = gql`
  mutation signin($usernameOrEmail: String!, $password: String!) {
    signinUser(data: { usernameOrEmail: $usernameOrEmail, password: $password }) {
      token
    }
  }
`;
