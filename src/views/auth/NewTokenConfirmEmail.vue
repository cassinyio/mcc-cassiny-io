<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <b-alert :show="showError"
             variant="warning"
             @dismissed="showError=0"
             @dismiss-count-down="countDownChanged" dismissible v-html='message'>

    </b-alert>

          <div class="card mx-4">
            <div class="card-body p-4">
              <h1>Send me a new confirmation e-mail</h1>
              <p class="text-muted">We are really sorry you are having this issue to activate your account :(</p>

              <div class="input-group mb-3">
                <span class="input-group-addon">@</span>
                <input v-model="data.email" v-validate="'required|email'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Type your email here">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              </div>

              <button type="button" class="btn btn-block btn-success" @click="validateBeforeSubmit">Send email</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewTokenConfirmEmail',
  data: () => ({
    data: {
      email: null
    },
    message: null,
    showError: null
  }),

  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.reset()
      }
    },
    reset () {
      this.$http.post('/auth/new_email', this.data)
        .then(response => {
          // JSON responses are automatically parsed.
          this.message = response.data.message
          this.showError = 10
        })
        .catch(err => {
          console.log(err.response.data)
          this.message = err.response.data.message
          this.showError = 10
        })
    }
  }
}
</script>
