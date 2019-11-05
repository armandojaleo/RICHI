<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Create Holiday</h1>
        <router-link
          :to="{ name: 'HolidayList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="createHoliday">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Description:</label>
            <textarea class="form-control" v-model="item.description" required></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Dates:</label>
            <div class="form-row">
              <div class="col">
                <input type="date" class="form-control" v-model="item.dateinit" required>
              </div>
              <div class="col">
                <input type="date" class="form-control" v-model="item.dateend" required>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-inline mb-2" v-for="(item, index) in item.properties" :key="item.properties">
        <div class="form-group">
          <input type="text" class="form-control mr-2" v-model="item.label" placeholder="Property">
          <input type="text" class="form-control mr-2" v-model="item.value" placeholder="Value">
          <a class="btn btn-warning text-white" v-on:click="deleteProperty(index)">Delete</a>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Create Holiday</button>
        <a class="btn btn-secondary text-white" v-on:click="addProperty">Add Property</a>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  data() {
    return {
      item: {
        properties: []
      }
    };
  },
  methods: {
    createHoliday() {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/holidays";
      this.axios.post(uri, this.item, auth).then(response => {
        toastr.success(response.data.item, "Holiday created");
        this.$router.replace({ name: "HolidayList" });
      });
    },
    addProperty() {
      this.item.properties.push({
        label: "",
        value: ""
      });
    },
    deleteProperty(index) {
      this.item.properties.splice(index, 1);
    }
  }
};
</script>