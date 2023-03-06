import { useRouter } from "next/router";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  // signInWithRedirect
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { CgFacebook } from "react-icons/cg";
import { toast } from "react-hot-toast";

import { motion as m } from "framer-motion";

export default function AuthButtons({
  isLogin,
  loading,
  loadingGoogle,
  variants,
  setLoadingGoogle,
  setIsLogin,
}) {
  const [googleUser, setGoogleUser] = useAuthState(auth());
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();
  async function GoogleLogin() {
    try {
      setLoadingGoogle(true);
      const result = await signInWithPopup(auth(), googleProvider);
      setTimeout(() => {
        router.push("/");
        toast.dismiss();
        toast.success("Logged In!", { duration: 1500 });
      }, 1600);
      console.log(result.user);
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong", { duration: 1500 });
      setLoadingGoogle(false);
    }
  }

  const facebookProvider = new FacebookAuthProvider();
  async function FacebookLogin() {
    try {
      setLoadingGoogle(true);

      const result = await signInWithPopup(auth(), facebookProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credential.accessToken;
      let photoUrl = (result.user.photoURL = "height=500&access_toke=" + token);
      await updateProfile(auth().currentUser, { photoURL: photoUrl });

      setTimeout(() => {
        router.push("/");
        toast.dismiss();
        toast.success("Logged In!", { duration: 1500 });
      }, 1600);
    } catch (error) {
      console.log(error);
      setLoadingGoogle(false);
      toast.error("Something went wrong!", { duration: 1500 });
    }
  }

  return (
    <>
      {!loading && !loadingGoogle && (
        <m.div
          key={isLogin}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center"
        >
          {!loadingGoogle && (
            <m.button
              type="submit"
              className={`${isLogin ? "w-[80px]" : "w-[150px]"}
              p-2 mb-2 rounded-full bg-[#1a1a1a] px-4 items-center justify-center inline-flex hover:bg-[#555] transition-all`}
            >
              <>{isLogin ? "Login" : "Create Account"}</>
            </m.button>
          )}
          {isLogin && (
            <>
              <br />
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
                  Login with <FcGoogle className="ml-1" />
                  oogle
                </button>
              </m.div>
            </>
          )}
          {isLogin && (
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
                  loadingGoogle ? "pointer-events-none hover:none" : ""
                } p-2 flex items-center bg-[#1a1a1a] rounded-full px-4 hover:bg-[#555] transition-all`}
              >
                Login with
                <Image
                  src="/images/facebook.png"
                  width={15}
                  height={15}
                  alt="facebook icon"
                  className="ml-1"
                />
                acebook
              </button>
            </m.div>
          )}
          <br />
          {!loading && !loadingGoogle && (
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="hover:text-[#555] transition-all"
            >
              {isLogin ? (
                "Create new account"
              ) : (
                <div className="mt-1">Login with existing account</div>
              )}
            </button>
          )}
        </m.div>
      )}
    </>
  );
}
