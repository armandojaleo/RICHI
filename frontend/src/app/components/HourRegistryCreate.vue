<template>
  <div>
    <h1>Create HourRegistry</h1>
    <form v-on:submit.prevent="createHourRegistry">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary">Create HourRegistry</button>
      </div>
    </form>
  </div>
</template>

<script>
  import toastr from 'toastr';

  export default {
    data(){
      return{
        item:{}
      }
    },
    methods: {
      createHourRegistry(){
        let uri = 'http://localhost:4000/api/hourregistries';
        this.axios.post(uri, this.item).then((response) => {
          console.log(response);
          toastr.success(response.data.item, 'Response');
          this.$router.replace({ name: 'HourRegistryList'})
        });
      }
    }
  }
  </script>
