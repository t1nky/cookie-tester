import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { setCookies } from 'cookies-next';

const AddCookiePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookie Tester</title>
        <meta name="description" content="Test your browser/client for cookie support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        Set cookie {'"test"'} with value {'"value"'}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  setCookies('test', 'value', { req, res, maxAge: 60 * 6 * 24 });
  return Promise.resolve({ props: {} });
};

export default AddCookiePage;
