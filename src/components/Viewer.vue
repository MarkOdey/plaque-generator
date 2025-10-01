<template>
  <v-container class="fill-height" max-width="900">

    <div class="svg-container" v-html="svgHtml" />

    <p class="test">hello world</p>

  </v-container>
</template>

<script setup>

  import { ref } from 'vue'

  import { Vector } from '../helpers/vector-helper'
import { useAppStore } from '../stores/app'

  let app = useAppStore()

  let svgHtml = ref()

  const { text, font, fontSize } = storeToRefs(app)

  watch(text, () => {
    render()
  }, { immediate: true })

  watch(font, () => {
    render()
  }, { immediate: true })


  watch(fontSize, () => {
    render()
  }, { immediate: true })

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async function render () {
    const color = '#FFFFFF'

    let svg = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="800"  height="200" >']

    const vector = new Vector(text.value, { font: font.value, fontSize :fontSize.value })


    for (const line of vector.polyline) {

      svg.push(`<line x1="${line.start.x}" y1="${line.start.y}" x2="${line.end.x}" y2="${line.end.y}" stroke-width="1" stroke="${color}" />`)

      svgHtml.value = svg.join('')+'</svg>'
    }



  }

</script>

<style>
.svg-container{
  /*background-color: gray;*/
}

.test{
  font-family: 'pacifico';
}
</style>
