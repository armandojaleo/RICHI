<template lang="html">

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="item.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="item.password"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="signin"
    >SignIn
    </v-btn>
  </v-form>
</template>

<script lang="js">

  export default  {
    name: 'sign-in',
    data () {
      return {
        valid: true,
        item: {},
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      signin() {
        let uri = "http://localhost:4000/api/auth/signin";
        this.axios.post(uri, this.item).then(response => {
          localStorage.authtoken = response.data;
          const auth = {
            headers: { "auth-token": localStorage.authtoken }
          };
          let uri = "http://localhost:4000/api/auth/profile";
          this.axios.get(uri, auth).then(response => {
            localStorage.userdata = JSON.stringify(response.data);
            document.location.href = "/Profile";
          });
        }).catch(function (error) {
          if (error.response) {
            document.location.href = "/SignIn";
          }
        });
      }
    }
}

</script>

<style scoped lang="scss">
.sign-in {
}
</style>
