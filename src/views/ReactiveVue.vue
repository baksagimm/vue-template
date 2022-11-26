<template lang="pug">
.shell(style="max-width:1000px;margin:auto;")
    h1 Reactive Vue
    hr
    h4#el1(ref="elToRef") Element to Ref
    p.
        HTML element can be stored in ref object.#[br]
        This is equilivient as doing:#[br]
        let elToRef = document.getElementById('elToRef')

    sui-button(@click="e=>{log(elToRef)}") Log It

    br
    br

    h4(:ref="el=>data.nestedEl=el") Nest element in ref object
    p.
        HTML element can be also be nested in ref object.#[br]
        But since ref attribute reads data.nestedEl as a whole keyname,#[br]
        We need to use ref callback.#[br]
        On ref callback incomming argument is the element.#[br]
        #[br]
        Note that assigning ref is wrapping the whole html element into a proxy object.#[br]
        If you don't need any reactivity, sometime it's more lighter to use vanilla js getElement.

    sui-button(@click="e=>{log(data)}") Log It

    br
    br

    h1 Ref or not to Ref...?
    hr

    pre {{data}}

    template(v-if="data.deep")
        p.
            See the object above.#[br]
            The object is wrapped in a ref function.#[br]
            ref() is basically what you get from data() { return { yourData }}#[br]
            ref is deeply reactive#[br]
            To test this, we will try to change the data.deep.nested data.#[br]
            #[br]
            !! Note !!#[br]
            When doing this from the script, it must be: "data.value.deep.nested++"#[br]
            because once the data is wrapped in to ref, read/write should be accessed by "data.value"

        p current value: {{data.deep.nested}}
        sui-button(@click="()=>data.deep.nested++") Increment value

        br
        br

    p.
        Ref can be little annoying to work with.#[br]
        Because it always has to be accessed with ".value" key.#[br]
        But the advantage over reactive is you can always overwrite the whole object and still maintain reactivity.#[br]

    sui-button(@click="()=>data={newObject: 'Hello'}") Change whole value

    br
    br

    h1 The reactive function
    hr

    pre {{dataReact}}
    
    br
    
    template(v-if="dataReact.deep")

        p.
            Above is a reactive object.#[br]
            Unlike ref, reactive doesnt require ".value" to access the value.#[br]
            Same as ref, reactive object also tracks deep nested data.

        p current value: {{dataReact.deep}}
        sui-button(@click="()=>dataReact.deep.nested++") Increment value

        br
        br

    p.
        Caravat of reactive is when the whole object is replaced,#[br]
        The template looses track of the data change.#[br]
        This is because wrapped reactive object itself is a direct assignment of the variable.#[br]
        Wheras ref's data lives in "var.value"#[br]
        other words, if you do "obj.value = reactive(actualData)",#[br]
        it is a same thing.

    sui-button(@click="()=>dataReact={newData:'Hello'}") Change whole value

    br
    br

    h1 Wrap only the stuff you need
    hr

    p.
        When you are dealing with a huge object, it's good practice to wrap only the parts you need#[br]
        Because vue has to iterate deeply through all the object keys and wrap them in to proxies,#[br]
        It would be lighter on the process to wrap only the data you need.#[br]
        If inevitable, consider shallowReactive() or shallowRef() as well.#[br]

    br

    a(href='https://vuejs.org/api/reactivity-advanced.html') For more controlled reactivity, check out here.
    
    br

    p.
        When vue watches the change in the object it re-renders the page.#[br]
        It will re-read all the data displayed on the template.#[br]
        Turns out, this is very bad for objects using getters.#[br]
        Because of this reason, skapi will change the getters to functions.#[br]
        #[br]
        Below is an example of wrapping only the stuff you need.

    p {{dataReactDetached.deep}}
    p current value (detached): {{deep}}
    
    sui-button(@click="()=>deep++") Increment detached value
    
    br
    br

    sui-button(@click='()=>log(dataReactDetached)') Log Detached Object
    
    br
    br
    
    sui-button(@click='()=>log(dataReact)') Log Wrapped Object

    br
    br

    h1 Computed 
    hr

    p.
        Below is a computed property reading user.name#[br]
        Computed runs every time is read.#[br]
        It can be seen as a reactive getter.#[br]
        Try to avoid watch, computed if you are not displaying the data in the template.#[br]
        You can always use vanila getters and setters without needing to wrap the object into reactive.

    p - {{baksaName}}

    sui-input(@input="e=>dataReact.__user.name=e.target.value" placeholder="Enter new name")

    br
    br

</template>
<script setup>
import { reactive, ref, computed } from 'vue';

let elToRef = ref(null);
let data = ref({
    deep: {
        nested: 0
    }
});

// reactive triggers proxy getters for all the nested data when there is change.
let dataReact = reactive({
    deep: {
        nested: 1,
        msg: "I'm I safe here? :("
    },
    get user() {
        console.log('Getter running');
        return JSON.parse(JSON.stringify(this.__user));
    },
    __user: {
        name: 'Baksa',
        gender: 'Male'
    }
});

let dataReactDetached = {
    deep: {
        nested: 1,
        msg: "I'm safe here :)"
    },
    get user() {
        console.log('Detached Getter running');
        return JSON.parse(JSON.stringify(this.__user));
    },
    __user: {
        name: 'Baksa',
        gender: 'Male'
    }
};

let deep = ref(dataReactDetached.deep.nested);

// computed property only triggers if there is a change.
// reactive object might trigger the getters all over again on re-render,
// computed getters does not get triggered if the value remains the same.
let baksaName = computed({
    get() {
        console.log('Computed running');
        return dataReact.user.name + ' says Hi.';
    }
});

function log(...e) {
    console.log(...e);
}

</script>
<style scoped>
.shell {
    line-height: 1.5;
}
</style>