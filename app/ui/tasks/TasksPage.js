import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { TasksCollection } from '../../tasks/tasks.collection';
import { TaskForm } from './TaskForm';
import { useTracker, useFind, useSubscribe } from 'meteor/react-meteor-data';
import { TasksHeader } from './TasksHeader';
import { TaskItems } from './TaskItems';

/* eslint-disable import/no-default-export */
export default function TasksPage() {
  const [hideDone, setHideDone] = useState(false);
  const isLoading = useSubscribe('tasksByLoggedUser');
  const userId = useTracker(() => Meteor.userId());
  const tasks = useFind(
    () => TasksCollection.findByUserId({ userId, hideDone }),
    [hideDone]
  );
  const pendingCount = TasksCollection.countPendingByUserId({ userId });

  return (
    <>
      <TasksHeader />
      <TaskForm />
      <TaskItems
        isLoading={isLoading}
        tasks={tasks}
        pendingCount={pendingCount}
        hideDone={hideDone}
        setHideDone={setHideDone}
      />
    </>
  );
}
