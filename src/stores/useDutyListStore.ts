import { acceptHMRUpdate, defineStore } from 'pinia';
import { getList } from '@/api/dutyList';
import type {
  DutyListType,
  DutyDataType,
  SearchQueryType,
} from '@/types';

const useDutyListStore = defineStore('dutyList', {
  state: () => ({
    dutyList: [] as DutyListType[],
  }),

  getters: {
    computedData: (state) => state.dutyList.reduce((acc, curr) => {
      const obj = {
        name: curr.name,
        date: [curr.Mon, curr.Tue, curr.Wed, curr.Thu, curr.Fri, curr.Sat, curr.Sun].flat(),
      };

      obj.date.forEach((i) => {
        acc.push({
          content: obj.name,
          date: i,
          isDuty: false,
        });
      });

      curr.maintain.forEach((i) => {
        const target = acc.find((l) => l.date === i);

        if (target) {
          target.content = curr.name + target.content;
        } else {
          acc.push({
            content: curr.name,
            date: i,
            isDuty: true,
          });
        }
      });

      curr.maintain_afternoon.forEach((i) => {
        const target = acc.find((l) => l.date === i);

        if (target) {
          target.content += `/${curr.name}`;
        } else {
          acc.push({
            content: `/${curr.name}`,
            date: i,
            isDuty: true,
          });
        }
      });

      return acc;
    }, [] as DutyDataType[]),
  },

  actions: {
    async getDutyList(payload: SearchQueryType): Promise<any> {
      this.dutyList = await getList(payload);
    },
  },
});

// Pinia HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDutyListStore, import.meta.hot));
}

export default useDutyListStore;
