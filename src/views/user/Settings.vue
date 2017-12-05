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
            <strong>Change password</strong>
          </div>

          <b-form-fieldset label="Your current password" :label-cols="3" :horizontal="true">
            <b-form-input type="password" v-model="passwords.old_password"></b-form-input>
          </b-form-fieldset>

          <b-form-fieldset label="New password" :label-cols="3" :horizontal="true">
            <b-form-input type="password" v-model="passwords.password_1"></b-form-input>
          </b-form-fieldset>

          <b-form-fieldset label="Retype your new password" :label-cols="3" :horizontal="true">
            <b-form-input type="password" v-model="passwords.password_2"></b-form-input>
          </b-form-fieldset>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click="validateBeforeSubmit">
              <i class="fa fa-dot-circle-o"></i> Save password</b-button>
            <b-button type="reset" size="sm" variant="danger" @click="cleanForm">
              <i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-md-6">

       <b-card>
       <div slot="header">
            <strong>Info about your account</strong>
          </div>

          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Settings</th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First name</td>
                <td>{{$auth.user().user['first_name']}}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{{$auth.user().user['last_name']}}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{{$auth.user().user['email']}}</td>
              </tr>
              <tr>
                <td>Account created</td>
                <td>{{$auth.user().user['created_at']}}</td>
              </tr>

              <tr>
                <td>Current plan</td>
                <td v-if="current_plan">{{current_plan.name}}</td>
                <td v-else>None</td>
              </tr>
              <tr>
                <td>Subscribed on</td>
                <td v-if="current_plan">{{current_plan.created_at}}</td>
                <td v-else>None</td>
              </tr>

            </tbody>
          </table>

        </b-card>

      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <div class="row">
      <div class="col-md-6">
        <b-card>
          <div slot="header">
            <strong>Subscription</strong>
          </div>

          <b-form-fieldset label="Select your plan" :label-cols="3" :horizontal="true">
            <b-form-select :plain="true" text-field="name" value-field="id" v-model="selected_plan" :options="plans" value="Please select a cargo">
            </b-form-select>
          </b-form-fieldset>

          <b-form-fieldset label="Add a credit card" :label-cols="3" :horizontal="true">
            <Paymill @tokeniz="addCard"></Paymill>
          </b-form-fieldset>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click="confirmSetPlan">
              <i class="fa fa-thumbs-o-up"></i> Save new plan</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-md-6">

      </div>
      <!--/.col-->
    </div>
    <!--/.row-->

    <b-modal title="Whoaa, you want to change your plan!" v-model="changePlanModal" @ok="setPlan">
     Do you want to proceed?
    </b-modal>

  </div>
</template>

<script>
import Paymill from '../components/Paymill'

export default {
  name: 'Settings',
  components: {
    Paymill
  },
  data () {
    return {
      user: null,
      message: {
        status: null,
        text: null
      },
      passwords: {
        old_password: null,
        password_1: null,
        password_2: null
      },
      plans: [],
      current_plan: null,
      subscription: null,
      token: null,
      selected_plan: null,
      changePlanModal: false
    }
  },
  created () {
    this.loadPlans()
    this.loadSubscription()
  },

  methods: {
    loadPlans () {
      this.$http.get('/billing/plans')
        .then(response => {
          // JSON responses are automatically parsed.
          this.plans = response.data.plans
        })
        .catch(err => {
          this.showMessage(err.response.data.message, false)
        })
    },

    loadSubscription () {
      this.$http.get('/billing/subscription')
        .then(response => {
          // JSON responses are automatically parsed.
          this.subscription = response.data.subscription
          this.current_plan = response.data.plan
        })
        .catch(err => {
          this.showMessage(err.response.data.message, false)
        })
    },

    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.changePassword()
      }
    },
    onOptionSelect (id) {
      this.api.blueprint_id = id
    },

    changePassword () {
      this.$http.patch('/auth/user', this.passwords)
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
    },

    cleanForm () {
      this.api = {
        machine: 1,
        blueprint: '',
        cargo: null,
        description: null
      }
    },

    addCard (token) {
      this.$http.post('/billing/card', { 'token': token })
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

    confirmSetPlan () {
      console.log(this.selected_plan)
      this.changePlanModal = true
    },

    setPlan () {
      if (this.selected_plan) {
        this.$http.post('/billing/subscription', { 'plan': this.selected_plan })
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response.data)
            this.showMessage(response.data.message, true)
          })
          .catch(err => {
            console.log(err.response.data)
            this.showMessage(err.response.data.message, false)
          })
      } else {
        var message = 'You need to select a plan before.'
        this.showMessage(message, false)
      }
    }
  }
}
</script>
