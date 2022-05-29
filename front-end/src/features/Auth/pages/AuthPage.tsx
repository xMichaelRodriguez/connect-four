import React, { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { baseUrl } from '../../../lib/baseUrl';
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
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    };
    const body = await fetch(`${baseUrl}user/create-user`, options);
    const data: IResponse = await body.json();
    if (data.name === 'userAlreadyExists') return alert(data.description);

    socket.emit('userCreated');
    handleSetAuth(data.description);

    history.push('/soloq');
  };

  return (
    <AuthView
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      formState={formState}
      register={register}
    />
  );
};
