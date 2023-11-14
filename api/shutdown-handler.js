import { Meteor } from 'meteor/meteor';
import { DDPGracefulShutdown } from '@meteorjs/ddp-graceful-shutdown';

class SimpleDDPGracefulShutdown extends DDPGracefulShutdown {
  installSIGTERMHandler() {
    process.on(
      'SIGTERM',
      Meteor.bindEnvironment(() => {
        const gracePeriod =
          process.env.METEOR_SIGTERM_GRACE_PERIOD_SECONDS || 30;
        // eslint-disable-next-line no-console
        console.log(
          `Received SIGTERM. Shutting down in ${gracePeriod} seconds.`
        );

        this.closeConnections({ log: true });
      })
    );
  }
}

new SimpleDDPGracefulShutdown({
  gracePeriodMillis: 1000 * process.env.METEOR_SIGTERM_GRACE_PERIOD_SECONDS,
  server: Meteor.server,
}).installSIGTERMHandler();
