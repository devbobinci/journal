import { useState, useRef, useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import toast, { Toaster } from "react-hot-toast";
import { motion as m } from "framer-motion";

import { useFormik } from "formik";
import ValidationSchema from "./ValidationSchema";

import IsLoginContext from "../../context/IsLoginProvider";
import AuthLayout from "../layout/AuthLayout";
import AuthField from "./AuthField";
import AuthTitle, { variants } from "./AuthTitle";
import AuthButtons from "./AuthButtons";
import { createUser } from "./CreateUser";

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);

  const { isLogin, setIsLogin } = useContext(IsLoginContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordLabelRef = useRef();
  const emailLabelRef = useRef();
  const confirmPasswordRef = useRef();
  const confirmPasswordLabelRef = useRef();

  const router = useRouter();

  function formikCleanUp() {
    formik.setFieldValue("email", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("passwordConfirmation", "");
  }

  useEffect(() => {
    formikCleanUp();
    formik.setTouched((prev) => !prev);
  }, [isLogin]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: ValidationSchema(),
    onSubmit: async (values) => {
      const enteredEmail = values.email;
      const enteredPassword = values.password;

      if (isLogin) {
        setLoading(true);
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (!result.error) {
          // Style utwierdzajace uzytkownika ze jest wszystko OK

          setTimeout(() => {
            toast.dismiss();
            toast.success("Logged In!", { duration: 1500 });
            router.push("/");
          }, 1600);

          formikCleanUp();
        } else {
          toast.error(result.error);
          formikCleanUp();
          formik.setTouched((prev) => !prev);
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const result = await createUser(enteredEmail, enteredPassword);

          setTimeout(() => {
            setIsLogin((prev) => !prev);
            formikCleanUp();

            setLoading(false);
          }, 1600);
        } catch (err) {
          setLoading(false);
          formikCleanUp();

          console.log(err.message);
          formik.setTouched((prev) => !prev);
        }
      }
    },
  });

  return (
    <AuthLayout>
      <Toaster
        toastOptions={{
          style: {
            background: "#111",
            borderRadius: 4,
            color: "#eee",
          },
        }}
      />
      <m.section
        key={isLogin && loading && loadingGoogle}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
        variants={variants}
        className="bg-[#111] px-8 py-12 rounded-lg shadow-2xl select-none max-w-[320px] w-full duration-300"
      >
        <AuthTitle
          isLogin={isLogin}
          loading={loading}
          loadingGoogle={loadingGoogle}
          fbLoading={fbLoading}
        />
        <form onSubmit={formik.handleSubmit} className="text-center">
          {!loadingGoogle && !loading && !fbLoading && (
            <m.div
              initial="initial"
              animate="animate"
              variants={variants}
              transition={{ duration: 0.4 }}
              className="pt-4"
            >
              <m.div
                key={isLogin}
                initial="initial"
                animate="animate"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <m.div
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <AuthField
                    type="email"
                    id="email"
                    content="Email"
                    inputRef={emailRef}
                    labelRef={emailLabelRef}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errors={formik.errors.email}
                    touched={formik.touched.email}
                    formik={formik}
                  />
                </m.div>
                <br />
                <m.div
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="relative"
                >
                  <AuthField
                    type="password"
                    id="password"
                    content="Password"
                    inputRef={passwordRef}
                    labelRef={passwordLabelRef}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errors={formik.errors.password}
                    touched={formik.touched.password}
                    formik={formik}
                  />
                </m.div>
                <br />
                {!isLogin &&
                  !formik.errors.password &&
                  formik.values.password.length > 7 && (
                    <>
                      <AuthField
                        type="password"
                        id="passwordConfirmation"
                        content="Confirm Password"
                        inputRef={confirmPasswordRef}
                        labelRef={confirmPasswordLabelRef}
                        value={formik.values.passwordConfirmation}
                        onChange={formik.handleChange}
                        errors={formik.errors.passwordConfirmation}
                        touched={formik.touched.passwordConfirmation}
                        formik={formik}
                      />
                      <br />
                    </>
                  )}
              </m.div>
            </m.div>
          )}
          <AuthButtons
            isLogin={isLogin}
            loading={loading}
            loadingGoogle={loadingGoogle}
            variants={variants}
            setLoadingGoogle={setLoadingGoogle}
            setIsLogin={setIsLogin}
            fbLoading={fbLoading}
            setFbLoading={setFbLoading}
          />
        </form>
      </m.section>
    </AuthLayout>
  );
}
