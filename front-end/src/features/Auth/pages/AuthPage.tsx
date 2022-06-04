import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { socket } from '../../../lib/sockets';
import { AuthView } from '../views/AuthView';

export interface IFormInput {
  username: string;
}
interface IResponse {
  description: any;
  name: string;
}

export const AuthPage = () => {
  const { handleSetAuth } = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async ({ username }) => {
    socket.emit('createUser', { username }, (data: IResponse) => {
      if (data.name === 'userAlreadyExists') {
        alert(data.description);
      } else {
        handleSetAuth(data.description);
        history.replace('/soloq');
      }
    });
  };

  return (
    <AuthView onSubmit={onSubmit} handleSubmit={handleSubmit} formState={formState} register={register} />
  );
};
