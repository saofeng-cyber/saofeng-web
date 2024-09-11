<script setup lang="ts">
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;
const initDropzone = () => {
  const previewNode = document.getElementById('template') as HTMLElement;
  previewNode.id = '';
  const previewTemplate = (previewNode?.parentNode as HTMLElement).innerHTML;
  const myDropzone = new Dropzone('#my-dropzone', {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 120,
    thumbnailHeight: 120,
    thumbnailMethod: 'crop',
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: '#dropzone-list', // Define the container to display the previews
    clickable: true // Define the element that should be used as click trigger to select files.
  });
  myDropzone.on('addedfile', (file: any) => {
    console.log(`File added: ${file.name}`);
  });
};
onMounted(() => {
  initDropzone();
});
</script>
<template>
  <div id="my-dropzone">
    <div class="dz-preview dz-file-preview">
      <div class="dz-default dz-message">Drop files here to upload</div>
      <div id="dropzone-list">
        <div id="template" class="flex items-center py-2 mb-3">
          <div>
            <span class="preview">
              <img class="shadow rounded-xl" data-dz-thumbnail />
            </span>
          </div>
          <div class="flex-1 px-3 dz-filename">
            <h4 class="text-[#29294d]" data-dz-name></h4>
            <p data-dz-size class="small text-muted mb-0 text-[#8898AA]"></p>
          </div>
          <div class="dz-progress"></div>
          <div class="dz-error-message"></div>
          <div class="dz-success-mark"></div>
          <div class="dz-error-mark"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dz-message {
  text-align: center;
  padding: 32px 16px;
  background-color: #fff;
  border: 1px dashed #dee2e6;
  border-radius: 0.375rem;
  color: #8898aa;
}
</style>
