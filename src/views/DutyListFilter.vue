<script lang="ts">
import {
  defineComponent,
  nextTick,
  reactive,
  ref,
} from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import JsonCSV from 'vue-json-csv';
import useGroupMemberStore from '@/stores/useGroupMemberStore';
import { getDutyListFilter } from '@/api/dutyList';

type OndutyDateType = {
  name: string,
  date: string,
  maintain_afternoon_name?: string
};

export default defineComponent({
  name: 'DutyListFilter',
  components: {
    JsonCSV,
  },
  setup() {
    const { groupMember } = storeToRefs(useGroupMemberStore());

    const formQuery = reactive({
      username: groupMember.value[0]?.name,
      date: [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().endOf('month').format('YYYY-MM-DD'),
      ],
    });

    const searchQuery = reactive({
      username: '',
      startDay: '',
      endDay: '',
    });

    const data = reactive({
      id: 0,
      name: '',
      ondutyDate: [] as OndutyDateType[],
    });

    const exportData: Ref<OndutyDateType[]> = ref([]);

    const handleSearch = async () => {
      exportData.value = [];
      searchQuery.username = formQuery.username;
      [searchQuery.startDay, searchQuery.endDay] = formQuery.date;

      await nextTick();

      const out = await getDutyListFilter(searchQuery);
      const { id, name, onduty_date: ondutyDate } = out;

      data.id = id;
      data.name = name;
      data.ondutyDate = ondutyDate;

      data.ondutyDate.forEach((i) => {
        exportData.value.push({
          name: i.maintain_afternoon_name ? `${i.name}/${i.maintain_afternoon_name}` : i.name,
          date: i.date,
        });
      });
    };

    return {
      formQuery,
      searchQuery,
      groupMember,
      data,
      exportData,
      handleSearch,
    };
  },
});
</script>

<template lang="pug">
div
  el-form(:inline="true")
    el-form-item(label="名稱")
      el-select(
        v-model="formQuery.username"
        placeholder="Username"
      )
        el-option(
          v-for="member in groupMember"
          :id="member.id"
          :value="member.name"
        )
    el-form-item(label="日期範圍")
      el-date-picker(
        v-model="formQuery.date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        type="daterange"
        range-separator="-"
        :clearable="false"
      )
    el-form-item
      el-button(
        plain
        type="primary"
        @click="handleSearch"
      ) 搜尋
    el-form-item
      JsonCSV(:data="exportData")
        el-button(
          plain
          :disabled="exportData.length === 0"
        ) 下載CSV
</template>
