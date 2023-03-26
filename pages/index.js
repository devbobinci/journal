import Head from "next/head";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { UserDataContextProvider } from "../context/UserDataProvider";

import WelcomePage from "../components/home/welcome/WelcomePage";
import HomePage from "../components/home/HomePage";

export default function Home({ session }) {
  const [page, setPage] = useState(1);
  const [welcomeModal, setWelcomeModal] = useState({});

  useEffect(() => {
    setWelcomeModal({ modal: localStorage.getItem("welcomeModal") });
  }, [welcomeModal.modal]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Your Journal Page - here You can write everything what comes to your mind"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserDataContextProvider>
        {welcomeModal.modal ? (
          <HomePage session={session} />
        ) : (
          <WelcomePage
            setPage={setPage}
            page={page}
            setWelcomeModal={setWelcomeModal}
          />
        )}
      </UserDataContextProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
