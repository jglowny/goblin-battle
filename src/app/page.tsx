// import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
export default function Home() {
  return (
    <div className={styles.page}>
      <Button variant="contained">Hello Word</Button>
    </div>
  );
}
