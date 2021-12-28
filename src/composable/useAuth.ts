import { ref } from 'vue'
import {
  PostLoginForm,
  PostLoginErrors,
  postLogin,
} from '../services/auth/postLogin'
import {
  postRegister,
  PostRegisterErrors,
  PostRegisterForm,
} from '../services/auth/postRegister'

export function useAuth() {
  const user = ref<User | null>(null)
  const loadding = ref(false)
  const errors = ref<PostLoginErrors | PostRegisterErrors>({})

  async function login(form: PostLoginForm): Promise<void> {
    loadding.value = true
    await postLogin(form)
      .then((data) => (user.value = data))
      .catch((err) => {
        errors.value = err
      })

    loadding.value = false
  }

  async function register(form: PostRegisterForm): Promise<void> {
    loadding.value = true
    await postRegister(form)
      .then((data) => (user.value = data))
      .catch((err) => {
        errors.value = err
      })

    loadding.value = false
  }

  return {
    login,
    register,
    user,
    errors,
    loadding,
  }
}
