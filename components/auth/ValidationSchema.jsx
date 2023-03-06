import { useContext } from "react";

import YupPassword from "yup-password";
import * as Yup from "yup";

import IsLoginContext from "../../context/IsLoginProvider";

export default function ValidationSchema() {
  const isLoginContext = useContext(IsLoginContext);
  const { isLogin } = isLoginContext;

  YupPassword(Yup);

  let validationSchema;
  if (!isLogin)
    validationSchema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password at least 8 characters")
        .minLowercase(1, "At least 1 lower case letter")
        .minUppercase(1, "At least 1 upper case letter")
        .minNumbers(1, "At least 1 number")
        .minSymbols(1, "At least 1 special character"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password"),
    });
  else {
    validationSchema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password at least 8 characters")
        .minLowercase(1, "At least 1 lower case letter")
        .minUppercase(1, "At least 1 upper case letter")
        .minNumbers(1, "At least 1 number")
        .minSymbols(1, "At least 1 special character"),
      passwordConfirmation: Yup.string(),
    });
  }

  return validationSchema;
}
