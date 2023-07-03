<template>
  <el-form-item v-if="withLabel" :label="label" :prop="name">
    <el-select
      ref="select"
      required
      size="large"
      class="w-100"
      :id="id"
      :style="selectStyle"
      v-model="theValue"
      remote
      clearable
      remote-show-suffix
      default-first-option
      reserve-keyword
      :placeholder="placeholder"
      :filterable="searchable"
      :clearable="clearable"
      :value-key="valueKey"
      :multiple="multiple"
      :remote="is_remote"
      :filter-method="endpoint ? filter : undefined"
      :remote-method="endpoint ? searchRemoteData : null"
      :loading="loading"
      :name="name"
      :disabled="disabled"
      @change="onChange"
      @focus="onFocus">
      <el-option
        v-for="item in results"
        :key="item[valueKey]"
        :label="makeOptionLabel(item)"
        :value="item[valueKey]">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import {xhrGet} from "~/helpers/xhr";

export default {
  name: "Combobox",
  props: {
    id: {default: 'combobox'},
    name: {default: 'combobox'},
    label: {type: String},
    rules: {default: () => []},
    items: {default: () => []},
    selectStyle: {default: null},
    selectClass: {default: null},
    value: {default: null},
    searchable: {default: true},
    clearable: {default: false},
    multiple: {default: false},
    disabled: {default: false},
    isLoading: {default: false},
    withLabel: {default: true},
    textKey: {default: 'title'},
    textSeparator: {default: ' '},
    valueKey: {default: 'value'},
    endpoint: {default: null},
    placeholder: {default: 'Please enter a keyword'},
  },
  watch: {
    theValue(val) {
      if (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    },
    value(val) {
      if (this.endpoint && val) {
        this.triggerRemoteSearch(val)
      }

      if (!this.endpoint) {
        this.theValue = val
      }

      if (!val) {
        this.theValue = null
      }
    },
    items(val) {
      if (!this.endpoint && this.items) {
        this.results = val
      }
    },
    isLoading(val) {
      this.loading = val
    }
  },
  data() {
    return {
      theValue: null,
      loading: true,
      is_remote: true,
      results: [],
    }
  },
  methods: {
    onChange(value) {
      for (let i = 0; i < this.results.length; i++) {
        if (this.results[i][this.valueKey] === value) {
          this.$emit('item', this.results[i]);
          break;
        }
      }
    },
    onFocus(e) {
      this.$emit('focus', e)

      if (this.endpoint && !this.results.length) {
        this.searchRemoteData('')
      }
    },
    triggerRemoteSearch(value) {
      this.searchRemoteData(value).then(() => {
        nextTick(() => this.theValue = value)
      })
    },
    makeOptionLabel(data) {
      if (typeof this.textKey === 'string') {
        return data[this.textKey]
      }

      let label = ''
      this.textKey.forEach(key => {
        label += `${data[key]}${this.textSeparator}`
      })

      const separatorLength = this.textSeparator.length
      return label.slice(0, separatorLength - (separatorLength * 2))
    },
    searchRemoteData(q) {
      if (this.is_remote) {
        this.loading = true
        return xhrGet(this.endpoint, {q, search: q, purpose: 'form_select'})
          .then(resp => this.results = resp.data)
          .finally(() => this.loading = false)
      }
    },

    filter(...x) {
      // console.log(x)
    }
  },
  mounted() {
    if (this.endpoint && this.value) {
      this.triggerRemoteSearch(this.value)
    }

    if (!this.endpoint && this.value) {
      this.theValue = this.value.id
    }

    if (!this.endpoint && this.items) {
      this.results = this.items
      this.loading = false
      this.is_remote = false
    }

    if (this.value) {
      nextTick(() => this.theValue = this.value)
    }
  }
}
</script>

<style scoped>

</style>
