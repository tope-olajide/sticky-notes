import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../client'
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)
    }
  }, [])
  if (isClient) {
    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
return(
  <>
  <Loading />
  </>
)
}
export default MyApp
