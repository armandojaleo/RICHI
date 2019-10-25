<template>
  <div>
    <h1>Update Hour Registry</h1>
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <router-link :to="{ name: 'HourRegistryList' }" class="btn btn-success">
          Return to List
        </router-link>
      </div>
    </div>
    <form v-on:submit.prevent="updateHourRegistry">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="item.name">
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>    
  </div>
</template>

<script>

export default{
  data(){
    return{
      item:{}
    }
  },

  created: function(){
    this.getHourRegistry();
  },

  methods: {
    getHourRegistry()
    {
      let uri = 'http://localhost:4000/api/hourregistries/' + this.$route.params.id;
      this.axios.get(uri).then((response) => {
        this.item = response.data;
      });
    },

    updateHourRegistry()
    {
      let uri = 'http://localhost:4000/api/hourregistries/' + this.$route.params.id;
      this.axios.put(uri, this.item).then((response) => {
        this.$router.push({name: 'HourRegistryList'});
      });
    }
  }
}
</script>
