<template>
  <router-link :aria-label="props.name" :to="props" v-bind="attrs">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import type { AppRouteNames } from '../router'
import type { RouteParams } from 'vue-router'
import { RouterLink } from 'vue-router'

interface Props {
  name: AppRouteNames
  params?: RouteParams
}
const props = withDefaults(defineProps<Props>(), {
  params: () => ({}),
})

const attrs = useAttrs()
</script>
