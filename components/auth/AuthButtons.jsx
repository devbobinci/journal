import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

import { motion as m } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

export default function AuthButtons({
  isLogin,
  loading,
  loadingGoogle,
  variants,
  setLoadingGoogle,
  setIsLogin,
  fbLoading,
  setFbLoading,
}) {
  const router = useRouter();

  async function GoogleLogin() {
    try {
      setLoadingGoogle(true);

      const result = await signIn("google", {
        callbackUrl: "https://next-journal-db.vercel.app/",
      });
      // callbackUrl musi byc

      if (!result.error) {
        setTimeout(() => {
          toast.dismiss();
          toast.success("Logged In!", { duration: 1500 });
          router.push("/");
        }, 1600);

        console.log(result);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Something went wrong", { duration: 1500 });
      setLoadingGoogle(false);
    }
  }

  async function FacebookLogin() {
    try {
      setFbLoading(true);

      const result = await signIn("facebook", {
        callbackUrl: "https://next-journal-db.vercel.app/",
      });

      router.push("/");

      setTimeout(() => {
        toast.dismiss();
        toast.success("Logged In!", { duration: 1500 });
      }, 1600);
    } catch (error) {
      console.log(error);
      setFbLoading(false);
      toast.error("Something went wrong!", { duration: 1500 });
    }
  }

  return (
    <>
      <m.div
        key={isLogin}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-center"
      >
        {!loadingGoogle && !fbLoading && (
          <m.button
            initial="initial"
            animate="animate"
            type="submit"
            className={`${isLogin && !loading && "mb-6"} ${
              loading ? "pointer-events-none hover:none" : ""
            }
              p-2 rounded-full bg-[#1a1a1a] px-4 min-w-[85px] items-center justify-center inline-flex hover:bg-[#555] transition-all`}
          >
            {isLogin ? (
              <>
                {loading ? (
                  <>
                    Logging
                    <ClipLoader className="ml-2" color="#fff" size={18} />
                  </>
                ) : (
                  "Login"
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <>
                    Creating
                    <ClipLoader className="ml-2" color="#fff" size={18} />
                  </>
                ) : (
                  "Create account"
                )}
              </>
            )}
          </m.button>
        )}
        {isLogin && !fbLoading && !loading && (
          <>
            <m.div
              key={isLogin}
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.65 }}
              className="flex justify-center "
            >
              <button
                type="button"
                onClick={GoogleLogin}
                className={`${
                  loadingGoogle ? "pointer-events-none hover:none" : ""
                } p-2 flex items-center bg-[#1a1a1a] rounded-full px-4 hover:bg-[#555] transition-all`}
              >
                {loadingGoogle && !fbLoading ? (
                  <>
                    <FcGoogle />
                    oogle
                    <ClipLoader className="ml-2" color="#fff" size={18} />
                  </>
                ) : (
                  <>
                    Login with
                    <FcGoogle className="ml-1" />
                    oogle
                  </>
                )}
              </button>
            </m.div>
          </>
        )}
        {isLogin && !loadingGoogle && !loading && (
          <>
            <m.div
              key={isLogin}
              variants={variants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex justify-center mt-2"
            >
              <button
                type="button"
                onClick={FacebookLogin}
                className={`${
                  fbLoading ? "pointer-events-none hover:none" : ""
                } p-2 flex items-center bg-[#1a1a1a] rounded-full px-4 hover:bg-[#555] transition-all`}
              >
                {fbLoading ? (
                  <>
                    <Image
                      src="/images/facebook.png"
                      width={18}
                      height={18}
                      alt="facebook icon"
                      className="ml-1 pb-[3px]"
                    />
                    acebook
                    <ClipLoader className="ml-2" color="#fff" size={18} />
                  </>
                ) : (
                  <>
                    Login with
                    <Image
                      src="/images/facebook.png"
                      width={18}
                      height={18}
                      alt="facebook icon"
                      className="ml-[6px] pb-[3px]"
                    />
                    acebook
                  </>
                )}
              </button>
            </m.div>
          </>
        )}
        {!loading && !loadingGoogle && !fbLoading && (
          <m.div
            key={isLogin}
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.4, delay: 0.75 }}
          >
            <br />
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="hover:text-[#555] transition-all"
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </m.div>
        )}
      </m.div>
    </>
  );
}
