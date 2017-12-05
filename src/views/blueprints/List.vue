<template>
  <div class="animated fadeIn">
    <div class="row">

      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Blueprints">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Tag</th>
                <th>Description</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(blueprint, index) in blueprints">
                <td>{{index+1}}</td>
                <td><a :href="blueprint.link">{{blueprint.repository}}/{{blueprint.name}}</a></td>
                <td>{{blueprint.tag}}</a></td>
                <td>{{blueprint.description}}</td>
                <td>{{blueprint.created_at}}</td>
                <td class="is-icon">
                    <button class="button is-small is-danger">Info</button>
                </td>

              </tr>
           </tbody>
          </table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->

    <b-modal title="Do you really want to delete this probe?" v-model="showModal">
      Do you really want to delete cargo <i></i>?
      <br />
      <br />
      <strong>There is no way back from this, all your data NOT STORED inside a cargo will be lost.</strong>
    </b-modal>


  </div>

</template>

<script>
export default {
  name: 'blueprints',
  data: () => ({
    blueprints: [],
    showModal: false,
    message: null
  }),
  // Fetches posts when the component is created.
  created () {
    this.loadBlueprints()
  },
  methods: {
    loadBlueprints () {
      this.$http.get('/spawner/blueprints')
        .then(response => {
          // JSON responses are automatically parsed.
          this.blueprints = response.data.blueprints
        })
        .catch(err => {
          this.errors.push(err)
        })
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
