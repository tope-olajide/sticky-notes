import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../client'
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
    <Component {...pageProps}
    />
    </ApolloProvider>
  )
}

export default MyApp
