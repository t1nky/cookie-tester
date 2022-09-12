import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookie Tester</title>
        <meta name="description" content="Test your browser/client for cookie support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Cookie Tester
        </h1>
        In browser:
        <Link href="/set">Set</Link>
        <Link href="/get">Get</Link>
        <Link href="/remove">Remove</Link>
        <br />
        API:
        <Link href="/api/set">/api/set(/*key*/*value*)</Link>
        <Link href="/api/get">/api/get(/*key*)</Link>
        <Link href="/api/remove">/api/remove(/*key)</Link>
      </main>
    </>
  );
};

export default Home;
