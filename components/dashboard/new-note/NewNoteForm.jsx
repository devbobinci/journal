import { useState } from "react";

import { motion as m } from "framer-motion";

import { IoMdClose } from "react-icons/io";
import NoteCategory from "./note-category/NoteCategory";

export default function NewNoteForm({ setNewNote }) {
  const [categoryModal, setCategoryModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // Tutaj bedzie push notatki do usera ktory znajduje sie juz w bazie danych: obiekt bedzie zawieral userEmail noteData:{title, category, description, date }
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative rounded-md w-[90%] max-w-[450px] py-4 px-3 bg-darkGreen dark:bg-light"
    >
      {/* Close btn bedzie na dole po srodku pop'upu  animowany po najechaniu lub uzyc framer motion i drag control w lewo accept, w prawo reject */}
      <IoMdClose
        onClick={() => {
          setNewNote((prev) => !prev), setCategoryModal(false);
        }}
        className="absolute -top-4 -right-4 bg-[#333] text-2xl rounded-full h-8 w-8 p-1 border-2 border-darkish hover:border-green cursor-pointer"
      />
      <form onSubmit={handleSubmit} className="overflow-y-hidden p-1">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Title:"
            className="rounded-md px-2 py-1 max-h-9 bg-darkish w-full outline-none dark:bg-grayish dark:text-dark"
          />
          <NoteCategory
            categoryModal={categoryModal}
            setCategoryModal={setCategoryModal}
          />
        </div>

        <textarea
          name="note"
          className="rounded-md mt-4 p-2 w-full bg-darkish min-h-[30vh] dark:bg-grayish outline-none dark:text-dark"
          placeholder="My new idea is..."
          rows={8}
        ></textarea>

        <div className="text-right">
          <span className="italic text-sm text-grayish dark:text-darkish">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Button hover -> jasniejszy zielony */}
        <div className="flex justify-center">
          <button type="submit" className="px-4 py-2 rounded-full bg-green ">
            Add new note
          </button>
        </div>
      </form>
      {/* Moze dodac feelings aby sie zapisywalo z jakimi uczuciami byla pisana notatka */}
    </m.div>
  );
}
