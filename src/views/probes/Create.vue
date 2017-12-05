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
      <div class="col-md-9">
        <b-card>
          <div slot="header">
            <strong>Create a Probe</strong> Elements
          </div>
          <b-form-fieldset description="Give a short description about your probe" label="Description" :label-cols="3" :horizontal="true">
            <b-form-input type="text" v-model="probe.description"></b-form-input>
          </b-form-fieldset>

          <b-form-fieldset description="Select the blueprint you would like to use" label="Blueprint" :label-cols="3" :horizontal="true">
            <typeahead :suggestions="user.blueprints" v-model="blueprint" @select="onOptionSelect">
            </typeahead>
          </b-form-fieldset>

          <b-form-fieldset description="Select a cargo if you want to have a shared storage solution" label="Cargo" :label-cols="3" :horizontal="true">
            <b-form-select :plain="true" text-field="name" value-field="id" v-model="probe.cargo_id" :options="user.cargos" value="Please select a cargo">
            </b-form-select>
          </b-form-fieldset>

          <b-form-fieldset description="Select the size of the machine you want to use" label="Machine" :label-cols="3" :horizontal="true">
            <b-form-radio :options="[
                    {text: 'Nano',value: '1'},
                    {text: 'Mega',value: '2'},
                    {text: 'Exa',value: '3'},
                    {text: 'Yotta+GPU',value: '4'}
                  ]" v-model="probe.machine" value="1" stacked></b-form-radio>
          </b-form-fieldset>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click="validateBeforeSubmit">
              <i class="fa fa-dot-circle-o"></i> Launch!</b-button>
            <b-button type="reset" size="sm" variant="danger" @click="cleanForm">
              <i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-md-3">
        <b-card header="Cargo hints" class="bg-info">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </b-card>

        <b-card header="Machine hints" class="bg-info">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </b-card>

      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

  </div>
</template>

<script>
import Typeahead from '../components/Typeahead'

export default {
  name: 'CreateProbes',
  components: {
    Typeahead
  },
  data () {
    return {
      user: {
        blueprints: [],
        cargos: []
      },
      probe: {
        machine: 1,
        blueprint_id: '',
        cargo_id: null,
        description: null
      },
      blueprint: '',
      message: {
        status: null,
        text: null
      }
    }
  },
  // Fetches blueprints and cargos when the component is created.
  created () {
    this.$http.get('/spawner/blueprints')
      .then(response => {
        // JSON responses are automatically parsed.
        this.user.blueprints = response.data.blueprints
      })
      .catch(err => {
        console.log(err)
        this.showMessage(err.response.data.message, false)
      })
    this.$http.get('/spawner/cargos')
      .then(response => {
        // JSON responses are automatically parsed.
        this.user.cargos = response.data.cargos
      })
      .catch(err => {
        console.log(err)
        this.showMessage(err.response.data.message, false)
      })
  },
  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.createProbe()
      }
    },
    onOptionSelect (id) {
      this.probe.blueprint_id = id
    },
    cleanForm () {
      this.probe = {
        machine: 1,
        blueprint_id: '',
        cargo_id: null,
        description: null
      }
    },
    createProbe () {
      this.$http.post('/spawner/probes', this.probe)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.showMessage(response.data.message, true)
        })
        .catch(err => {
          console.log(err.response.data)
          this.showMessage(err.response.data.message, false)
        })
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
