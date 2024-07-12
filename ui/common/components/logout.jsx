import { Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';
import { useUserId } from 'meteor/react-meteor-accounts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout() {
  const userId = useUserId();
  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout(() => {
      navigate('/');
    });
  };

  return (
    <>
      {userId && (
        <Button fontSize="sm" fontWeight={400} onClick={logout}>
          Sign Out
        </Button>
      )}
    </>
  );
}
