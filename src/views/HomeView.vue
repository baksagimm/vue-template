<template lang="pug">
main
  h1 Vue 3 concept examples for skapi web.
  hr
  h2 Notes:
  ul
    li.
      Design directions and tips are included in comments.#[br]
      So please read them carefully.
    
    br
    
    li.
      This template uses skate ui, Vue 3 Composition API, served by Vite.

    br

    li.
      Vite seems to have quirks when hot reloading custom components. (ex. undefined components)#[br]
      But it goes away when restarted manually.

  h2 Pages:
  ul
    li
      RouterLink(to="/record-display") Record Display#[br]
      | Design concept of record display.#[br]
      | For accurate styling details, refer raffina's Figma

    br
    
    li
      RouterLink(to="/record-edit-mobile") Record Edit Mobile#[br]
      | Design concept of mobile view of record edit.#[br]
      | For accurate styling details, refer raffina's Figma.
      | Reference on how you can handle navigations for canceling changes.
      | Notice sui-nav nests the data tabs.

    br

    li
      RouterLink(to="/record-display-bad") Bad example of HTML design#[br]
      | Bad example of HTML programming that many developers can easily fall into.#[br]
      | Example is based on 'Record Display (version 1)'.

    br
    
    li
      RouterLink(to="/using-forms") Example of using forms#[br]
      | Example of using skateui with forms.#[br]
      | Also shows how to do form validations.#[br]

    br
    
    li
      RouterLink(to="/reactive-vue") Reactive Vue#[br]
      | Explains how vue reactive works.#[br]
      | Irons out some good practices.#[br]

    br
    
    li
      RouterLink(to="/form-reset") Form reset issue#[br]
      | Address why you should not use form reset in SPA.#[br]
      | Also includes sui-input fixes.#[br]
    
    br
    
    li
      RouterLink(to="/vue-events") Exploring vue events#[br]
      | Some insights of @ in vue, which is the event listener#[br]
</template>

<style lang="less">
main {
  margin: auto;
  width: 1000px;
}
</style>