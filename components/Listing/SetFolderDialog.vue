<template>
  <div>
    <el-dialog
      v-model="dialog_state"
      title="Set Folder"
      :width="dialog_width"
      :destroy-on-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
      <div class="ms-4 me-1" style="margin-top: -15px">
        <el-form
          :model="form"
          label-position="top"
          :rules="rules"
          ref="ref_form">
          <el-select
            class="w-100"
            size="large"
            v-model="form.folder"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your article"
          >
            <el-option
              v-for="(item, index) in options"
              :key="`key-${index}`"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button native-type="button" @click="hide_dialog">Cancel</el-button>
        <el-button
          native-type="button"
          type="primary"
          :icon="ElIconCircleCheck"
          :loading="is_submitting"
          @click.prevent="submit_form(ref_form)">
            Set Folder
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {length, required} from "~/helpers/from_validation";
import {FormInstance} from "element-plus";
import {isMobileView} from "~/helpers/dom";
import {useDialogBaseWidth} from "~/composables/dialog";
import {Folder} from "~/models/folder";

const emit = defineEmits(['folder', 'state'])
const props = defineProps({
  state: {type: Boolean},
})

let value = toRef(props, 'state')
let dialog_state = ref(false)
let is_submitting = ref(false)
const dialog_width = ref(useDialogBaseWidth())

const options = []
const folders = Folder.get_folders()
for (const foldersKey in folders) {
  options.push({label: folders[foldersKey].name})
}

const ref_form = ref<FormInstance>()

const date = new Date()
const form = reactive({
  folder: '/home/ahmard/Videos/Documentaries',
})

const rules = reactive({
  folder: [required('folder'), length('folder', 3, 2000)],
})

watch(value, val => dialog_state.value = val);
watch(dialog_state, val => emit('state', val))

if (!isMobileView()) {
  dialog_width.value = '450px'
}

function reset_form() {
  form.folder = ''
}

function hide_dialog() {
  dialog_state.value = false
}

async function submit_form(el_form: FormInstance) {
  await el_form.validate((is_valid, fields) => {
    if (is_valid) {
      is_submitting.value = true
      emit('folder', form.folder)
      setTimeout(() => {
        is_submitting.value = false
        dialog_state.value = false
        // reset_form()
      }, 500)
    }
  })
}

</script>

<style>
.el-date-editor .el-input__wrapper {
  width: calc(100% - 30px) !important;
}

</style>
