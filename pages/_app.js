import Head from 'next/head';
import ThemeProvider from '../theme';
import Layout from '../layout';

function MyApp({ Component, pageProps }) {
  const { getLayout } = Component;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider>
        {getLayout && getLayout(<Component {...pageProps} />)}
        {!getLayout && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
