import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUserId } from 'meteor/react-meteor-accounts';

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
