<template lang="pug">
div(style="padding: 1em;")
    #print(ref="print_el")

    pre.
        -   Objective A:
            Print "Hello Kyubi" x2 times

    sui-button(@click="exe_a()") EXECUTE A

    br
    br

    sui-button(@click="exe_b()") EXECUTE B

    #print(ref="print_el")

    pre.
        -   Objective B:
            Change the message to "Hi Kyubi" x2 times with second line red colored.

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

    createMsgElementA(   createHelloMsgA('Kyubi'),    print_el,     2);
}



function createMsg(msg) {
    // procedual coding
    let msg1 = document.createElement('div');
    msg1.textContent = msg;
    return msg1;
}

function exe_c() {
    // procedual coding
    let msg1 = createMsg('Hi Kyubi');
    print_el.append(msg1);

    let msg2 = createMsg('Hi Kyubi');
    msg2.style.color = 'red';
    print_el.append(msg2);
}

function exe_d() {
    // uh oh...

    // at this point the developers response will be: "dude I need to restructure my code... :("
    createMsgElementB( createHelloMsgB('Kyubi', 'Hi'), print_el, 2, { 0: 'red' } );
}


</script>