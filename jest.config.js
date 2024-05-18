module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    transform: {
      '^.+\\.(js)$': '@swc/jest',
    },
    testMatch: ['**/tests/**/*.test.js'],
  };
  