<template>
  <div class="p-5">
    <h1>Edit User</h1>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="user.name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="user.phone"
        />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select class="form-control" id="role" v-model="user.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="updateUser">
        Save
      </button>
    </form>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "EditUser",
  data() {
    return {
      user: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    BaseAPI.get(`/api/users/${id}`)
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    updateUser() {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to update this user's information",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.put(`/api/users/${this.user._id}`, this.user)
            .then((response) => {
              console.log(response.data);
              Swal.fire("Updated!", "The user has been updated.", "success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
  },
};
</script>
