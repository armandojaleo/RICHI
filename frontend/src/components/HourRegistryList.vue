<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Hour Registries</h1>
        <router-link
          :to="{ name: 'HourRegistryCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create Hour Registry</router-link>
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
        <router-link
          :to="'/hourregistries/' + data.item._id"
          class="btn btn-primary btn-sm ml-1"
        >Edit</router-link>
        <button
          class="btn btn-danger btn-sm ml-1"
          v-on:click="deleteHourRegistry(data.item._id)"
        >Delete</button>
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
        task: "",
        time: "",
        date: ""
      },
      items: [],
      fields: [
        {
          label: "Task",
          key: "task",
          sortable: true
        },
        {
          label: "Time",
          key: "time",
          sortable: true
        },
        {
          label: "date",
          key: "date",
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
    this.fetchHourRegistries();
  },

  computed: {
    filtered() {
      const filtered = this.items.filter(item => {
        return Object.keys(this.filters).every(key =>
          String(item[key])
            .toLowerCase()
            .includes(this.filters[key].toLowerCase())
        );
      });
      return filtered.length > 0
        ? filtered
        : [
            {
              task: "",
              time: "",
              date: ""
            }
          ];
    }
  },

  methods: {
    fetchHourRegistries() {
      this.isBusy = true;
      const router = this.$router;
      const user = JSON.parse(localStorage.userdata);
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri =
        "http://localhost:4000/api/users/" + user._id + "/hourregistries";
      if (user.role == "Admin") {
        uri = "http://localhost:4000/api/hourregistries";
      }
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
    deleteHourRegistry(id) {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/hourregistries/" + id;
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
