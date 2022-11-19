<template lang="pug">
.shell
  // all the comment represents !! bad examples !!

  .side-nav
    // notice side bar is using flex box, direction column, aligned center,
    // when you can just let child decide the alignment and width

    div
    div

  div(style="flex-grow: 1;display:flex;justify-content:center;flex-wrap: wrap;")
    // flex box prevents content to break in flexible way.

    sui-nav(auto-hide)
      // sui-nav height is set in css.
      // this cause child element to miss-align and overflow when breaked.

      div
        span Raffina
        div
          span Dashboard&nbsp;
          span Documentation&nbsp;
          span Account Setting&nbsp;
          span Logout

    .content(style="width:1000px;")
      div(style="display:flex;flex-direction:column;")
        // do not use flex box when unnessesary

        h1 Records
        div
          p.
            Records are data that your service user's will store and read from your service database.#[br]
            All records are organized by table names and restrictions.#[br]
            With additional query points such as index names and tags, references,#[br]
            you can have more flexible option when fetching the records.
          div(style='text-align:right')
            // now, how are you going to place the button to be below at the end of paragraph length?
            // since the parent is a flex box we have a tricky situation.
            sui-button Read Doc

      // line-breaks is now done by css.
      // try to find this margin-bottom styling from the style section.

      div(style='margin-bottom:1em;')
        sui-select(@change="setSearch" style="margin-bottom:1em;")
          // @change is now a function. try to find it in script tag.
          option(value="table" selected) Table name
          option(value="user") User ID
          option(value="record") Record ID

        span &nbsp;&nbsp;

        sui-input(type='search' placeholder="Search")

      .searchOptions(v-if="searchTarget !== 'record'")
        // now every line of form is wrapped in to a div. since we are using margin-bottom to break line.
        // by doing this, it becomes more difficult to actually read the html content from code.

        div
          label(for="access_group" style='width: 12em;display:inline-block;margin-bottom:1em;') Access Group:
          sui-select#access_group(style="width:324px")
            option(value="1" selected) Registered
            option(value="0" selected) Public
            option(value="private" selected) Private

        template(v-if="searchTarget==='user'")
          div
            label(for="table" style='width: 12em;display:inline-block;margin-bottom:1em;') Table Name:
            sui-input#table(placeholder="Table Name")

          div
            label(for="subs" style='width: 12em;display:inline-block;margin-bottom:1em;') Subscription Table:
            sui-select#subs(style="width:324px")
              option(value="subscr") Subscribed
              option(value="public") Public

        div
          label(for="idx_name" style='width: 12em;display:inline-block;margin-bottom:1em;') Index Name:
          sui-input#idx_name

        div
          label(style='width: 12em;display:inline-block;margin-bottom:1em;') Index Value:
          div(style="display:inline-block;margin-bottom:0;")
            sui-select(style="width: 6em;" @change="setIndexType")
              // @change is now a function
              option(value="text" selected) String
              option(value="number") Number
            span &nbsp;&nbsp;
            sui-input#idx_val(:type="indexType" placeholder="Value" style='width:220px;')

        div
          label(for="tag" style='width: 12em;display:inline-block;margin-bottom:1em;') Tag:
          sui-input#tag

        template(v-if="searchTarget === 'table'")
          div
            label(for="ref_id" style='width: 12em;display:inline-block;margin-bottom:1em;') Reference ID:
            sui-input#ref_id(placeholder="Record ID")

        div(style="text-align:right;margin-bottom: 0;")
          // you can use additional div to position the child
          sui-button Search

      .panel
        .slot
          .par
            span Table Name
            span Table Size
            span Number Of Records
            span

        .slot(v-for="(i, tbl) in tblList")
          // createData is a function that is imported from another file.
          // don't modularize before you even know it's nessesary.
          // now you have to pass all the vue data to the arguments,
          // and it will become more harder to read and edit the code.
          .par(@click="createData('record', tbl, recArr)")
            span tbl-{{tbl}}
            span {{i.size}}
            span {{i.count}}
            span +
          .nest-shell(:style="{height: recArr[tbl] ? '60vh' : '0vh'}")
            .nest(v-if='recArr[tbl]' v-for="item in recArr[tbl]")
              span Uploaded: {{item.upl}}
              span User: {{item.user}}
              span index: {{item.idx}}

      .pagination
        span(@click="createData('table', tblList)") Prev
        div 1 2 3 4 ...
        span(@click="createData('table', tblList)") Next

</template>
<script setup>
import { reactive, ref } from "vue";
import { createData } from "./bad_example";

let recArr = reactive({});
let tblList = ref(null);
let searchTarget = ref('table');
let indexType = ref('text');
let overlay = ref(null);

function setSearch(e) {
  // not everything has to be a function.
  // assigning some data to a variable is not worth to be called a 'function'.
  searchTarget.value = e.target.value;
}

function setIndexType(e) {
  // not everything has to be a function.
  // assigning some data to a variable is not worth to be called a 'function'.
  indexType.value = e.target.value;
}

// just because you got rid of the code on this page to another,
// it does not mean it's well organized.
createData('table', tblList);

// ...and also note, short code does not always mean it's efficient.
// sometimes more code is required for efficient computation.

</script>
<style lang="less" scoped>
.shell {
  min-height: 100vh;
  width: 100%;
  background-color: #656565;
  color: white;
  display: flex;

  h1 {
    font-weight: 400;
    font-size: 32px;
  }
}

.side-nav {
  background-color: #293FE6;

  width: 52px; // bad example
  display: flex; // bad example
  flex-direction: column; // bad example
  align-items: center; // bad example

  &>* {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: rgba(255 255 255 / 20%);

    margin-top: 8px; // bad example
  }
}

sui-nav {
  box-sizing: border-box;
  margin: 0;
  background: #505050;

  height: 59px; // bad example

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

sui-select option {
  color: black;
  background-color: white;
}

sui-input {
  background-color: rgba(255, 255, 255, 0.08);
  border: none;
  width: 324px;

  input::placeholder {
    color: rgba(255 255 255 / 0.66)
  }
}

.content {
  margin: 6em auto 0;
  max-width: 1000px;

  &>div:first-child {
    margin-bottom: 4em; // you found it. good luck finding rest of all the margin-bottom in css.
  }

  .searchOptions {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.5);
    background-color: #505050;
    padding: 1em;
    border-radius: 8px;

    margin-bottom: 1em; // bad example

    &>* {
      margin-bottom: 1em;
    }
  }

  .panel {
    box-sizing: border-box;
    max-width: 1000px;
    padding: 16px 16px 1px;
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