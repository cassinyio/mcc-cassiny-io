<template>
  <aside class="aside-menu">
    <b-tabs>

      <b-tab title="<i class='icon-speech'></i>">
        <div class="p-3">
          <template v-for="(message, index) in messages">
            <div class="message" @mousedown="removeMessage(index)">
              <div>
                <small class="text-muted">{{message.msg_type}}</small>
                <small class="text-muted float-right mt-1">{{message.timestamp}}</small>
              </div>
              <div class="text-truncate font-weight-bold">{{message.title}}t</div>
              <small class="text-muted">{{message.text}}</small>
            </div>
            <hr>

          </template>

        </div>
      </b-tab>
      <b-tab title="<i class='icon-settings'></i>">
        <div class="p-3">
          <h6>Settings</h6>
          <div class="aside-options">
            <div class="clearfix mt-4">
              <small>
                <b>Option 1</b>
              </small>
              <c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" :checked="true" />
            </div>
            <div>
              <small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
            </div>
          </div>
          <div class="aside-options">
            <div class="clearfix mt-3">
              <small>
                <b>Option 2</b>
              </small>
              <c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" />
            </div>
            <div>
              <small class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>
            </div>
          </div>
          <div class="aside-options">
            <div class="clearfix mt-3">
              <small>
                <b>Option 3</b>
              </small>
              <c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" />
            </div>
          </div>
          <div class="aside-options">
            <div class="clearfix mt-3">
              <small>
                <b>Option 4</b>
              </small>
              <c-switch type="text" variant="success" on="on" off="off" :pill="true" size="sm" class="float-right" :checked="true" />
            </div>
          </div>
          <hr>
          <h6>System Utilization</h6>
          <div class="text-uppercase mb-1 mt-4">
            <small>
              <b>CPU Usage</b>
            </small>
          </div>
          <b-progress class="progress-xs" variant="info" :value="25"></b-progress>
          <small class="text-muted">348 Processes. 1/4 Cores.</small>
          <div class="text-uppercase mb-1 mt-2">
            <small>
              <b>Memory Usage</b>
            </small>
          </div>
          <b-progress class="progress-xs" variant="warning" :value="70"></b-progress>
          <small class="text-muted">11444GB/16384MB</small>
          <div class="text-uppercase mb-1 mt-2">
            <small>
              <b>SSD 1 Usage</b>
            </small>
          </div>
          <b-progress class="progress-xs" variant="danger" :value="95"></b-progress>
          <small class="text-muted">243GB/256GB</small>
          <div class="text-uppercase mb-1 mt-2">
            <small>
              <b>SSD 2 Usage</b>
            </small>
          </div>
          <b-progress class="progress-xs" variant="success" :value="10"></b-progress>
          <small class="text-muted">25GB/256GB</small>
        </div>
      </b-tab>
    </b-tabs>
  </aside>
</template>

<script>
import Callout from './Callout'
import cSwitch from './Switch'

export default {
  name: 'aside',
  data: () => ({
    messages: [],
    attempts: 1,
    web_socket: null
  }),
  components: {
    Callout,
    cSwitch
  },
  mounted: function () {
    this.createWS()
  },
  methods: {
    createWS () {
      this.web_socket = new WebSocket('wss://mcc.cassiny.io/ws?token=' + this.$auth.token())

      this.web_socket.onopen = () => {
        // reset the tries back to 1 since we have a new connection opened.
        console.log('Connected')
        this.attempts = 1
        // ...Your app's logic...
      }
      this.web_socket.onmessage = (message) => this.receiveMessage(message)
      this.web_socket.onclose = () => {
        console.log('WS disconnected')
        var time = this.generateInterval(this.attempts)
        setTimeout(() => {
          // We've tried to reconnect so increment the attempts by 1
          this.attempts++
          // Connection has closed so try to reconnect every 10 seconds.
          this.createWS()
        }, time)
      }
    },
    receiveMessage (message) {
      var msgJson
      var msgLen
      // Send the "pingServer" event to the server.
      msgJson = JSON.parse(message.data)
      msgLen = this.messages.unshift({
        'msg_type': msgJson.msg_type,
        'title': msgJson.title,
        'text': msgJson.text,
        'timestamp': msgJson.timestamp
      })
      this.eventHub.$emit('messages:length', msgLen)
    },
    removeMessage (index) {
      this.messages.splice(index, 1)
      this.eventHub.$emit('messages:length', this.messages.length)
    },
    generateInterval (k) {
      var maxInterval = (Math.pow(2, k) - 1) * 1000
      if (maxInterval > 30 * 1000) {
        maxInterval = 30 * 1000 // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
      }
      // generate the interval to a random number between 0 and the maxInterval determined from above
      return Math.random() * maxInterval
    }
  }
}
</script>
