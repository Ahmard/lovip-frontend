<template>
  <el-container style="margin: 0!important;">
    <el-aside class="left-sidebar-width shadow-sm">
      <LeftSide
        :is-collapsed="isCollapsed"
        @link-click="onLinkClick"
      />
    </el-aside>

    <el-container>
      <el-header class="shadow-sm">
        <Header
          class="header"
          :clicked-link="last_clicked_link"
          @toggle_sidebar="toggleSidebar"
        />
      </el-header>

      <el-main class="main">
        <nuxt-loading-indicator/>
        <nuxt-page></nuxt-page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import LeftSide from "~/components/Layout/LeftSide.vue";
import Header from "~/components/Layout/Header.vue";
import {isMobileView} from "~/helpers/dom";
import {Folder} from "~/models/folder";

let isCollapsed = ref(false)
let last_clicked_link = ref('')

function onLinkClick(url: string | boolean) {
  if (typeof url === 'string') {
    last_clicked_link.value = url
  }

  if (typeof url === 'string' && isMobileView() && isCollapsed.value) {
    toggleSidebar(false)
  }

  if (isMobileView()) {
    isCollapsed.value = true
  }
}

function toggleSidebar(state: boolean) {
  isCollapsed.value = state;
}

onMounted(function () {
  let required_reload = false
  const server = localStorage.getItem('server');
  const folders: Folder[] = JSON.parse(localStorage.getItem('folders') ?? '[]')

  // Set default server
  if (!server) {
    const config = useRuntimeConfig()
    localStorage.setItem('server', config.public.DEFAULT_SERVER);
    required_reload = true
  }

  // Add default folders
  if (!folders.length) {
    const config = useRuntimeConfig()
    for (const key in config.public.DEFAULT_FOLDERS) {
      folders.push(Folder.make_folder_model(config.public.DEFAULT_FOLDERS[key]))
    }

    Folder.save_folders(folders)
    required_reload = true
  }

  if (required_reload) {
    window.location.reload()
  }
})
</script>

<style>
body {
  margin: 0 !important;
  height: 100% !important;
  background-color: #f8f5f5;
}

.left-sidebar-width {
  width: inherit;
}

.main {
  overflow-y: scroll !important;
  overflow-x: hidden;
  height: calc(100vh - 100px) !important;
  /*margin-right: 10px;*/
}

.header {
  top: 0;
  position: sticky;
  background-color: white
}
</style>
