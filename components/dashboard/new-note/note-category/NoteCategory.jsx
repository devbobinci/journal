import { useEffect, useState } from "react";
import Image from "next/image";

import { motion as m, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi";

const categoryList = [
  { name: "Idea", delay: 0.05, img: "/images/note-category/idea.png" },
  { name: "Thought", delay: 0.15, img: "/images/note-category/brainstorm.png" },
  {
    name: "Reflection",
    delay: 0.25,
    img: "/images/note-category/self-esteem.png",
  },
  { name: "Goal", delay: 0.35, img: "/images/note-category/goal.png" },
  { name: "Feeling", delay: 0.45, img: "/images/note-category/emotion.png" },
  {
    name: "Plan",
    delay: 0.5,
    img: "/images/note-category/project-management.png",
  },
];

export default function NoteCategory({ setCategoryModal, categoryModal }) {
  const [noteCategory, setNoteCategory] = useState("");

  return (
    <div className="relative">
      <span
        onClick={() => setCategoryModal((prev) => !prev)}
        // color sie przyciemnia -> darker version of khaki
        className={`bg-green text-light px-3 py-1 min-w-[140px] rounded-md flex justify-between items-center cursor-pointer`}
      >
        {noteCategory ? noteCategory : "Category"}{" "}
        <HiOutlineChevronDown
          className={`text-white ${
            categoryModal && "rotate-180"
          } transition-transform`}
        />
      </span>

      <AnimatePresence>
        {categoryModal && (
          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col gap-1 backdrop-blur-sm bg-darkish shadow-lg w-full rounded-md mt-1 py-2 overflow-x-hidden"
          >
            {categoryList.map((category) => (
              // Animowany list element z delay
              <m.li
                key={category.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100%" }}
                // initial={{ opacity: 0, x: "-100%" }}
                // animate={{ opacity: 1, x: 0 }}
                // initial={{ opacity: 0, y: "-100%" }}
                // animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: category.delay,
                }}
                onClick={() => {
                  setCategoryModal(false), setNoteCategory(category.name);
                }}
                className="pl-3 cursor-pointer hover:text-grayish flex gap-2 items-center"
              >
                <Image
                  src={category.img}
                  height={18}
                  width={18}
                  alt={category.name + " icon"}
                />
                <span
                  className={`${
                    category.name === noteCategory && "text-khaki"
                  }`}
                >
                  {category.name}
                </span>
              </m.li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
