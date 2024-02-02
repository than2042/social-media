import PostPage from "./posts/page";

import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <PostPage />
      </div>
    </main>
  );
};

export default Home;
