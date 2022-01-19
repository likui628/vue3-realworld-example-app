import 'jest'
import { config } from '@vue/test-utils'
import { CONFIG } from './config'

jest.mock('src/config', () => ({
  CONFIG: {
    API_HOST: '',
    DEFAULT_AVATAR: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
  },
}))

config.global.mocks = {
  $config: () => CONFIG,
}
