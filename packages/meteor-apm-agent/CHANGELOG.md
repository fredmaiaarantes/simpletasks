# Changelog

### v3.4.1

* Use http package version based on your version of Meteor

* Minor fixes through the codebase to modernize it a bit

### v3.4.0

* Upgraded the usage to deprecated APIs to use the current ones

### v3.3.0

* Use dependencies starting at Meteor v1.11

### v3.2.6

* Fixes an issue in docsize_cache.js#19 where the data parameter can be either an Array or a Map, and a Map's size property is a number and not a function.
  
* It makes so the APM can be disabled with a setting in Meteor.settings.packages['mdg:meteor-apm-agent'].isDisabled

### v3.2.5

* Fix log `[object Object]` issue. See [meteor#10078](https://github.com/meteor/meteor/issues/10078).Thx @zodern.

### v3.2.0

* Remove dependency on `meteorhacks:meteorx`.
  [PR #7](https://github.com/meteor/meteor-apm-agent/pull/7)

* Use the Meteor core `ecmascript` package.

* Update `api.versionFrom` to Meteor 1.7.

### v3.1.1

* Use `Object.create(null)` rather than object initializer notation when
  initializing objects to store metric data.

### v3.1.0
* Replace jQuery with HTTP package (thx @ gbhrdt & jehartzog)

### v3.0.0
* Initial MDG release.
