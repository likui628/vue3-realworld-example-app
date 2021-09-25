module.exports = {
    preset: 'ts-jest',
    globals: {},
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "vue3-jest",
        "^.+\\js$": "babel-jest"
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    setupFilesAfterEnv: [
        "<rootDir>/src/setup-test.ts"
    ]
}