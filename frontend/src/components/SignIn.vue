<template lang="html">

  <section class="sign-in">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Sign In</h1>
      </div>
    </div>
    <b-form @submit="signin">
      <b-form-group
        id="usernamelabel"
        label-cols-sm="4"
        label-cols-lg="3"
        description="Let us know your username."
        label="Enter your username"
        label-for="username">
        <b-form-input 
          id="input-horizontal" 
          v-model="item.username"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="passwordlabel"
        label-cols-sm="4"
        label-cols-lg="3"
        description="Let us know your password."
        label="Enter your password"
        label-for="password">
        <b-form-input 
          id="password"
          v-model="item.password"
          type="password"
          required>
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Success</b-button>
    </b-form>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'sign-in',
    props: [],
    mounted () {

    },
    data () {
      return {
        item: {}
      }
    },
    methods: {
      signin() {
        let uri = "http://localhost:4000/api/auth/signin";
        this.axios.post(uri, this.item).then(() => {
          this.$router.replace({ name: "Profile" });
        });
      }
    },
    computed: {

    }
}

</script>

<style scoped lang="scss">
.sign-in {
}
</style>
