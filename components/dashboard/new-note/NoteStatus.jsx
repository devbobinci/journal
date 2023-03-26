import { useSession } from "next-auth/react";
import Image from "next/image";

import { motion as m } from "framer-motion";

export default function NoteStatus({ setNewNote }) {
  const { data: session } = useSession();
  const placeholderName = session.user.name.slice(0, -6);

  return (
    <m.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-[450px] mx-auto flex gap-2"
    >
      {/* Gdy loguje sie normalnie to pozbyc sie fotki lub dac losowa */}
      <Image
        width={50}
        height={50}
        src={session.user.image}
        alt={session.user.name + "profile image"}
        className="rounded-full"
      />
      {/* TODO dac jako inny placeholder jak podczas logownaia -> auth field */}
      <input
        type="text"
        placeholder={`What is on your mind, ${placeholderName}?`}
        className="w-full p-2 rounded-full outline-none px-5 shadow-md"
        readOnly={true}
        onClick={() => setNewNote((prev) => !prev)}
      />
    </m.div>
  );
}
