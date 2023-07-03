<template>
  <el-dialog
    top="20px"
    title="Transaction Receipt"
    v-model="dialogVisible"
    :width="dialog_width">
    <div class="d-flex justify-content-center">
      <div id="receipt-image-block">
        <img
          :id="preview_image_id"
          alt="Receipt"
          :src="image_url"
          class="image border border-light"
          id="receipt-preview-image"
          :style="{width: image_width, padding: 0, display: false}"
        />
      </div>
    </div>
    <div
      class="pt-3 pb-5 mb-5"
      v-if="loading"
      v-loading="loading"
      element-loading-text="Loading Preview">
    </div>
    <template #footer>
      <div class="dialog-footer d-flex justify-content-end">
        <el-button
          :icon="ElIconPicture"
          class="force-show-sm"
          @click="downloadImage">
          Image
        </el-button>
        <el-button
          :icon="ElIconDocument"
          class="force-show-sm"
          @click="downloadPdf">
          Pdf
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {isMobileView} from "~/helpers/dom";

export default {
  name: "DialogReceipt",
  props: {
    module: {type: String, required: true},
    itemId: {type: Number, required: true},
    value: {type: Boolean, required: true},
  },
  watch: {
    value(v) {
      this.$emit('input', v)
    }
  },
  data() {
    return {
      loading: true,
      dialogVisible: false,
      dialog_width: '310px',
      image_width: '305px',
      image_url: '',
      image_base64: '',
      pdf_url: '',
      preview_image_id: 'image-' + Date.now(),
    }
  },
  methods: {
    downloadImage() {
      window.open(this.image_url, '_blank')
    },
    downloadPdf() {
      window.open(this.pdf_url, '_blank')
    }
  },
  mounted() {
    if (!isMobileView()) {
      this.image_width = '370px'
      this.dialog_width = '380px'
    }

    const token = useAuth().tokenStrategy.token?.get().substring(7);
    this.pdf_url = useServerUrl(`receipts/${this.module}-transactions/${this.itemId}?token=${token}`)
    this.image_url = useServerUrl(`receipts/${this.module}-transactions/${this.itemId}?token=${token}&type=image`);

    const interval = setInterval(() => {
      const image = document.getElementById(this.preview_image_id);

      if (image) {
        clearInterval(interval);

        const isLoaded = image.complete && image.naturalHeight !== 0;
        const handle = () => {
          this.loading = false
          image.style.display = 'block'
        }

        image.onload = handle;

        if (isLoaded) handle();
      }
    }, 50)
  }
}
</script>

<style>
.el-dialog__body {
  padding: 0;
}
</style>
