import Head from 'next/head';
import ThemeProvider from '../theme';
import Layout from '../layout';
import UserProvider from '../contexts/user';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar/dist/simplebar.min.css';
import 'react-image-lightbox/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

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
