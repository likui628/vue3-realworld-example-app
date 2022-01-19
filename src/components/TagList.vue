<template>
  <div class="tag-list" data-test="tag-list">
    <span
      v-for="tag in props.tags"
      :key="tag"
      class="tag-default tag-pill"
      @click="onClick(tag)"
    >
      <i class="ion-close-round" v-if="props.editable" />
      {{ tag }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  tags: string[]
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), { editable: false })

interface Emits {
  (e: 'click', tag: string): void
}

const emit = defineEmits<Emits>()

const onClick = (tag: string) => {
  emit('click', tag)
}
</script>
