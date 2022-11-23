<template lang="pug">
.shell

  .side-nav
    // this is a side nav bar.
    // in most case, it is a good practice to size the parent div from the child.
    // see this example. the .side-nav width is not set.
    // but the children's margin, paddings, width... etc makes up the width of it's parent.
    // this is important because it will prevent children element breaking out of it's parent in responsive view width.
    div
    div

  div(style="flex-grow: 1;")
    // this is the content section right beside the side nav bar.
    // flex-grow is to expand the width.

    sui-nav(auto-hide)
      // sui-nav check skateui details for more info
      div
        span Raffina
        div
          span Dashboard&nbsp;
          span Documentation&nbsp;
          span Account Setting&nbsp;
          span Logout

    .content
      // this is the main content box.
      // it has margin auto and max width for comfortable viewing (ref style sect.)
      // do not use flex box as a content parent unless inevitable.

      div
        // short description of what this page will be displayed here.
        h1 Records
        div(style='display: inline-block;')
          // inline-block is useful when you want your parent div to be same the width of the content.
          p.
            Records are data that your service user's will store and read from your service database.#[br]
            All records are organized by table names and restrictions.#[br]
            With additional query points such as index names and tags, references,#[br]
            you can have more flexible option when fetching the records.
          div(style='text-align:right;')
            // you can use additional div to position the child 
            sui-button Read Doc

      // don't be afraid to use br tags for margins. it's fine.
      br
      br
      br
      br

      .selectInput
        // styling effect of select box varies across os and browsers.
        // please check the style section below.
        sui-select(@change="searchTarget=$event.target.value")
          option(value="table" selected) Table name
          option(value="user") User ID
          option(value="record") Record ID

        // sometimes it's okay to use dummy spaces instead of margins.
        // in some cases it's more safer then using margin when small display starts to wrap the div contents.
        // ex) when margin is used, child margins can be responsible for pushing the document width further than the parent.
        span &nbsp;&nbsp;

        // check the input box style example for dark admin pages.
        // border needs to be removed, and background color needs to be set.
        // ! check the style sections !
        sui-input(type='search' placeholder="Search")
      span &nbsp;&nbsp;
      sui-button(@click="isAdvancedSearch=true") Advanced search
      br
      .advancedSearch(v-if='isAdvancedSearch')
        .searchSection
          span Access Group
          label(for='access_group_reg' style="opacity:0.6") Registered&nbsp;&nbsp;
          sui-input#access_group_reg(type='radio' value='1' name='access_group')
          span &nbsp;&nbsp;&nbsp;&nbsp;
          label(for='access_group_pub' style="opacity:0.6") Public&nbsp;&nbsp;
          sui-input#access_group_pub(type='radio' value='0' name='access_group')
          span &nbsp;&nbsp;&nbsp;&nbsp;
          label(for='access_group_priv' style="opacity:0.6") Private&nbsp;&nbsp;
          sui-input#access_group_priv(type='radio' value='private' name='access_group')

        template(v-if="searchTarget==='user'")
          .searchSection
            span Table Name
            sui-input#table(placeholder="Table Name")

          .searchSection
            span Subscription Table
            sui-select#subs
              option(value="subscr") Subscribed
              option(value="public") Public

        .searchSection
          span Index
          sui-input#idx_name(placeholder="Index Name")

          br

          sui-select(style="width: 6em;" @change="indexType=$event.target.value")
            // change input box type directly from @change by using $event object.
            // see how v-bind is used on sui-input
            option(value="text" selected) String
            option(value="number") Number

          .selectInput
            // styling effect of select box varies across os and browsers.
            // please check the style section below.
            sui-select(style="width: 9em;")
              option(value=">" selected) Greater Than
              option(value="<") Less Than

            sui-input#idx_val(:type="indexType" placeholder="Value")

        .searchSection
          span Tag
          sui-input#tag

        .searchSection(v-if="searchTarget === 'table'")
          span Reference ID
          sui-input#ref_id(placeholder="Record ID")

        sui-button(@click="closeAdvancedSearch") Search

      br


      .panel
        // this is where you see the database

        .slot
          // this is a column header
          .par
            span Table Name
            span Table Size
            span Number Of Records
            span

        .slot(v-for="(i, tbl) in tblList")
          // this is list of data
          .par(@click="generateList(tbl)")
            span tbl-{{tbl}}
            span {{i.size}}
            span {{i.count}}
            span +
          .nest-shell(:style="{height: recArr[tbl] ? '60vh' : '0vh'}")
            .nest(v-if='recArr[tbl]' v-for="item in recArr[tbl]" @click="showRec(item)")
              span Uploaded: {{item.upl}}
              span User: {{item.user}}
              span index: {{item.idx}}

      .pagination
        span(@click="createTbl") Prev
        div 1 2 3 4 ...
        span(@click="createTbl") Next
  sui-overlay(ref='overlay' overlayColor='rgba(0 0 0 / 50%)' transition-time='0.1s' @click='overlay.close()')
    div(style="display:flex;background:grey;width:500px;height:600px;color:white;justify-content:center;align-items:center;")
      p HI
