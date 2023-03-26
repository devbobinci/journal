import { motion as m } from "framer-motion";

export const variants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -25, opacity: 0 },
};

export default function AuthTitle({
  isLogin,
  loading,
  loadingGoogle,
  fbLoading,
}) {
  return (
    <m.h1
      key={isLogin}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, delay: 0.15 }}
      className={`${
        loading || loadingGoogle || fbLoading ? "mb-0 text-3xl" : "mb-4"
      } text-4xl  text-center flex justify-center`}
    >
      {isLogin ? (
        <>
          {loading && <span className="mb-4">Logging in...</span>}
          {loadingGoogle && <span className="mb-4">Logging in...</span>}
          {fbLoading && <span className="mb-4">Logging in...</span>}
          {!loading && !loadingGoogle && !fbLoading && "Log In"}
        </>
      ) : (
        <>
          {!loading && !loadingGoogle && !fbLoading && "Sign In"}
          {loading && !loadingGoogle && !fbLoading && (
            <span className="mb-4">Signing up...</span>
          )}
        </>
      )}
    </m.h1>
  );
}
