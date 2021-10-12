import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import user from './modules/user'

export interface UserState {
  user: User | null
}

interface State extends UserState {}

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore({
  modules: {
    user,
  },
})

export function useStore() {
  return baseUseStore(key)
}
