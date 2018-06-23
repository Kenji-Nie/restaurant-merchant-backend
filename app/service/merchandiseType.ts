import BaseService from './base';
import MerchandiseType = model.schema.MerchandiseType;

export default class MerchandiseTypeService extends BaseService {
    public async addMerchandiseType(mid: string, merchandiseTypeName: string, merchandiseTypeIcon: string) {
        let newMerTypeId;
        try {
            newMerTypeId =  await this.model.merchandiseType.save({
                name: merchandiseTypeName,
                icon: merchandiseTypeIcon,
                sequence_number: (await this.model.merchandiseType.count()).count + 1,
                delete_flag: false,
            });
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
        const merchant = await this.service.merchant.get(mid);
        if (merchant.merchandiseType_ids === undefined) {
            merchant.merchandiseType_ids = [newMerTypeId._key];
        } else {
            merchant.merchandiseType_ids.push(newMerTypeId._key);
        }
        try {
            return await this.model.merchant.update(mid, merchant);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
    }

    public async getMerchandiseTypesByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndMerchandiseTypeById(mid)).next();
        return (merchant === undefined) ? [] : merchant.merchandiseTypes;
    }

    public async modifyMerchandiseType(mTypeId: string, mType: MerchandiseType) {
        try {
            return await this.model.merchandiseType.update(mTypeId, mType);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async deleteMerchandiseType(mTypeId: string) {
        try {
            return await this.model.merchandiseType.remove(mTypeId);
        } catch (e) {
            return {_key: ''};
        }
    }
}
