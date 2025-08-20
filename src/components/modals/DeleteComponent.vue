<template>
        <div class="modal fade" id="deleteComponent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  Are you sure you want to delete this record?
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger" @click="$emit('confirm')" data-bs-dismiss="modal">Save changes</button>
              </div>
              </div>
          </div>
        </div>
</template>
<script>
// import {Modal} from "bootstrap";

export default {
  name: "DeleteComponent",
  emits: ("confirm")
};
</script>
