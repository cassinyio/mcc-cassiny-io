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
        <b-card header="<i class='fa fa-align-justify'></i> Jobs">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Blueprint</th>
                <th>Machine</th>
                <th>Cargo</th>
                <th>Created</th>
                <th>Running time</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(job, index) in jobs">

                    <td>{{index+1}}</td>
                    <td><a v-on:click="loadLogs(job.name)">{{job.name}}</a></td>
                    <td>{{job.owner}}</td>
                    <td>{{job.blueprint}}</td>
                    <td>{{job.machine}}</td>
                    <td>{{job.cargo_id}}</td>
                    <td>{{job.created_at}}</td>
                    <td>{{job.running_time}}</td>
                    <td>
                      <span class="badge badge-success" v-if="job.running">Running</span>
                  <span class="badge badge-secondary" v-else>Stopped</span>
                    </td>
                    <td class="is-icon">
                        <b-button size="sm" variant="warning" v-if="job.running" v-on:click="stopJob(job.id)">Stop</b-button>
                  <b-button size="sm" variant="success" v-else v-on:click="stopJob(job.id)">Run</b-button>
                    </td>
                    <td class="is-icon">
                        <b-button size="sm" variant="danger" v-on:click="confirmDeleteJob(job.name,job.id)">Delete</b-button>
                    </td>
                  </tr>

            </tbody>
          </table>
        </b-card>
      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <b-modal title="Do you really want to delete this job?" v-model="showModal" @ok="deleteJob">
      Do you really want to delete cargo
      <i>{{selected_job.name}}</i>?
      <br />
      <br />
      <strong>There is no way back from this, all your data NOT STORED inside a cargo will be lost.</strong>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'ListJobs',
  data: () => ({
    logs: [],
    jobs: [],
    selected_job: {
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
    this.loadJobs()
  },

  methods: {

    confirmDeleteJob (name, id) {
      this.showModal = true
      this.selected_job.name = name
      this.selected_job.id = id
    },

    stopJobs (jobId) {
      var data = {'status': 'stop'}
      this.updateJobs(jobId, data)
    },

    startJobs (jobId) {
      var data = {'status': 'start'}
      this.updateJobs(jobId, data)
    },

    deleteJob () {
      this.$http.delete('/jobs/' + this.selected_job.id)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.showMessage(response.data.message, true)
          this.showModal = false
          this.selected_job.id = null
          this.selected_job.name = null
          this.loadJobs()
        })
        .catch(err => {
          console.log(err.response.data)
          this.showMessage(err.response.data.message, false)
        })
    },

    updateJobs (jobId, jobData) {
      this.$http.patch('/jobs/' + jobId, jobData)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.showMessage(response.data.message, true)
          this.loadJobs()
        })
        .catch(err => {
          console.log(err.response.data)
          this.showMessage(err.response.data.message, false)
        })
    },

    loadJobs () {
      this.$http.get('/jobs')
        .then(response => {
          // JSON responses are automatically parsed.
          this.jobs = response.data.jobs
        })
        .catch(err => {
          this.errors.push(err)
        })
    },

    loadLogs (name) {
      this.$http.get('/logs/' + name)
        .then(response => {
          // JSON responses are automatically parsed.
          this.logs = response.data.logs
        })
        .catch(err => {
          this.errors.push(err)
        })
    },

    closeModal () {
      this.showModal = false
      this.selected_job.id = null
      this.selected_job.name = null
    },

    showMessage (text, status) {
      this.message.text = text
      this.message.status = status
      setTimeout(() => {
        // We've tried to reconnect so increment the attempts by 1
        this.message.text = null
        this.message.status = null
        // wait 10 seconds before removing the message
      }, 10000)
    }
  }
}
</script>
