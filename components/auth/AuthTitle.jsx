import { motion as m } from "framer-motion";
import AuthTitleLoader from "./AuthTitleLoader";

export const variants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -25, opacity: 0 },
};

export default function AuthTitle({ isLogin, loading, loadingGoogle }) {
  return (
    <m.h1
      key={isLogin}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, delay: 0.15 }}
      className={`${
        loading || loadingGoogle ? "mb-0 text-3xl" : "mb-4"
      } text-4xl  text-center flex justify-center`}
    >
      {isLogin ? (
        <>
          {loading && <AuthTitleLoader loader={loading} text="Logging in" />}
          {loadingGoogle && (
            <AuthTitleLoader loader={loadingGoogle} text="Logging in" />
          )}

          {!loading && !loadingGoogle && "Log In"}
        </>
      ) : (
        <>
          {loading && <AuthTitleLoader loader={loading} text="Signing in" />}
          {loadingGoogle && (
            <AuthTitleLoader loader={loadingGoogle} text="Signing in" />
          )}
          {!loading && !loadingGoogle && "Sign In"}
        </>
      )}
    </m.h1>
  );
}
