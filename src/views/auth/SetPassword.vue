<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-4">
            <div class="card-body p-4">
              <h1>Set a new password</h1>

              <p class="text-muted">Type your new passwords and press the green button :)</p>

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input v-model="data.password" v-validate="'required|min:6'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="●●●●●●●">
              </div>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input v-model="data.password_1" v-validate="'required|confirmed:password'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('password_1') }" name="password_1" type="password" placeholder="●●●●●●●">
              </div>
              <span v-show="errors.has('password_1')" class="help is-danger">{{ errors.first('password_1') }}</span>

              <button type="button" class="btn btn-block btn-success" @click="validateBeforeSubmit">Set new password!</button>
            </div>

          </div>
          <b-card v-if="message.text" :class="{'text-center': true, 'bg-danger': !message.status, 'bg-info': message.status}">
            {{message.text}}
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data: () => ({
    data: {
      password: null,
      password_1: null,
      token: null
    },
    message: {
      status: null,
      text: null
    }
  }),

  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.data.token = this.$route.params.token
        this.setpassword()
      }
    },
    setpassword () {
      this.$http.post('/auth/set_password', this.data)
        .then(response => {
          // JSON responses are automatically parsed.
          this.message.text = response.data.message
          this.message.status = true
        })
        .catch(err => {
          console.log(err.response.data)
          this.message.text = err.response.data.message
          this.message.status = false
        })
    }
  }
}
</script>