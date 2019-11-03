<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Users</h1>
        <router-link
          :to="{ name: 'UserCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create User</router-link>
      </div>
    </div>
    <div v-if="items.length > 0">
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scrope="col">Username</th>
              <th scrope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in items" :key="item.item">
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>
                <router-link
                  :to="{ name: 'UserEdit', params: {id: item._id} }"
                  class="btn btn-primary btn-sm"
                >Edit</router-link>
                <button
                  class="btn btn-danger btn-sm"
                  v-on:click="deleteUser(item._id, index)"
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
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      let uri = "http://localhost:4000/api/auth/users";
      this.axios.get(uri).then(response => {
        this.items = response.data;
      });
    },
    deleteUser(id, index) {
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/auth/users/" + id;
        this.items.splice(index, 1);
        this.axios.delete(uri);
      }
    }
  }
};
</script>
