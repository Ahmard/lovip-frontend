<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-11 col-xl-11">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Directory Listing</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <div class="text-uppercase pt-2">Folder Management</div>
              <div>
                <el-button
                  class="button"
                  :icon="ElIconFolderAdd"
                  @click="open_add_folder_dialog">
                  Add Folder
                </el-button>
              </div>
            </div>
          </template>
          <div class="text item p-3">
            <FolderListTable :key="cmk_list_table" />
          </div>
        </el-card>
      </div>
    </div>

    <CreateDialog
      :mode="mode"
      :state="dialog_state"
      :key="cmk_create_dialog"
      @created="on_created"
    />
  </div>
</template>

<script lang="ts" setup>
import CreateDialog from "~/components/Folder/CreateDialog.vue";

useSeoMeta({title: 'Directories'})
const mode = ref('create')
const dialog_state = ref(false)
const cmk_create_dialog = ref(`dialog-` + Date.now())
const cmk_list_table = ref(`list-table-` + Date.now())

function open_add_folder_dialog() {
  mode.value = 'create'
  cmk_create_dialog.value = `dialog-` + Date.now()
  nextTick(() => dialog_state.value = true);
}

function on_created() {
  cmk_list_table.value = `list-table-` + Date.now()
}
</script>

<style scoped>

</style>
