<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Update Hour Registry</h1>
        <router-link
          :to="{ name: 'HourRegistryList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateHourRegistry">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Task:</label>
            <input type="text" class="form-control" v-model="item.task" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Time:</label>
            <input type="time" class="form-control" v-model="item.time" value="00:00" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Date:</label>
            <input type="date" class="form-control" v-model="item.date" required>
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
      item: {}
    };
  },
  created: function() {
    this.getHourRegistry();
  },
  methods: {
    getHourRegistry() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/hourregistries/" + this.$route.params.id;
      this.axios.get(uri, auth).then(response => {
        this.item = response.data;
      }).catch(function () {
        router.push("/SignIn");
      });
    },
    updateHourRegistry() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/hourregistries/" + this.$route.params.id;
      this.axios.put(uri, this.item, auth).then(() => {
        this.$router.push({ name: "HourRegistryList" });
      }).catch(function () {
        router.push("/SignIn");
      });
    }
  }
};
</script>
