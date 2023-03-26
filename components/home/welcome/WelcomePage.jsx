import MoodPage from "../mood/MoodPage";
import GoalsPage from "../goals/GoalsPage";
import LoaderPage from "../loader/LoaderPage";

import styles from "./WelcomePage.module.css";

export default function WelcomePage({ page, setPage, setWelcomeModal }) {
  let currentPage;

  if (page === 1) {
    currentPage = <MoodPage setPage={setPage} />;
  } else if (page === 2) {
    currentPage = <GoalsPage setPage={setPage} />;
  } else if (page === 3) {
    currentPage = (
      <LoaderPage
        page={page}
        setPage={setPage}
        setWelcomeModal={setWelcomeModal}
      />
    );
  }

  return (
    <div className="h-screen w-full flex justify-center flex-col items-center absolute top-0 left-0">
      <h1 className={styles.welcomeTitle}>Hi 👋</h1>
      {currentPage}
    </div>
  );
}
