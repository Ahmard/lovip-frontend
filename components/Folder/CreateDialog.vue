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
          <el-form-item size="large" prop="full_name" label-width="0">
            <label for="full_name">Folder</label>
            <el-input
              type="text"
              id="full_name"
              :prefix-icon="ElIconFolder"
              v-model="form.folder"
              :disabled="is_submitting"
              placeholder="/path/to/folder"
            />
          </el-form-item>
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
            Save Folder
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

const emit = defineEmits(['folder', 'state', 'created', 'updated'])
const props = defineProps({
  state: {type: Boolean, required: true},
  mode: {type: String, required: true},
})

let value = toRef(props, 'state')
let dialog_state = ref(false)
let is_submitting = ref(false)
const dialog_width = ref(useDialogBaseWidth())

const ref_form = ref<FormInstance>()

const date = new Date()
const form = reactive({
  folder: '',
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

      Folder.add_folder(form.folder)

      emit('created', form.folder)

      is_submitting.value = false
      dialog_state.value = false

      reset_form()
    }
  })
}

</script>

<style>
.el-date-editor .el-input__wrapper {
  width: calc(100% - 30px) !important;
}

</style>
