// this is a bad example

import { loopXtimes } from "./bad_example_util";

export function createData(type, belongs, dat) {
    // we know that function does 'one thing',
    // but what is 'one thing'? be wise when you modularize the code.
    // bad decision will lead to more unnessesary code, and bad readability.

    if (type === 'record') {
        return generateList(belongs, dat);
    }
    else if (type === 'table') {
        return createTbl(belongs);
    }
}

function generateList(tbl, recArr) {
    if (recArr[tbl]) {
        delete recArr[tbl];
        return;
    }

    recArr[tbl] = [];

    loopXtimes(100, () => {
        // setting up (x times) iteration. 
        // you may thought it would be good idea to make it into a separate function
        // because you didnt want to repeat the code that sets up x time iteration.

        // well, this, is a bad idea.
        // if all you are doing is executing function / iteration / data assigning,
        // javascript already provides those syntax for you.
        // do not wrap things that javascript already provides.

        // function 'does one thing',
        // but remember, that 'thing' should be something that 'solves the problem'.

        recArr[tbl].push({
            idx: window.utils.randomString(8),
            upl: `${window.utils.randomString(2, true)}:${window.utils.randomString(2, true)} / ${window.utils.randomString(4, true)}.${window.utils.randomString(2, true)}.${window.utils.randomString(2, true)}`,
            user: `${window.utils.randomString(8)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(4)}-${window.utils.randomString(12)}`
        });
    });
}

function createTbl() {
    let list = {};

    loopXtimes(10, () => {
        let tbl = window.utils.randomString(4);
        list[tbl] = { 
            size: window.utils.randomString(4, true),
            count: window.utils.randomString(6, true)
        };
    });

    return list;
}