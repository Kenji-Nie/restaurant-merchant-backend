import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('merchandiseTypeTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('modifyMerchandiseType', async () => {
        const x = {
            _id: 'merchandiseType/206792',
            _rev: '_W8KMJlS--_',
            _key: '206792',
            name: '88888',
            icon: 'q7Pgh2SfB5',
            sequence_number: 2,
            delete_flag: false,
        };
        const id = x._key;
        // delete x._key;
        const u = await ctx.service.merchandiseType.modifyMerchandiseType(id, x);
        // console.log(u);
    });


});
