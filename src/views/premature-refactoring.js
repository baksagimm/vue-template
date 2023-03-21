export function createHelloMsgA(name) {
    return 'Hello ' + name;
}

export function createMsgElementA(msg, parent, repeat = 1) {
    while (repeat--) {
        let el = document.createElement('div');
        el.textContent = msg;
        parent.append(el);
    }
}

export function createHelloMsgB(name, prefix) {
    return (prefix || 'Hello') + ' ' + name;
}

export function createMsgElementB(msg, parent, repeat = 1, colorIndex) {
    while (repeat--) {
        let el = document.createElement('div');
        el.textContent = msg;
        if(colorIndex) {
            if(colorIndex[repeat]) {
                el.style.color = colorIndex[repeat];
            }
        }
        parent.append(el);
    }
}