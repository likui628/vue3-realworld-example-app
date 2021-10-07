<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul class="error-messages">
            <li>email or password is invalid</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click="submit"
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
import { defineComponent } from 'vue'
import { postLogin } from '../services/auth/postLogin'

export default defineComponent({
  name: 'Login',
  setup() {
    let form = {
      email: 'xxxx@xx.com',
      password: 'xxx',
    }
    const submit = function () {
      postLogin(form)
        .then((user) => {
          console.log(user)
        })
        .catch((errors) => {
          console.log(errors)
        })
    }
    return { submit }
  },
})
</script>
