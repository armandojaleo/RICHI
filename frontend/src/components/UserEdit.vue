<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Update User</h1>
        <router-link
          :to="{ name: 'UserList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" v-model="item.username" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="item.email" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="item.password" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Role</label>
            <select v-model="item.role" class="form-control" required>
              <option
                v-for="option in options"
                v-bind:value="option.value"
                :key="option.value"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      role: null,
      options: [
        { value: "Admin", text: "Admin" },
        { value: "Manager", text: "Manager" },
        { value: "Employee", text: "Employee" },
        { value: "Visitor", text: "Visitor" }
      ]
    };
  },

  created: function() {
    this.getUser();
  },

  methods: {
    getUser() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users/" + this.$route.params.id;
      this.axios.get(uri, auth).then(response => {
        this.item = response.data;
      }).catch(function () {
        router.push("/SignIn");
      });
    },
    updateUser() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users/" + this.$route.params.id;
      this.axios.put(uri, this.item, auth).then(() => {
        this.$router.push({ name: "UserList" });
      }).catch(function () {
        router.push("/SignIn");
      });
    }
  }
};
</script>
