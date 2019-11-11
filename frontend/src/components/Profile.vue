<template lang="html">

  <section class="profile">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Profile</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Username</label>:
        {{ item.username }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Email</label>:
        {{ item.email }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Role</label>:
        {{ item.role }}
      </div>
    </div>
  </section>
  
</template>

<script lang="js">

  export default  {
    name: 'profile',
    props: [],
    mounted () {

    },
    data () {
      return {
        item: {}
      }
    },
    created: function() {
      this.getUser();
    },

    methods: {
      getUser() {
        const router = this.$router;
        const user = JSON.parse(localStorage.userdata);
        const auth = {
          headers: { "auth-token": localStorage.authtoken }
        };
        let uri = "http://localhost:4000/api/users/" + user._id;
        this.axios.get(uri, auth).then(response => {
          this.item = response.data;
        }).catch(function () {
          router.push("/SignIn");
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.profile {
}
</style>
