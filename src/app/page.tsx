import { useFetch } from "@/hooks/useFetch";
import styles from "./page.module.css";

export default function Home() {

  const {
    data,
    error,
    loading,

  } = useFetch('/api/news/first', 'GET');


  return (
    <main className={styles.main}>
      
    </main>
  );
}
