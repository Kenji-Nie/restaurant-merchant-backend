const data = require('./data');
import { find } from 'lodash';

export default {
    Post: {
        author(root, _, ctx) {
            return find(data.authors, {id: root.authorId});
        }
    }
}