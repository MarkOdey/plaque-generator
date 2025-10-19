// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    text: 'hello world',
    font: 'pacifico',
    textWidth: 100,

    fontList: ['sans-serif', 'pacifico', 'Caveat Variable'],

    frame: 'rectangle',
    frameWidth: 200,
    frameHeight: 100,

    frameList: ['rectangle', 'oval', 'diamond', 'no-frame'],
    framePadding: 10,

    manualFrameSize: false,

    fixtureHole: 'none',

    fixtureHoles: ['2-each-side', '4-every-corner', 'none'],

    fixtureHoleDistance: 200,
    fixtureHoleDiameter: 3,
  }),
})
