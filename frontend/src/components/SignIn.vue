<template lang="html">

  <section class="sign-in">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Sign In</h1>
      </div>
    </div>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-horizontal">
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      description="Let us know your email."
      label="Enter your email"
      label-for="input-horizontal">
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      description="Let us know your password."
      label="Enter your password"
      label-for="input-horizontal">
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
    <b-button variant="success">Success</b-button>
  </section>

</template>

<script lang="js">
import toastr from "toastr";

  export default  {
    name: 'sign-in',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      signup() {
        let uri = "http://localhost:4000/api/signup";
        this.axios.post(uri, this.item).then(response => {
          toastr.success(response.data.item, "User created");
          this.$router.replace({ name: "ContractList" });
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
