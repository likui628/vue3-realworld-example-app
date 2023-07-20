import { defineStore } from 'pinia'
import { ref } from 'vue'
import { request } from '../services'

export const userStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function updateUser(u: User | null) {
    if (u) {
      user.value = u
      request.setAuthorizationHeader(u.token)
    } else {
      user.value = null
      request.deleteAuthorizationHeader()
    }
  }

  return { user, updateUser }
})
