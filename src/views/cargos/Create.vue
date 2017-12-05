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
      <div class="col-md-6">
        <b-card>
          <div slot="header">
            <strong>Create a a cargo</strong>
          </div>

          <b-form-fieldset description="Give a short description about your probe" label="Name" :label-cols="3" :horizontal="true">
            <b-form-input type="text" v-model="cargo.description"></b-form-input>
          </b-form-fieldset>

           <b-form-fieldset description="Give a short description about your probe" label="Repository" :label-cols="3" :horizontal="true">
            <b-form-input type="text" v-model="cargo.repository"></b-form-input>
          </b-form-fieldset>

          <b-form-fieldset description="You can specify a size for your cargo" label="Size (GB)" :label-cols="3" :horizontal="true">
            <b-form-input type="number" v-model="cargo.size"></b-form-input>
          </b-form-fieldset>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click="validateBeforeSubmit">
              <i class="fa fa-dot-circle-o"></i> Launch!</b-button>
            <b-button type="reset" size="sm" variant="danger" @click="cleanForm">
              <i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-md-6">
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
export default {
  name: 'CreateProbes',
  data () {
    return {
      user: {
        blueprints: [],
        cargos: []
      },
      cargo: {
        size: 10,
        description: null,
        repository: null
      },
      message: {
        status: null,
        text: null
      }
    }
  },
  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.createCargo()
      }
    },
    cleanForm () {
      this.cargo = {
        size: 1,
        description: '',
        repository: null
      }
    },
    createCargo () {
      this.$http.post('/spawner/cargos', this.cargo)
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
        // We've tried to reconnect so increment the attempts by 1
        this.message.text = null
        this.message.status = null
        // wait 10 seconds before removing the message
      }, 10000)
    }
  }
}
</script>

<style lang="scss">
</style>
