import React from 'react';
import { Button, Center, FormControl, FormHelperText, Heading, Input } from '@chakra-ui/react';
import { FormState, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../pages/AuthPage';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

interface IProps {
  handleSubmit: UseFormHandleSubmit<IFormInput>;
  onSubmit: SubmitHandler<IFormInput>;
  formState: FormState<IFormInput>;
  register: UseFormRegister<IFormInput>;
}
export const AuthView = ({ formState: { errors }, handleSubmit, onSubmit, register }: IProps) => {
  return (
    <ContainerComponent>
      <FaceUpAnimateComponent>
      <Center>
        <Heading color={'teal'}>Register </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl py={3}>
          <Input
            autoComplete='off'
            color={'teal'}
            type='text'
            placeholder='username'
            {...register('username', {
              required: true,
              minLength: {
                value: 4,
                message: 'Minimum length should be 4',
              },
              maxLength: {
                value: 10,
                message: 'Maximum length should be 10',
              },
            })}
          />
          {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
        </FormControl>
        <Button variant={'solid'} colorScheme='teal' type='submit' w='full'>
          Join
        </Button>
      </form>
      </FaceUpAnimateComponent>
    </ContainerComponent>
  );
};
