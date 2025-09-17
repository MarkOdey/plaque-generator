<template>
  <v-container class="fill-height" max-width="900">

    <div class="svg-container" v-html="svgHtml" />

    <p class="test">hello world</p>

  </v-container>
</template>

<script setup>
  import vectorizeText from 'vectorize-text'

  import { ref } from 'vue'

  import { useAppStore } from '../stores/app'

  let app = useAppStore()

  let svgHtml = ref()

  const { text, font } = storeToRefs(app)

  watch(text, () => {
    render()
  }, { immediate: true })

  watch(font, () => {
    render()
  }, { immediate: true })

  function render () {
    let graph = vectorizeText(text.value, {
      width: 500,
      textBaseline: 'hanging',
      size: 208,
      font: font.value,
    })

    const color = '#FFFFFF'

    let svg = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="800"  height="200" >']

    console.log(graph)
    for (const e of graph.edges) {
      let p0 = graph.positions[e[0]]
      let p1 = graph.positions[e[1]]
      svg.push('<line x1="' + p0[0] + '" y1="' + p0[1]
        + '" x2="' + p1[0] + '" y2="' + p1[1]
        + `" stroke-width="1" stroke="${color}" />`)
    }
    svg.push('</svg>')

    svgHtml.value = svg.join('')
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
