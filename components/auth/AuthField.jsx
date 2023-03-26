import { useState } from "react";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

export default function AuthField({
  inputRef,
  labelRef,
  type,
  id,
  content,
  value,
  onChange,
  errors,
  touched,
  formik,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleInputFocus(e) {
    return (
      (labelRef.current.style.top = "-12px"),
      (labelRef.current.style.fontSize = "14px"),
      (labelRef.current.style.color = "#fff"),
      (e.target.parentElement.parentElement.style.width = "100%")
    );
  }

  function handleInputBlur(e) {
    if (inputRef.current.value)
      return (
        (labelRef.current.style.fontSize = "14px"),
        (labelRef.current.style.color = "#333"),
        formik.handleBlur(e)
      );
    else {
      return (
        (labelRef.current.style.fontSize = "16px"),
        (labelRef.current.style.color = "#333"),
        (labelRef.current.style.top = "8px")
      );
    }
  }

  return (
    <>
      <div className="space-y-2">
        <div className="relative border-2 border-[#1a1a1a] rounded-md duration-300">
          <label
            className="absolute top-[6px] left-2 transition-all text-[#333] bg-[#111] px-1"
            htmlFor={id}
            ref={labelRef}
          >
            {content}
          </label>
          <div className={`${id !== "email" ? "flex items-center" : ""}`}>
            <input
              type={showPassword ? "text" : type}
              id={id}
              value={value}
              ref={inputRef}
              className="p-2 px-3 outline-none bg-transparent w-full"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={onChange}
            />
            {id !== "email" &&
              value.length > 4 &&
              (showPassword ? (
                <BsEye
                  onClick={() => setShowPassword(false)}
                  className="text-xl mr-2 cursor-pointer text-[#333]"
                />
              ) : (
                <BsEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="text-xl mr-2 cursor-pointer text-[#333]"
                />
              ))}
          </div>
        </div>
      </div>
      {errors && touched && (
        <div className="ml-2 text-red-400 text-sm mt-1 text-left flex items-center gap-1">
          <MdErrorOutline className="text-base" /> {errors}
        </div>
      )}
    </>
  );
}
