import { request } from '../../services'

import { UserState } from '..'

const state = (): UserState => ({
  user: null,
})

const getters = {
  user: (state: UserState) => state.user,
}

const actions = {}

const mutations = {
  updateUser(state: UserState, user: User) {
    if (user === undefined || user === null) {
      state.user = null
      request.deleteAuthorizationHeader()
    } else {
      state.user = user
      request.setAuthorizationHeader(user.token)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}