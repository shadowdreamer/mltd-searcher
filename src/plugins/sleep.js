const sleep = function (t) {
    return new Promise(r => {
        setTimeout(() => {
            r();
        }, t);
    })
}
export default sleep