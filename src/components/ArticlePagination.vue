<template>
  <ul class="pagination">
    <li
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      :class="['page-item', { active: isActive(pageNumber) }]"
    >
      <a
        :aria-label="`Go to page ${pageNumber}`"
        class="page-link"
        href="javascript:"
        @click="onPageChange(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { limit } from '../services'
import { computed } from 'vue'

interface Props {
  page: number
  count: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'page-change', index: number): void
}>()

const pagesCount = computed(() => Math.ceil(props.count / limit))

const isActive = (index: number) => props.page === index

const onPageChange = (index: number) => emit('page-change', index)
</script>