</template>
<script setup>
// setup script is basically what you run in created()

import { reactive, ref, watch, nextTick, shallowReactive } from "vue";

let recArr = reactive({}); // use reactive when you want the dom to be reactive to object changes
let tblList = ref(null); // use ref when you want a reactive primitive data
let searchTarget = ref('table');
let indexType = ref('text');
let overlay = ref(null); // use ref when you want to use variable to save template element
let isAdvancedSearch = ref(false);

let closeAdvancedSearch=(e)=> {
  console.log({ e });
  console.log('yo');
  console.log({isAdvancedSearch})
  isAdvancedSearch.value = false;
  createTbl();
}

// watch(isAdvancedSearch, (nv, ov) => {
//   console.log({ nv, ov });
//   nextTick(() => {
//     if (nv) {
//       document.body.addEventListener('click', closeAdvancedSearch);
//     }
//     else {
//       document.body.removeEventListener('click', closeAdvancedSearch);
//     }
//   });

// });

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
  tblList.value = list; // this is how you assign new ref data
}

createTbl();
function showRec(item){
  console.log({item, overlay})
  overlay.value.open();
}
function generateList(tbl) {
  // generates fake data

  if (recArr[tbl]) {
    delete recArr[tbl];
    return;
  }

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
<style lang="less" scoped>
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

.side-nav {
  background-color: #293FE6;

  &>* {
    width: 36px;
    height: 36px;
    margin: 8px;
    border-radius: 8px;
    background-color: rgba(255 255 255 / 20%);
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
        // Title
        opacity: 0.6;
        font-size: 20px;
      }
    }

    div {
      // menu box
      flex-grow: 1;
      text-align: right;

      &>* {
        margin-left: 2vw;
        display: inline-block;
      }
    }
  }
}

.selectInput {

  &>sui-select {
    box-shadow: none;
    width: 8em;
  }

  &>span {
    box-shadow: -1px 0 0 0 rgba(255 255 255 / 25%), inset 1px 0 0 0 rgba(255 255 255 / 15%);
  }

  &>sui-input {
    box-shadow: none;
    background-color: transparent !important;
  }

  box-shadow: -1px -1px 2px -1px rgb(0 0 0 / 50%),
  1px 1px 1px rgb(255 255 255 / 33%),
  inset 0 0 0 1px rgba(0 0 0 / 25%);

  background-color: rgba(255, 255, 255, 0.08);

  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}

// sui-input {
//   background-color: rgba(255, 255, 255, 0.08);
//   border: none; // border needs to be none for skapi web admin
//   width: 324px;

//   input::placeholder {
//     color: rgba(255 255 255 / 0.66)
//   }
// }

.content {
  // this is the main content
  // set max width and top margin for ideal view

  margin: 6em auto 0;
  max-width: 1000px;

  .advancedSearch {
    display: inline-block;
    position: absolute;
    box-shadow: 5px 5px 5px black;
    // line-height: 1.5;
    background: #505050;
    padding: 1em;
    border-radius: 8px;

    .searchSection {
      sui-input[type='radio'] {
        color: rgba(255 255 255 / 60%);
        // vertical-align: top;
      }

      sui-input:not([type='radio']) {
        background: rgba(255, 255, 255, 0.08);
        width: 447px;
      }

      sui-select {
        margin-right: .25em;

        &+sui-input {
          width: unset !important;
        }
      }

      &>* {
        margin: 0 0 1em 0;
        vertical-align: text-top;
      }

      &>span:first-child {
        display: block;
        margin: 1em 0 .75em 0;
        font-weight: bold;
      }
    }

    &>*:not(*:last-child) {
      margin-bottom: 1em;
    }
  }

  .searchOptions {
    // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    background-color: #505050;
    padding: 1em;
    border-radius: 8px;

    &>*:not(*:last-child) {
      margin-bottom: 1em;
    }
  }

  .panel {
    box-sizing: border-box;
    max-width: 1000px;
    padding: 16px 16px 1px; // cool tip: by giving 1px of padding, the child's last margin-bottom will work.
    background: #505050;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    width: 100%;

    .slot {
      margin-bottom: 16px;
      border-radius: 8px;

      .nest-shell {
        transition: height 0.1s;
        overflow-y: auto;
      }

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
</style>