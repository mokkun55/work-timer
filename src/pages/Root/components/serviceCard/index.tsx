import { Paper } from "@mantine/core";
import styles from "./index.module.scss";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const ServiceCard = ({ icon, title, description }: Props) => {
  return (
    <Paper shadow="md" radius="md" withBorder p="xl" className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </Paper>
  );
};
