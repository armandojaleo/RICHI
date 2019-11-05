<template lang="html">

  <section class="sign-in">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Sign Up</h1>
      </div>
    </div>
    <b-form v-on:submit.prevent="signup">
      <b-form-group
        id="usernamelabel"
        label-cols-sm="4"
        label-cols-lg="3"
        description="Let us know your username."
        label="Enter your username"
        label-for="username">
        <b-form-input 
          id="username"
          v-model="item.username"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="emaillabel"
        label-cols-sm="4"
        label-cols-lg="3"
        description="Let us know your email."
        label="Enter your email"
        label-for="email">
        <b-form-input 
          id="email"
          v-model="item.email"
          type="email"
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
import toastr from "toastr";

  export default  {
    name: 'sign-up',
    props: [],
    mounted () {

    },
    data () {
      return {
        item: {}
      }
    },
    methods: {
      signup() {
        let uri = "http://localhost:4000/api/auth/signup";
        this.axios.post(uri, this.item).then(response => {
          toastr.success(response.data.item, "User created");
          this.$router.replace({ name: "SignUp" });
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