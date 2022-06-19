import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { socket } from '../../../lib/sockets';
import { AuthView } from '../views/AuthView';
import { IAuth } from '../../../interfaces';
import { useAuth } from '../../../hook/useAuth';
export interface IFormInput {
  username: string;
}
interface IResponse {
  description: IAuth | string;
  name: string;
}

export const AuthPage = () => {
  const history = useHistory();
  const { setLogin } = useAuth();
  const { register, handleSubmit, formState } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ username }) => {
    socket.emit('createUser', { username: username.trim() }, (data: IResponse) => {
      if (data.name === 'userAlreadyExists') {
        alert(data.description);
      } else {
        if (typeof data.description !== 'string') {
          setLogin(data.description);
          history.replace('/queue');
        }
      }
    });
  };

  return (
    <AuthView onSubmit={onSubmit} handleSubmit={handleSubmit} formState={formState} register={register} />
  );
};
