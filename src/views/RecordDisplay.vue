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

    sui-nav.headNav(auto-hide)
      // sui-nav check skateui details for more info
      div
        span Raffina
        div
          // sometimes &nbsp; is more easier than styling margins
          span &nbsp;Dashboard
          span &nbsp;Documentation
          span &nbsp;Account Setting
          span &nbsp;Logout

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
          sui-button(@click="isAdvancedSearch = false; createTbl()") Search

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
          // when table is open, most recently clicked table name is the value of the route query.
          // table value query is only needed for mobile
          .par(@click="generateList(tbl)")
            span tbl-{{tbl}}
            span {{i.size}}
            span {{i.count}}
            span +
          .nest-shell(:style="{height: recArr[tbl] ? '60vh' : '0vh'}")
            // showRecord takes user to the route with query value
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

  // closing overlay is going back one history
  sui-overlay#overlay(style='background-color: rgba(0 0 0 / 70%);color:white;' transition-time='0.1s' @click="router.go(-1)" onclick='overlay.close()')
    .showRecord(v-if="currentRecord")
      .title
        h2 record id: {{currentRecord.id}}
      .tab
        span(:selected='currentRecordView === "info" ? true : null' @click="currentRecordView = 'info'") Information
        span(:selected='currentRecordView === "record" ? true : null' @click="currentRecordView = 'record'")  Record

      .record(v-if="currentRecordView === 'info'")
        template(v-if="editMode")
          p *This is just a conceptual example
          div
            span Table Name
            span
              sui-input
          div
            sui-input#allow_ref(type='checkbox' style="color:white;vertical-align:text-top;" @change='e=>allowReference=e.target.checked')
            label(for='allow_ref') &nbsp;&nbsp;Allow Reference
            template(v-if="allowReference")
              br
              br
            #showRef(:style="{'background-color':'#434343','border-radius':'8px','height':allowReference ? '7.5em' : '0px'}")
              div(style="padding: 1.5em 1em 1em;")
                label(for='allow_mult_ref') Allow Multiple Reference&nbsp;&nbsp;
                sui-input#allow_mult_ref(type='checkbox' style="color:white;")
                br
                br
                span(style="vertical-align:super") Reference Limit&nbsp;&nbsp;
                sui-input(type='number' placeholder="Infinite" style="box-shadow: 0 1px white; border-radius:0; width:calc(100% - 8em); min-width:6em;")
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
              div
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
          div
            span Table Name
            span
              sui-input
        template(v-else)
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
      .record(v-else)
        template(v-if="editMode")
          p *This is just a conceptual example
          div
            span Table Name
            span
              sui-input
          div
            sui-input#allow_ref(type='checkbox' style="color:white;vertical-align:text-top;" @change='e=>allowReference=e.target.checked')
            label(for='allow_ref') &nbsp;&nbsp;Allow Reference
            template(v-if="allowReference")
              br
              br
            #showRef(:style="{'background-color':'#434343','border-radius':'8px','height':allowReference ? '7.5em' : '0px'}")
              div(style="padding: 1.5em 1em 1em;")
                label(for='allow_mult_ref') Allow Multiple Reference&nbsp;&nbsp;
                sui-input#allow_mult_ref(type='checkbox' style="color:white;")
                br
                br
                span(style="vertical-align:super") Reference Limit&nbsp;&nbsp;
                sui-input(type='number' placeholder="Infinite" style="box-shadow: 0 1px white; border-radius:0; width:calc(100% - 8em); min-width:6em;")
          div
            span Table Name
            span
              sui-input
        template(v-else)
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
          div
            span Record ID:
            span {{currentRecord.id}}
          div
            span Table Name:
            span Asian Spice House
          div
            span Reference ID:
            span {{currentRecord.id}}
          div
            span User ID:
            span {{currentRecord.user}}
          div
            span Uploaded:
            span {{currentRecord.upl}}
      .button 
        sui-button(style="background-color:transparent;color:white;box-shadow:none;border:1px solid white;" @click='editMode=!editMode') {{editMode ? 'Save' : 'Edit'}}

  sui-overlay(ref='overlay_msg')
    div(style="background-color:white;color:black;padding:2em;")
      p Are you sure?
      sui-button(@click='overlay_msg.close();forceBlockBackButton = true;') No
      sui-button(@click='editMode = false') Yes

</template>
<script setup>
// setup script is basically what you run in created()

