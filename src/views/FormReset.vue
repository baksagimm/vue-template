<template lang="pug">
.shell
    h1 skateui has been updated to 0.1.96. import from header.
    h4 &lt;script type="module" src="https://broadwayinc.dev/jslib/skateui/0.1.96/skateui.esm.js"&gt;&lt;/script&gt;
    
    br
    
    form
        p input_a
        sui-input(ref='input' name='input_a' :value='value_a' @input='e=>value_a=e.target.value')

        br

        p input_b
        input(name='input_b' :value="value_b" @input='e=>value_b=e.target.value')

        br
        br

        sui-input(type='reset')

        br
        br

        sui-input(type='submit' value='Send')

    br

    pre.
        Focus works now.
        The input element is exposed in 'el' property. ['sui-input'].el
        You can use 'el' to access html specific input methods.
    sui-button(@click='input.el.focus()') Focus

    br
    br
    br

    pre.
        Partial fix for sui-input form reset:

            On form reset, sui-input resets to the initial value.
            Contrast to vanila HTML removeing the value completely,
            sui-input is not able to empty the value on form reset.

            This happens on both vanilla HTML, and SPA.

            My guessing is, this is caused because form reset event is not able to reach the input element nested in custom elements.
            Although personaly I think the way sui-input work is more logical, this should be more investigated.


        Issue with form reset. !IMPORTANT!

            Even when form is reset, either sui-input or vanila html input, the value is still present in vue.
            Thus, It would be unusuable for SPA environment. (But for FormData, the reset values are correctly applied)

            I suggest avoid using form reset when working with reactive data.

            Below, there is log button that console logs each input values.

            To test this out, follow:
                1. Modify values on each inputs
                2. Click on reset
                3. Click on Log value button below, Check the console.
                4. The values are still present. (input_a = sui-input / input_b = vanila html)


    sui-button(@click='log()') Log value

    pre.
        For vanilla html input,
        It may seem the value has been removed after reset, page re-render will cause the value to comeback.
        This does not happen with sui-input.

        To test this out, follow:
            1. Modify values on each inputs
            2. Click on reset
            3. Modify input_a to trigger re-render. The value of vanila input reappears.



</template>
<script setup>
import { ref } from 'vue';
let input = ref(null);
let value_a = ref('Hello A');
let value_b = ref('Hello B');

let notice = ''

function log() {
    console.log({ value_a: value_a.value, value_b: value_b.value });
}

</script>
<style lang="less" scoped>
.shell {
    padding: 1em;
    pre {
        // font-weight: bold;
        font-size: 18px;
    }
}
</style>