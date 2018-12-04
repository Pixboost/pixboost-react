module.exports = {
  sets: {
    all: {
      files: 'src'
    },
    chrome: {
      files: 'src',
      browsers: ['chrome']
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
    // ie: {
    //   desiredCapabilities: {
    //     browserName: 'internet explorer'
    //   }
    // },
    // edge: {
    //   desiredCapabilities: {
    //     browserName: 'MicrosoftEdge'
    //   }
    // }
  }
};