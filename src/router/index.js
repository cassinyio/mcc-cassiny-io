import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// Views - Probes
import ListProbes from '@/views/probes/List'
import CreateProbes from '@/views/probes/Create'

// Views - Jobs
import ListJobs from '@/views/jobs/List'
import CreateJobs from '@/views/jobs/Create'

// Views - APIs
import ListAPIs from '@/views/apis/List'
import CreateAPIs from '@/views/apis/Create'

// Views - Cargos
import ListCargos from '@/views/cargos/List'
import CreateCargos from '@/views/cargos/Create'

// Views - Blueprints
import ListBlueprints from '@/views/blueprints/List'

// Views - User
import Settings from '@/views/user/Settings'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import ResetPassword from '@/views/auth/ResetPassword'
import SetPassword from '@/views/auth/SetPassword'
import ConfirmEmail from '@/views/auth/ConfirmEmail'
import NewTokenConfirmEmail from '@/views/auth/NewTokenConfirmEmail'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          meta: {auth: true},
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'settings',
          meta: {auth: true},
          name: 'Settings',
          component: Settings
        },
        {
          path: 'blueprints',
          name: 'Blueprints',
          meta: {auth: true},
          component: ListBlueprints
        },
        {
          path: 'probes',
          meta: {auth: true},
          redirect: '/probes/list',
          name: 'Probes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'ListProbes',
              component: ListProbes
            },
            {
              path: 'create',
              name: 'CreateProbes',
              component: CreateProbes
            }
          ]
        },
        {
          path: 'jobs',
          meta: {auth: true},
          redirect: '/jobs/list',
          name: 'Jobs',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'ListJobs',
              component: ListJobs
            },
            {
              path: 'create',
              name: 'CreateJobs',
              component: CreateJobs
            }
          ]
        },
        {
          path: 'apis',
          meta: {auth: true},
          redirect: '/apis/list',
          name: 'APIs',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'ListAPIs',
              component: ListAPIs
            },
            {
              path: 'create',
              name: 'CreateAPIs',
              component: CreateAPIs
            }
          ]
        },
        {
          path: 'cargos',
          meta: {auth: true},
          redirect: '/cargos/list',
          name: 'Cargos',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'ListCargos',
              component: ListCargos
            },
            {
              path: 'create',
              name: 'CreateCargos',
              component: CreateCargos
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      name: 'SetPassword',
      path: '/setpassword/:token',
      component: SetPassword
    },
    {
      name: 'ConfirmEmail',
      path: '/email/confirm/:token',
      component: ConfirmEmail
    },
    {
      name: 'NewTokenConfirmEmail',
      path: '/email/newtoken',
      component: NewTokenConfirmEmail

    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/403',
      name: 'Page403',
      component: Page404
    },
    {
      path: '/auth',
      redirect: '/auth/p404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    }
  ]
})
