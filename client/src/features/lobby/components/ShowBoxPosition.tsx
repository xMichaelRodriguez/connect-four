// interfaces
import { IAuth } from '../../../interfaces';

// hooks
import { useAuth } from '../../../hook/useAuth';

// my components
import { UserBoxLeft } from './UserBoxLeft';
import { UserBoxRight } from './UserBoxRight';

interface Props {
  user: IAuth;
}

export function ShowBoxPosition({ user }: Props) {
  const { authState } = useAuth();
  const { auth } = authState;

  if (user.id === auth.id) {
    return <UserBoxLeft user={user} />;
  }

  return <UserBoxRight user={user} />;
}
