import { defineStore } from 'pinia'
import { request } from '../services'

export const userStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    updateUser(user: User) {
      if (user === undefined || user === null) {
        this.user = null
        request.deleteAuthorizationHeader()
      } else {
        this.user = user
        request.setAuthorizationHeader(user.token)
      }
    },
  },
})
