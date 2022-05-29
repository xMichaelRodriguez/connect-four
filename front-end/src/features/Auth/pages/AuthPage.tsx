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
  description: string;
  name: string;
}
export const AuthPage = () => {
  const { handleSetAuth } = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = ({ username }) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    };
    fetch(`${baseUrl}user/create-user`, options)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.name === 'userAlreadyExists') return alert(resp.description);
        
        socket.emit('createdUser',{message:"hoal"});
        handleSetAuth(resp.description);

        history.push('/');
      });
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
