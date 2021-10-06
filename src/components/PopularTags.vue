<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <app-link
      v-for="(tag, index) in tags"
      :key="index"
      name="tag"
      :params="{ tag: tag.toString() }"
      class="tag-pill tag-default"
    >
      {{ tag }}
    </app-link>
    <text v-if="tags.length === 0">No tags are here... yet.</text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useTags } from '../composable/useTags'
import AppLink from '../components/AppLink.vue'
export default defineComponent({
  name: 'PopularTags',
  components: {
    AppLink,
  },
  async setup() {
    const { tags, fetchTags } = useTags()
    await fetchTags()
    return {
      tags,
    }
  },
})
</script>
