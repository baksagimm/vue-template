export function createData(type, belongs, recArr) {
    if(type === 'record') {
        return generateList(belongs, recArr);
    }
    else if(type === 'table') {
        return createTbl(belongs)
    }
}

function generateList(tbl, recArr) {
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

function createTbl(tblList) {
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