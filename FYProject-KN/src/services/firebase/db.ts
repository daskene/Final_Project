import { db } from './firebase';
import { doc, getDoc as fbGetDoc, setDoc as fbSetDoc, onSnapshot, type DocumentData } from 'firebase/firestore';

export async function getDoc(path: string): Promise<DocumentData | undefined> {
  const ref = doc(db, path);
  const snap = await fbGetDoc(ref);
  return snap.exists() ? snap.data() : undefined;
}

export async function setDoc(path: string, data: DocumentData): Promise<void> {
  const ref = doc(db, path);
  await fbSetDoc(ref, data, { merge: true });
}

export function listen(path: string, cb: (doc: DocumentData | undefined) => void): () => void {
  const ref = doc(db, path);
  const unsub = onSnapshot(ref, (snap) => {
    cb(snap.exists() ? snap.data() : undefined);
  });
  return unsub;
}
