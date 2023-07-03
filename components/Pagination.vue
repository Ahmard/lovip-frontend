<template>
  <div class="demo-pagination-block" style="max-width: 1050px!important; overflow-x: auto">
    <el-pagination
      v-model:current-page="current_page"
      v-model:page-size="page_size"
      :page-sizes="[5, 10, 15, 30, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="true"
      :layout="layout"
      :total="total_data"
      :pager-count="pager_count"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {isMobileView} from "~/helpers/dom";

const props = defineProps({
  currentPage: {type: Number, default: 1},
  pageSize: {type: Number, default: 1},
  totalData: {type: Number, default: 1},
  pagerCount: {type: Number, default: 7},
  small: {type: Boolean},
  disabled: {type: Boolean, default: false},
  withJumper: {type: Boolean, default: false},
})

const emit = defineEmits(['pageChange', 'sizeChange'])

const current_page = ref(props.currentPage)
const pager_count = ref(props.pagerCount)
const page_size = ref(props.pageSize)
const total_data = toRef(props, 'totalData')
const disabled = toRef(props, 'disabled')
const small = ref(props.small)
const layout = ref(`total, sizes, prev, pager, next, ${props.withJumper ? 'jumper' : null}`)

if (isMobileView()) {
  small.value = true
  pager_count.value = 5
  layout.value = 'total, prev, pager, next'
}

function onSizeChange(size: number) {
  emit('sizeChange', size)
}

function onPageChange(page: number) {
  emit('pageChange', page)
}
</script>

<style scoped>

</style>
