<template>
  <div class="p-5">
    <h1>Users</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Loại người udngf</th>
          <th class="text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
          <td class="d-flex justify-content-center" style="gap: 10px">
            <button class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </button>
            <button class="btn btn-danger" @click="deleteUser(user._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
        <tr v-if="users.length < 1">
          <td colspan="6" class="text-center"><h4>No data</h4></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseAPI from "@/services/api.service";
import Swal from "sweetalert2";

export default {
  name: "AdminUsers",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    BaseAPI.get("/api/users")
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          BaseAPI.delete(`/api/users/${id}`)
            .then((response) => {
              const index = this.users.findIndex((user) => user.id === id);
              this.users.splice(index, 1);
              Swal.fire("Deleted!", "The user has been deleted.", "success");
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