import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
let router = useRouter();
let route = useRoute();
let recArr = reactive({}); // use reactive when you want the dom to be reactive to object changes
let tblList = ref(null); // use ref when you want a reactive primitive data
let searchTarget = ref('table');
let indexType = ref('text');
let overlay = ref(null); // use ref when you want to use variable to save template element

let isAdvancedSearch = ref(false);
let currentRecord = ref(null);
let currentRecordView = ref('info');

let editMode = ref(false);
let overlay_msg = ref(null);
let allowReference = ref(false);

watch(editMode, v => {
  if (v) {
    window.location.hash = 'edit';
  }
  else {
    // save the data.then(...
    window.location.replace(window.location.href.split('#')[0]);
  }
});

let forceBlockBackButton = true;
window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    return;
  }

  if (forceBlockBackButton) {
    // force block routing just once
    forceBlockBackButton = false;
    window.location.hash = 'edit';
    overlay_msg.value.open();
  }
  else {
    // ok bye
    editMode.value = false;
    overlay_msg.value.close();
  }
}, false);


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

onMounted(() => {
  // if watch is used with immediate option,
  // run watch inside onmounted
  watch(route,
    (r) => {
      let query = r.query;
      if (query?.rid) {
        if (!currentRecord.value) {
          // fetch the record if there is no data
          currentRecord.value = {
            id: window.utils.randomString(22),
            idx: window.utils.randomString(8),
            upl: `${window.utils.randomString(2, true)}:${window.utils.randomString(2, true)} / ${window.utils.randomString(4, true)}.${window.utils.randomString(2, true)}.${window.utils.randomString(2, true)}`,
            user: `${window.utils.randomString(8)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(12)}`
          };
        }

        window.overlay.open();
      }
      else {
        if (window.overlay) {
          window.overlay.close();
        }
      }
    },
    {
      immediate: true
    }
  );
});

function showRecord(item) {
  currentRecord.value = item;
  router.push({ name: 'recordDisplay', query: { rid: item.id } });
}

function generateList(tbl) {

  let toRoute = { name: 'recordDisplay' };
  if (recArr[tbl]) {
    // close if it was already open
    delete recArr[tbl];
    router.push(toRoute);
    return;
  }

  toRoute.query = { tbl };

  let len = 100;
  recArr[tbl] = [];
  // generates fake data (fetching data)
  while (len--) {
    recArr[tbl].push({
      id: window.utils.randomString(22),
      idx: window.utils.randomString(8),
      upl: `${window.utils.randomString(2, true)}:${window.utils.randomString(2, true)} / ${window.utils.randomString(4, true)}.${window.utils.randomString(2, true)}.${window.utils.randomString(2, true)}`,
      user: `${window.utils.randomString(8)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(12)}`
    });
  }
  router.push(toRoute);
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

sui-nav.headNav {
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

.showRecord {
  display: inline-block;
  background: #505050;
  width: 1000px;
  max-width: 100vw;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #808080;

  .tab {
    padding: 1em 1em 0 0;
    overflow: hidden;

    &>span {
      display: inline-block;
      padding: 1em;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      width: 8em;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }

    &>span[selected] {
      background-color: #333;
    }

    &>.slice_r {
      &::before {
        content: ' ';
        display: inherit;
      }

      display: inline-block;
      padding: 1em 4px;
      width: 8px;
      background-color: transparent;
      border-bottom-left-radius: 8px;
      box-shadow: 0px 8px #656565;
      box-sizing: border-box;
    }
  }

  .title {
    // box-shadow: 0px 4px 4px 0px #00000033;
    padding: 20px 20px 7px;

    h2 {
      margin: 0;
      font-size: 20px;
      line-height: 1;
    }
  }

  .record {
    background-color: #333;
    padding: 1em;
    height: 60vh;
    max-height: calc(100vh - 150px - 6em);
    overflow-y: auto;

    &>div {
      margin: 24px;

      &>span:first-child {
        opacity: 0.6;
        font-weight: bold;
        min-width: 8em;
        display: inline-block;
      }
    }

    &+.button {
      padding: 1em;
      text-align: center;
    }
  }
}

#showRef {
  background-color: rgb(67, 67, 67);
  border-radius: 8px;
  // height: 7.5em;
  // height: 0px;
  overflow: hidden;
  transition: height .2s;
}
</style>
