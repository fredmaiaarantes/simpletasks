# Charm - Simple Tasks
Running with **Meteor.js 3.0** and Node 20.
Built with the CHARM (Chakra-UI, React, Meteor) stack.

Deployed to Galaxy: https://simpletasks.meteorapp.com/

## What and why this stack?
The main goal is to make development as quick and efficient as possible. To achieve this, I have selected these technologies:

-   [Meteor ](https://meteor.com/)- A full-stack framework focused on productivity that uses RPCs and Sockets for reactivity.
-   [React ](https://reactjs.org/)- A minimal UI library for building on the web.
-   [Chakra UI ](https://chakra-ui.com/)- A React library focused on simplicity and productivity.
-   [React Hook Form ](https://react-hook-form.com/)- Performant, flexible, and extensible forms with easy-to-use validation.
-   [MongoDB ](https://www.mongodb.com/)- A NoSQL database that is really powerful for prototyping and creating ready-to-use apps out of the box.
-   [Galaxy ](https://meteor.com/cloud)-  A cloud provider that makes deploying a server with a database included painless.

### Features:
- Sign In / Sign Up with Username and GitHub
- List Tasks by logged-in user
- Add Tasks
- Remove Tasks
- Mark a Task as Done
- Filter Tasks by Status

Video demo:
https://www.loom.com/share/50b9e1a513904b138fb772a332facbfb

## Running the template

### Install dependencies

```bash
meteor npm install
```

### Configure GitHub Login (Optional)

Create an OAuth App on [GitHub](https://github.com/settings/developers) by following this [tutorial](https://blog.meteor.com/meteor-social-login-with-github-1b48d04c332) and checking our [docs](https://v3-docs.meteor.com/api/accounts.html#Meteor-loginWith%3CExternalService%3E).
Then, replace the GitHub `clientId` and `secret` in your `private/settings.json` file with your own.

### Running

```bash
meteor npm run start
```

### Run tests

```bash
meteor npm run test
```

### Cleaning up your local DB

```bash
meteor reset --db
```

### Deploy to Galaxy with free MongoDB
```bash
meteor deploy <select a subdomain>.meteorapp.com --free --mongo
```

## Main Meteor packages
- react-meteor-data
- accounts-password
- accounts-github
- quave:migrations
- force-ssl
- jam:easy-schema
- meteortesting:mocha

## Tech Explanation

### How is the project structured?

Before explaining, this template is inspired by the works of [Alex Kondov](https://alexkondov.com/): [Tao of Node ](https://alexkondov.com/tao-of-node/) and [Tao of React](https://alexkondov.com/tao-of-react/)

Most Meteor apps are built similarly to a monorepo with their divisions for the back end and front end declared respectively in `ui` and `api` folders. You can have a common folder to share code between the front end and back end. For example, if you use TypeScript, you can share types in your codebase.

![Project structure](README-Assets/project_structure.png)

A good practice that needs to be pointed out is organizing the folders by feature so that when we think about that specific domain feature, we only need to go to that feature folder, and everything exclusive to that feature should be there.

We usually place things in the common directory when we have items that will be used in many places.

### Backend decisions

In this template, we have chosen to use Mongo, shipped out of the box with Meteor.js, and added some packages to make it even more productive. That being said, we decided to use `simpl-schema` and `percolate:migrations`. The first one is for validating schemas in runtime, and the second one is for creating database migrations.

#### Database Migrations

> Questions on how to structure your migrations?
>
> **Use api/db/migration.js as your reference**

* * *

This is the kind of feature that sometimes comes in handy. Whenever the server starts, it runs the code below located in `api/main.js`:

```javascript
import { Meteor } from "meteor/meteor";
import { Migrations } from "meteor/percolate:migrations";
import "./db/migrations";
import "./tasks/tasks.methods";
import "./tasks/tasks.publications";

/**
 * This is the server-side entry point
 */
Meteor.startup(() => {
  Migrations.migrateTo("latest");
});
```

It gathers all migrations that have not been applied and applies them.

A great use for migrations is when you have a change in your database, and you might need everyone to have at least the default data.

For more details, you can check [the package docs](https://github.com/percolatestudio/meteor-migrations).

#### Schemas

Schemas are a way to ensure that the data coming from the front is as expected and sanitized.

We have decided to use `jam:easy-schema`, attaching it to our collection as you can see in `api/tasks/tasks.collection.js`. By doing this, all data that goes into our Database is validated and follows the structure we defined. You can see how a Task is structured, and having that schema, we can start implementing methods and publications.

Don't forget to check [jam:easy-schema docs](https://github.com/jamauro/easy-schema) in case of doubts about how to use it.

#### Server Connection

Following the idea of having a folder for each feature, and if it connects to the front end, we need to provide a way to connect.

Meteor works similarly to [tRPC](https://trpc.io/) and [Blitz.js](https://blitzjs.com/). This model has server functions that get called through a Remote Procedure Call (RPC). In this template, calls that are related to tasks are in the `api/tasks/tasks.methods.js` folder.

```javascript
/**
 Removes a task from the Tasks collection.
 @async
 @function removeTask
 @param {Object} taskData - The task data.
 @param {string} taskData.taskId - The ID of the task to remove.
 @returns {Promise<void>}
 */
async function removeTask({ taskId }) {
  check(taskId, String);
  await checkTaskOwner({ taskId });
  return Tasks.removeAsync(taskId);
}
// ...
Meteor.methods({
  insertTask,
  removeTask,
  toggleTaskDone,
});
```

So in order to call this server method, we need to call it by its name. It would look like this:

This sample comes from `ui/tasks/components/task-item.jsx`:

```javascript
async function onDelete(_id) {
  await Meteor.callAsync('removeTask', { taskId: _id });
}
```

#### Subscriptions

MeteorJS supports subscriptions out of the box as can be seen in `api/tasks/tasks.publications.js`. These publications are called in a similar way to RPC methods, but their values are reactive. For more details on how to deal with and think in reactive programming, [Andre Stalz ](http://andre.staltz.com)has [this gist introducing Reactive Programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)and [Kris Kowal](https://github.com/kriskowal) has [this Repo](https://github.com/kriskowal/gtor) that discusses the theory of reactivity in-depth.

> For using a subscription as you can see in our docs, is similar to using methods. In React we use meteor/react-meteor-data for having a react way of calling those methods

For a good example of Subscriptions, you can look in `ui/tasks/tasks-page.jsx`

### Frontend decisions

![Task Form](README-Assets/task_example.png)

#### React with Meteor is &lt;3

As for our frontend framework, we have chosen React for its productive ecosystem and simplicity. Meteor has a package for querying data using hooks, which makes you think only about bringing solutions to life.

For more information, you can check [react-meteor-data repository](https://github.com/meteor/react-packages/tree/master/packages/react-meteor-data#react-meteor-data) for more details on using the best of them.

#### Forms

As one of the key parts of the front end, we have chosen a library to help us deal with this piece. React Hook Form is a performant, flexible, and extensible library with easy-to-use validation. A good template for creating this kind of form is located in `ui/pages/tasks/components/task-form.jsx`. It is also integrated with Zod and Meteor by its call method.

Want to know more about how to create forms with React Hook Form? Check [their documentation](https://www.react-hook-form.com).

#### The productivity core: Chakra-UI

![Sign in Dark](README-Assets/sign_in_dark.png)

![Sign in Light](README-Assets/sign_in_light.png)

For our UI components, we have chosen Chakra UI because of its productivity that matches what Meteor does in the backend creating a lovely flow with an outstanding Developer Experience.

We have included Dark and Light modes. It can be seen those configs in `ui/common/components/ui-provider.jsx`.

You can see Chakra-UI's full component list on [their website](https://chakra-ui.com/getting-started).

