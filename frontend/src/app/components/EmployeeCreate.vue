<template>
  <div>
    <h1>Create Employee</h1>
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name" />
          </div>
        </div>
      </div>
      <div class="form-inline mb-2" v-for="(item, index) in item.properties" :key="item.properties">
        <div class="form-group">
          <input type="text" class="form-control mr-2" v-model="item.label" placeholder="Property" />
          <input type="text" class="form-control mr-2" v-model="item.value" placeholder="Value" />
          <button class="btn btn-warning" @click="deleteProperty(index)">Delete</button>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary" v-on:click="createEmployee">Create Employee</button>
        <button class="btn btn-secondary" v-on:click="addProperty">Add Property</button>
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
    createEmployee() {
      let uri = "http://localhost:4000/api/employees";
      this.axios.post(uri, this.item).then(response => {
        console.log(response);
        toastr.success(response.data.item, "Response");
        this.$router.replace({ name: "EmployeeList" });
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
