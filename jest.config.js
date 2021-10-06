module.exports = {
    preset: 'ts-jest',
    globals: {},
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue3-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/utils/fileTransformer.js',
    },
    "modulePaths": [
        "<rootDir>"
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/src/setup-test.ts"
    ]
}

