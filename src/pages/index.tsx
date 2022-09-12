import { Transition, Dialog } from '@headlessui/react';
import { getCookies } from 'cookies-next';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef, Fragment, useEffect } from 'react';

const Home: NextPage<{ cookies: Record<string, string> }> = ({ cookies }) => {
  const [href, setHref] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState<
    | {
        name: string;
        value: string;
      }
    | undefined
  >();

  useEffect(() => {
    if (!selectedCookie) {
      return;
    }
    setOpen(true);
  }, [selectedCookie]);
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  // const Toggle = ({
  //   name,
  //   isEnabled = false,
  // }: {
  //   name: string;
  //   isEnabled?: boolean;
  // }) => {
  //   const [enabled, setEnabled] = useState(isEnabled);

  //   return (
  //     <Switch.Group>
  //       <div className="flex items-center">
  //         <Switch.Label className="mr-4">{name}</Switch.Label>
  //         <Switch
  //           checked={enabled}
  //           onChange={setEnabled}
  //           className={`${
  //             enabled ? 'bg-blue-600' : 'bg-gray-200'
  //           } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
  //         >
  //           <span
  //             className={`${
  //               enabled ? 'translate-x-6' : 'translate-x-1'
  //             } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
  //           />
  //         </Switch>
  //       </div>
  //     </Switch.Group>
  //   );
  // };
  const Cookie = ({ name, value }: { name: string; value: string }) => {
    return (
      <>
        <div className="rounded-md border flex items-stretch w-96 mb-2 py-1 px-3 relative">
          <span className="text-sm">{name}</span>
          <button
            id="remove"
            name="remove"
            className="absolute h-full right-0 top-0 rounded-md border-transparent bg-transparent py-0 px-2 text-white bg-red-400 focus:border-rose-600 focus:ring-rose-600 hover:bg-red-500 focus:outline-none focus:ring-1 focus:ring-offset-1 sm:text-sm"
            onClick={async () => {
              const res = await fetch(`/api/remove/${name}`);
              // Check that our status code is in the 200s,
              // meaning the request was successful.
              if (res.status < 300) {
                router.replace(router.asPath);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button
            id="edit"
            name="edit"
            className={
              (name ? 'right-9' : 'right-0') +
              ' absolute h-full top-0 rounded-md border-transparent bg-transparent py-0 px-2 text-white bg-blue-400 focus:border-indigo-500 focus:ring-indigo-500 hover:bg-blue-500 focus:outline-none focus:ring-1 focus:ring-offset-1 sm:text-sm'
            }
            onClick={() => setSelectedCookie({ name, value })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </>
    );
  };
  const Edit = () => {
    const cancelButtonRef = useRef(null);
    const [newValue, setNewValue] = useState(selectedCookie?.value);

    if (!selectedCookie) {
      return <></>;
    }

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setOpen}
          initialFocus={cancelButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {selectedCookie.name}
                        </Dialog.Title>

                        <div className="mt-2 w-full">
                          <textarea
                            className="resize rounded-md w-full max-w-full"
                            defaultValue={selectedCookie.value}
                            onChange={(e) => setNewValue(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={async () => {
                        setOpen(false);
                        const res = await fetch(
                          `/api/set/${selectedCookie.name}?value=${newValue}`
                        );
                        // Check that our status code is in the 200s,
                        // meaning the request was successful.
                        if (res.status < 300) {
                          router.replace(router.asPath);
                        }
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  return (
    <>
      <Head>
        <title>Cookie Tester</title>
        <meta
          name="description"
          content="Test your browser/client for cookie support"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Cookie Tester
        </h1>
        <div className="flex flex-col container items-center">
          {Object.entries(cookies).map(([name, value]) => (
            <Cookie key={name} name={name} value={value} />
          ))}
        </div>
        API:
        <div className="text-left">
          <div>GET {href}api/set/key/value</div>
          <div>GET {href}api/get/key</div>
          <div>GET {href}api/remove/key</div>
        </div>
        <Edit />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const cookies = getCookies({ req, res });

  return Promise.resolve({ props: { cookies } });
};

export default Home;
