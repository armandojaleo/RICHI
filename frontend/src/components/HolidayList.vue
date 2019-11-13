<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Holidays</h1>
        <router-link
          :to="{ name: 'HolidayCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create Holiday</router-link>
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
        <router-link :to="'/holidays/' + data.item._id" class="btn btn-primary btn-sm ml-1">Edit</router-link>
        <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteHoliday(data.item._id)">Delete</button>
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
        name: "",
        initdate: "",
        enddate: ""
      },
      items: [],
      fields: [
        {
          label: "Name",
          key: "name",
          sortable: true
        },
        {
          label: "Init Date",
          key: "initdate",
          sortable: true
        },
        {
          label: "End Date",
          key: "enddate",
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
    this.fetchHolidays();
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
              name: "",
              initdate: "",
              enddate: ""
            }
          ];
    }
  },

  methods: {
    fetchHolidays() {
      this.isBusy = true;
      const router = this.$router;
      const user = JSON.parse(localStorage.userdata);
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/users/" + user._id + "/holidays";
      if (user.role == "Admin") {
        uri = "http://localhost:4000/api/holidays";
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
    deleteHoliday(id) {
      const router = this.$router;
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/holidays/" + id;
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
