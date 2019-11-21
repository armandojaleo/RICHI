<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app stateless clipped width="400" :mini-variant.sync="mini">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-tooltip right :disabled="!mini">
              <template v-slot:activator="{on}">
                <v-btn icon small v-on="on" @click.stop="toggleMini()">
                  <v-icon>{{menuIcon}}</v-icon>
                </v-btn>
              </template>
              <span>Abrir menú</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="{ name: 'OfferList' }" class="nav-link">Offers</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'UserList' }"
                  class="nav-link"
                >Users</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'ContractList' }"
                  class="nav-link"
                >Contracts</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin' || role == 'Manager'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'EmployeeList' }"
                  class="nav-link"
                >Employees</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin' || role == 'Manager'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'ResourceList' }"
                  class="nav-link"
                >Resources</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin' || role == 'Manager' || role == 'Employee'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'HolidayList' }"
                  class="nav-link"
                >Holidays</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="role == 'Admin' || role == 'Manager' || role == 'Employee'">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  
                  :to="{ name: 'HourRegistryList' }"
                  class="nav-link"
                >Hour Registry</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed clipped-left app id="toolbar">
      <v-toolbar-title>
        <v-layout align-center justify-center>
          <img
            src="https://ctaimacdn.blob.core.windows.net/ctaimaforms/logo-header-grupoCTAIMA-100px-40px.png"
          />
          <v-divider vertical class="mx-3"></v-divider>
          <a id="linkInicio" tooltip="Inicio">
            <span
              style="font-family: 'Montserrat';font-size: 1.5rem;font-weight:800;color: #e4087f;"
            >RICHI</span>
          </a>
        </v-layout>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    mini: true,
    role: "",
    drawer: true
  }),
  created: function() {
    if (localStorage.userdata) {
      this.role = JSON.parse(localStorage.userdata).role;
    }
  },
  computed: {
    menuIcon() {
      return this.mini ? "chevron_right" : "chevron_left";
    }
  },
  methods: {
    toggleMini() {
      this.mini = !this.mini;
    },
    signOut() {
      localStorage.removeItem("authtoken");
      localStorage.removeItem("userdata");
      document.location.href = "/";
    }
  }
};
</script>
