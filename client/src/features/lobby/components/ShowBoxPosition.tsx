// interfaces
import { IGame } from '../../game/interface';

// hooks
import { useAuth } from '../../../hook/useAuth';

// my components
import { UserBoxLeft } from './UserBoxLeft';
import { UserBoxRight } from './UserBoxRight';

interface Props {
  user: IGame;
}

export const ShowBoxPosition = ({ user }: Props) => {
  const { authState } = useAuth();
  const { auth } = authState;

  if (user.id === auth.id) {
    return <UserBoxLeft user={user} />;
  }

  return <UserBoxRight user={user} />;
};
