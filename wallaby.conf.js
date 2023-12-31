export default function () {
  return {
    files: ['src/**/*.ts', { pattern: 'src/**/*.spec.ts', ignore: true }],
    tests: ['src/**/*.spec.ts'],
    env: {
      type: 'node',
    },
    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'jasmine',
  };
}
