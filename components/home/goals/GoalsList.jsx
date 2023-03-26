import { useState, useEffect, useContext, useRef } from "react";

import { motion as m } from "framer-motion";
import { ImBin } from "react-icons/im";

import UserDataContext from "../../../context/UserDataProvider";

import styles from "./GoalsPage.module.css";

export default function GoalsList({ goalsList, setGoalsList }) {
  const [doneTodo, setDoneTodo] = useState([]);

  const { setUserData } = useContext(UserDataContext);

  const list = useRef();

  useEffect(() => {
    const prevGoals = JSON.parse(localStorage.getItem("goals"));
    const prevCompletedGoals = JSON.parse(localStorage.getItem("done-todos"));

    if (prevGoals || prevCompletedGoals) {
      setGoalsList(prevGoals);
      setDoneTodo(prevCompletedGoals);
    }

    // ostatnie doneTodo
    console.log(prevCompletedGoals);
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goalsList));
  }, [goalsList]);

  useEffect(() => {
    localStorage.setItem("done-todos", JSON.stringify(doneTodo));
    //? zmiana

    // LocalStorage doneTodo added className
    for (let item of list.current.children) {
      const todoItem = item.firstElementChild;
      const todoTextContent = item.firstElementChild.textContent;

      const prevDoneTodos = JSON.parse(localStorage.getItem("done-todos"));

      prevDoneTodos.map((todo) => {
        todo === todoTextContent &&
          todoItem.classList.add(styles.todoCompleted);
      });
    }
  }, [doneTodo]);

  function removeTodo(goal) {
    if (doneTodo.includes(goal)) {
      setDoneTodo((prev) => {
        return prev.filter((g) => g !== goal);
      });

      setGoalsList((prev) => {
        return prev.filter((goalEl) => goalEl !== goal);
      });
    }

    setGoalsList((prev) => {
      return prev.filter((goalEl) => goalEl !== goal);
    });
  }

  return (
    <m.ul
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={styles.todoList}
      ref={list}
    >
      {goalsList.map((goal) => (
        <div key={goal} className="flex items-center gap-3">
          <m.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            className={styles.todoItem}
            onClick={(e) => {
              e.target.classList.toggle(styles.todoCompleted);

              if (doneTodo.includes(goal)) {
                return setDoneTodo((prev) => {
                  return prev.filter((g) => g !== goal);
                });
              }
              return setDoneTodo([...doneTodo, goal]);
            }}
          >
            {goal}
          </m.li>
          <ImBin
            className="text-xl cursor-pointer hover:text-white hover:opacity-70 transition-all"
            onClick={() => removeTodo(goal)}
          />
        </div>
      ))}
    </m.ul>
  );
}
