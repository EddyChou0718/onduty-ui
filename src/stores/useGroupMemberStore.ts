import { acceptHMRUpdate, defineStore } from 'pinia';
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

// Pinia HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGroupMemberStore, import.meta.hot));
}

export default useGroupMemberStore;
