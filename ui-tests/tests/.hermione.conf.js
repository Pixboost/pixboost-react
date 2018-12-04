module.exports = {
  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: './hermione/reports',
      defaultView: 'all',
      baseHost: 'localhost'
    }
  },

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
      },
      windowSize: '1200x800'
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      },
      windowSize: '1200x800'
    },
    ie: {
      desiredCapabilities: {
        browserName: 'internet explorer'
      },
      windowSize: '1200x800'
    },
    // edge: {
    //   desiredCapabilities: {
    //     browserName: 'MicrosoftEdge'
    //   }
    // }
  }
};