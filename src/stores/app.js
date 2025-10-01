// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    text: 'hello world',
    font: 'pacifico',
    fontSize: 100,

    fontList: ['sans-serif', 'pacifico', 'Caveat Variable'],
    //
  }),
})
