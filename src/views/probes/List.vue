<template>
  <div class="animated fadeIn">

    <div class="row" v-if="message.text">
      <div class="col-md-12">
        <b-card :class="{'bg-danger': !message.status, 'bg-info': message.status}">
          {{message.text}}
        </b-card>

      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <div class="row">

      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Probes">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Blueprint</th>
                <th>Cargo</th>
                <th>Link</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(probe, index) in probes">

                    <td>{{index+1}}</td>
                    <td>{{probe.name}}</td>
                    <td>{{probe.owner}}</td>
                    <td>{{probe.blueprint}}</td>
                    <td>{{probe.cargo_name}}</td>
                    <td class="is-icon">
                        <a :href="probe.url" v-if="probe.running" class="button primary">Connect</a>
                    </td>
                    <td>
                      <span class="badge badge-success" v-if="probe.running">Running</span>
                      <span class="badge badge-secondary" v-else>Stopped</span>
                    </td>
                    <td class="is-icon">
                        <b-button size="sm" variant="warning" v-if="probe.running" v-on:click="stopProbe(probe.id)">Stop</b-button>
                        <b-button size="sm" variant="success" v-else v-on:click="startProbe(probe.id)">Run</b-button>
                    </td>
                    <td class="is-icon">
                      <b-button size="sm" variant="danger" v-on:click="confirmDeleteProbe(probe.name,probe.id)">Delete</b-button>
                    </td>
              </tr>
           </tbody>
          </table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->

    <b-modal title="Do you really want to delete this probe?" v-model="showModal" @ok="deleteProbe">
      Do you really want to delete cargo <i>{{selected_probe.name}}</i>?
      <br />
      <br />
      <strong>There is no way back from this, all your data NOT STORED inside a cargo will be lost.</strong>
    </b-modal>


  </div>

</template>

<script>
export default {
  name: 'ListProbes',
  data: () => ({
    probes: [],
    selected_probe: {
      id: null,
      name: null
    },
    showModal: false,
    message: {
      status: null,
      text: null
    }
  }),

  // Fetches posts when the component is created.
  created () {
    this.loadProbes()
  },

  methods: {

    confirmDeleteProbe (name, id) {
      this.showModal = true
      this.selected_probe.name = name
      this.selected_probe.id = id
    },

    stopProbe (probeId) {
      var data = {'status': 'stop'}
      this.updateProbe(probeId, data)
    },

    startProbe (probeId) {
      var data = {'status': 'start'}
      this.updateProbe(probeId, data)
    },

    deleteProbe () {
      this.$http.delete('/spawner/probes/' + this.selected_probe.id)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.showMessage(response.data.message, true)
          this.showModal = false
          this.selected_probe.id = null
          this.selected_probe.name = null
          this.loadProbes()
        })
        .catch(err => {
          console.log(err.response.data)
          this.showMessage(err.response.data.message, false)
        })
    },

    updateProbe (probeId, probeData) {
      this.$http.patch('/spawner/probes/' + probeId, probeData)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.showMessage(response.data.message, true)
          this.loadProbes()
        })
        .catch(err => {
          console.log(err.response.data)
          this.showMessage(err.response.data.message, false)
        })
    },

    loadProbes () {
      this.$http.get('/spawner/probes')
        .then(response => {
          // JSON responses are automatically parsed.
          this.probes = response.data.probes
        })
        .catch(err => {
          this.showMessage(err.response.data.message, false)
        })
    },

    closeModal () {
      this.showModal = false
      this.selected_probe.id = null
      this.selected_probe.name = null
    },

    showMessage (text, status) {
      this.message.text = text
      this.message.status = status
      setTimeout(() => {
        this.message.text = null
        this.message.status = null
        // wait 10 seconds before removing the message
      }, 10000)
    }
  }
}
</script>
