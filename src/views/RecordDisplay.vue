<template lang="pug">
.shell
  .side-nav
    // this is a side nav bar
    div
    div
    div
  .display
    // this is the display beside the side nav bar
    sui-nav(auto-hide='3')
      div
        span Raffina
        div
          span Dashboard&nbsp;
          span Documentation&nbsp;
          span Account Setting&nbsp;
          span Logout
    .main
      // this is the main content.
      // it has margin auto and max width for comfortable viewing
      div
        // this is where short description of what this page does
        h1 Records
        p.
          Records are data that your service user's will store and read from your service database.#[br]
          All records are organized by table names and restrictions.#[br]
          With additional query points such as index names and tags, references,#[br]
          you can have more flexible option when fetching the records.
        br
        sui-button(style="float:right;") Read Doc
      br
      br
      br
      br
      sui-select(@change="searchTarget=$event.target.value")
        option(value="table" selected) Table name
        option(value="user") User ID
        option(value="reference") Record ID
      span &nbsp;&nbsp;
      // this is input box for dark admin pages
      // border needs to be removed, and background color needs to be set.
      // ! check the styling below !
      sui-input(type='search' placeholder="Search")
      br
      br
      div(v-if="searchTarget === 'table' || searchTarget === 'user'" style="background-color:rgba(0 0 0 / 25%);padding: 1em; border-radius:8px;")
        // this is where you see detailed search options
        label(for="access_group") Access Group:
        span &nbsp;&nbsp;
        sui-select#access_group
          option(value="0" selected) Public
          option(value="1" selected) Registered
          option(value="private" selected) Private
        br
        br
        template(v-if="searchTarget==='user'")
          label(for="table") Table Name:
          span &nbsp;&nbsp;
          sui-input#table(placeholder="Table Name")
          br
          br
          label(for="subs") Subscription Table:
          span &nbsp;&nbsp;
          sui-select#subs
            option(value="subscr") Subscribed
            option(value="public") Public
          br
          br
        template(v-if="searchTarget === 'table'")
          label(for="ref_id") Reference ID:
          span &nbsp;&nbsp;
          sui-input#ref_id(placeholder="Record ID")
          br
          br
          br
        p Index:
        sui-input#idx_name(placeholder="Index Name")
        br
        br
        sui-select(style="width: 6em")
          option(value="nunber") Number
          option(value="string") String
          option(value="boolean") Boolean
        span &nbsp;&nbsp;
        sui-input#idx_val(placeholder="Index Value")
        br
        br
        br
        label(for="tag") Tag:
        span &nbsp;&nbsp;
        sui-input#tag(placeholder="Tag Name")
        br
        br
        sui-button(style="float:right;") Search
        br
        br
      br
      br
      br
      .panel
        // this is where you see the database
        .slot
          .par
            span Table Name
            span Table Size
            span Number Of Records
            span
        .slot(v-if="tblList" v-for="(i, tbl) in tblList" @click="generateList(tbl)")
          .par
            span tbl-{{tbl}}
            span {{i.size}}
            span {{i.count}}
            span +
          .nest-shell(v-if='recArr[tbl]')
            .nest(v-for="item in recArr[tbl]")
              span Uploaded: {{item.upl}}
              span User: {{item.user}}
              span index: {{item.idx}}
      .pagination
        span(@click="createTbl") Prev
        div 1 2 3 4 ...
        span(@click="createTbl") Next
</template>
<script setup>
// setup script is basically what you run in created()

import { reactive, ref, watch } from "vue";

let recArr = reactive({}); // use reactive when you want the dom to be reactive to object changes
let tblList = ref(null); // use ref when you want a reactive primitive data
let searchTarget = ref('table');
let overlay = ref(null); // use ref when you want to use variable to save template element

watch(tblList, (newValue, oldValue) => {
  // watch primitive level data wrapped in ref()
  // you can watch key level object datas as well,
  // but if computation can be done in vue templates it wouldnt be nessesary
  console.log({ newValue, oldValue });
});

