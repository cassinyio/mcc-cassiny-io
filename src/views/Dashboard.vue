<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <b-card no-block footer-class="px-3 py-2">
          <div class="card-body p-3 clearfix">
            <i class="fa icon-rocket bg-primary p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">{{probes}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Running probes</div>
          </div>
          <div slot="footer">
            <router-link :to="{ name: 'ListProbes' }" class="font-weight-bold font-xs btn-block text-muted">View More <i class="fa fa-angle-right float-right font-lg"></i></router-link>
          </div>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card no-block footer-class="px-3 py-2">
          <div class="card-body p-3 clearfix">
            <i class="fa icon-chemistry bg-info p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">{{jobs}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Running jobs</div>
          </div>
          <div slot="footer">
            <router-link :to="{ name: 'ListJobs' }" class="font-weight-bold font-xs btn-block text-muted">View More <i class="fa fa-angle-right float-right font-lg"></i></router-link>
          </div>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card no-block footer-class="px-3 py-2">
          <div class="card-body p-3 clearfix">
            <i class="fa icon-chemistry bg-success p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">{{jobs}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Completed jobs</div>
          </div>
          <div slot="footer">
            <router-link :to="{ name: 'ListJobs' }" class="font-weight-bold font-xs btn-block text-muted">View More <i class="fa fa-angle-right float-right font-lg"></i></router-link>
          </div>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card no-block footer-class="px-3 py-2">
          <div class="card-body p-3 clearfix">
            <i class="fa icon-grid bg-warning p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 mt-2">{{apis}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Running APIs</div>
          </div>
          <div slot="footer">
            <router-link :to="{ name: 'ListAPIs' }" class="font-weight-bold font-xs btn-block text-muted">View More <i class="fa fa-angle-right float-right font-lg"></i></router-link>
          </div>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->


    <div class="row">
      <div class="col-md-12">
        <b-card header="Consume &amp; Logs">

          <b-table class="table-outline mb-0" hover responsive outline
            :items="tableLogs"
            :fields="tableFields"
            head-variant="default"
            >
            <template slot="type" scope="item">
              <i class="icon-rocket"></i>
            </template>
            <template slot="name" scope="item">
              <strong>{{item.value}}</strong>
            </template>
            <template slot="machine" scope="item">

            </template>
            <template slot="created" scope="item">
              <div class="small text-muted">Last login</div>
              <strong>{{item.value}}</strong>
            </template>
            <template slot="destroyed" scope="item">
              <div class="small text-muted">Last login</div>
              <strong>{{item.value}}</strong>
            </template>
            <template slot="usage" scope="item">
              <div class="clearfix">
                <div class="float-left">
                  <strong>{{item.value}} seconds</strong>
                </div>
              </div>
            </template>
            <template slot="payment" scope="item">

            </template>
          </b-table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
  </div>
</template>

<script>
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'

export default {
  name: 'dashboard',
  components: {
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample
  },
  data: function () {
    return {
      probes: null,
      jobs: null,
      apis: null,
      tableLogs: null,
      tableFields: {
        type: {
          label: 'Type',
          class: 'text-center'
        },
        name: {
          label: 'Name'
        },
        machine: {
          label: 'Machine',
          class: 'text-center'
        },
        created: {
          label: 'Created'
        },
        destroyed: {
          label: 'Destroyed'
        },
        usage: {
          label: 'Usage (in seconds)'
        },
        payment: {
          label: 'Total billed',
          class: 'text-center'
        }
      }
    }
  },
  // Fetches posts when the component is created.
  created () {
    this.loadDashboard()
    this.loadLogs()
  },
  methods: {
    loadDashboard () {
      this.$http.get('/dashboard')
        .then(response => {
          // JSON responses are automatically parsed.
          this.probes = response.data.probes
          this.jobs = response.data.jobs
          this.apis = response.data.apis
        })
        .catch(err => {
          this.message = err.response.data.message
        })
    },
    loadLogs () {
      this.$http.get('/logs')
        .then(response => {
          // JSON responses are automatically parsed.
          this.tableLogs = response.data.logs
          console.log(response.data.logs)
        })
        .catch(err => {
          this.message = err.response.data.message
        })
    }
  }
}
</script>
