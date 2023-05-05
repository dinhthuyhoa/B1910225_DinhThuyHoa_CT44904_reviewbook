<template>
  <div class="p-5">
    <h1>Create New User</h1>
    <form class="row">
      <div class="form-group col-6">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="user.name" />
      </div>
      <div class="form-group col-6">
        <label for="role">Role</label>
        <select class="form-control" id="role" v-model="user.role">
          <option value="admin">Admin</option>
          <option value="reviewer">Reviewer</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <div class="form-group col-6">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group col-6">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="user.phone"
        />
      </div>
      <div class="form-group col-6">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="user.password"
        />
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click.prevent="createUser()">
          Create User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "CreateNewUser",
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
      },
    };
  },
  methods: {
    createUser() {
      BaseAPI.post("/api/users", this.user)
        .then((response) => {
          console.log(response.data);
          Swal.fire("Created!", "The user has been created.", "success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
