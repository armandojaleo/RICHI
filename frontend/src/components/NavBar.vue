<template>
  <div class="hello">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Richi</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{ name: 'UserList' }" class="nav-link">Users</router-link>
          <router-link :to="{ name: 'ContractList' }" class="nav-link">Contracts</router-link>
          <router-link :to="{ name: 'EmployeeList' }" class="nav-link">Employees</router-link>
          <router-link :to="{ name: 'HolidayList' }" class="nav-link">Holidays</router-link>
          <router-link :to="{ name: 'HourRegistryList' }" class="nav-link">Hour Registry</router-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="signOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    signOut() {
      localStorage.removeItem("authtoken");
      this.$router.push("SignIn");
    }
  }
};
</script>
