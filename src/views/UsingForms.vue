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

    form(@invalid='formError' @submit.prevent)
        // v-model will not work.
        // this is because skateui are custom elements.
        // v-model has their own way to make input value 2 way binding by using custom attribute called 'modelValue'
        label v-model does not work
        sui-input(
            placeholder="v-model does not work"
            v-model='value')

        // don't worry. v-model is nothing special.
        // below example is equivalent as using v-model
        //- sui-input(
        //-     :value='value'
        //-     @input='e=>value=e.target.value')

        br
        br

        // you can use @invaild for input validation
        label E-Mail
        sui-input(
            name='email'
            type='email'
            :value='formData.email'
            @input="e=>formData.email=e.target.value"
            @invalid="e=>log(e.target.validity)"
            @change='e=>log(formData)')

        br
        br

        // you can set custom validation message
        // remember to set custom msg back to empty string when user edits the value
        label Name (Custom invalid message)
        sui-input(
            name='name'
            :value='formData.option.name'
            pattern='([A-C])+'
            @input="e=>{formData.option.name=e.target.value; e.target.setCustomValidity('')}"
            @invalid="e=>{e.target.setCustomValidity('Your name should only be ABC')}"
            @change='e=>log(formData)')

        br
        br

        // you can nest ref element inside an reactive object
        label Number (Detailed validity condition)
        sui-input(
            :value='formData.option.number'
            @input="e=>{formData.option.number=Number(e.target.value); e.target.setCustomValidity('')}"
            type='number'
            min='5'
            max='15'
            @invalid="e=>{if(e.target.validity.rangeOverflow || e.target.validity.rangeUnderflow) e.target.setCustomValidity('Invalid Range!')}"
            @change='e=>log(formData)')

        br
        br

        // for attributes with no value, use null as value if you want to remove it
        label Conditional Required (Custom styled message)
        sui-input(
            name='conditional_required'
            @input="e=>failedValidations[e.target.name] = false"
            :required='formData.option.number > 10 ? true : null'
            @invalid="e=>log(e.target.validity)")

        br

        // you can have custom invalid msg.
        // here, we are using failedValidations object with keyname as input name.
        // but first, you need to disable default browser behaviour for invalid event.
        // also, don't forget to initialize the failedValidations object boolean on @input above.
        span(
            v-if='failedValidations.conditional_required'
            style="font-size:14px;margin:0.25em;position:absolute;display:block;color:red") You Got An Error!

        br

        // you can do realtime validation
        // remember to set custom msg back to empty string when user edits the value
        label Name Realtime
        sui-input(
            name='name_realtime'
            :value='formData.option.name_realtime'
            pattern='([A-C])+'
            @input="e=>{formData.option.name_realtime=e.target.value; failedValidations[e.target.name] = false; e.target.setCustomValidity(''); e.target.checkValidity();}"
            @invalid="e=>log(e.target.validity)"
            @change='e=>log(formData)')
        
        br

        span(
            v-if='failedValidations.name_realtime'
            style="font-size:14px;margin:0.25em;position:absolute;display:block;color:red") Realtime Error!

        br

        // because :invalid psuedo class is always active,
        // you can use custom attribute to style invalid inputs for more control
        // notice we are adding custom attribute to the parent of the event target.
        // this is becuase event target is the actual input element nested inside the shadow dom
        label(for="invalid_att") Using invalid attribute
        sui-input#invalid_att(
            name='invalid_att'
            pattern='([A-C])+'
            @input="e=>{e.target.parentElement.removeAttribute('invalid'); e.target.checkValidity();}"
            @invalid="e=>{e.target.parentElement.setAttribute('invalid','');}")

        br
        br

        // finally, you can also have full control of validation
        label(for="invalid_att") Full control validation
        sui-input(
            @input="e=>{e.target.setCustomValidity(''); if(e.target.value !== 'Baksa') e.target.setCustomValidity('Error'); else e.target.parentElement.removeAttribute('invalid'); e.target.checkValidity();}"
            @invalid="e=>{e.target.parentElement.setAttribute('invalid','');}")

        br
        br

        sui-input(type='submit')

        br
        br
        br
        br

</template>
<script setup>
import { ref } from "vue";
let value = ref('V-Model does not work');

let formData = ref({
    email: 'user@email.com',
    option: {
        name_realtime: 'ABC Realtime',
        name: 'ABC',
        number: 0
    }
});

let failedValidations = ref({
    // [inputName]:boolean;
});

function formError(e) {
    // invalid event from form gives you all the invalid inputs
    console.log('Form Error', { e });
    failedValidations.value[e.target.name] = true;
}

// window.document.addEventListener('invalid', e => {
//     // you can hide the invalid text bubble
//     e.preventDefault();
// }, true);

function log(e) {
    console.log(e);
}

</script>
<style lang="less">
label {
    display: block;
}

// sui-input input:invalid {
//     color: red;
//     background-color: rgba(255 0 0 / 8%);
//     outline: 2px solid red;
// }

// sui-input[invalid] {
//     color: green;
//     background-color: rgba(0 255 0 / 8%);
//     outline: 2px solid green;
//     input:invalid {
//         background-color: transparent !important;
//         color: inherit !important;
//     }
// }

</style>