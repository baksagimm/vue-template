import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
window.utils = {
    randomString(length = 5, onlyNumeric = false) {
        // set random slot name to prevent users adding elements to the slot
        let result = '';
        let characters = onlyNumeric ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
};

import { defineCustomElements } from 'skateui/loader';
defineCustomElements(Object.assign({
    ce: (eventName, opts) => new CustomEvent(eventName.toLowerCase(), opts)
  }, window));

const app = createApp(App);

app.use(router);

app.mount('#app');
