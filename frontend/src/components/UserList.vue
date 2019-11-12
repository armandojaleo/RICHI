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
    <b-table small hover responsive :busy="isBusy" :items="filtered" :fields="fields">
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template slot="top-row" slot-scope="{ fields }">
        <td v-for="field in fields" :key="field.key">
          <input v-if="field.label != 'Actions'" v-model="filters[field.key]" :placeholder="field.label">
        </td>
      </template>
      <template v-slot:cell(action)="data">
        <router-link :to="'/contracts/' + data.item._id" class="btn btn-primary btn-sm ml-1">Edit</router-link>
        <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteUser(data.item._id)">Delete</button>
      </template>
    </b-table>
    <div v-if="items.length > 0">
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scrope="col">Username</th>
              <th scrope="col">Email</th>
              <th scrope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in items" :key="item.item">
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>
              <td>
                <router-link
                  :to="{ name: 'UserEdit', params: {id: item._id} }"
                  class="btn btn-primary btn-sm ml-1"
                >Edit</router-link>
                <button
                  class="btn btn-danger btn-sm ml-1"
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
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users";
      this.axios.get(uri, auth).then(response => {
        this.items = response.data;
      }).catch(function () {
        router.push("/SignIn");
      });
    },
    deleteUser(id, index) {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/users/" + id;
        this.items.splice(index, 1);
        this.axios.delete(uri, auth).catch(function () {
        router.push("/SignIn");
      });
      }
    }
  }
};
</script>
