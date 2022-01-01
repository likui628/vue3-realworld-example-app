<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <suspense>
            <template #default>
              <ArticleContainer />
            </template>
            <template #fallback> Articles are downloading... </template>
          </suspense>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <suspense>
              <template #default>
                <PopularTags />
              </template>
              <template #fallback> Popular tags are downloading... </template>
            </suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PopularTags from '../components/PopularTags.vue'
import ArticleContainer from '../components/ArticleContainer.vue'
</script>
