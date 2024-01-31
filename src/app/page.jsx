// import { UserButton } from "@clerk/nextjs";

import styles from "./page.module.css";

const Home = () => {
  return (
    <main>
      <div>
        <div>
          <h1>Social networking that's not for sale.</h1>
          <p>
            Your home feed should be filled with what matters to you most, not
            what a corporation thinks you should see. Radically different social
            media, back in the hands of the people.
          </p>
        </div>
        <img src="/home.svg" alt="home page image" className={styles.homeImg} />
      </div>
    </main>
  );
};

export default Home;
