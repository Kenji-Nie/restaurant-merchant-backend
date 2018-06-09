import BaseService from './base';

export default class MerchandiseTypeService extends BaseService {
    public async addGroup(merchandiseTypeName: string, merchandiseTypeIcon: string) {
        return await this.model.merchandiseType.save({
            name: merchandiseTypeName,
            icon: merchandiseTypeIcon,
            sequence_number: await this.model.merchandiseType.count() + 1,
            delete_flag: false,
        });
    }
}
