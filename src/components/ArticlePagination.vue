<template>
  <nav>
    <ul class="pagination">
      <li class="page-item ng-scope active">
        <a class="page-link ng-binding" href="">1</a>
      </li>
      <li class="page-item ng-scope">
        <a class="page-link ng-binding" href="">2</a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticlePagination',
})
</script>
