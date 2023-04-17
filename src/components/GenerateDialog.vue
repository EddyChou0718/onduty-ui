<template lang="pug">
el-button(
    plain
    type="success"
    @click="handleDialogOpen(true)"
  ) 產生

el-dialog(
  show-close
  v-model="dialogOpen"
  width="25%"
  title="產生CSV"
  @close="handleDialogOpen(false)"
)
  el-descriptions(:column="1")
    el-descriptions-item(label="產生月份") {{ dayjs(dutyMonth).format('YYYY-MM') }}
    el-descriptions-item(label="值班日期") {{ dutyDates.join(', ') }}
  template(#footer)
    span.dialog-footer
      el-button(@click="handleDialogOpen(false)") 取消
      el-button(type="primary" @click="handleGenerate") 確認
</template>

<script lang="ts">
import { generateCsv } from '@/api/dutyList';
import { defineComponent, nextTick, ref } from 'vue';
import type { PropType } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    dutyDates: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
    dutyMonth: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const dialogOpen = ref(false);
    const csvData = ref('');

    const handleDialogOpen = (val: boolean) => {
      dialogOpen.value = val;
    };

    const handleGenerate = async () => {
      const { dutyDates, dutyMonth } = props;
      const payload = {
        startDay: dayjs(dutyMonth).startOf('M').format('YYYY-MM-DD'),
        endDay: dayjs(dutyMonth).endOf('M').format('YYYY-MM-DD'),
        maintain: dutyDates,
      };

      const out = await generateCsv(payload);

      csvData.value = out;

      await nextTick();

      handleDialogOpen(false);
    };

    return {
      dialogOpen,
      handleDialogOpen,
      handleGenerate,
      dayjs,
      csvData,
    };
  },
});
</script>

<style scoped>

</style>
