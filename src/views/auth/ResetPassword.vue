<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">

        <div class="col-md-6">

          <div class="card mx-4">

            <div class="card-body p-4">
              <h1>Reset password</h1>
              <p class="text-muted">Can't login in your account? Don't worry we are here to help.</p>

              <div class="input-group mb-3">
                <span class="input-group-addon">@</span>
                <input v-model="data.email" v-validate="'required|email'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Type your email here">
              </div>

              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              <button type="button" class="btn btn-block btn-success" @click="validateBeforeSubmit">Send email</button>
            </div>
            <div class="card-footer p-4">
              <div class="row">
                <div class="col-12 text-center">
                  <router-link :to="{ name: 'Login' }">Login</router-link> or <router-link :to="{ name: 'Signup' }">Sign-up</router-link>
                </div>
              </div>
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
      email: null
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
        this.reset()
      }
    },
    reset () {
      this.$http.post('/auth/reset', this.data)
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
