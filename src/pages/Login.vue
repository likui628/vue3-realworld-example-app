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
import { defineComponent, reactive, ref } from 'vue'
import {
  PostLoginForm,
  PostLoginErrors,
  postLogin,
} from '../services/auth/postLogin'
import { routerPush } from '../router'
import AppLink from '../components/AppLink.vue'
import { useStore } from 'vuex'

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

    const loadding = ref(false)

    const errors = ref<PostLoginErrors>({})

    const login = function () {
      loadding.value = true

      postLogin(form)
        .then((user) => {
          const store = useStore()
          store.commit('updateUser', user)

          routerPush('global-feed')
        })
        .catch((err) => {
          errors.value = err
        })
        .finally(() => {
          loadding.value = false
        })
    }
    return { form, loadding, errors, login }
  },
})
</script>
