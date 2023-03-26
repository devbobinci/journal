import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import { CiLogout } from "react-icons/ci";
import { CgDarkMode } from "react-icons/cg";
import { motion as m } from "framer-motion";

import styles from "./Navbar.module.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const { data: session } = useSession();
  // DarkMode TODO

  function handleLogout() {
    localStorage.removeItem("welcomeModal");
    localStorage.removeItem("goals");
    localStorage.removeItem("done-todos");
    localStorage.removeItem("userData");
    signOut();
  }

  return (
    <>
      {
        <m.nav
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${styles.nav} px-2 py-4 z-0 max-w-7xl mx-auto bg-darkGreen dark:bg-light transition-all`}
        >
          <div className="flex justify-between">
            <div>
              <Image
                src="/images/journal.png"
                width={40}
                height={40}
                alt="Journal Logo"
              />
            </div>
            <div className="flex gap-5 items-center">
              <m.p
                initial={{ x: 25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="dark:text-darkish"
              >
                Your <span className="text-green">notes</span>
              </m.p>
              <m.p
                initial={{ x: 25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="dark:text-darkish"
              >
                New <span className="text-green">note</span>
              </m.p>

              <div className="flex items-center ml-6">
                <CgDarkMode
                  className={`text-2xl mr-6 ${
                    darkMode && "rotate-180"
                  } transition-all cursor-pointer hover:text-grayish dark:text-darkGreen dark:hover:text-dark`}
                  onClick={() => setDarkMode((prev) => !prev)}
                />
                <div className="flex gap-2 items-center cursor-pointer">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      width={40}
                      height={40}
                      alt="User profile image"
                      className="rounded-md"
                    />
                  )}
                  <span className="hidden md:block dark:text-darkish dark:hover:text-dark">
                    {session.user.name ? session.user.name : session.user.email}
                  </span>
                </div>
              </div>
              {/* Moze zmienic ikonke na grubsza bo ta cienka */}
              <CiLogout
                onClick={handleLogout}
                className="rotate-180 text-2xl cursor-pointer hover:scale-105 dark:text-darkish"
              />
            </div>
          </div>
        </m.nav>
      }
    </>
  );
}
