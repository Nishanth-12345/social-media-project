import { Timestamp } from "firebase/firestore";

export const convertTimestamp = (timestamp: Timestamp) => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  } else {
    return '0'
  }

};
