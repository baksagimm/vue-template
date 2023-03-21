<template lang="pug">
div(style="padding: 1em;")
    #print(ref="print_el")

    pre.
        -   Objective:
            Print "Hello Gyubi" x2 times

    sui-button(@click="exe_a()") EXECUTE A

    br
    br

    sui-button(@click="exe_b()") EXECUTE B

    #print(ref="print_el")

    pre.
        -   Objective:
            Change it to "Hi Gyubi" x2 times with second line green colored.

    sui-button(@click="exe_c()") EXECUTE C

    br
    br

    sui-button(@click="exe_d()") EXECUTE D
</template>
<script setup>
import { createHelloMsgA, createMsgElementA, createHelloMsgB, createMsgElementB } from './premature-refactoring.js';

let print_el = null;

function exe_a() {
    // procedual coding
    let msg1 = document.createElement('div');
    msg1.textContent = 'Hello Kyubi!';
    print_el.append(msg1);

    let msg2 = document.createElement('div');
    msg2.textContent = 'Hello Kyubi!';
    print_el.append(msg2);
}

function exe_b() {
    // pre-mature refactoring
    // thoughts on the developer at this point:
    // I can change the name easily
    // I can change the repeated time easily
    // I can create hello message easily
    // ...And I even modularized it so it can be used else where 
    createMsgElementA(createHelloMsgA('Kyubi'), print_el, 2);
}


function exe_c() {
    // procedual coding
    let msg1 = document.createElement('div');
    msg1.textContent = 'Hi Kyubi!';
    print_el.append(msg1);

    let msg2 = document.createElement('div');
    msg2.textContent = 'Hi Kyubi!';
    msg2.style.color = 'green';
    print_el.append(msg2);
}

function exe_d() {
    // uh oh...
    createMsgElementB(createHelloMsgB('Kyubi', 'Hi'), print_el, 2, { 0: 'green' });
}
</script>