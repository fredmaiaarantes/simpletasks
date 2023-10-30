Kadira._connectWithEnv = function() {
  const settings =
    Meteor.settings &&
    Meteor.settings.packages &&
    Meteor.settings.packages['mdg:meteor-apm-agent'];

  if (settings && settings.isDisabled) {
    console.log(
      'Meteor APM: not connected because it was disabled in settings'
    );
    return;
  }

  if (settings && settings.APM_APP_ID && settings.APM_APP_SECRET) {
    const options = Kadira._parseEnv(settings);

    Kadira.connect(settings.APM_APP_ID, settings.APM_APP_SECRET, options);

    Kadira.connect = function() {
      throw new Error(
        'Meteor APM has already connected using credentials from app Meteor.settings'
      );
    };
  }

  if (
    process.env.APM_APP_ID &&
    process.env.APM_APP_SECRET &&
    process.env.APM_OPTIONS_ENDPOINT
  ) {
    const options = Kadira._parseEnv(process.env);

    Kadira.connect(process.env.APM_APP_ID, process.env.APM_APP_SECRET, options);

    Kadira.connect = function() {
      throw new Error(
        'Meteor APM has already connected using credentials from Environment Variables'
      );
    };
  }

  // other forms of Kadira.connect are not supported
};

// Try to connect automatically
Kadira._connectWithEnv();
