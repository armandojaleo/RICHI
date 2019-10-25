<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Contracts</h1>
        <router-link :to="{ name: 'ContractCreate' }" class="btn btn-primary float-right mt-2">
          Create Contract
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
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <router-link :to="{ name: 'ContractEdit', params: {id: item._id} }" class="btn btn-primary">
              Edit
            </router-link>

            <button class="btn btn-danger" v-on:click="deleteContract(item._id, index)">
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
    this.fetchContracts();
  },

  methods: {
    fetchContracts()
    {
      let uri = 'http://localhost:4000/api/contracts';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteContract(id, index)
    {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:4000/api/contracts/'+id;
        this.items.splice(index, 1);
        this.axios.delete(uri);
      }
    }
  }
}
</script>
