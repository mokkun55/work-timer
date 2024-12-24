import { Timestamp } from "firebase/firestore";

export type WorkSession = {
  content: string;
  duration: number;
  createdAt: Timestamp;
  week: string;
  id: string;
};
