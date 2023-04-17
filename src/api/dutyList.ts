import type {
  GenerateCsvPayloadType,
  SearchQueryType,
  GetListPayloadType,
  GroupMemberType,
} from '@/types';
import request from './request';

/**
 * 取得值班列表
 *
 * @param {GetListPayloadType} payload payload
 * @returns 值班列表
 */
const getList = async (payload: SearchQueryType) => {
  const out = await request('GET', '/onduty/list', payload);

  return out;
};

/**
 * 取得值班列表(個人)
 *
 * @param {GetListPayloadType} payload payload
 * @returns 值班列表
 */
const getDutyListFilter = async (payload: GetListPayloadType) => {
  const out = await request('GET', '/onduty/list/filter', payload);

  return out;
};

/**
 * 取得使用者列表
 *
 * @returns 使用者列表
 */
const getGroupMember = async (): Promise<GroupMemberType[]> => {
  const out = await request('GET', '/onduty/groupMember');

  return out;
};

/**
 * 產生值班列表
 *
 * @param {GenerateCsvPayloadType} payload payload
 * @returns 值班列表
 */
const generateCsv = async (payload: GenerateCsvPayloadType): Promise<string> => {
  const out = await request('POST', '/onduty', payload, true);

  return out;
};

export {
  getList,
  getDutyListFilter,
  getGroupMember,
  generateCsv,
};
