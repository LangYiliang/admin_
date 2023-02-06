<template>
  <div>我是子组件{{ name }}</div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'

const name = ref('蓝月亮')
</script>

<style scoped>
div {
  width: 400px;
  height: 400px;
  margin: auto;
  background-color: aqua;
  text-align: center;
}
</style>
