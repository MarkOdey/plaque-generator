/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

import "@fontsource-variable/caveat";
import "@fontsource/pacifico";

// Styles
import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
