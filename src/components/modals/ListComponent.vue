<template>
        <div class="modal fade" id="listComponent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div class="modal-body">
                <div v-if="items.length">
                    <table class="table table-bordered table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item?.[primaryField] }}</td>
                            <td>{{ item?.[secondaryField]  }}</td>
                            <td>{{ item?.[thirdField]  }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div  v-else class="text-muted">No data</div>
              </div>

              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
              </div>
          </div>
        </div>
</template>
<script>
// import {Modal} from "bootstrap";

export default {
    name: "ListComponent",
    props:{
        title: {type: String, default: "Details"},
        items: {type: Array, default: () => []},
        primaryField: {type: String, default: "name"},
        secondaryField: {type: String, default: "surname"},
        thirdField: {type: String, default: ""},
        // primarySubTitle: {type: String, default: ""},
        // secondarySubTitle: {type: String, default: ""},
        // thirdSubTitle: {type: String, default: ""},
    }
};
</script>
