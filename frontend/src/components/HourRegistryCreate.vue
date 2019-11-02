<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Create Hour Registry</h1>
        <router-link
          :to="{ name: 'HourRegistryList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="createHourRegistry">
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
        <button class="btn btn-primary">Create HourRegistry</button>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  data() {
    return {
      item: {}
    };
  },
  methods: {
    createHourRegistry() {
      let uri = "http://localhost:4000/api/hourregistries";
      this.axios.post(uri, this.item).then(response => {
        toastr.success(response.data.item, "Hour Registry created");
        this.$router.replace({ name: "HourRegistryList" });
      });
    }
  }
};
</script>
