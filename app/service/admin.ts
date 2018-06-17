import BaseService from './base';

export default class AdminService extends BaseService {
    /**
     * 根据管理员id获取管理员详细信息
     * @param {string} aid
     * @returns {Promise<{_key: string}>}
     */
    public async getAdminDetail(aid: string) {
        try {
            return await this.model.admin[aid];
        } catch (e) {
            return {_key: ''};
        }
    }
}
