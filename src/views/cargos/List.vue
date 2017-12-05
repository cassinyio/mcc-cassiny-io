<template>
  <div class="animated fadeIn">
    <div class="row">

      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Cargos">
          <table class="table table-striped">
            <thead>
              <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Access key</th>
                    <th>Secret key</th>
                    <th>Owner</th>
                    <th>Size (in GB)</th>
                    <th>Attached</th>
                    <th></th>
                    <th></th>
                  </tr>
            </thead>
            <tbody>
              <tr v-for="(cargo, index) in cargos">

                    <td>{{index+1}}</td>
                    <td>{{cargo.name}}</td>
                    <td>{{cargo.description}}</td>
                    <td>{{cargo.access_key}}</td>
                    <td>{{cargo.secret_key}}</td>
                    <td>{{cargo.owner}}</td>
                    <td>{{cargo.size}}</td>
                    <td class="is-icon">
                      <span class="badge badge-success" v-if="cargo.attached">Yes</span>
                  <span class="badge badge-secondary" v-else>No</span>
                    </td>
                    <td class="is-icon">
                      <b-button size="sm" variant="info">Share</b-button>
                      </a>
                    </td>
                    <td class="is-icon">

                      <b-button size="sm" variant="warning" disabled v-if="cargo.attached">Can't delete attached cargo</b-button>
                      <b-button size="sm" variant="danger" v-on:click="confirmDeleteCargo(cargo.name,cargo.id)" v-else>Delete</b-button>
                    </td>
                  </tr>
             </tbody>
          </table>
        </b-card>
      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <b-modal title="Do you really want to delete this cargo?" v-model="showModal" @ok="deleteCargo">
      Do you really want to delete cargo <i>{{selected_cargo.name}}</i>?
      <br />
      <br />
      <strong>There is no way back from this, all your data STORED inside the cargo will be lost.</strong>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'cargos',
  data: () => ({
    cargos: [],
    selected_cargo: {
      id: null,
      name: null
    },
    showModal: false,
    message: null
  }),

  // Fetches posts when the component is created.
  created () {
    this.loadCargos()
  },

  methods: {

    confirmDeleteCargo (name, id) {
      this.showModal = true
      this.selected_cargo.name = name
      this.selected_cargo.id = id
    },

    loadCargos () {
      this.$http.get('/spawner/cargos')
        .then(response => {
          // JSON responses are automatically parsed.
          this.cargos = response.data.cargos
        })
        .catch(err => {
          this.message = err.response.data.message
        })
    },

    deleteCargo () {
      this.$http.delete('/spawner/cargos/' + this.selected_cargo.id)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.message = response.data.message
          this.showModal = false
          this.selected_cargo.name = null
          this.selected_cargo.id = null
          this.loadCargos()
        })
        .catch(err => {
          console.log(err.response.data)
          this.message = err.response.data.message
        })
    },

    closeModal () {
      this.showModal = false
      this.selected_cargo.name = null
      this.selected_cargo.id = null
    }
  }
}
</script>
