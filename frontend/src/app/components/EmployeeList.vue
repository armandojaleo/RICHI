<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Employees</h1>
        <router-link :to="{ name: 'EmployeeCreate' }" class="btn btn-primary float-right mt-2">
          Create Employee
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
            <router-link :to="{ name: 'EmployeeEdit', params: {id: item._id} }" class="btn btn-primary">
              Edit
            </router-link>

            <button class="btn btn-danger" v-on:click="deleteEmployee(item._id)">
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
    this.fetchEmployees();
  },

  methods: {
    fetchEmployees()
    {
      let uri = 'http://localhost:4000/api/employees';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteEmployee(id)
    {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:4000/api/employees/'+id;
        this.items.splice(id, 1);
        this.axios.delete(uri);
      }
    }
  }
}
</script>