function createTbl() {
  // creates fake tables
  let len = 10;
  let list = {};
  while (len--) {
    let tbl = window.utils.randomString(4);
    list[tbl] = {
      size: window.utils.randomString(4, true),
      count: window.utils.randomString(6, true)
    };
  }
  tblList.value = list;
}

createTbl();

function generateList(tbl) {
  // generates fake data

  if (recArr[tbl]) {
    delete recArr[tbl];
    return;
  }
  // else {
  //   // for viewing one table at a time
  //   for(let k in recArr) {
  //     delete recArr[k];
  //   }
  // }

  let len = 100;
  recArr[tbl] = [];

  while (len--) {
    recArr[tbl].push({
      idx: window.utils.randomString(8),
      upl: `${window.utils.randomString(2, true)}:${window.utils.randomString(2, true)} / ${window.utils.randomString(4, true)}.${window.utils.randomString(2, true)}.${window.utils.randomString(2, true)}`,
      user: `${window.utils.randomString(8)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(12)}`
    });
  }
}

</script>
<style lang="less">
.shell {
  // this is a whole display
  min-height: 100vh;
  width: 100%;
  background-color: #656565;
  color: white;
  display: flex;

  // settings for each font sizes
  h1 {
    font-weight: 400;
    font-size: 32px;
  }
}

.overlay {
  padding: 1em;
  background-color: #656565;
  color: white;
}

sui-select option {
  // option styling varies across browser. need !important until skate ui comes up with custom styles.
  color: black;
  background-color: white;
}

.main {
  // this is the main content
  // set max width and top margin for ideal view

  margin: 6em auto 0;
  max-width: 1000px;

  .panel {
    box-sizing: border-box;
    max-width: 1000px;
    padding: 16px;
    // height: 631px;
    background: #505050;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    border-radius: 8px;

    .slot {
      .nest-shell {
        max-height: 50vh;
        overflow-y: auto;
      }

      &:not(:first-child) {

        background: #434343;
      }

      .nest {
        display: flex;
        padding: 18px;
        width: 100%;
        box-sizing: border-box;

        &>span {
          flex-grow: 1;
        }

        &:hover {
          cursor: pointer;
          background-color: rgba(0 0 0 / 0.1);
        }
      }

      border-radius: 8px;

      &:first-child {
        &>.par {
          background-color: transparent;
        }

        color: rgba(255, 255, 255, 0.4);

        .par {
          padding-bottom: 0;
          cursor: default;
        }
      }

      margin-bottom: 16px;
      width: 100%;

      .par {
        cursor: pointer;
        border-radius: 8px;
        background: #656565;
        display: flex;
        align-items: center;
        padding: 14px;

        &>span {
          width: 25%;

          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }

  sui-input {
    background-color: rgba(255, 255, 255, 0.08);
    border: none;
    width: 324px;

    // box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    // box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    input::placeholder {
      color: white
    }
  }

  .pagination {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 1em 0;

    span {
      cursor: pointer;
    }
  }
}

sui-nav {
  box-sizing: border-box;
  margin: 0;
  background: #505050;

  &>div {
    max-width: 1000px;
    margin: 10px auto;
    display: flex;
    align-items: center;

    &>* {
      &:first-child {
        opacity: 0.6;
        font-size: 20px;
      }

      display: inline-block;
    }

    h4 {
      display: inline-block;
    }

    div {
      flex-grow: 1;
      text-align: right;

      &>* {
        margin-left: 2vw;
        display: inline-block;
      }
    }
  }
}

.side-nav {
  background-color: #293FE6;

  div {
    width: 36px;
    height: 36px;
    margin: 8px;
    border-radius: 8px;
    background-color: rgba(255 255 255 / 20%);
  }
}

.display {
  flex-grow: 1;
}
</style>