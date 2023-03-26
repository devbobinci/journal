import { useEffect, useState } from "react";

import { motion as m } from "framer-motion";

import GoalsList from "./GoalsList";
import GoalsForm from "./GoalsForm";

export default function GoalsPage({ setPage }) {
  const [goalsList, setGoalsList] = useState([]);

  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#1a1a1a] px-8 py-8 rounded-md w-[90%] max-w-[450px]"
    >
      <m.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="text-3xl mb-6 text-center"
      >
        Do you have any <span className="text-[#87805E]">goals</span> for today?
      </m.h2>
      <div className="my-6">
        <GoalsForm setGoalsList={setGoalsList} goalsList={goalsList} />

        <GoalsList goalsList={goalsList} setGoalsList={setGoalsList} />
      </div>
      <div className="flex justify-end">
        <m.button
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="px-3 py-1 rounded-md bg-[#87805E]"
          onClick={() => setPage(3)}
        >
          {goalsList.length >= 1 ? "Next" : "I don't have any"}
        </m.button>
      </div>
    </m.div>
  );
}
