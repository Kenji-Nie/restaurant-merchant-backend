const data = require('./data');

export default {
    Author: {
        posts(root, _, ctx) {
            return data.posts.filter(post => root.postIds.includes(post.id));
        }
    }
}