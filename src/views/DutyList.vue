<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
} from 'vue';
import dayjs from 'dayjs';
import useDutyListStore from '@/stores/useDutyListStore';
import DutyCalender from '@/components/DutyCalender.vue';

export default defineComponent({
  name: 'SearchDuty',
  components: {
    DutyCalender,
  },
  setup() {
    const store = useDutyListStore();

    const dateValue = ref(dayjs().startOf('month').format());

    const searchQuery = reactive({
      startDay: '',
      endDay: '',
    });

    const handleSearch = async () => {
      searchQuery.startDay = dayjs(dateValue.value).format('YYYY-MM-DD');
      searchQuery.endDay = dayjs(dateValue.value).endOf('month').format('YYYY-MM-DD');

      store.getDutyList(searchQuery);
    };

    onMounted(() => {
      handleSearch();
    });

    return {
      dateValue,
      searchQuery,
      handleSearch,
    };
  },
});
</script>

<template lang="pug">
div
  el-form(:inline="true")
    el-form-item(label="日期範圍")
      el-date-picker(
        v-model="dateValue"
        type="month"
        range-separator="-"
        :clearable="false"
      )
    el-form-item
      el-button(
        plain
        type="primary"
        @click="handleSearch"
      ) 搜尋
    DutyCalender(:searchQuery="searchQuery")
</template>
