<template>
  <div id="app">
    <NavBar :user="user" />
    <div class="container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  data () {
    return {
      user: ''
    }
  },
  components: {
    NavBar
  },

  created: function() {
    this.checkRol();
  },

  methods: {
    checkRol(){
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/auth/profile";
      this.axios.get(uri, auth).then(response => {
        this.user = response.data;
      }).catch(function () {
        router.push("/SignIn");
      });
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
