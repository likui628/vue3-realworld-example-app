<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="formData.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter.prevent="addTag"
                />
                <div class="tag-list">
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
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed } from 'vue'
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
const slug = computed(()=>route.params.slug as string)

const formData = reactive<Form>({
  title: '',
  description: '',
  body: '',
  tagList: [],
})

onMounted(() => {
  if (slug) fetchArticle(slug.value)
})

async function fetchArticle(slug: string) {
  const article = await getArticleBySlug(slug)

  formData.title = article.title
  formData.body = article.body
  formData.description = article.description
  formData.tagList = article.tagList
}

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
  let article: Article
  if (slug) {
    article = await putArticle(slug.value, formData)
  } else {
    article = await postArticle(formData)
  }

  await routerPush('article', { slug: article.slug })
}
</script>
