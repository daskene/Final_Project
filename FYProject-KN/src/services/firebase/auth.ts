import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  type User,
} from 'firebase/auth';

export type AuthUser = User | null;

export async function signInWithEmail(email: string, password: string): Promise<AuthUser> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthUser> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth);
}

export function onAuthStateChanged(cb: (u: AuthUser) => void): () => void {
  return fbOnAuthStateChanged(auth, cb);
}

export function getCurrentUser(): AuthUser {
  return auth.currentUser;
}
