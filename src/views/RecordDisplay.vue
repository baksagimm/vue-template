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
          // sometimes &nbsp; is more easier than styling margins
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

        // check the input box style example for dark admin pages.
        // border needs to be removed, and background color needs to be set.
        // ! check the style sections !
        sui-input(type='search' placeholder="Search" style="max-width:calc(100% - 14.5em);min-width:6em;")

        span(style="margin: 0 1em;" @click="isAdvancedSearch=searchTarget !== 'record'") Some Icon

      sui-button(v-if='!isAdvancedSearch || searchTarget === "record"') Search
      br
      br

      // we can use full screen dummy clicker for closing advanced search
      div(style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;' v-if='isAdvancedSearch && searchTarget !== "record"' @click="isAdvancedSearch = false;")
      
      // advanced search box
      .advancedSearch(v-if='isAdvancedSearch && searchTarget !== "record"')

        h4 Access Group
        div(style="display:inline-block;margin-right:1em")
          label(for='access_group_reg' style="opacity:0.6") Registered&nbsp;&nbsp;
          sui-input#access_group_reg(type='radio' value='1' name='access_group' checked)

        div(style="display:inline-block;margin-right:1em")
          label(for='access_group_pub' style="opacity:0.6") Public&nbsp;&nbsp;
          sui-input#access_group_pub(type='radio' value='0' name='access_group')

        div(style="display:inline-block;margin-right:1em")
          label(for='access_group_priv' style="opacity:0.6") Private&nbsp;&nbsp;
          sui-input#access_group_priv(type='radio' value='private' name='access_group')

        br
        br

        template(v-if="searchTarget==='user'")
          h4 Subscription Table
          div(style="display:inline-block;margin-right:1em")
            label(for='subr_none' style="opacity:0.6") None&nbsp;&nbsp;
            sui-input#subr_none(type='radio' value='null' name='subscription_group' checked)
          div(style="display:inline-block;margin-right:1em")
            label(for='subr_public' style="opacity:0.6") Public&nbsp;&nbsp;
            sui-input#subr_public(type='radio' value='0' name='subscription_group')
          div(style="display:inline-block;margin-right:1em")
            label(for='subr_sub' style="opacity:0.6") Subscribed&nbsp;&nbsp;
            sui-input#subr_sub(type='radio' value='1' name='subscription_group')

          br
          br

          h4 Table Name
          sui-input(placeholder="Table Name")

          br
          br

        h4 Index
        sui-input(placeholder="Index Name")

        br

        sui-select(style="width: 6em;" @change="indexType=$event.target.value")
          // change input box type directly from @change by using $event object.
          // see how v-bind is used on sui-input
          option(value="text" selected) String
          option(value="number") Number

        .selectInput(style="max-width:400px;")
          // styling effect of select box varies across os and browsers.
          // please check the style section below.
          sui-select(style="width: 9em;")
            option(value=">" selected) Greater Than
            option(value="<") Less Than

          sui-input(style='max-width:calc(100% - 9.25em)' :type="indexType" placeholder="Value")

        br
        br

        h4 Tags
        sui-input

        br
        br

        template(v-if="searchTarget === 'table'")
          h4 Reference ID
          sui-input(placeholder="Record ID | User ID")

        br
        br
        br

        div(style="text-align:center")
          sui-button(@click="closeAdvancedSearch") Search

      br

      .database
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
            .nest(v-if='recArr[tbl]' v-for="(item, id) in recArr[tbl]" @click="showRecord(item)")
              span UPLOAD:&nbsp;
                span {{item.upl}}&nbsp;&nbsp;&nbsp;
              span USER:&nbsp;
                span {{item.user}}&nbsp;&nbsp;&nbsp;
              span INDEX:&nbsp;
                span {{item.idx}}&nbsp;&nbsp;&nbsp;

      br

      .pagination
        span(@click="createTbl") &lt;&nbsp;&nbsp;
        span 1 2 3 4 ...
        span(@click="createTbl") &nbsp;&nbsp;&gt;

      br
      br
  sui-overlay#overlay(style='background-color: rgba(0 0 0 / 50%);color:white;' transition-time='0.1s' onclick='overlay.close()')
    div(style="display:inline-block;background:grey;max-width:600px;padding:1em;")
      h4 Show me the record
      p This was just a demonstration of a concept
</template>
<script setup>
// setup script is basically what you run in created()

import { reactive, ref } from "vue";

let recArr = reactive({}); // use reactive when you want the dom to be reactive to object changes
let tblList = ref(null); // use ref when you want a reactive primitive data
let searchTarget = ref('table');
let indexType = ref('text');
let overlay = ref(null); // use ref when you want to use variable to save template element
let isAdvancedSearch = ref(false);

let closeAdvancedSearch = (e) => {
  console.log({ e });
  console.log('yo');
  console.log({ isAdvancedSearch });
  isAdvancedSearch.value = false;
  createTbl();
};

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

function showRecord(item) {
  console.log({ item, overlay });
  // do something, then view the record
  window.overlay.open();
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
      id: window.utils.randomString(22),
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

.content {
  // this is the main content
  // set max width and top margin for ideal view
  margin: 6em auto 0;
  max-width: 1000px;
}

.selectInput {
  &>* {
    vertical-align: middle;
  }

  &>sui-select {
    box-shadow: 10px 0px 0 -8px rgb(255 255 255 / 25%);
    width: 8em;
  }

  &>span:last-child {
    cursor: pointer;
  }

  &>sui-input {
    box-shadow: none;
    background-color: transparent !important;
  }

  position: relative;
  box-shadow: -1px -1px 2px -1px rgb(0 0 0 / 50%),
  1px 1px 1px rgb(255 255 255 / 33%),
  inset 0 0 0 1px rgba(0 0 0 / 25%);
  background-color: rgba(255, 255, 255, 0.08);
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}

.advancedSearch {
  max-width: 600px;
  line-height: 0.6;
  display: inline-block;
  position: absolute;
  border: 1px solid rgba(255 255 255 / 8%);
  box-shadow: 6px 6px 4px rgba(0 0 0 / 25%);
  background: #505050;
  padding: 1em;
  border-radius: 4px;

  &>* {
    vertical-align: middle;
    margin-bottom: .5em;
  }

  &>h4 {
    margin-bottom: .75em;
  }

  sui-input[type='radio'] {
    color: rgba(255 255 255 / 60%);

    // adjust misalignment
    position: relative;
    top: 2px;
  }

  sui-input:not([type='radio']) {
    background: rgba(255, 255, 255, 0.08);
    width: 100%;

    input::placeholder {
      color: rgba(255 255 255 / 0.66)
    }
  }
}

.database {
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
      font-family: monospace;
      font-size: 12px;
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
      background: #262626;
    }

    .nest {
      display: block;
      padding: calc(18px - 0.5em) 18px;
      width: 100%;
      box-sizing: border-box;

      &>span {
        display: inline-block;
        color: rgba(255 255 255 / 60%);
        margin: 0.5em 0;

        &>span {
          display: inline-block;
          color: white;
        }
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(255 255 255 / 0.1);
      }
    }

    .par {
      cursor: pointer;
      border-radius: 8px;
      background: #656565;
      padding: 14px;

      &>span {
        display: inline-block;
        width: 25%;

        &:last-child {
          text-align: right;
        }
      }
    }
  }
}

.pagination {
  text-align: center;
  cursor: pointer;

  span {
    cursor: pointer;
  }
}
</style>