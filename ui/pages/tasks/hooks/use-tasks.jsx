import { useUserId } from 'meteor/react-meteor-accounts';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useState } from 'react';
import { Tasks } from '/api/tasks/tasks';

export function useTasks() {
  useSubscribe('tasksByLoggedUser');
  const userId = useUserId();
  const [hideDone, setHideDone] = useState(false);
  const allTasks = useFind(
    Tasks,
    [{ userId }, { sort: { createdAt: -1, description: -1 } }],
    [userId]
  );
  const pendingTasks = allTasks.filter((task) => !task.done);
  const tasks = hideDone ? pendingTasks : allTasks;
  const count = allTasks.length;
  const pendingCount = pendingTasks.length;

  return {
    hideDone,
    setHideDone,
    tasks,
    pendingCount,
    count,
  };
}
