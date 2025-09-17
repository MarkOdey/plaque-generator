// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    text: "hello world",
    font: "pacifico",

    fontList: ["sans-serif", "pacifico", "Caveat Variable"],
    //
  }),
});
