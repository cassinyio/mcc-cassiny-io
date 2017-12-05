<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-4">
            <div class="card-body p-4">
              <h1>Confirm your e-mail</h1>
              <p class="text-muted">We care about security, this is why we need to confirm your email address.</p>

              <b-card class="bg-success" v-show="message">
                {{message}}
              </b-card>
              <b-card class="bg-danger" v-show="error_message">
                {{error_message}}
              </b-card>

            </div>

            <div class="card-footer p-4">

              <div class="row">

                <div class="col-12 text-center" v-show="message">
                  <router-link :to="{ name: 'Login' }" class="btn btn-primary px-4">Login now!</router-link>
                </div>

                <div class="col-12 text-center" v-show="error_message">
                  <strong>Is your token expired?</strong> You can easily generate a
                  <router-link :to="{ name: 'NewTokenConfirmEmail' }">new one</router-link>
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
  name: 'ConfirmEmail',
  data: () => ({
    data: {
      token: null
    },
    message: null,
    error_message: false
  }),
  // Fetches posts when the component is created.
  created () {
    this.data.token = this.$route.params.token
    this.$http.post('/auth/confirm_email', this.data)
      .then(response => {
        // JSON responses are automatically parsed.
        this.message = response.data.message
      })
      .catch(err => {
        console.log(err.response.data)
        this.error_message = err.response.data.message
      })
  }
}
</script>
