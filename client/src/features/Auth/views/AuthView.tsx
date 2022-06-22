import React from 'react';
import { Button, Center, FormControl, FormHelperText, Heading, Input } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput } from '../pages/AuthPage';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

interface IProps {
  onSubmit: SubmitHandler<IFormInput>;
}
export function AuthView({ onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  return (
    <ContainerComponent>
      <FaceUpAnimateComponent>
        <Center>
          <Heading color="teal">Register </Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl py={3}>
            <Input
              autoComplete="off"
              color="teal"
              type="text"
              placeholder="username"
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
          <Button variant="solid" colorScheme="teal" type="submit" w="full">
            Join
          </Button>
        </form>
      </FaceUpAnimateComponent>
    </ContainerComponent>
  );
}
