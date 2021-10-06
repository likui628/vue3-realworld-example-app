import 'jest'

jest.mock('src/config', () => ({
  CONFIG: {
    API_HOST: '',
  },
}))
