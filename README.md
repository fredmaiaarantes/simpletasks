# Charm - Simple Tasks
Built with my new preferred stack: CHARM (Chakra-UI, React, Meteor).

Stack: [Meteor](https://meteor.com), [Chakra UI](https://chakra-ui.com/), React, [Formik](https://formik.org/), MongoDB

Demo: https://simpletasks.meteorapp.com/

Author: [@fredmaiaarantes](https://twitter.com/fredmaiaarantes)

Features:
- Sign In / Sign Up
- List Tasks by logged user
- Add Task
- Remove Task
- Mark Task as Done
- Filter Tasks by Status

Video demo:
https://www.loom.com/share/50b9e1a513904b138fb772a332facbfb

## Running the example

### Install dependencies

```bash
meteor npm install
```

### Running

```bash
meteor
```

### Cleaning up you local db

```bash
meteor reset
```

### Deploy to Galaxy with free MongoDB
```bash
meteor deploy <select a subdomain>.meteorapp.com --free --mongo
```

## Done
- Integrate to Chakra-UI
- Use ESLint and Prettier
- Host in Galaxy
- Use React Router 6 and Lazy Loading
- Use validated-method
- Galaxy SEO Support
- Define directory structure
- Add database migrations

## To Do
- Extend users collection

## Main Meteor packages
- react-meteor-data
- quave:collections
- percolate:migrations
- force-ssl
- mdg:seo
