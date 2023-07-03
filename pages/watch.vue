<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-11 col-xl-11">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Movie Listing</el-breadcrumb-item>
            <el-breadcrumb-item>Watch</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div>
          <video v-if="is_found" id="example" :poster="poster_url">
            <source :src="video_url" type="video/mp4">
            <!--              <track kind="captions" label="English" srclang="en" src="<<path-to-caption.vtt>>">-->
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const vid = useRoute().query.v
const is_found = ref(true)
const video_url = useApiUrl(`movies/${vid}/watch`)
const poster_url = useApiUrl(`movies/listing/${vid}/thumbnail`)


onMounted(function () {
  nextTick(() => {
    const demo = new Moovie({
      selector: "#example",
      dimensions: {
        width: "100%"
      },
      icons: {
        path: "https://cdn.jsdelivr.net/gh/BMSVieira/moovie.js@latest/icons/"
      }
    });
  })
})

</script>

<style scoped>

</style>
