<template lang="pug">
div(style="max-width:1000px;margin:auto;")
    h1 Using Forms
    hr

    br

    p {{value || 'v-model E-Mail displayed here'}}
    p {{formData.email || 'E-Mail displayed here'}}
    p {{formData.option.name || 'Name displayed here'}}

    br
    br

    form(@invalid='formError' @submit.prevent="submit")
        // v-model will not work.
        // this is because skateui are custom elements.
        // v-model has their own way to make input value 2 way binding by using custom attribute called 'modelValue'
        label v-model will not work
        sui-input(
            v-model='value')

        // don't worry. v-model is nothing special.
        // below example is equivalent as using v-model
        //- sui-input(
        //-     :value='value'
        //-     @input='e=>value=e.target.value')

        br
        br

        // you can use @invaild for input validation
        label(for="email") E-Mail
        sui-input#email(
            name='email'
            type='email'
            :value='formData.email'
            @input="e=>formData.email=e.target.value"
            @invalid="inputError"
            @change='e=>log(formData)')

        br
        br

        // you can set custom validation message
        // remember to set custom msg back to empty string when user edits the value
        label(for="name") Name
        sui-input#email(
            name='name'
            :value='formData.option.name'
            pattern='([A-C])+'
            @input="e=>{formData.option.name=e.target.value; e.target.setCustomValidity('')}"
            @invalid="e=>{e.target.setCustomValidity('Your name should only be ABC')}"
            @change='e=>log(formData)')

        br
        br

        // you can nest ref element inside an reactive object
        label(for="number") Number
        sui-input#number(
            :ref='el=>{formData.numberElement = el;}'
            :value='formData.option.number'
            @input="e=>{formData.option.number=Number(e.target.value); e.target.setCustomValidity('')}"
            type='number'
            min='5'
            max='15'
            @invalid="inputError"
            @change='e=>log(formData)')

        br
        br

        // for attributes with no value, use null as value if you want to remove it
        label(for='conditional_required') Conditional Required
        sui-input#conditional_required(
            name='conditional_required'
            :required='formData.option.number > 10 ? true : null'
            @invalid="inputError")

        br

        // you can have custom invalid msg
        // here, we are using formValidations object with keyname as input name
        // but first, you need to disable default browser behaviour for invalid event
        span(
            v-if='formValidations.conditional_required'
            style="margin:0.25em;position:absolute;display:block;color:red") You Got An Error!

        br
        br

        sui-input(type='submit')

</template>
<script setup>
import { ref } from "vue";
let value = ref('V-Model does not work');

let formData = ref({
    email: 'user@email.com',
    option: {
        name: 'ABC',
        number: 0
    },
    numberElement: null
});

let formValidations = ref({
    // [inputName]:boolean;
});

function inputError(e) {
    console.log('Input Error', { input: e.target });

    const validityState = e.target.validity;
    console.log(validityState);

    if (validityState.rangeOverflow) {
        e.target.setCustomValidity('Range Overflow!');
    }
    else if (validityState.rangeUnderflow) {
        e.target.setCustomValidity('Range Underflow!');
    }
}

function formError(e) {
    // invalid event from form gives you all the invalid inputs
    console.log('Form Error', { e });
    formValidations.value[e.target.name] = true;
}

// window.document.addEventListener('invalid', e => {
//     // you can hide the invalid text bubble
//     e.preventDefault();
// }, true);

function log(e) {
    console.log(e);
}

function submit(e) {
    console.log(e);
}
</script>
<style lang="less">
label {
    display: block;
}
</style>