<script setup lang="ts">
import { NCard, NSpace } from 'naive-ui'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <n-space
    align="center"
    justify="center"
    wrap
  >
    <n-card :title="props.title">
      <slot/>
    </n-card>
  </n-space>
</template>

<style lang="scss">
.n-space {
  flex-basis: 100%;
}
</style>

<style scoped lang="scss">
.n-card {
  width: calc(100vw - 48px);

  @media only screen and (min-width: 769px) {
    width: calc(75vw - 48px);
  }

  @media only screen and (min-width: 1025px) {
    width: 50vmin;
  }
}
</style>
