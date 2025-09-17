<template>

  <v-navigation-drawer location="right" permanent>

    <v-text-field
      v-model="text"
      hide-details="auto"
      label="Text"
    />

    <v-select
      v-model="font"
      :items="fontList"
      label="Font"
    />

  </v-navigation-drawer>

</template>
<script setup>

  import { useAppStore } from '../stores/app'

  let app = useAppStore()

  const { text, fontList, font } = storeToRefs(app)

  console.log(fontList.value)

</script>
