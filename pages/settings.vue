<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 col-sm-12 col-lg-5 col-xl-5">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Settings</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <div class="text-uppercase pt-2">Application Settings</div>
            </div>
          </template>
          <div class="text item p-3">
            <el-form label-position="top" ref="ref_form" :model="form">
              <el-form-item label="Server Address">
                <el-input
                  type="url"
                  size="large"
                  placeholder="localhost:6501"
                  :prefix-icon="ElIconDataLine"
                  v-model="form.url"
                />
              </el-form-item>

              <div class="text-end mt-3">
                <el-button
                  type="primary"
                  :icon="ElIconCheck"
                  @click.prevent="save_settings(ref_form)">
                  Save Settings
                </el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import {required, url} from "~/helpers/from_validation";
import {FormInstance} from "element-plus";

useSeoMeta({title: 'Settings'})

const ref_form = ref<FormInstance>()
const form = reactive({
  url: localStorage.getItem('server') ?? ''
})

const rules = reactive({
  folder: [required('folder'), url('folder')],
})

async function save_settings(el_form: FormInstance) {
  await el_form.validate((is_valid, fields) => {
    if (is_valid) {
      localStorage.setItem('server', form.url)
      ElNotification({
        title: 'Success',
        message: 'Settings updated successfully',
        type: 'success',
      })

      setTimeout(() => window.location.reload(), 1000)
    }
  });
}
</script>

<style scoped>

</style>
