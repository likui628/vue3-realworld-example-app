<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="form.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="form.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="form.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="form.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />

          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { userStore } from '../store/user'
import { routerPush } from '../router'
import { getUser } from '../services/auth/getUser'
import { putUser, PutUserForm } from '../services/auth/putUser'

const form = reactive<PutUserForm>({})

onMounted(async () => {
  try {
    const user = await getUser()

    form.bio = user.bio
    form.email = user.email
    form.image = user.image
    form.username = user.username
  } catch (error) {
    await routerPush('login')
  }
})

const store = userStore()
const onSubmit = async () => {
  const filteredForm = Object.entries(form)
    .filter(([, value]) => !!value)
    .reduce((accu, [key, value]) => ({ ...accu, [key]: value }), {})

  const user = await putUser(filteredForm)
  store.updateUser(user)
  await routerPush('profile', { username: user.username })
}

const onLogout = async () => {
  store.updateUser(null)
  await routerPush('global-feed')
}
</script>
