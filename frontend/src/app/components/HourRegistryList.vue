<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Hour Registries</h1>
        <router-link :to="{ name: 'HourRegistryCreate' }" class="btn btn-primary float-right mt-2">
          Create Hour Registry
        </router-link>
      </div>
    </div><br />

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>Name</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items">
          <td>{{ item.name }}</td>
          <td>
            <router-link :to="{ name: 'HourRegistryEdit', params: {id: item._id} }" class="btn btn-primary">
              Edit
            </router-link>

            <button class="btn btn-danger" v-on:click="deleteHourRegistry(item._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      items: []
    }
  },

  created: function()
  {
    this.fetchHourRegistries();
  },

  methods: {
    fetchHourRegistries()
    {
      let uri = 'http://localhost:4000/api/hourregistries';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteHourRegistry(id)
    {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:4000/api/hourregistries/'+id;
        this.items.splice(id, 1);
        this.axios.delete(uri);
      }
    }
  }
}
</script>
