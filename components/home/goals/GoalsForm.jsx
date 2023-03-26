import { useRef, useContext, useEffect } from "react";

import { motion as m } from "framer-motion";

import UserDataContext from "../../../context/UserDataProvider";

export default function GoalsForm({ goalsList, setGoalsList }) {
  const { setUserData } = useContext(UserDataContext);
  const goalInputRef = useRef();

  function onGoalSubmit(e) {
    e.preventDefault();

    const newGoal = goalInputRef.current.value;

    const checkGoals = goalsList.find((goal) => goal === newGoal);
    if (newGoal === "" || checkGoals) return;

    setGoalsList((prev) => {
      return [newGoal, ...prev];
    });

    goalInputRef.current.value = "";
    goalInputRef.current.focus();

    // TODO Adding to localStorage
  }

  useEffect(() => {
    setUserData((prev) => {
      return { ...prev, todos: goalsList };
    });
  }, [goalsList]);

  return (
    <m.form
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      onSubmit={onGoalSubmit}
      className="flex justify-between mb-8"
    >
      <input
        ref={goalInputRef}
        type="text"
        placeholder="new goal"
        className="w-3/4 px-2 py-1 rounded-md outline-[#87805E] bg-[#333] placeholder:text-[#454545]"
      />
      <button className="bg-[#87805E] px-3 rounded-md" type="submit">
        Add
      </button>
    </m.form>
  );
}
