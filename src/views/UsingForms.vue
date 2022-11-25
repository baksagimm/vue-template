<template lang="pug">
div(style="max-width:1000px;margin:auto;")
    h1 Using Forms
    hr

    br
    br

    p {{formData.email || 'E-Mail displayed here'}}
    p {{formData.option.name || 'Name displayed here'}}

    br
    br

    form(@error='formError')
        label(for="email_vmod") v-model will not work
        sui-input#email(name='email_vmod' v-model='formData.email' @change="displayData")
        // doesnt work

        br
        br

        label(for="email") E-Mail
        sui-input#email(name='email' type='email' @input="e=>formData.email=e.target.value" @change="displayData" @invalid="inputError")

        br
        br

        label(for="name") Name
        sui-input#email(name='name' :value='formData.option.name' @input="e=>formData.option.name=e.target.value" @change="displayData")

        br
        br

        label(for="number") Number
        sui-input#number(:ref='el=>{formData.numberElement = el;}' @input="e=>formData.option.number=Number(e.target.value)" type='number' min='5' max='15' @invalid="console.log('I got error')")

        br
        br

        label(for='conditional_require') Conditional Require
        sui-input#conditional_require(:required='formData.option.number > 10')

        br
        br

        sui-input(type='submit')
</template>
<script setup>
import { ref, reactive, shallowReactive, isRef } from "vue";

let formData = ref({
    // use shallow reactive
    email: 'user@email.com',
    option: {
        name: 'My Name',
        number: 0
    },
    numberElement: null
});

function displayData() {
    if (isRef(formData)) {
        console.log(formData.value);
    }
    else {
        console.log(formData);
    }
}

function inputError(e) {
    console.log('Input Error', { e });
}

function formError(e) {
    console.log('Form Error', { e });
}

</script>
<style lang="less">
label {
    display: block;
}
</style>