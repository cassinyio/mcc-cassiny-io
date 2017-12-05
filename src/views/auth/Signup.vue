<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="row" v-if="message.text">
      <div class="col-md-12">
        <b-card :class="{'bg-danger': !message.status, 'bg-info': message.status}">
          {{message.text}}
        </b-card>

      </div>
      <!--/.col-->
    </div>
    <!--/.row-->
          <div class="card mx-4">
            <div class="card-body p-4">
              <h1>Join Cassiny</h1>
              <p class="text-muted">Create your account for free</p>

              <div class="input-group mb-3">
                <span class="input-group-addon">
                  <i class="icon-user"></i>
                </span>
                <input v-model="data.first_name" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('last_name') }" name="first_name" type="text" placeholder="First name" />
                <br/><br/>

                <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon">
                  <i class="icon-user"></i>
                </span>
                <input v-model="data.last_name" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('last_name') }" name="last_name" type="text" placeholder="Last name">
                 <br/><span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon">@</span>
                <input v-model="data.email" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Your email">
                 <br/><span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-addon">
                  <i class="icon-lock"></i>
                </span>
                <input v-model="data.password" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="●●●●●●●">
                 <br/><span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
              </div>

              <p>
                When you sign-up you agree with our
                <strong>
                  <a href="https://www.cassiny.io/company/terms/">Terms of Service</a>
                </strong> and
                <strong>
                  <a href="https://www.cassiny.io/company/privacy-security/">Privacy Policy</a>
                </strong>.
              </p>
              <button type="button" class="btn btn-block btn-success" @click="validateBeforeSubmit">Create Account</button>
            </div>
            <div class="card-footer p-4 text-center">
              <div class="row">
                <div class="col-12">
                  <router-link :to="{ name: 'Login' }" class="btn btn-primary active mt-3 center">Do you already have an account?</router-link>
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
  name: 'Signup',
  data: () => ({
    data: {
      first_name: null,
      last_name: null,
      email: null,
      password: null
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
        this.signup()
      }
    },
    signup () {
      this.ClearErrorMessage()
      this.$http.post('/auth/signup', this.data)
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
    cancel () {
      this.ClearErrorMessage()
      for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) this.data[key] = null
      }
    },
    ClearErrorMessage () {
      this.message.text = null
      this.message.status = null
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
