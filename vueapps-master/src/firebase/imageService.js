import { db } from './index'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';

export async function getImages() {
  const images = [];
  const querySnapshot = await getDocs(collection(db, "ImageLinks"));
  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });
  return images;
}