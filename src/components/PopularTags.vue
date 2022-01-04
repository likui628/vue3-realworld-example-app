<template>
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
export default {
  name: 'PopularTags',
}
</script>

<script lang="ts" setup>
import { useTags } from '../composable/useTags'
import AppLink from '../components/AppLink.vue'

const { tags, fetchTags } = useTags()

await fetchTags()
</script>
