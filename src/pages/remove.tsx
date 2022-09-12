import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { removeCookies, getCookies } from 'cookies-next';

const AddCookiePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookie Tester</title>
        <meta name="description" content="Test your browser/client for cookie support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        Remove cookie
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = getCookies({ req, res });
  if (cookies) {
    Object.keys(cookies).forEach((cookie) => {
      removeCookies(cookie, { req, res });
    });
  }
  return Promise.resolve({ props: {} });
};

export default AddCookiePage;
