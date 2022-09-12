import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getCookies } from 'cookies-next';
import { TmpCookiesObj } from 'cookies-next/lib/types';

const AddCookiePage: NextPage<{ cookies: TmpCookiesObj }> = ({ cookies }) => {
  return (
    <>
      <Head>
        <title>Cookie Tester</title>
        <meta name="description" content="Test your browser/client for cookie support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {Object.entries(cookies).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = getCookies({ req, res });

  return Promise.resolve({ props: { cookies } });
};

export default AddCookiePage;
