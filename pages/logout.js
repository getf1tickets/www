import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

export default function Logout() {
  const { clearAuthEntity } = useUser();
  const router = useRouter();

  clearAuthEntity();

  useEffect(() => {
    if (router) router.push('/');
  }, [router]);

  return <div />;
}
