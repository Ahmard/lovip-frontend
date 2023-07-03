<template>
  <div>
    <el-table
      v-loading="is_loading"
      border
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @row-click="handleRowClick">
      <slot />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search"/>
        </template>
        <template #default="scope">
          <slot name="action" v-bind:row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <div class="d-flex justify-content-center mt-3">
      <pagination
        :current-page="current_page + 1"
        :page-size="per_page"
        :total-data="total_data"
        @page-change="p => current_page = p - 1"
        @size-change="s => per_page = s"
      />
    </div>
  </div>
</template>

<script>
import {xhrGet} from "~/helpers/xhr";
import 'element-plus/theme-chalk/display.css'

export default {
  name: "Datatable",
  props: {
    tableName: {default: 'Records'},
    endpoint: {default: null},
    perPage: {default: 10},
    orderColumn: {default: null},
    orderDirection: {default: null},
  },
  watch: {
    search() {
      nextTick(() => this.fetchData())
    },
    current_page() {
      nextTick(() => this.fetchData())
    },
    per_page() {
      nextTick(() => this.fetchData())
    }
  },
  data() {
    return {
      isSearchPopoverVisible: true,
      failure: false,
      is_loading: true,
      tableData: [],
      search: '',
      per_page: this.perPage,
      current_page: 0,
      total_data: 0,
    }
  },
  methods: {
    handleRowClick(rowData, component, event) {
      if (
        event.target.tagName === 'TD'
        ||( event.target.tagName === 'DIV' && event.target.classList.contains('cell'))
      ) {
        this.$emit('row-click', rowData, component, event);
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    fetchData() {
      this.is_loading = true
      const params = {
        q: this.search,
        page: this.current_page,
        start: this.current_page,
        length: this.per_page,
        order_by: this.orderColumn,
        order_dir: this.orderDirection
      };

      xhrGet(this.endpoint, params)
        .then(resp => {
          console.log(resp.data)
          this.failure = false
          this.tableData = resp.data
          this.total_data = resp.recordsTotal
        })
        .catch((e) => {
          this.failure = true
          console.log(e)
        })
        .finally(() => this.is_loading = false)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
