import BaseService from './base';
import MerchandiseType = model.schema.MerchandiseType;

export default class MerchandiseTypeService extends BaseService {
    public async addMerchandiseType(merchandiseTypeName: string, merchandiseTypeIcon: string) {
        try {
            return await this.model.merchandiseType.save({
                name: merchandiseTypeName,
                icon: merchandiseTypeIcon,
                sequence_number: (await this.model.merchandiseType.count()).count + 1,
                delete_flag: false,
            });
        } catch (e) {
            return {_key: ''};
        }
    }

    public async getMerchandiseTypesByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndMerchandiseTypeById(mid)).next();
        return merchant.merchandiseTypes;
    }

    public async modifyMerchandiseType(mTypeId: string, mType: MerchandiseType) {
        try {
            return await this.model.merchandiseType.update(mTypeId, mType);
        } catch (e) {
            return {_key: ''};
        }
    }
}
