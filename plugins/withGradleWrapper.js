const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const GRADLE_VERSION = '8.13';

const withGradleWrapper = (config) => {
  return withDangerousMod(config, [
    'android',
    (config) => {
      const wrapperPropsPath = path.join(
        config.modRequest.platformProjectRoot,
        'gradle/wrapper/gradle-wrapper.properties'
      );

      let contents = fs.readFileSync(wrapperPropsPath, 'utf8');
      contents = contents.replace(
        /distributionUrl=.*gradle-.*-bin\.zip/,
        `distributionUrl=https\\://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip`
      );
      fs.writeFileSync(wrapperPropsPath, contents);

      return config;
    },
  ]);
};

module.exports = withGradleWrapper;
