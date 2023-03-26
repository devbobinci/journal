import Navbar from "../components/navigation/Navbar";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Your Journal Page - here You can write everything what comes to your mind"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        Welcome on dashbaord
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permament: false,
      },
    };
  }

  return {
    props: { session },
  };
}
