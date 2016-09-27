'use strict';
const path = require('path');

const configure = (configurator, options) => {
  configurator.merge({
    entry: {
      server: path.resolve(__dirname, 'src', 'server')
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    }
  });

  options.backendBuild = true;

  return configurator;
};


const postConfigure = (configurator, options) => {
  configurator.merge((current) => {
    current.resolve.root.unshift(path.resolve(__dirname, 'src'));
    return current;
  });
};

module.exports = {
  configure: configure,
  postConfigure: postConfigure
};