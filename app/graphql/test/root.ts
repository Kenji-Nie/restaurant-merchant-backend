const data = require('./data');

export default {
    Query: {
        posts(root, _, ctx) {
            return data.posts;
        },

        author(root, { id }, ctx) { data.authors[id] },
    }
}