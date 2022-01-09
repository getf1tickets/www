import Head from 'next/head';
import ThemeProvider from '../theme';
import Layout from '../layout';
import UserProvider from '../contexts/user';

function MyApp({ Component, pageProps }) {
  const { getLayout } = Component;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider>
        <UserProvider>
          {getLayout && getLayout(<Component {...pageProps} />)}
          {!getLayout && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
          )}
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
