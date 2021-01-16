<template>
  <div id="app">
    <h1 v-t="'amaphoto'"></h1>
    <FileSelector />
    <Canvas />
  </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages.json'
import FileSelector from '@/components/file-selector/file-selector'
import Canvas from "@/components/document-canvas/document-canvas";

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: "ru-RU",
  messages
})

export default {
  i18n,
  components: {
    Canvas,
    FileSelector
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
