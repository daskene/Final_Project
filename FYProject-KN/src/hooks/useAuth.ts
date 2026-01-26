import { useEffect, useState } from 'react';
import { onAuthStateChanged, getCurrentUser, type AuthUser } from '../services/firebase/auth';

export default function useAuth(): AuthUser {
  const [user, setUser] = useState<AuthUser>(getCurrentUser());

  useEffect(() => {
    const unsub = onAuthStateChanged(setUser);
    return unsub;
  }, []);

  return user;
}
