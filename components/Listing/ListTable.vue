<template>
  <div>
    <datatable :endpoint="props.endpoint" :key="tableKey" @row-click="onRowClick">
      <el-table-column type="expand">
        <template #default="user">
          <div class="hidden-md-and-up">
            <p class="list-item ps-3">Name: {{ user['row']['first_name'] }} {{ user['row']['last_name'] }}</p>
            <p class="list-item ps-3">Email: {{ user['row']['email'] }}</p>
            <p class="list-item ps-3">Phone Number: {{ user['row']['phone_number'] }}</p>
            <p class="list-item ps-3">Created At: {{ user['row']['created_at'] }}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="File Name" prop="first_name" class="hidden-sm-and-down">
        <template #default="scope">{{ scope['row']['file_name'] }}</template>
      </el-table-column>
      <el-table-column label="File Size" prop="last_name">
        <template #default="scope">{{ scope['row']['file_size'] }}</template>
      </el-table-column>
      <el-table-column label="Created At" prop="created_at">
        <template #default="scope">{{ scope['row']['created_at'] }}</template>
      </el-table-column>
      <template #action="scope" v-if="withActionButtons">
        <el-button
          size="small"
          :icon="ElIconView"
          @click="handleEdit(scope.$index, scope.row)">
          Watch
        </el-button>
      </template>
    </datatable>
  </div>
</template>

<script lang="ts" setup>
import {useApiUrl} from "~/composables/url";
import {User} from "~/models/user";
import {xhrDelete} from "~/helpers/xhr";
import {reactive} from "vue";

const emit = defineEmits(['start_edit', 'start_create'])
const props = defineProps({
  withActionButtons: {type: Boolean, default: true},
  endpoint: {type: String, default: useApiUrl('listings')},
})

let mode = ref('create');
let tableKey = ref('listings-' + Date.now())
let selected_user = reactive(User.fromData({}))

function handleEdit(index: number, user: User) {
  mode.value = 'edit'
  selected_user = user

  emit('start_edit', user)
}

function onRowClick(user: User) {
  useRouter().push(`/listings/${user.user_id}`)
}

</script>

<style scoped>

</style>
