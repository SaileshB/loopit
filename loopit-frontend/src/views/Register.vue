<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="email">Email:</label>
          <input type="text" required name="email" v-model.trim="form.email"/>
        </div>
        <div>
          <label for="full_name"> Name:</label>
          <input type="text" required name="full_name" v-model.trim="form.name"/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" required name="password" v-model.trim="form.password"/>
        </div>
        <div>
          <label for="password_confirmation">Confirm Password:</label>
          <input type="password" required name="password_confirmation" v-model.trim="form.password_confirmation"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <p v-if="showError" id="error">Username already exists</p>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {


      if (this.password !== this.password_confirmation) {
        this.showError = true
      } else if (this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === '') {
        this.showError = true
      }

      if (!this.showError) {
        try {
          await this.Register(this.form);
          this.$router.push("/cars");
          this.showError = false
        } catch (error) {
          this.showError = true
        }
      }
    },
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

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

#error {
  color: red;
}
</style>
