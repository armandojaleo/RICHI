<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Offers</h1>
        <router-link
          v-if="role == 'Admin' || role == 'Manager'"
          :to="{ name: 'ContractCreate' }"
          class="btn btn-primary float-right mt-2"
        >Create Offer</router-link>
      </div>
    </div>
    <div v-if="items.length > 0">
      <div class="table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scrope="col">Name</th>
              <th scrope="col" v-if="role == 'Admin'">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in items" :key="item.item">
              <td>{{ item.name }}</td>
              <td v-if="role == 'Admin'">{{ item.status }}</td>
              <td>
                <router-link
                  :to="{ name: 'OfferView', params: {id: item._id} }"
                  class="btn btn-warning btn-sm ml-1"
                >Show</router-link>
                <button
                  v-if="role != 'Admin'"
                  class="btn btn-success btn-sm ml-1"
                  v-on:click="applyOffer(item._id)"
                >Apply</button>
                <router-link
                  v-if="role == 'Admin' || role == 'Manager'"
                  :to="{ name: 'ContractEdit', params: {id: item._id} }"
                  class="btn btn-primary btn-sm ml-1"
                >Edit</router-link>
                <button
                  v-if="role == 'Admin' || role == 'Manager'"
                  class="btn btn-danger btn-sm ml-1"
                  v-on:click="deleteOffer(item._id, index)"
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
import toastr from "toastr";

export default {
  data() {
    return {
      items: [],
      role: ""
    };
  },

  created: function() {
    this.fetchOffers();
    if (localStorage.userdata) {
      this.role = JSON.parse(localStorage.userdata).role;
    }
  },

  methods: {
    fetchOffers() {
      let uri = "http://localhost:4000/api/offers";
      this.axios
        .get(uri)
        .then(response => {
          if (response.status) this.items = response.data;
        });
    },
    applyOffer(id) {
      const router = this.$router;
      const user = JSON.parse(localStorage.userdata);
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to apply?");
      if (response) {
        let uri = "http://localhost:4000/api/users/" + user._id + "/offers/" + id;
        let userOffer = {
          userId: user._id,
          offerId: id
        }
        this.axios
          .post(uri, userOffer, auth)
          .then(response => {
            toastr.success(response.data.item, "You applied successfully!");
            this.$router.replace({ name: "OfferList" });
          })
          .catch(function() {
            router.push("/SignIn");
          });
      }
    }
  }
};
</script>
