import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from '../../tasks/Task';
import { TaskForm } from './TaskForm';
import { useTracker, useFind, useSubscribe } from 'meteor/react-meteor-data';
import { TasksHeader } from './TasksHeader';
import { TaskItems } from './TaskItems';

/* eslint-disable import/no-default-export */
export default function TasksPage() {
  const [hideDone, setHideDone] = useState(false);
  const isLoading = useSubscribe('tasksByLoggedUser');
  const userId = useTracker(() => Meteor.userId());
  const filter = hideDone ? { done: { $ne: true }, userId } : { userId };
  const tasks = useFind(() => Task.find(filter, { sort: { createdAt: -1 } }), [
    hideDone,
  ]);
  const pendingCount = Task.find({
    done: { $ne: true },
    userId,
  }).count();

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
