<template>
  <div>
    <h1>Update Contract</h1>
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <router-link :to="{ name: 'ContractList' }" class="btn btn-success">Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name</label>
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
        <br />
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary" v-on:click="updateContract">Update</button>
        <button class="btn btn-secondary" v-on:click="addProperty">Add Property</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        properties: []
      }
    };
  },

  created: function() {
    this.getContract();
  },

  methods: {
    getContract() {
      let uri = "http://localhost:4000/api/contracts/" + this.$route.params.id;
      this.axios.get(uri).then(response => {
        this.item = response.data;
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
    },
    updateContract() {
      let uri = "http://localhost:4000/api/contracts/" + this.$route.params.id;
      this.axios.put(uri, this.item).then(response => {
        this.$router.push({ name: "ContractList" });
      });
    }
  }
};
</script>
