<template>
  <el-dialog
    v-model="dialogVisible"
    :width="dialog_width"
    :destroy-on-close="true">
    <div class="text-center">
      <div>
        <check-success/>
      </div>
      <div class="mt-3" style="font-size: 21px">{{ title }}</div>
      <div class="my-3" style="font-size: 19px">
        <slot>{{ message }}</slot>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer"></slot>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {isMobileView} from "~/helpers/dom";

export default {
  name: "DialogSuccessAlert",
  props: {
    title: {type: String, required: true},
    message: {type: String},
    value: {type: Boolean, required: true},
  },
  watch: {
    value(v) {
      this.$emit('input', v)
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialog_width: '310px',
    }
  },
  methods: {
    handleClose(...x) {
      console.log('Hello')
      this.dialogVisible = false
      this.$emit('close', ...x);
    }
  },
  mounted() {
    if (!isMobileView()) {
      this.dialog_width = '450px'
    }

    // this.dialogVisible = this.value
  }
}
</script>

<style scoped>

</style>
