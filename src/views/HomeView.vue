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
      But it goes away when reloaded manually.

  h2 Pages:
  ul
    li
      RouterLink(to="/record-display") Record Display#[br]
      | Design concept of record display.#[br]
      | For accurate styling details, refer raffina's Figma

    br

    li
      RouterLink(to="/record-display-bad") Bad example of HTML design#[br]
      | Bad example of HTML programming that many developers can easily fall into.#[br]
      | Example is based on 'Record Display' page.

    br
    
    li
      RouterLink(to="/using-forms") Example of using forms#[br]
      | Reactivity and Refs.

</template>

<style lang="less">
main {
  margin: auto;
  width: 1000px;
}
</style>