<template lang="pug">
el-calendar(:range="currDate")
  template(#header): div
  template(#date-cell="{data}")
    el-text(
      class="date"
      :type="DateType(data.day)"
    ) {{ `${data.day.split('-')[1]}/${data.day.split('-')[2]}` }}
    .duty-mate(v-if="dealMyDate(data.day)")
      el-tag(:type="DateType(data.day)") {{ dealMyDate(data.day) }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { SearchQueryType } from '@/types';
import useDutyListStore from '@/stores/useDutyListStore';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'DutyCalender',
  props: {
    searchQuery: {
      type: Object as PropType<SearchQueryType>,
      default: () => ({
        startDay: '',
        endDay: '',
      }),
    },
  },
  setup(props) {
    const store = useDutyListStore();
    const { computedData } = storeToRefs(store);

    const currDate = computed<Date[]>(() => {
      const { startDay, endDay } = props.searchQuery;

      return [
        new Date(dayjs(startDay).format()),
        new Date(dayjs(endDay).format()),
      ];
    });

    const dealMyDate = (v: string) => computedData.value.find((i) => i.date === v)?.content;

    const DateType = (v: string) => (
      computedData.value.find((i) => i.date === v)?.isDuty ? 'warning' : null
    );

    return {
      currDate,
      dealMyDate,
      DateType,
    };
  },
});
</script>

<style scoped lang="scss">
  :deep(.el-calendar-day) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .date {
      align-self: flex-start;
    }
    .duty-mate {
      text-align: right;
    }
  }
</style>
