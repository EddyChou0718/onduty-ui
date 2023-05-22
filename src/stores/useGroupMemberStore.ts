import { defineStore } from 'pinia';
import { getGroupMember } from '@/api/dutyList';
import type { GroupMemberType } from '@/types';

const useGroupMemberStore = defineStore('groupMember', {
  state: () => ({
    groupMember: [] as GroupMemberType[],
  }),

  actions: {
    getGroupMemberList() {
      getGroupMember().then((res) => {
        this.groupMember = res;
      });
    },
  },
});

export default useGroupMemberStore;
