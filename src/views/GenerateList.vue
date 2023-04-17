<template lang="pug">
el-form(:inline="true")
  el-form-item(label="日期範圍")
    el-date-picker(
      v-model="dutyMonth"
      type="month"
      format="YYYY-MM"
      value-format="YYYY-MM"
      :clearable="false"
      @change="handleDate"
    )
  el-form-item(label="值班日期")
    el-select(
      multiple
      v-model="dutyDates"
    )
      el-option(
        v-for="day in datesOptions"
        :value="day"
      )
  el-form-item
    GenerateDialog(
      :dutyDates="dutyDates"
      :dutyMonth="dutyMonth"
      :initValue="initValue"
    )
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import GenerateDialog from '@/components/GenerateDialog.vue';

export default defineComponent({
  name: 'GenerateList',
  components: {
    GenerateDialog,
  },
  setup() {
    const dutyDates = ref([]);
    const dutyMonth = ref(dayjs().startOf('month').format('YYYY-MM'));

    /**
     * 每個月結束日期
     */
    const endOfMonth = computed(() => dayjs(dutyMonth.value).endOf('M'));

    /**
     * 值班日期列表
     */
    const datesOptions = computed(() => {
      const options = [] as string[];
      let current = dayjs(dutyMonth.value).clone();

      while (current.isBefore(dayjs(endOfMonth.value).clone())) {
        const dutyDay = current.day(3); // 取得當週禮拜三

        // 排除周三日期比 startOfMonth 早
        if (dutyDay.isAfter(dayjs(dutyMonth.value))) {
          options.push(dutyDay.format('YYYY-MM-DD'));
        }

        current = current.add(7, 'day');
      }

      return options;
    });

    const initValue = () => {
      dutyDates.value = [];
    };

    const handleDate = () => {
      initValue();
    };

    return {
      dutyDates,
      dutyMonth,
      datesOptions,
      initValue,
      handleDate,
    };
  },
});
</script>
