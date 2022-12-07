<template lang="pug">
.shell

  div(style="flex-grow: 1;background-color: #333333;")
    // this is the content section right beside the side nav bar.
    // flex-grow is to expand the width.

    sui-nav.headNav(auto-hide)
      // sui-nav check skateui details for more info
      .navTitle
        span {{currentRecord.id}}
        div
          span(style="font-weight:bold") Edit
      .tab
        span(:selected='currentRecordView === "info" ? true : null' @click="currentRecordView = 'info'") Information
        span(:selected='currentRecordView === "record" ? true : null' @click="currentRecordView = 'record'")  Record

    .showRecord(v-if="currentRecord")
      .record(v-if="currentRecordView === 'info'")
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
          sui-input#allow_ref(type='checkbox' style="color:white;vertical-align:text-top;" @change='e=>allowReference=e.target.checked')
          label(for='allow_ref') &nbsp;&nbsp;Allow Reference
          br
          br
          #showRef(:style="{'background-color':'#434343','border-radius':'8px','height':allowReference ? '7.5em' : '0px'}")
            div(style="padding: 1.5em 1em 1em;")
              label(for='allow_mult_ref') Allow Multiple Reference:&nbsp;&nbsp;
              sui-input#allow_mult_ref(type='checkbox' style="color:white;")
              
              br
              br
              //- label(for='ref_lmt') Reference Limit:&nbsp;&nbsp;
              //- sui-input#ref_lmt(type='number' style="vertical-align:baseline;width:6em;background-color:rgba(255, 255, 255, 0.08);" placeholder='Infinite')
              
              span(style="vertical-align:super") Reference Limit:&nbsp;&nbsp;
              sui-input(type='number' placeholder="Infinite" style="box-shadow: 0 1px white; border-radius:0; width:calc(100% - 8em); min-width:6em;")
        div
          span User ID:
          span {{currentRecord.user}}
        div
          span Uploaded:
          span {{currentRecord.upl}}
      .record(v-else)
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
</template>
<script setup>
// setup script is basically what you run in created()

import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
let router = useRouter();
let route = useRoute();
let currentRecord = {
  id: window.utils.randomString(22),
  idx: window.utils.randomString(8),
  upl: `${window.utils.randomString(2, true)}:${window.utils.randomString(2, true)} / ${window.utils.randomString(4, true)}.${window.utils.randomString(2, true)}.${window.utils.randomString(2, true)}`,
  user: `${window.utils.randomString(8)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(12)}`
};

let allowReference = ref(null);

let currentRecordView = ref('info');

</script>
<style lang="less" scoped>

.selectInput {
  width: 100%;
  &>* {
    vertical-align: middle;
  }

  &>span {
    box-shadow: 10px 0px 0 -8px rgb(255 255 255 / 25%);
    
    width: 8em;
    display: inline-block;
  }

  &>sui-input {
    box-shadow: none;
    background-color: transparent !important;
  }
  padding: 0 0 0 8px;
  position: relative;
  box-shadow: -1px -1px 2px -1px rgb(0 0 0 / 50%),
  1px 1px 1px rgb(255 255 255 / 33%),
  inset 0 0 0 1px rgba(0 0 0 / 25%);
  background-color: rgba(255, 255, 255, 0.08);
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}

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

#showRef {
  background-color: rgb(67, 67, 67);
  border-radius: 8px;
  // height: 7.5em;
  // height: 0px;
  overflow: hidden;
  transition: height .2s;
}


sui-nav.headNav {
  box-sizing: border-box;
  margin: 0;
  background: #505050;
  padding: 0;
  padding-bottom: 0;

  &>.navTitle {
    padding: 0 1em;
    // max-width: 1000px;
    margin: 0px auto;
    padding: 18px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
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
    background-color: #333333;
    // box-shadow: 2px 2px 4px rgb(0 0 0 / 50%);
  }
}

.showRecord {
  display: inline-block;
  width: 100%;
  max-width: 100vw;
  // height: 100%;
  // border-radius: 8px;
  overflow: hidden;


  .record {
    padding: 1em;

    &>div {
      margin: 24px 8px 24px 0;

      &>span:first-child {
        opacity: 0.6;
        font-weight: bold;
        min-width: 8em;
        // display: inline-block;
        // display: block;
      }

      &>span {
        white-space: nowrap;
        display: block;
        margin-bottom: 8px;
      }
    }

    &+.button {
      padding: 1em;
      text-align: center;
    }
  }
}
</style>
