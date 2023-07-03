<template>
  <div>
    <el-table
      :data="folders"
      :key="table_key"
      style="width: 100%"
      @row-click="onRowClick">
      <el-table-column type="expand">
        <template #default="dir">
          <div class="hidden-md-and-up">
            <p class="list-item ps-3">Name: {{ dir['row']['name'] }}</p>
            <p class="list-item ps-3">Created At: {{ dir['row']['created_at'] }}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Directory Name" prop="name" class="hidden-sm-and-down"/>
      <el-table-column label="Created At" prop="created_at"/>
      <el-table-column label="Last Updated At" prop="updated_at"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            :icon="ElIconDelete"
            @click="handleDelete(scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {Folder} from "~/models/folder";
import {reactive} from "vue";
import {HtmlEvent} from "~/types/html.event";

const emit = defineEmits(['start_edit', 'start_create'])
const props = defineProps({
  withActionButtons: {type: Boolean, default: true},
})

let folders: Folder[] = ref(JSON.parse(localStorage.getItem('folders') ?? '[]'))

let mode = ref('create');
let table_key = ref('beneficiaries-' + Date.now())
let selected_folder = reactive(Folder.fromData({}))

function handleEdit(index: number, folder: Folder) {
  mode.value = 'edit'
  selected_folder = folder

  emit('start_edit', folder)
}

function onRowClick(folder: Folder, component: any, event: HtmlEvent) {
  if (
    event.target.tagName === 'TD'
    || (event.target.tagName === 'DIV' && event.target.classList.contains('cell'))
  ) {
    localStorage.setItem('current_directory', folder.name)
    useRouter().push(`/`)
  }
}

function handleDelete(index: number, folder: Folder) {
  mode.value = 'edit'
  selected_folder = folder

  ElMessageBox.confirm(
    `<b>${selected_folder.name}</b> will be removed from your folder list, proceed?`,
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      Folder.remove_folder(selected_folder.name)

      ElNotification({
        title: 'Success',
        message: 'Selected folder has been removed from your list',
        type: 'success',
      })

      folders = Folder.get_folders()
      table_key.value = `folders-${Date.now()}`
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Directory deletion canceled',
      })
    })
}

</script>

<style scoped>

</style>
