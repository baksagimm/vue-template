export function loopXtimes(x, cb) {
    while (x--) {
        cb();
    }
}