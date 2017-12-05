<template>
  <div class="app flex-row align-items-center">

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">

        <b-alert :show="showError"
             variant="warning"
             @dismissed="showError=0"
             @dismiss-count-down="countDownChanged" dismissible v-html='message'>

    </b-alert>

          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                   <input v-model="data.email" v-validate="'required|email'" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Email">
                </div>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input v-model="data.password" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="●●●●●●●">
                </div>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="validateBeforeSubmit">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <router-link class="btn btn-link px-0" :to="{ name: 'ResetPassword' }">Forgot your password?</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="card text-white bg-info py-5 d-md-down-none" style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>New to Cassiny?</h2>
                  <p>Sign up now, it's for free :)
                  </p>
                  <router-link :to="{ name: 'Signup' }" class="btn btn-primary active mt-3">Start now ➞</router-link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    data: {
      email: null,
      password: null
    },
    message: null,
    showError: null
  }),

  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.login()
      }
    },
    countDownChanged (showError) {
      this.showError = showError
    },
    login () {
      var redirect = this.$auth.redirect()
      this.$auth.login({
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.data,
        redirect: { name: redirect ? redirect.from.name : 'Home' },
        success (res) {
          console.log('Auth Success')
          console.log('Token: ' + this.$auth.token())
        },
        error (err) {
          console.log(err.response.data)
          this.message = err.response.data.message
          this.showError = 10

          if (err.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(err.response.status)
            // console.log(err.response.data)
            // console.log(err.response.headers)
            this.error = err.response.data
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
          console.log(err.config)
        }
      })
    }
  }

}
</script>
