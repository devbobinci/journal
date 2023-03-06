import Head from "next/head";
import AuthForm from "../components/auth/AuthForm";
import { IsLoginContextProvider } from "../context/IsLoginProvider";

export default function Auth() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IsLoginContextProvider>
        <AuthForm />
      </IsLoginContextProvider>
    </>
  );
}