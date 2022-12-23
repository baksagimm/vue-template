<template lang="pug">
.shell
    h1 About Vue Events
    hr
    pre.
        In vue, you can attach event listener by attaching '@[eventName]' on components.
        By web browser nature, you can emit event that bubbles up the parents.
        However, vue does not support this so you need to compose your own custom event.
        Refer ./src/components/egg.vue to see how it's done.

        Below, the button is a nested component that emits custom event when clicked.
        You can see the event is catched from the grandparent and console.logs the event data.
    nest(@crack='isCracked')
</template>

<script setup>
import nest from '../components/nest.vue';
function isCracked(e) {
    console.log({ isCracked: e });
}
</script>

<style lang="less">
.shell {
    // this is a whole display
    margin: auto;
    max-width: 1000px;
}
</style>