import type { RouteRecordRaw } from 'vue-router';

const DutyList = () => import('../views/DutyList.vue');
const DutyListFilter = () => import('../views/DutyListFilter.vue');
const GenerateList = () => import('../views/GenerateList.vue');

const routerList: RouteRecordRaw[] = [
  {
    path: '/dutyList',
    name: '值班列表',
    component: DutyList,
  },
  {
    path: '/dutyListFilter',
    name: '值班列表(個人)',
    component: DutyListFilter,
  },
  {
    path: '/generateList',
    name: '產生值班',
    component: GenerateList,
  },
];

export default routerList;
