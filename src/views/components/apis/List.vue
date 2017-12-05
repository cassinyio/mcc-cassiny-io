<template>
  <div class="animated fadeIn">
    <div class="row">

      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> APIs">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Blueprint</th>
                <th>Endpoint</th>
                <th>Created</th>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(api, index) in apis">

                    <td>{{index+1}}</td>
                    <td>{{api.name}}</td>
                    <td>{{api.blueprint_name}}</td>
                    <td>{{api.url}}</td>
                    <td>{{api.created_at}}</td>
                    <td>
                      <span class="badge badge-success" v-if="api.running">Running</span>
                  <span class="badge badge-secondary" v-else>Stopped</span>
                    </td>
                    <td class="is-icon">
                        <b-button size="sm" variant="warning" v-if="api.path" v-on:click="startApi(api.id)">Stop</b-button>
                  <b-button size="sm" variant="success" v-else v-on:click="stopApi(api.id)">Run</b-button>
                    </td>
                    <td class="is-icon">
                        <b-button size="sm" variant="danger" v-on:click="confirmDeleteApi(api.name,api.id)">Delete</b-button>
                    </td>
                  </tr>
            </tbody>
          </table>
        </b-card>
      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <b-modal title="Do you really want to delete the API?" v-model="showModal" @ok="deleteApi">
      Do you really want to delete the api <i>{{selected_api.name}}</i>?
      <br />
      <br />
      <strong>There is no way back from this, all your data NOT STORED inside a cargo will be lost.</strong>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'apis',
  data: () => ({
    apis: [],
    selected_api: {
      id: null,
      name: null
    },
    showModal: false
  }),

  // Fetches posts when the component is created.
  created () {
    this.loadApis()
  },
  methods: {

    confirmDeleteApi (name, id) {
      this.showModal = true
      this.selected_api.name = name
      this.selected_api.id = id
    },

    stopApi (apiId) {
      var data = {'status': 'stop'}
      this.updateApi(apiId, data)
    },

    startApi (apiId) {
      var data = {'status': 'start'}
      this.updateApi(apiId, data)
    },

    deleteApi () {
      this.$http.delete('/apis/' + this.selected_api.id)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.message = response.data.message
          this.showModal = false
          this.selected_api.id = null
          this.selected_api.name = null
          this.loadApis()
        })
        .catch(err => {
          console.log(err.response.data)
          this.error_message = err.response.data.message
        })
    },

    updateApi (apiId, apiData) {
      this.$http.patch('/apis/' + apiId, apiData)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.message = response.data.message
          this.loadApis()
        })
        .catch(err => {
          console.log(err.response.data)
          this.error_message = err.response.data.message
        })
    },

    loadApis () {
      this.$http.get('/apis')
        .then(response => {
          // JSON responses are automatically parsed.
          this.apis = response.data.apis
        })
        .catch(err => {
          this.errors.push(err)
        })
    },

    closeModal () {
      this.showModal = false
      this.selected_api.id = null
      this.selected_api.name = null
    }
  }
}
</script>
