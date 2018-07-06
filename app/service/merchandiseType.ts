import BaseService from './base';
import MerchandiseType = model.schema.MerchandiseType;
import Merchandise = model.schema.Merchandise;

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

    public async deleteMerchandiseType(mid: string, mTypeId: string) {
        try {
            const merchandises = await this.model.merchandise.all();
            while (merchandises.hasNext()) {
                const merchandise = await merchandises.next();
                if (merchandise.type_fid === mTypeId) {
                    await this.service.merchandise.deleteMerchandise(mid, [merchandise._key]);
                }
            }
            let mTypeIds = (await this.model.merchant[mid]).merchandiseType_ids || [];
            mTypeIds = mTypeIds.filter((item) => item !== mTypeId);
            await this.model.merchant.update(mid, {merchandiseType_ids: mTypeIds});
            return await this.model.merchandiseType.remove(mTypeId);
        } catch (e) {
            return {_key: ''};
        }
    }
}
