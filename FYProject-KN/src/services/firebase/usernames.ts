import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const usernameDoc = doc(db, 'usernames', username.toLowerCase());
  const snap = await getDoc(usernameDoc);
  return !snap.exists();
}

export async function claimUsername(username: string, userId: string, email: string): Promise<void> {
  const usernameDoc = doc(db, 'usernames', username.toLowerCase());
  await setDoc(usernameDoc, { userId, email, createdAt: Date.now() });
  
  // Also store username in user profile
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, { username, email, createdAt: Date.now() }, { merge: true });
}

export async function getUserByUsername(username: string): Promise<{ userId: string; email: string } | null> {
  const usernameDoc = doc(db, 'usernames', username.toLowerCase());
  const snap = await getDoc(usernameDoc);
  
  if (!snap.exists()) return null;
  
  const data = snap.data();
  return { userId: data.userId, email: data.email };
}

export function isEmail(input: string): boolean {
  return input.includes('@');
}
