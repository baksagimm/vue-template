<template lang="pug">
div(style="max-width:1000px;margin:auto;")
    h1 Reactive Vue
    hr
    h4#el1(ref="elToRef") Element to Ref
    pre.
        HTML element can be stored in ref object.
        This is equilivient as doing:
        let elToRef = document.getElementById('elToRef')

    sui-button(@click="e=>{log(elToRef,e)}") Log It

</template>
<script setup>
import { ref } from 'vue';
let elToRef = ref(null);

function log(...e) {
    console.log(...e);
}
</script>
<style>
</style>