<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <app-link name="register">Need an account?</app-link>
          </p>

          <ul class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form @submit.prevent="login">
            <fieldset class="form-group">
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="loadding"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { PostLoginForm } from '../services/auth/postLogin'
import { routerPush } from '../router'
import AppLink from '../components/AppLink.vue'
import { userStore } from '../store/user'
import { useAuth } from '../composable/useAuth'

export default defineComponent({
  name: 'Login',
  components: {
    AppLink,
  },
  setup() {
    const form = reactive<PostLoginForm>({
      email: '',
      password: '',
    })

    const { user, login: postLogin, errors, loadding } = useAuth()

    const store = userStore()

    const login = async () => {
      await postLogin(form)
      if (user.value) {
        store.updateUser(user.value)
        routerPush('global-feed')
      }
    }
    return { form, loadding, errors, login }
  },
})
</script>
