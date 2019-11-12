<template>
  <div>
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">{{ item.name }} Offer</h1>
        <router-link
          :to="{ name: 'OfferList' }"
          class="btn btn-success float-right mt-2"
        >Return to List</router-link>
      </div>
    </div>
    <form v-on:submit.prevent="applyOffer">
      <div class="row">
        <div class="col-md-6">
          <b>Duration</b>
          :
          {{ item.duration }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b>Location</b>
          :
          {{ item.location }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b>Salary</b>
          :
          {{ item.salary }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div v-html="item.description"></div>
        </div>
      </div>
      <div class="row" v-for="(item) in item.properties" :key="item.properties">
        <div class="col-md-6">
          <label>{{ item.label }}</label>
          {{ item.value }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Apply</button>
      </div>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  data() {
    return {
      item: {
        properties: []
      }
    };
  },

  created: function() {
    this.getOffer();
  },

  methods: {
    getOffer() {
      let uri = "http://localhost:4000/api/offers/" + this.$route.params.id;
      this.axios.get(uri).then(response => {
        this.item = response.data;
      });
    },

    applyOffer() {
      const router = this.$router;
      const user = JSON.parse(localStorage.userdata);
      const auth = {
        headers: { "auth-token": localStorage.authtoken }
      };
      const response = confirm("are you sure you want to apply?");
      if (response) {
        let uri = "http://localhost:4000/api/users/" + user._id + "/offers/" + this.$route.params.id;
        let userOffer = {
          userId: user._id,
          offerId: this.$route.params.id
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
