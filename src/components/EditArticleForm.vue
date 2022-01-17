<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <fieldset class="form-group">
        <input
          v-model="formData.title"
          type="text"
          class="form-control form-control-lg"
          placeholder="Article Title"
          data-test="title"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="formData.description"
          type="text"
          class="form-control"
          placeholder="What's this article about?"
          data-test="description"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          v-model="formData.body"
          class="form-control"
          rows="8"
          placeholder="Write your article (in markdown)"
          data-test="body"
        ></textarea>
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="newTag"
          type="text"
          class="form-control"
          placeholder="Enter tags"
          @keydown.enter.prevent="addTag"
          data-test="newTag"
        />
        <div class="tag-list" data-test="tag-list">
          <span
            v-for="tag in formData.tagList"
            :key="tag"
            class="tag-default tag-pill"
            @click="removeTag(tag)"
          >
            <i class="ion-close-round" />
            {{ tag }}
          </span>
        </div>
      </fieldset>
      <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
        Publish Article
      </button>
    </fieldset>
  </form>
</template>

<script lang="ts">
export default {
  name: 'EditArticleForm',
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routerPush } from '../router'
import { getArticleBySlug } from '../services/article/getArticle'
import { postArticle, putArticle } from '../services/article/postArticle'

interface Form {
  title: string
  description: string
  body: string
  tagList: string[]
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const formData = reactive<Form>({
  title: '',
  description: '',
  body: '',
  tagList: [],
})

const newTag = ref('')

const addTag = () => {
  const val = newTag.value.trim()
  if (!formData.tagList.find((t) => t === val)) {
    formData.tagList.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  formData.tagList = formData.tagList.filter((t) => t !== tag)
}

const onSubmit = async () => {
  let article = null
  if (slug.value) {
    article = await putArticle(slug.value, formData)
  } else {
    article = await postArticle(formData)
  }
  if (article) await routerPush('article', { slug: article.slug })
}

async function fetchArticle() {
  if (!slug.value) return
  const article = await getArticleBySlug(slug.value)
  formData.title = article.title
  formData.body = article.body
  formData.description = article.description
  formData.tagList = article.tagList
}

await fetchArticle()
</script>
