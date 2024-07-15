import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const defaultValues = {
  username: 'fredmaia',
  password: 'abc123',
};

export function useLogin() {
  const toast = useToast();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleError = (error) => {
    if (error) {
      const reason = error?.reason || 'Sorry, please try again.';
      toast({
        title: 'An error occurred.',
        description: reason,
        status: 'error',
      });
      return;
    }
    navigate('/tasks');
  };

  const loginOrCreateUser = (values) => {
    const { username, password } = values;
    if (isSignup) {
      Accounts.createUser({ username, password }, (error) => {
        handleError(error);
      });
    } else {
      Meteor.loginWithPassword(username, password, (error) => {
        handleError(error);
      });
    }
  };

  const handleGithubLogin = () => {
    Meteor.loginWithGithub(
      {
        requestPermissions: ['user'],
        loginStyle: 'popup',
      },
      (error) => {
        handleError(error);
      }
    );
  };

  return {
    loginOrCreateUser,
    isSignup,
    setIsSignup,
    showPassword,
    setShowPassword,
    handleSubmit,
    register,
    formState,
    handleGithubLogin,
  };
}
