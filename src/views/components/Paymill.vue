<template>
  <div>
    <b-modal
    title='Add a credit card'
    size='sm'
    v-model='CreditCardModal'
    >
      <div :id='formId'>
        <input type='hidden' id='paymillToken' name='paymillToken' v-model='paymillToken'>

          <!-- insert a button to submit the form -->

      </div>
      <div slot="modal-footer" class="w-100">

       <b-btn size="sm" variant="secondary" @click="CreditCardModal=false">
         Close
       </b-btn>

       <b-btn size="sm" variant="primary" @click="addCreditCard">
         Save credit card
       </b-btn>
     </div>
    </b-modal>

    <b-button type='submit' size='sm' variant='primary' @click='CreditCardModal=true'>
      <i class='fa fa-credit-card'></i> Add a credit card
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    formId: {
      type: String,
      required: false,
      default: 'vue-paymill'
    },
    button: {
      type: String,
      require: false,
      default: 'Purchase'
    },
    onSuccess: {
      type: String,
      required: false,
      default: 'submit',
      validator: function (value) {
        return value === 'submit' || value === 'broadcast'
      }
    }
  },
  data () {
    return {
      paymillToken: '',
      loaded: false,
      CreditCardModal: false
    }
  },
  mounted () {
    this.injectCheckoutScript()
  },

  methods: {
    injectCheckoutScript () {
      console.log('inject')
      window.PAYMILL_PUBLIC_KEY = '64681198309fe77e2299fa6a7e283c1f'
      const script = document.createElement('script')
      script.src = 'https://bridge.paymill.com/'
      script.onload = () => this.configurePaymill()
      document.body.appendChild(script)
    },

    configurePaymill () {
      window.paymill.embedFrame(this.formId, { lang: 'en' }, function (error) {
        // Frame could not be loaded, check error object for the reason
        if (error) {
          // Example: 'container_not_found'
          console.log(error.apierror, error.message)
        } else {
          // Frame was loaded successfully
          console.log('Paymill loaded')
        }
      })
    },

    addCreditCard () {
      window.paymill.createTokenViaFrame(
        {
          amount_int: 100, // required
          currency: 'EUR', // required
          email: this.$auth.user().user['email'] // required
        },
        (error, result) => {
          // Handle error or process result.
          if (error) {
            // Token could not be created, check error object for reason.
            console.log(error.apierror, error.message)
          } else {
            this.$emit('tokeniz', result.token)
            this.CreditCardModal = false
            // Token was created successfully and can be sent to backend.
            // If you want to log the response in the console
            console.log(result.token)
          }
        }
      )
    }
  }
}
</script>

<style>

.modal {
  text-align: center;
  padding: 0!important;
}

.modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

</style>