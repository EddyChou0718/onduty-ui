<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SideBar from '@/components/SideBar.vue';
import useGroupMemberStore from '@/stores/useGroupMemberStore';

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    SideBar,
  },
  setup() {
    const { getGroupMemberList } = useGroupMemberStore();

    onMounted(() => {
      getGroupMemberList();
    });
  },
});
</script>

<template lang="pug">
el-container#main-layout
  el-header#main-header Header
  el-container
    SideBar
    el-main
      RouterView
</template>

<style lang="scss" scoped>
// 導覽列樣式
$menu-width: 210px;
$nav-bgcolor: linear-gradient(90deg, #465570 0, #758eb0);
$nav-color: white;
$collapsed-width: 70px;
$header-height: 56px;

#main {
  &-layout {
    height: 100%;
  }
  &-header {
    height: $header-height;
    color: $nav-color;
    background: $nav-bgcolor;
  }
}
</style>
