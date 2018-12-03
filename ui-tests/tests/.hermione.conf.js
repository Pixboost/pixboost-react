module.exports = {
  sets: {
    pixboost: {
      files: 'src'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    },
    ie: {
      desiredCapabilities: {
        browserName: 'internet explorer'
      }
    },
    // edge: {
    //   desiredCapabilities: {
    //     browserName: 'MicrosoftEdge'
    //   }
    // }
  }
};