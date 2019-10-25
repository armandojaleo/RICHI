<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">RRHH</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ContractList' }" class="nav-link">Contracts</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'EmployeeList' }" class="nav-link">Employees</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'HourRegistryList' }" class="nav-link">Hour Registry</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <!-- CONTENT -->
    <div class="container">
      <div>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter .fade-leave-active {
  transition: 0;
}
</style>

<script>
export default {};
</script>
