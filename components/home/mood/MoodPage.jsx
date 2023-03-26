import { useState, useEffect, useContext } from "react";

import { motion as m } from "framer-motion";

import UserDataContext from "../../../context/UserDataProvider";

import styles from "./MoodPage.module.css";

const moodOptions = [
  "Good 😃",
  "Exellent 😁",
  "Grateful 🥰",
  "Excited 🤩",
  "Relaxed 😌",
  "Tired 🥱",
  "Nervous 😠",
  "Angry 😤",
  "Hurt 😔",
  "Sad 😣",
];

export default function MoodPage({ setPage }) {
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    localStorage.setItem("moodList", JSON.stringify(moodList));
  }, [moodList]);

  return (
    <m.div
      initial={{ opacity: 0, y: -25, display: "none" }}
      animate={{ opacity: 1, y: 0, display: "block" }}
      transition={{ duration: 1, delay: 3.25 }}
      className="bg-[#1a1a1a] px-2 py-8 rounded-md w-[90%] max-w-[450px]"
    >
      <h2 className="text-3xl mb-6 text-center">
        How do you <span className="text-[#87805E]">feel</span> right now?
      </h2>
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((mood) => (
          <div
            onClick={(e) => {
              e.target.classList.toggle(styles.selectedMood);

              if (moodList.includes(mood)) {
                return setMoodList((prev) =>
                  prev.filter((moodEl) => moodEl !== mood)
                );
              }
              return setMoodList([...moodList, mood]);
            }}
            key={mood}
            className="px-2 py-1 rounded-md border-2 border-transparent bg-[#3a3628] hover:bg-[#87805e] cursor-pointer"
          >
            {mood}
          </div>
        ))}
      </div>

      {moodList.length >= 1 && (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transtion={{ duration: 2 }}
          className="flex justify-end mt-6 gap-4 pr-3"
        >
          <button
            onClick={() => setPage(2)}
            className="rounded-md px-3 py-1 bg-[#87805E]"
          >
            Next
          </button>
        </m.div>
      )}
    </m.div>
  );
}
