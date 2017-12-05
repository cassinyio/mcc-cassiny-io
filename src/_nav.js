export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
      /* badge: {
        variant: 'primary',
        text: 'NEW'
      } */
    },
    {
      name: 'Probes',
      url: '/icons',
      icon: 'icon-rocket',
      children: [
        {
          name: 'List of your probes',
          url: '/probes/list',
          icon: 'icon-star'
        },
        {
          name: 'Create a probe',
          url: '/probes/create',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'APIs',
      url: '/icons',
      icon: 'icon-grid',
      children: [
        {
          name: 'List your APIs',
          url: '/apis/list',
          icon: 'icon-star'
        },
        {
          name: 'Create an API',
          url: '/apis/create',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Jobs',
      url: '/icons',
      icon: 'icon-chemistry',
      children: [
        {
          name: 'List of jobs',
          url: '/jobs/list',
          icon: 'icon-star'
        },
        {
          name: 'Launcha a job',
          url: '/jobs/create',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Cargos',
      url: '/icons',
      icon: 'icon-layers',
      children: [
        {
          name: 'List of cargos',
          url: '/cargos/list',
          icon: 'icon-star'
        },
        {
          name: 'Create a cargo',
          url: '/cargos/create',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Blueprints',
      url: '/blueprints',
      icon: 'icon-notebook'
    },
    {
      divider: true
    }
  ]
}
