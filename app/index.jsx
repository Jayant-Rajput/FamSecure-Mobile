import { useEffect, useState } from 'react';
import { useRouter, useRootNavigationState  } from 'expo-router';
import useAuthStore from './store/authStore';

export default function Index() {
  const { user, fetchUserFromToken } = useAuthStore();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      await fetchUserFromToken();
      setIsReady(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if ( !rootNavigationState?.key || !isReady ) return;   // wait for layout to mount

    if (user) router.replace("/home");
    else router.replace("/auth/LoginScreen");
  }, [user, rootNavigationState, isReady]);

  return null;
}