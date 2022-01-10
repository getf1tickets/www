import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

export default function Logout() {
  const { clearAuthEntity } = useUser();
  const router = useRouter();

  clearAuthEntity();
  router.push('/');

  return null;
}
