import { useEffect, useState } from "react";

import { motion as m, AnimatePresence } from "framer-motion";

import NoteStatus from "./NoteStatus";
import NewNoteForm from "./NewNoteForm";

export default function NewNote() {
  const [newNote, setNewNote] = useState(false);

  return (
    <div className="mt-8">
      <NoteStatus setNewNote={setNewNote} />

      <AnimatePresence>
        {newNote && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 h-screen w-full z-10 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex justify-center items-center"
          >
            <NewNoteForm setNewNote={setNewNote} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
