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
              <div class="text-uppercase pt-2">Directory Listing</div>
              <div>
                <el-button
                  class="button"
                  :icon="ElIconFolderOpened"
                  @click="open_set_folder_dialog">
                  Set Folder
                </el-button>
                <el-button
                  v-if="is_fetched"
                  class="button"
                  :icon="ElIconRefresh"
                  @click="fetch_listing(folder)">
                  Refresh
                </el-button>
              </div>
            </div>
          </template>
          <div class="text item p-3">
            <div v-loading="is_fetching" style="min-height: 200px; width: inherit">
              <div class="row">
                <div v-if="!is_fetched">
                  <el-empty :image-size="200"/>
                </div>

                <div
                  v-if="is_fetched"
                  v-for="item in videos"
                  class="col-3 cursor-pointer"
                  @click="e => watch_video(e, item)">
                  <el-card class="mb-2 listing-item hoverable" shadow="always">
                    <el-image
                      :src="item.thumbnail_url"
                      :style="{ height:'167px' }"
                      lazy>
                      <template #error>
                        <div class="image-slot">
                          <el-icon>
                            <el-icon-picture/>
                          </el-icon>
                        </div>
                      </template>
                    </el-image>
                    <div class="mt-2">
                      <b>Name:</b> {{ item.name }}
                    </div>

                    <div class="mt-auto mb-0 text-end">
                      <el-button :icon="ElIconDownload" @click="download(item)">
                        Download
                      </el-button>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <SetFolderDialog
      :state="set_folder_dialog"
      @state="v => set_folder_dialog = v"
      @folder="f => folder = f"
    />
  </div>
</template>

<script lang="ts" setup>

import {xhrGet} from "~/helpers/xhr";
import {ListingItem} from "~/models/listing.item";
import SetFolderDialog from "~/components/Listing/SetFolderDialog.vue";
import {HtmlEvent} from "~/types/html.event";

let mode = ref('create');
let set_folder_dialog = ref(false)
let table_key = ref('beneficiaries-' + Date.now())

let is_fetching = ref(false)
let is_fetched = ref(false)
let listing = ref([])
let videos = ref([])
let folder = ref(localStorage.getItem('current_directory') ?? '')

watch(folder, f => {
  fetch_listing(f)
  localStorage.setItem('current_directory', f)
})

function open_set_folder_dialog() {
  mode.value = 'create'
  set_folder_dialog.value = true
}

function fetch_listing(folder: string) {
  is_fetching.value = true
  let base64_folder = btoa(folder)
  xhrGet(useApiUrl(`movies/listing/${base64_folder}`))
    .then(resp => {
      videos.value = []

      listing.value = resp.data.items.map(item => {
        if (item.is_video) {
          let video = item;
          video.thumbnail_url = useApiUrl(`movies/listing/${item.id}/thumbnail`)
          videos.value.push(video)
        }

        return item
      })

      is_fetched.value = true
    })
    .finally(() => is_fetching.value = false)
}

function watch_video(e: HtmlEvent, video: ListingItem) {
  if (e.currentTarget.nodeName === 'DIV') {
    useRouter().push(`/watch?v=${video.id}`)
  }
}

function download(video: ListingItem) {
  window.open(useApiUrl(`movies/${video.id}/watch`), '_blank')
}

if (folder.value) {
  fetch_listing(folder.value)
}
</script>

<style scoped>
.listing-item {
  min-height: 300px;
  inline-size: 340px;
  margin-right: 10px!important;
  overflow-wrap: break-word;
}
</style>
