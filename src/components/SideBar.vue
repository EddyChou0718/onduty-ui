<template lang="pug">
el-aside(width="200px")
  el-menu
    RouterLink(
      v-for="(link, index) in routerList"
      custom
      :key="index"
      :to="link.path"
      v-slot="{ navigate }"
    )
      el-menu-item(
        :index="link.name"
        @click="navigate"
      ) {{ link.name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import routerList from '@/router/routerList';

export default defineComponent({
  name: 'SideBar',
  components: {
    RouterLink,
  },
  setup: () => ({
    routerList,
  }),
});
</script>

<style lang="scss" scoped>
  aside {
    .el-menu {
      height: 100%;
    }
  }
</style>
