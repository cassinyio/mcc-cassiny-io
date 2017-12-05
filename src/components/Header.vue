<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item class="d-md-down-none" @click="asideToggle">
        <i class="icon-bell"></i><span class="badge badge-pill badge-danger" v-if="messages">{{messages}}</span>
      </b-nav-item>

      <b-nav-item-dropdown right>
        <template slot="button-content">
          <img v-bind:src="$auth.user().user['gravatar_url']" class="img-avatar">
          <span class="d-md-down-none">{{$auth.user().user['first_name']}} {{$auth.user().user['last_name']}}</span>
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-bell-o"></i> Updates<span class="badge badge-info">42</span></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Settings' }"><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-usd"></i> Payments<span class="badge badge-default">42</span></b-dropdown-item>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    &nbsp;&nbsp;&nbsp;
  </header>
</template>
<script>
export default {
  name: 'header',
  data: () => ({
    messages: 0
  }),
  created () {
    this.eventHub.$on('messages:length', data => {
      this.messages = data
    })
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    logout () {
      this.eventHub.$off('messages:length')
      this.$http.get('/auth/logout')
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          // this.Notify(response.data.message, 'success')
        })
        .catch(err => {
          console.log(err.response.data)
          // this.Notify(err.response.data.message, 'danger')
        })
      this.$auth.logout({
        redirect: '/login',
        makeRequest: false
        // params: {},
        // success: function () {},
        // error: function () {},
        // etc...
      })
    }
  }
}
</script>
