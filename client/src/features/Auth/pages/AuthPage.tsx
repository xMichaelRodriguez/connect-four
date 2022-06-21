import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hook/useAuth';

import { IAuth } from '../../../interfaces';

import { socket } from '../../../lib/sockets';
import { AuthView } from '../views/AuthView';

export interface IFormInput {
  username: string;
}
interface IResponse {
  description: IAuth | string;
  name: string;
}

export function AuthPage() {
  const history = useHistory();
  const { setLogin } = useAuth();
  const { register, handleSubmit, formState } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ username }) => {
    socket.emit('createUser', { username: username.trim() }, (data: IResponse) => {
      if (data.name === 'userAlreadyExists') {
        if (typeof data.description === 'string') {
          Swal.fire({
            title: 'Warning',
            text: data.description,
            icon: 'warning',
          });
        }
      } else if (typeof data.description !== 'string') {
        setLogin(data.description);
        history.replace('/queue');
      }
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
}
