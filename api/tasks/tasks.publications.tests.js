import { expect } from 'chai';

import { Random } from 'meteor/random';
import { Tasks } from './tasks';
import '/api/tasks/tasks.publications';
import { getMeteorPublication, mockLoggedUserId } from '../../tests/helpers';

describe('Tasks', () => {
  describe('publications', () => {
    const userId = Random.id();
    const originalTask = {
      description: 'Groceries',
      createdAt: new Date(),
      done: false,
      userId,
    };

    beforeEach(() => {
      mockLoggedUserId(userId);
      Tasks.remove({});
      Tasks.insert(originalTask);
    });

    it('should return tasks from the authenticated user', () => {
      const publication = getMeteorPublication('tasksByLoggedUser');
      const tasks = publication.fetch();

      expect(tasks.length).to.be.equal(1);
      expect(tasks[0].description).to.be.equal(originalTask.description);
    });

    it('should not return any task to the user who does not have any', () => {
      mockLoggedUserId(Random.id());
      const publication = getMeteorPublication('tasksByLoggedUser');
      const tasks = publication.fetch();

      expect(tasks.length).to.be.equal(0);
    });

    it('should not return any task if not authenticated', () => {
      mockLoggedUserId(null);
      const publication = getMeteorPublication('tasksByLoggedUser');
      const tasks = publication.fetch();

      expect(tasks.length).to.be.equal(0);
    });
  });
});
