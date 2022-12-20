<template lang="pug">
div(ref='egg')
    sui-button(@click='emitEvent') Crack me open
</template>
<script setup>
import { ref } from 'vue';

let egg = ref(null);

function emitEvent(e) {
    egg.value.dispatchEvent(new CustomEvent('crack', {
        // emit bubbling event
        bubbles: true,
        // data goes in to detail
        detail: {
            egg: 'Is cracked'
        }
    }));
}

</script>