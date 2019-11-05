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
    <div v-if="items.length > 0">
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scrope="col">Name</th>
              <th scrope="col">Init Date</th>
              <th scrope="col">End Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in items" :key="item.item">
              <td>{{ item.name }}</td>
              <td>{{ item.dateinit | moment("DD-MM-YYYY") }}</td>
              <td>{{ item.dateend | moment("DD-MM-YYYY") }}</td>
              <td>
                <router-link
                  :to="{ name: 'HolidayEdit', params: {id: item._id} }"
                  class="btn btn-primary btn-sm"
                >Edit</router-link>
                <button
                  class="btn btn-danger btn-sm"
                  v-on:click="deleteHoliday(item._id, index)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>There aren't data</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },

  created: function() {
    this.fetchHolidays();
  },

  methods: {
    fetchHolidays() {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      let uri = "http://localhost:4000/api/holidays";
      this.axios.get(uri, auth).then(response => {
        this.items = response.data;
      });
    },
    deleteHoliday(id, index) {
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to delete?");
      if (response) {
        let uri = "http://localhost:4000/api/holidays/" + id;
        this.items.splice(index, 1);
        this.axios.delete(uri, auth);
      }
    }
  }
};
</script>
