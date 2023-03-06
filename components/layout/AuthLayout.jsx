import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

export default function AuthLayout({ children }) {
  const [currentBg, setCurrentBg] = useState("green");
  const backgroundOptions = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
  ];

  return (
    <AnimatePresence>
      <div className="min-h-screen flex justify-center items-center overflow-x-hidden">
        {children}
        <div className="absolute top-0 left-0 h-full w-full -z-[1]">
          <Image
            className="object-cover w-full h-full opacity-50 blur-sm transition-all"
            src={`/images/${currentBg}.jpg`}
            alt="Stacked rocks on the lake"
            height={600}
            width={600}
          />
        </div>
      </div>
    </AnimatePresence>
  );
}
