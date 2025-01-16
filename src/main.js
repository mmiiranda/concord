import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css"; 
import "./assets/tailwind.css";

const app = createApp(App);

app.config.globalProperties.$toast = (message, type = "info", options = {}) => {
  const defaultOptions = {
    autoClose: 2000,
    position: "top-right",
    theme: "dark",
    ...options,
  };

  switch (type) {
    case "success":
      return toast.success(message, defaultOptions); 
    case "error":
      return toast.error(message, defaultOptions); 
    case "warn":
      return toast.warn(message, defaultOptions); 
    case "loading": {
      const loadingOptions = {
        autoClose: false, 
        closeOnClick: false, 
        hideProgressBar: true,
        theme: "dark", 
        ...defaultOptions,
      };
      return toast.loading(message || "Carregando, por favor aguarde...", loadingOptions);
    }
    case "remove":
        return toast.remove()
    default:
      return toast.info(message, defaultOptions); 
  }
};


// app.config.globalProperties.$toastDismiss = (toastId) => {
//   toast.dismiss(toastId);
// };

app
  .use(store)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 2000,
    style: {
      opacity: "1",
      userSelect: "initial",
    },
  })
  .mount("#app");
