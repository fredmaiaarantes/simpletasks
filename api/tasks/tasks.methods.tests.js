import { assert, expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Tasks } from '/api/tasks/tasks';
import '/api/tasks/tasks.methods';
import { mockLoggedUserId } from '../../tests/helpers';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        mockLoggedUserId(userId);
        Tasks.remove({});
        taskId = Tasks.insert({
          description: 'Test Task',
          done: false,
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned task', async () => {
        await Meteor.callAsync('removeTask', { taskId });

        assert.equal(Tasks.find().count(), 0);
      });

      it("can't delete task if not authenticated", async () => {
        mockLoggedUserId(null);
        try {
          await Meteor.callAsync('removeTask', { taskId });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Not authorized.');
        }
        assert.equal(Tasks.find().count(), 1);
      });

      it("can't delete task from another owner", async () => {
        mockLoggedUserId(Random.id());
        try {
          await Meteor.callAsync('removeTask', { taskId });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Access denied.');
        }
        assert.equal(Tasks.find().count(), 1);
      });

      it('can change the status of a task', async () => {
        const originalTask = Tasks.findOne(taskId);
        await Meteor.callAsync('toggleTaskDone', { taskId });

        const updatedTask = Tasks.findOne(taskId);
        assert.notEqual(updatedTask.done, originalTask.done);
      });

      it("can't change the status of a task from another owner", async () => {
        mockLoggedUserId(Random.id());
        const originalTask = Tasks.findOne(taskId);

        try {
          await Meteor.callAsync('toggleTaskDone', { taskId });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Access denied.');
        }
        const task = Tasks.findOne(taskId);
        assert.equal(task.done, originalTask.done);
      });

      it('can insert new tasks', async () => {
        const description = 'New Task';
        await Meteor.callAsync('insertTask', { description });

        const task = Tasks.findOne({ description });
        assert.isNotNull(task);
        assert.isTrue(task.description === description);
      });

      it("can't insert new tasks if not authenticated", async () => {
        mockLoggedUserId(null);
        const description = 'New Task';
        try {
          await Meteor.callAsync('insertTask', { description });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Not authorized.');
        }
        const task = Tasks.findOne({ description });
        assert.isUndefined(task);
      });
    });
  });
}
