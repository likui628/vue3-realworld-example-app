<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <app-link name="login">Have an account?</app-link>
          </p>

          <ul class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form @submit.prevent="register">
            <fieldset class="form-group">
              <input
                v-model="form.username"
                class="form-control form-control-lg"
                type="text"
                required
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                required
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="loadding"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import AppLink from '../components/AppLink.vue'
import { PostRegisterForm } from '../services/auth/postRegister'
import { userStore } from '../store/user'
import { routerPush } from '../router'
import { useAuth } from '../composable/useAuth'

const form = reactive<PostRegisterForm>({
  username: '',
  email: '',
  password: '',
})

const { user, register: postRegister, errors, loadding } = useAuth()

const store = userStore()

const register = async () => {
  await postRegister(form)
  if (user.value) {
    store.updateUser(user.value)
    routerPush('global-feed')
  }
}
</script>
