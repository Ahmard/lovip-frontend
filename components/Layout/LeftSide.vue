<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo pt-2"
    :class="{ 'collapsed': props.isCollapsed }"
    :collapse="isCollapsed"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="px-3">
      <nuxt-link to="/">
        <img
          class="log top-logo"
          :class="{ 'collapsed': props.isCollapsed }"
          src="/lovip-logo-1.png"
          style="height: 60px"
          alt=""
        />
      </nuxt-link>
    </div>
    <el-menu-item index="1" @click="onLinkClick">
      <nuxt-link to="/">
        <el-icon>
          <el-icon-video-play/>
        </el-icon>
        <span>Videos</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="2" @click="onLinkClick">
      <nuxt-link to="/folders">
        <el-icon>
          <el-icon-folder/>
        </el-icon>
        <span>Folders</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="3" @click="onLinkClick">
      <nuxt-link to="/settings">
        <el-icon>
          <el-icon-setting/>
        </el-icon>
        <span>Settings</span>
      </nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>

const emit = defineEmits(['linkClick'])
const props = defineProps({
  isCollapsed: Boolean
})

function handleOpen() {

}

function handleClose() {

}

function onLinkClick() {
  nextTick(() => {
    const clicked_link = document.querySelector('.el-menu-item.is-active a')
    if (clicked_link) {
      emit('linkClick', clicked_link.getAttribute('href'))
    }
  })
}
</script>

<style>
.el-menu-vertical-demo {
  min-height: calc(100vh - 1px) !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}

.top-logo.collapsed {
  width: 30px;
}

.left-sidebar-width.collapsed {
  width: 50px;
}

.el-menu-item a {
  text-decoration: none;
  color: var(--bs-primary) !important;
}
</style>
