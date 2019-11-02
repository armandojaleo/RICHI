<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Employees</h1>
        <router-link
          :to="{ name: 'EmployeeCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create Employee</router-link>
      </div>
    </div>
    <div v-if="items.length > 0">
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scrope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in items" :key="item.item">
              <td>{{ item.name }}</td>
              <td>
                <router-link
                  :to="{ name: 'EmployeeEdit', params: {id: item._id} }"
                  class="btn btn-primary btn-sm"
                >Edit</router-link>
                <button
                  class="btn btn-danger btn-sm"
                  v-on:click="deleteEmployee(item._id, index)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>There aren't data</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },

  created: function() {
    this.fetchEmployees();
  },

  methods: {
    fetchEmployees() {
      let uri = "http://localhost:4000/api/employees";
      this.axios.get(uri).then(response => {
        this.items = response.data;
      });
    },
    deleteEmployee(id, index) {
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/employees/" + id;
        this.items.splice(index, 1);
        this.axios.delete(uri);
      }
    }
  }
};
</script>
