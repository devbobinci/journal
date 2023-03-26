import { useContext, useEffect, useState } from "react";
import userDataContext from "../../context/UserDataProvider";

import Navbar from "../navigation/Navbar";
import NewNote from "../dashboard/new-note/NewNote";

export default function HomePage({ session }) {
  // Wyjebac z innych komponentow gdy nie bedzie uzywany wiecej
  const { userData, setUserData } = useContext(userDataContext);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setUserData({
      username: session?.user?.name,
      email: session?.user?.email,
      todos: JSON.parse(localStorage.getItem("goals")),
      doneTodos: JSON.parse(localStorage.getItem("done-todos")),
      moodList: JSON.parse(localStorage.getItem("moodList")),
    });
  }, []);
  localStorage.setItem("userData", JSON.stringify(userData));

  console.log(userData);

  return (
    <>
      <div className={`${!darkMode && "dark"} p-2`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <NewNote />
      </div>
    </>
  );
}
