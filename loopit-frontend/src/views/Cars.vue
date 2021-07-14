<template>
  <div class="container">

    <div v-if="isLoggedIn">
      <p>Hi {{ username }}</p>
    </div>

    <div class="posts" v-if="Cars">

      <table class="table">
        <thead>
        <tr>
          <th scope="col">Car Make</th>
          <th scope="col">Model</th>
          <th scope="col">Year</th>
          <th scope="col">Price</th>
          <th scope="col">In stock</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="car in Cars" :key="car.id">
          <th scope="row">{{ car.make }}</th>
          <td>{{ car.model }}</td>
          <td>{{ car.year }}</td>
          <td>$ {{ car.price }}</td>
          <td>{{ car.stock }}</td>
        </tr>
        </tbody>
      </table>


    </div>
    <div v-else>Oh no!!! We have no cars</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Cars",
  components: {},
  data() {
    return {};
  },
  created: function () {
    // a function to call GetCars action

    this.GetCars()
  },
  computed: {
    ...mapGetters({Cars: "StateCars", access_token: "StateToken"}),
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    username() {
      return this.$store.getters.name
    }

  },
  methods: {
    ...mapActions(["GetCars"]),


  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}


ul {
  list-style: none;
}

#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
}
</style>
