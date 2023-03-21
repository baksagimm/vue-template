<template lang="pug">
nav
    p Navbar
    .menu
        span Information
        span Navigation
        span About
        span Dinosaurs
        span Welcome
        span Login
.shell
    .side-bar
        .menus
            div
            div
            div
    .content 
        .center
            h2 Welcome to my world 
            p.
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
</template>
<style lang="less">
nav {
    background: lightblue;
    height: 3em;
    display: flex;
    padding: 0 .5em;
    align-items: center;
    justify-content: space-between;

    .menu {
        display: flex;
        align-items: center;
        &>* {
            margin-left: .5em;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

.shell {
    display: flex;
    min-height: 100vh;

    .side-bar {
        width: 4em;
        background: antiquewhite;
        justify-content: center;
        display: flex;

        .menus {
            margin-top: .5em;
            &>div {
                background-color: white;
                width: 3em;
                height: 3em;
                margin-bottom: .5em;
            }
        }

    }

    .content {
        flex-grow: 1;
        display: flex;
        justify-content: center;

        .center {
            max-width: 800px;
            padding: 0 1em;
        }
    }
}
</style>