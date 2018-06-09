export default {
    modifyValues(obj, fn) {
        return this.batch(obj, (acc, cur) => {
            if (cur[1]) {
                acc[cur[0]] = fn(cur[1]);
            }
        });
    },

    batch(obj, fn) {
        return Object.entries(obj).reduce((acc, cur) => {
            fn(acc, cur);
            return acc;
        }, {});
    }
}
