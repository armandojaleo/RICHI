<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Employees</h1>
        <router-link
          :to="{ name: 'UserCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create User</router-link>
      </div>
    </div>
    <b-table small hover responsive :busy="isBusy" :items="filtered" :fields="fields">
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template slot="top-row" slot-scope="{ fields }">
        <td v-for="field in fields" :key="field.key">
          <input
            v-if="field.label != 'Actions'"
            v-model="filters[field.key]"
            :placeholder="field.label"
          />
        </td>
      </template>
      <template v-slot:cell(action)="data">
        <router-link :to="'/employees/' + data.item._id" class="btn btn-primary btn-sm ml-1">Edit</router-link>
        <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteEmployee(data.item._id)">Delete</button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBusy: false,
      filters: {
        contract: "",
        username: "",
        name: ""
      },
      items: [],
      contracts: [],
      fields: [
        {
          label: "Contract",
          key: "nameContract",
          sortable: true
        },
        {
          label: "Username",
          key: "username",
          sortable: true
        },
        {
          label: "Name",
          key: "name",
          sortable: true
        },
        {
          label: "Actions",
          key: "action"
        }
      ]
    };
  },

  created: function() {
    this.fetchContracts();
    this.fetchEmployees();
  },

  computed: {
    filtered() {
      const itemsMap = this.items;
      const contractsMap = this.contracts;
      this.items.forEach((item, index) => {
        let contractFinded = contractsMap.find(
          contract => contract._id == item.contract
        );
        if (contractFinded) {
          itemsMap[index].nameContract = contractFinded.name;
        }
      });
      const filtered = itemsMap.filter(item => {
        return Object.keys(this.filters).every(key =>
          String(item[key])
            .toLowerCase()
            .includes(this.filters[key].toLowerCase())
        );
      });
      return filtered.length > 0 ? filtered : [];
    }
  },

  methods: {
    fetchContracts() {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/contracts";
      this.axios
        .get(uri, auth)
        .then(response => {
          this.contracts = response.data;
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    fetchEmployees() {
      this.isBusy = true;
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users";
      this.axios
        .get(uri, auth)
        .then(response => {
          if (response.status) {
            this.items = response.data;
          }
          this.isBusy = false;
        })
        .catch(function() {
          router.push("/SignIn");
        });
    },
    deleteEmployee(id) {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/users/" + id;
        let index = this.items.findIndex(item => item._id === id);
        if (index >= 0) this.items.splice(index, 1);
        this.axios.delete(uri, auth).catch(function() {
          router.push("/SignIn");
        });
      }
    }
  }
};
</script>
