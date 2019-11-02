<template lang="html">

  <section class="sign-up">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Sign Up</h1>
      </div>
    </div>
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

  export default  {
    name: 'sign-up',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}

</script>

<style scoped lang="scss">
  .sign-up {

  }
</style>
