<template>
  <v-container class="fill-height">
    <div class="svg-container">
      <svg
        @click="svgClicked($event)"
        class="text-svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <g v-html="textSvg"></g>

        <g v-html="frameSvg"></g>

        <g v-html="svgScaleHtml" stroke-width="1" :stroke="scaleColor"></g>
      </svg>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

import { VectorFrame, VectorText } from '../helpers/vector-helper'
import { useAppStore } from '../stores/app'

let app = useAppStore()

let frameSvg = ref()
let textSvg = ref()

let svgScaleHtml = ref()

const { text, font, textWidth, frameWidth, frameHeight, framePadding, manualFrameSize , cutoutRendering, cutoutDiameter} = storeToRefs(app)

const svgWidth = ref(0)
const svgHeight = ref(0)

const scaleColor = ref('#AAAAAA')

function svgClicked(event){

  const svgLine = event.target?.dataset?.part;

  console.log(svgLine, event);

}
watch(
  text,
  () => {
    render()
  },
  { immediate: true },
)

watch(
  font,
  () => {
    render()
  },
  { immediate: true },
)

watch(
  textWidth,
  async () => {
    render()
  },
  { immediate: true },
)

watch(
  frameHeight,
  async () => {
    render()
  },
  { immediate: true },
)

watch(
  frameWidth,
  async () => {
    render()
  },
  { immediate: true },
)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const svgPadding = 20

async function render() {
  const vector = new VectorText(text.value, {
    font: font.value,
    textWidth:textWidth.value,

    cutoutRendering: cutoutRendering.value,
    cutoutDiameter:cutoutDiameter.value,

    padding:framePadding.value
  })


  // render scale

  // textSvg = vector.renderSvg();

  textSvg = vector.renderCutout();

  let width,height;

  if(manualFrameSize.value){

    height=frameHeight.value;
    width=frameWidth.value;

  } else {
    height = vector.parseHeight();
    width = vector.parseWidth();
  }



  const vectorFrame = new VectorFrame({
    width,
    height
  })

  frameSvg = vectorFrame.renderSvg();





  const vectorWidth =  Math.max(vector.parseWidth(), vectorFrame.parseWidth());
  const vectorHeight = Math.max(vector.parseHeight(), vectorFrame.parseHeight());




  renderScale(vectorWidth, vectorHeight)


  svgWidth.value =  vectorWidth
  svgHeight.value = vectorHeight




}




function renderScale(vectorWidth, vectorHeight) {
  let svgScale = []

  const scaleWidth = 10
  const scalePadding = 3

  const scaleStartX = vectorWidth - scaleWidth
  const scaleEndX = vectorWidth

  const scaleY = vectorHeight + scalePadding + svgPadding

  const scaleVerticalBar = 1

  svgScale.push(
    `<line x1="${scaleStartX}" y1="${scaleY}" x2="${scaleEndX}" y2="${scaleY}" />`,
  )

  svgScale.push(
    `<line x1="${scaleStartX}" y1="${scaleY - scaleVerticalBar}" x2="${scaleStartX}" y2="${scaleY + scaleVerticalBar}" />`,
  )

  svgScale.push(
    `<line x1="${scaleEndX}" y1="${scaleY - scaleVerticalBar}" x2="${scaleEndX}" y2="${scaleY + scaleVerticalBar}"  />`,
  )

  svgScale.push(`
        <text font-size="2" x="${scaleStartX}" y="${scaleY + scaleVerticalBar * 2 + scalePadding}" text-anchor="right">0</text>
        <text font-size="2" x="${scaleEndX}" y="${scaleY + scaleVerticalBar * 2 + scalePadding}"  text-anchor="end">1cm</text>`)

  svgScaleHtml.value = svgScale.join('')
}
</script>

<style>
.svg-container {
  /*background-color: gray;*/

  width: 100%;

  height: 100%;
  position: relative;

  .text-svg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;

    height: 100%;

    overflow: visible;
  }

  .scale-svg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;

    height: 100%;

    overflow: visible;
  }
}

.test {
  font-family: 'pacifico';
}

svg * {
  vector-effect: non-scaling-stroke;
}
</style>
