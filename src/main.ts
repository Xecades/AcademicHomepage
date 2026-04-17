import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";

library.add(faChevronLeft, faChevronRight, faXmark);

const app = createApp(App);

app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
