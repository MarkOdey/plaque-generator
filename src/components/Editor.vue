<template>
  <v-navigation-drawer location="right" permanent>
    <v-text-field v-model="text" hide-details="auto" label="Text" />

    <v-select v-model="font" :items="fontList" label="Font" />

    <v-select v-model="frame" :items="frameList" label="Frame" />


    <v-number-input
        v-model="cutoutDiameter"
        :reverse="false"
        controlVariant="default"
        label="Cutout Diameter"
        :hideInput="false"
        :inset="false"
      ></v-number-input>

    <v-checkbox v-model="manualFrameSize" label="Set manually frame size">
    </v-checkbox>
    <div v-if="manualFrameSize">

      <v-number-input
        v-model="frameWidth"
        :reverse="false"
        controlVariant="default"
        label="Frame width"
        :hideInput="false"
        :inset="false"
      ></v-number-input>

      <v-number-input
        v-model="frameHeight"
        :reverse="false"
        controlVariant="default"
        label="Frame height"
        :hideInput="false"
        :inset="false"
      ></v-number-input>



    </div>
    <div v-else>


        <v-card class="text-secondary" text="The frame size will be automatically defined by the font size.">

        </v-card>



    <v-number-input
      v-model="framePadding"
      :reverse="false"
      controlVariant="default"
      label="Frame Padding"
      :hideInput="false"
      :inset="false"
    ></v-number-input>

    </div>




    <v-number-input
      v-model="textWidth"
      :reverse="false"
      controlVariant="default"
      label="Text Width"
      :hideInput="false"
      :inset="false"
    ></v-number-input>

    <v-select v-model="fixtureHole" :items="fixtureHoles" label="Fixture holes" />

    <div v-if="fixtureHole!=='none'">
      <v-number-input
      v-model="fixtureHolesDistance"
      :reverse="false"
      controlVariant="default"
      label="Fixture Holes Distance"
      :hideInput="false"
      :inset="false"
    ></v-number-input>

    <v-number-input
      v-model="fixtureHolesDiameter"
      :reverse="false"
      controlVariant="default"
      label="Fixture Holes Diameter"
      :hideInput="false"
      :inset="false"
    ></v-number-input>

    </div>



  </v-navigation-drawer>
</template>
<script setup>
import { useAppStore } from '../stores/app';

let app = useAppStore()

const { text, fontList, font, textWidth, frame, frameList, framePadding, manualFrameSize, cutoutDiameter, frameHeight, frameWidth, fixtureHole, fixtureHoles, fixtureHolesDiameter, fixtureHolesDistance } =
  storeToRefs(app)
</script>
