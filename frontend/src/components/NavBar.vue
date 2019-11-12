<template>
  <div class="hello">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Richi</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{ name: 'OfferList' }" class="nav-link">Offers</router-link>
          <router-link v-if="role == 'Admin'" :to="{ name: 'UserList' }" class="nav-link">Users</router-link>
          <router-link v-if="role == 'Admin'" :to="{ name: 'ContractList' }" class="nav-link">Contracts</router-link>
          <router-link v-if="role == 'Admin' || role == 'Manager'" :to="{ name: 'EmployeeList' }" class="nav-link">Employees</router-link>
          <router-link v-if="role == 'Admin' || role == 'Manager'" :to="{ name: 'ResourceList' }" class="nav-link">Resources</router-link>
          <router-link v-if="role == 'Admin' || role == 'Manager' || role == 'Employee'" :to="{ name: 'HolidayList' }" class="nav-link">Holidays</router-link>
          <router-link v-if="role == 'Admin' || role == 'Manager' || role == 'Employee'" :to="{ name: 'HourRegistryList' }" class="nav-link">Hour Registry</router-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">CA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="User" right v-if="role == 'Admin' || role == 'Manager' || role == 'Employee' || role == 'Visitor'">
            <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="signOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav right v-else>
            <router-link :to="{ name: 'SignUp' }" class="nav-link">Register</router-link>
            <router-link :to="{ name: 'SignIn' }" class="nav-link">Login</router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      role: ''
    }
  },
  created: function() {
    if (localStorage.userdata) {
      this.role = JSON.parse(localStorage.userdata).role
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem("authtoken");
      localStorage.removeItem("userdata");
      document.location.href = "/";
    }
  }
};
</script>
